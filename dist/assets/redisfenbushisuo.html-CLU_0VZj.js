import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as o,o as c,c as l,a as n,b as s,d as t,e}from"./app-vSdX8vi3.js";const i={},u=e(`<h2 id="实现原理" tabindex="-1"><a class="header-anchor" href="#实现原理"><span>实现原理</span></a></h2><h3 id="基础实现" tabindex="-1"><a class="header-anchor" href="#基础实现"><span>基础实现</span></a></h3><p>Redis 本身可以被多个客户端共享访问，正好就是一个共享存储系统，可以用来保存分布式锁，而且 Redis 的读写性能高，可以应对高并发的锁操作场景。 Redis 的 SET 命令有个 NX 参数可以实现「key不存在才插入」，所以可以用它来实现分布式锁：</p><ul><li>如果 key 不存在，则显示插入成功，可以用来表示加锁成功；</li><li>如果 key 存在，则会显示插入失败，可以用来表示加锁失败。</li></ul><p>SET lock_keyunique_value NX PX 10000</p><ul><li>lock_key 就是 key 键；</li><li>unique_value 是客户端生成的唯一的标识，区分来自不同客户端的锁操作；</li><li>NX 代表只在 lock_key 不存在时，才对 lock_key 进行设置操作；</li><li>PX 10000 表示设置 lock_key 的过期时间为 10s，这是为了避免客户端发生异常而无法释放锁。</li></ul><p>释放锁的时候需要删除key，或者使用lua脚本来保证原子性。</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token comment">// 释放锁时，先比较 unique_value 是否相等，避免锁的误释放</span>
<span class="token keyword">if</span> redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span>KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">==</span> ARGV<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> then
<span class="token keyword">return</span> redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">&quot;del&quot;</span><span class="token punctuation">,</span>KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">else</span>
    <span class="token keyword">return</span> <span class="token number">0</span>
    end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="续租机制" tabindex="-1"><a class="header-anchor" href="#续租机制"><span>续租机制</span></a></h3><p>基于上文中的实现方式，我们在设置key过期时间时，不能准确的描述业务处理时间。为了防止因为业务处理时间较长导致锁过期而提前释放锁，通过不断更新锁的过期时间来保持锁的有效性，避免了因锁过期而导致的并发问题。 关于这个问题，目前常见的解决方法有两种： 1、实现自动续租机制：额外起一个线程，定期检查线程是否还持有锁，如果有则延长过期时间。DistributedLock里面就实现了这个方案，使用“看门狗”定期检查（每1/3的锁时间检查1次），如果线程还持有锁，则刷新过期时间。 2、实现快速失败机制：当我们解锁时发现锁已经被其他线程获取了，说明此时我们执行的操作已经是“不安全”的了，此时需要进行回滚，并返回失败。 以下是使用StackExchange.Redis 库实现分布式锁和续租机制的示例代码：</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisLock</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name">IDatabase</span> _database<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name"><span class="token keyword">string</span></span> _lockKey<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">string</span></span> _lockValue<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name">TimeSpan</span> _lockTimeout<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name">TimeSpan</span> _renewInterval<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">bool</span></span> _isLocked<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">RedisLock</span><span class="token punctuation">(</span><span class="token class-name">IDatabase</span> database<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> lockKey<span class="token punctuation">,</span> <span class="token class-name">TimeSpan</span> lockTimeout<span class="token punctuation">,</span> <span class="token class-name">TimeSpan</span> renewInterval<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        _database <span class="token operator">=</span> database<span class="token punctuation">;</span>
        _lockKey <span class="token operator">=</span> lockKey<span class="token punctuation">;</span>
        _lockTimeout <span class="token operator">=</span> lockTimeout<span class="token punctuation">;</span>
        _renewInterval <span class="token operator">=</span> renewInterval<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//尝试获取锁，如果成功，则启动一个续租线程</span>
    <span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span><span class="token keyword">bool</span><span class="token punctuation">&gt;</span></span> <span class="token function">AcquireAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        _lockValue <span class="token operator">=</span> Guid<span class="token punctuation">.</span><span class="token function">NewGuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">var</span></span> acquired <span class="token operator">=</span> <span class="token keyword">await</span> _database<span class="token punctuation">.</span><span class="token function">StringSetAsync</span><span class="token punctuation">(</span>_lockKey<span class="token punctuation">,</span> _lockValue<span class="token punctuation">,</span> _lockTimeout<span class="token punctuation">,</span> When<span class="token punctuation">.</span>NotExists<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>acquired<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            _isLocked <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token function">StartRenewal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> acquired<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//定期使用 KeyExpireAsync 命令重置键的过期时间，从而实现续租机制</span>
    <span class="token keyword">private</span> <span class="token keyword">async</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">StartRenewal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>_isLocked<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">await</span> Task<span class="token punctuation">.</span><span class="token function">Delay</span><span class="token punctuation">(</span>_renewInterval<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">await</span> _database<span class="token punctuation">.</span><span class="token function">KeyExpireAsync</span><span class="token punctuation">(</span>_lockKey<span class="token punctuation">,</span> _lockTimeout<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="容易遇到的问题" tabindex="-1"><a class="header-anchor" href="#容易遇到的问题"><span>容易遇到的问题</span></a></h2><p>分布式锁方法容易遇到的问题 1.得到锁后系统出现问题，这个时候未设置过期时间，锁一直未释放。(最好设置锁的同时原子性的设置过期时间) 2.A,B,C在排队获取锁，a业务未处理完，锁过期了，然后等待的b任务拿到了锁，等a处理完成后，将锁释放这个时候c就又拿到锁了。(在设置锁的时候，将guid作为value存储，释放锁的时候，如果value值是存储的的那个，那么就释放，否则就不释放)</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>var id = Guid.NewGuid().ToString(&quot;N&quot;);
//获取锁
do
{
    //set : key存在则失败,不存在才会成功,并且过期时间5秒
    var success = redisClient.Set(lockKey, id, expireSeconds: 5, exists: RedisExistence.Nx);
    if (success == true)
    {
        break;
    }
    Thread.Sleep(TimeSpan.FromSeconds(1));//休息1秒再尝试获取锁
} while (true);
Console.WriteLine($&quot;线程:{Task.CurrentId} 拿到了锁,开始消费&quot;);
.........
//业务处理完后,释放锁.
var value = redisClient.Get&lt;string&gt;(lockKey);
if (value == id)
{
    redisClient.Del(lockKey);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.如果设置的锁时间为5s，这个时候过期了，这个时候锁过期了，但是任务还未结束，如何进行锁续费时间。</p><p>锁示例</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> redisClient <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CSRedisClient</span><span class="token punctuation">(</span><span class="token string">&quot;192.168.7.253:6379,password=2000,defaultDatabase=13,prefix=my_&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> lockKey <span class="token operator">=</span> <span class="token string">&quot;lockKey&quot;</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> stock <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span><span class="token comment">//商品库存</span>
<span class="token class-name"><span class="token keyword">var</span></span> taskCount <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span><span class="token comment">//线程数量</span>
redisClient<span class="token punctuation">.</span><span class="token function">Del</span><span class="token punctuation">(</span>lockKey<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//测试前,先把锁删了.</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> taskCount<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	Task<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
	<span class="token punctuation">{</span>
		<span class="token class-name"><span class="token keyword">var</span></span> id <span class="token operator">=</span> Guid<span class="token punctuation">.</span><span class="token function">NewGuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token string">&quot;N&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//生成唯一标识  标识当前线程</span>
		<span class="token comment">//获取锁</span>
		<span class="token keyword">do</span>
		<span class="token punctuation">{</span>
			<span class="token comment">//setnx : key不存在才会成功,存在则失败.</span>
			<span class="token class-name"><span class="token keyword">var</span></span> success <span class="token operator">=</span> redisClient<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span>lockKey<span class="token punctuation">,</span> id<span class="token punctuation">,</span> <span class="token named-parameter punctuation">expireSeconds</span><span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">,</span> RedisExistence<span class="token punctuation">.</span>Nx<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//设置过期时间防止死锁 并且将存储和设置过期时间原子性处理</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>success <span class="token operator">==</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
			<span class="token punctuation">{</span>
				<span class="token keyword">break</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>TimeSpan<span class="token punctuation">.</span><span class="token function">FromSeconds</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//休息1秒再尝试获取锁</span>
		<span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$&quot;线程:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">Task<span class="token punctuation">.</span>CurrentId</span><span class="token punctuation">}</span></span><span class="token string"> 拿到了锁,开始消费&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>stock <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$&quot;库存不足,线程:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">Task<span class="token punctuation">.</span>CurrentId</span><span class="token punctuation">}</span></span><span class="token string"> 抢购失败!&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			redisClient<span class="token punctuation">.</span><span class="token function">Del</span><span class="token punctuation">(</span>lockKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">return</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		stock<span class="token operator">--</span><span class="token punctuation">;</span>


		<span class="token comment">//模拟处理业务</span>
		Thread<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>TimeSpan<span class="token punctuation">.</span><span class="token function">FromSeconds</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


		Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$&quot;线程:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">Task<span class="token punctuation">.</span>CurrentId</span><span class="token punctuation">}</span></span><span class="token string"> 消费完毕!剩余 </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">stock</span><span class="token punctuation">}</span></span><span class="token string"> 个&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">//业务处理完后,释放锁.</span>
		<span class="token comment">//redisClient.Del(lockKey); //这种方法会出现a线程处理业务，然后超时后锁失效，然后b就在a线程没有结束前去处理了，然后b处理完后删除了线程</span>
		<span class="token comment">//稍微高级一点写法    更应该删除和查询弄成一条命令，然后保证原子性,可以考虑下使用lua</span>
		<span class="token class-name"><span class="token keyword">var</span></span> <span class="token keyword">value</span> <span class="token operator">=</span> redisClient<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Get</span><span class="token generic class-name"><span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>lockKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">value</span> <span class="token operator">==</span> id<span class="token punctuation">)</span>
			redisClient<span class="token punctuation">.</span><span class="token function">Del</span><span class="token punctuation">(</span>lockKey<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),r={href:"https://mp.weixin.qq.com/s/z0SRVU1zW6WyaCTrbKJTog",target:"_blank",rel:"noopener noreferrer"},k=e(`<p>简单锁</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// 是否可以获得到简单锁</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>key<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>键名称<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>expireSeconds<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>过期时间<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>interval<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>重试时间<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>loop<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>重试次数<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>returns</span><span class="token punctuation">&gt;</span></span>true得到锁，false得不到<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>returns</span><span class="token punctuation">&gt;</span></span></span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span><span class="token keyword">bool</span><span class="token punctuation">&gt;</span></span> <span class="token function">GetEasyLockAsync</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> key<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> expireSeconds <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> interval <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> loop <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">bool</span></span> isSuccess <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> loop<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        isSuccess <span class="token operator">=</span> <span class="token keyword">await</span> RedisHelper<span class="token punctuation">.</span><span class="token function">SetAsync</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token string">&quot;lock&quot;</span><span class="token punctuation">,</span> expireSeconds<span class="token punctuation">,</span> RedisExistence<span class="token punctuation">.</span>Nx<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ConfigureAwait</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>isSuccess<span class="token punctuation">)</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>interval <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> loop <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span>
            <span class="token keyword">await</span> Task<span class="token punctuation">.</span><span class="token function">Delay</span><span class="token punctuation">(</span>interval<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> isSuccess<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>key包含用户的id，然后用户请求的时候去调用该方法判断是否锁定，如果返回true，那么说明没有获取到锁，直接返回。</p></blockquote><h2 id="开源组件" tabindex="-1"><a class="header-anchor" href="#开源组件"><span>开源组件</span></a></h2><h3 id="distributedlock" tabindex="-1"><a class="header-anchor" href="#distributedlock"><span>DistributedLock</span></a></h3>`,5),d={href:"https://github.com/madelson/DistributedLock",target:"_blank",rel:"noopener noreferrer"},m=n("h4",{id:"支持",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#支持"},[n("span",null,"支持")])],-1),v={href:"https://github.com/madelson/DistributedLock/blob/master/docs/DistributedLock.SqlServer.md",target:"_blank",rel:"noopener noreferrer"},b={href:"https://github.com/madelson/DistributedLock/blob/master/docs/DistributedLock.Postgres.md",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/madelson/DistributedLock/blob/master/docs/DistributedLock.MySql.md",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/madelson/DistributedLock/blob/master/docs/DistributedLock.Oracle.md",target:"_blank",rel:"noopener noreferrer"},y={href:"https://github.com/madelson/DistributedLock/blob/master/docs/DistributedLock.Redis.md",target:"_blank",rel:"noopener noreferrer"},w={href:"https://github.com/madelson/DistributedLock/blob/master/docs/DistributedLock.Azure.md",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/madelson/DistributedLock/blob/master/docs/DistributedLock.ZooKeeper.md",target:"_blank",rel:"noopener noreferrer"},_={href:"https://github.com/madelson/DistributedLock/blob/master/docs/DistributedLock.FileSystem.md",target:"_blank",rel:"noopener noreferrer"},q={href:"https://github.com/madelson/DistributedLock/blob/master/docs/DistributedLock.WaitHandles.md",target:"_blank",rel:"noopener noreferrer"},S=n("h4",{id:"资料",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#资料"},[n("span",null,"资料")])],-1),x={href:"https://mp.weixin.qq.com/s/aZm42B2vmaTn74c0EkOOsg",target:"_blank",rel:"noopener noreferrer"},T=n("h3",{id:"masa分布式锁",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#masa分布式锁"},[n("span",null,"Masa分布式锁")])],-1),D=n("div",{class:"hint-container tip"},[n("p",{class:"hint-container-title"},"提示"),n("p",null,"从依赖包信息上看貌似也是依赖上面DistributedLock组件的")],-1),L=n("p",null,"比如使用redis锁，需要安装包： Masa.Contrib.Caching.Distributed.StackExchangeRedis",-1),R={href:"https://mp.weixin.qq.com/s/VtbfZ2o3QBuNfnvX7ttBcg",target:"_blank",rel:"noopener noreferrer"};function C(N,K){const a=o("ExternalLinkIcon");return c(),l("div",null,[u,n("blockquote",null,[n("p",null,[s("参考文档："),n("a",r,[s("https://mp.weixin.qq.com/s/z0SRVU1zW6WyaCTrbKJTog"),t(a)])])]),k,n("p",null,[s("DistributedLock 是一个 .NET 库，它基于各种底层技术提供强大且易于使用的分布式互斥锁、读写器锁和信号量。 仓库地址："),n("a",d,[s("https://github.com/madelson/DistributedLockopen in new window"),t(a)])]),m,n("ul",null,[n("li",null,[n("a",v,[s("DistributedLock.SqlServeropen in new window"),t(a)]),s(" ：使用 Microsoft SQL Server")]),n("li",null,[n("a",b,[s("DistributedLock.Postgresopen in new window"),t(a)]),s(" ：使用 Postgresql")]),n("li",null,[n("a",h,[s("DistributedLock.MySqlopen in new window"),t(a)]),s(" ：使用 MySQL 或 MariaDB")]),n("li",null,[n("a",g,[s("DistributedLock.Oracleopen in new window"),t(a)]),s(" ：使用 Oracle")]),n("li",null,[n("a",y,[s("DistributedLock.Redisopen in new window"),t(a)]),s(" ：使用 Redis")]),n("li",null,[n("a",w,[s("DistributedLock.Azureopen in new window"),t(a)]),s(" ：使用 Azure blob")]),n("li",null,[n("a",f,[s("DistributedLock.ZooKeeperopen in new window"),t(a)]),s(" ：使用 Apache ZooKeeper")]),n("li",null,[n("a",_,[s("DistributedLock.FileSystemopen in new window"),t(a)]),s(" : 使用锁文件")]),n("li",null,[n("a",q,[s("DistributedLock.WaitHandlesopen in new window"),t(a)]),s(" ：使用操作系统全局WaitHandles（仅限 Windows）")])]),S,n("p",null,[n("a",x,[s("https://mp.weixin.qq.com/s/aZm42B2vmaTn74c0EkOOsgopen in new window"),t(a)]),s(" | .NET开源分布式锁DistributedLock")]),T,D,L,n("p",null,[n("a",R,[s("https://mp.weixin.qq.com/s/VtbfZ2o3QBuNfnvX7ttBcgopen in new window"),t(a)]),s(" | MASA Framework的分布式锁设计")])])}const A=p(i,[["render",C],["__file","redisfenbushisuo.html.vue"]]),I=JSON.parse('{"path":"/middleware/smallService/fenbushisuo/redisfenbushisuo.html","title":"Redis分布式锁","lang":"zh-CN","frontmatter":{"title":"Redis分布式锁","lang":"zh-CN","date":"2023-10-04T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["middleware"],"tag":["无"],"filename":"redisfenbushisuo","slug":"nzefwk","docsId":"32085426","description":"实现原理 基础实现 Redis 本身可以被多个客户端共享访问，正好就是一个共享存储系统，可以用来保存分布式锁，而且 Redis 的读写性能高，可以应对高并发的锁操作场景。 Redis 的 SET 命令有个 NX 参数可以实现「key不存在才插入」，所以可以用它来实现分布式锁： 如果 key 不存在，则显示插入成功，可以用来表示加锁成功； 如果 key ...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/middleware/smallService/fenbushisuo/redisfenbushisuo.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"Redis分布式锁"}],["meta",{"property":"og:description","content":"实现原理 基础实现 Redis 本身可以被多个客户端共享访问，正好就是一个共享存储系统，可以用来保存分布式锁，而且 Redis 的读写性能高，可以应对高并发的锁操作场景。 Redis 的 SET 命令有个 NX 参数可以实现「key不存在才插入」，所以可以用它来实现分布式锁： 如果 key 不存在，则显示插入成功，可以用来表示加锁成功； 如果 key ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-12T01:48:24.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-10-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-11-12T01:48:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis分布式锁\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-10-04T00:00:00.000Z\\",\\"dateModified\\":\\"2023-11-12T01:48:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"实现原理","slug":"实现原理","link":"#实现原理","children":[{"level":3,"title":"基础实现","slug":"基础实现","link":"#基础实现","children":[]},{"level":3,"title":"续租机制","slug":"续租机制","link":"#续租机制","children":[]}]},{"level":2,"title":"容易遇到的问题","slug":"容易遇到的问题","link":"#容易遇到的问题","children":[]},{"level":2,"title":"开源组件","slug":"开源组件","link":"#开源组件","children":[{"level":3,"title":"DistributedLock","slug":"distributedlock","link":"#distributedlock","children":[{"level":4,"title":"支持","slug":"支持","link":"#支持","children":[]},{"level":4,"title":"资料","slug":"资料","link":"#资料","children":[]}]},{"level":3,"title":"Masa分布式锁","slug":"masa分布式锁","link":"#masa分布式锁","children":[]}]}],"git":{"createdTime":1697724028000,"updatedTime":1699753704000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1},{"name":"zhangyunpeng","email":"zhang.yunpeng@synyi.com","commits":1}]},"readingTime":{"minutes":5.82,"words":1745},"filePathRelative":"middleware/smallService/fenbushisuo/redisfenbushisuo.md","localizedDate":"2023年10月4日","excerpt":"<h2>实现原理</h2>\\n<h3>基础实现</h3>\\n<p>Redis 本身可以被多个客户端共享访问，正好就是一个共享存储系统，可以用来保存分布式锁，而且 Redis 的读写性能高，可以应对高并发的锁操作场景。\\nRedis 的 SET 命令有个 NX 参数可以实现「key不存在才插入」，所以可以用它来实现分布式锁：</p>\\n<ul>\\n<li>如果 key 不存在，则显示插入成功，可以用来表示加锁成功；</li>\\n<li>如果 key 存在，则会显示插入失败，可以用来表示加锁失败。</li>\\n</ul>\\n<p>SET lock_keyunique_value NX PX 10000</p>\\n<ul>\\n<li>lock_key 就是 key 键；</li>\\n<li>unique_value 是客户端生成的唯一的标识，区分来自不同客户端的锁操作；</li>\\n<li>NX 代表只在 lock_key 不存在时，才对 lock_key 进行设置操作；</li>\\n<li>PX 10000 表示设置 lock_key 的过期时间为 10s，这是为了避免客户端发生异常而无法释放锁。</li>\\n</ul>","autoDesc":true}');export{A as comp,I as data};