import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as p,o,c,a as n,b as s,d as t,e as i}from"./app-vSdX8vi3.js";const l={},u=n("h2",{id:"fusioncache",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#fusioncache"},[n("span",null,"FusionCache")])],-1),r=n("p",null,"FusionCache 是一款易于使用、快速且强大的缓存，具有高级弹性功能和可选的分布式第二级缓存。",-1),k=n("p",null,"它是在处理各种不同类型的缓存多年后诞生的：内存缓存、分布式缓存、http 缓存、CDN、浏览器缓存、离线缓存，应有尽有。",-1),d=n("p",null,"仓库地址：https://github.com/ZiggyCreatures/FusionCache",-1),m=n("h2",{id:"easycaching",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#easycaching"},[n("span",null,"EasyCaching")])],-1),v=n("p",null,"EasyCaching 是一个开源的缓存库，包含了缓存的基本用法和一些高级用法，可以帮助我们更轻松的处理缓存！",-1),g={href:"https://github.com/dotnetcore/EasyCaching",target:"_blank",rel:"noopener noreferrer"},h=i(`<h3 id="项目特色" tabindex="-1"><a class="header-anchor" href="#项目特色"><span>项目特色</span></a></h3><p>1、统一缓存接口：方便我们随时调整缓存策略； 2、支持多种缓存：可以满足我们多种业务场景； 3、支持多种缓存系列化：BinaryFormatter、Newtonsoft.Json，MessagePack和Protobuf； 4、支持缓存AOP：able, put，evict，可以简化我们的代码量； 5、多实例支持； 6、支持Diagnostics：方便我们跟踪定位； 7、针对Redis支持特殊Provider：比如原子递增递减的操作等等； 8、二级缓存。</p><h3 id="操作" tabindex="-1"><a class="header-anchor" href="#操作"><span>操作</span></a></h3><h4 id="基本操作" tabindex="-1"><a class="header-anchor" href="#基本操作"><span>基本操作</span></a></h4><p>在Startup.cs，配置缓存</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ConfigureServices</span><span class="token punctuation">(</span><span class="token class-name">IServiceCollection</span> services<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token range operator">..</span><span class="token range operator">..</span><span class="token range operator">..</span>
    services<span class="token punctuation">.</span><span class="token function">AddEasyCaching</span><span class="token punctuation">(</span>option <span class="token operator">=&gt;</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//内存缓存：default</span>
        option<span class="token punctuation">.</span><span class="token function">UseInMemory</span><span class="token punctuation">(</span><span class="token string">&quot;default&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//内存缓存：cus</span>
        option<span class="token punctuation">.</span><span class="token function">UseInMemory</span><span class="token punctuation">(</span><span class="token string">&quot;cus&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//redis缓存：redis1</span>
        option<span class="token punctuation">.</span><span class="token function">UseRedis</span><span class="token punctuation">(</span>config <span class="token operator">=&gt;</span>
        <span class="token punctuation">{</span>
            config<span class="token punctuation">.</span>DBConfig<span class="token punctuation">.</span>Endpoints<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ServerEndPoint</span><span class="token punctuation">(</span><span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span> <span class="token number">6379</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            config<span class="token punctuation">.</span>DBConfig<span class="token punctuation">.</span>SyncTimeout <span class="token operator">=</span> <span class="token number">10000</span><span class="token punctuation">;</span>
            config<span class="token punctuation">.</span>DBConfig<span class="token punctuation">.</span>AsyncTimeout <span class="token operator">=</span> <span class="token number">10000</span><span class="token punctuation">;</span>
            config<span class="token punctuation">.</span>SerializerName <span class="token operator">=</span> <span class="token string">&quot;mymsgpack&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&quot;redis1&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">WithMessagePack</span><span class="token punctuation">(</span><span class="token string">&quot;mymsgpack&quot;</span><span class="token punctuation">)</span><span class="token comment">//with messagepack serialization</span>
        <span class="token punctuation">;</span>

        <span class="token comment">//redis缓存：redis2</span>
        option<span class="token punctuation">.</span><span class="token function">UseRedis</span><span class="token punctuation">(</span>config <span class="token operator">=&gt;</span>
        <span class="token punctuation">{</span>
            config<span class="token punctuation">.</span>DBConfig<span class="token punctuation">.</span>Endpoints<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">ServerEndPoint</span><span class="token punctuation">(</span><span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span> <span class="token number">6380</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&quot;redis2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//sqlite缓存</span>
        option<span class="token punctuation">.</span><span class="token function">UseSQLite</span><span class="token punctuation">(</span>config <span class="token operator">=&gt;</span>
        <span class="token punctuation">{</span>
            config<span class="token punctuation">.</span>DBConfig <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SQLiteDBOptions</span> <span class="token punctuation">{</span> FileName <span class="token operator">=</span> <span class="token string">&quot;my.db&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//memcached 缓存</span>
        option<span class="token punctuation">.</span><span class="token function">UseMemcached</span><span class="token punctuation">(</span>config <span class="token operator">=&gt;</span>
        <span class="token punctuation">{</span>
            config<span class="token punctuation">.</span>DBConfig<span class="token punctuation">.</span><span class="token function">AddServer</span><span class="token punctuation">(</span><span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span> <span class="token number">11211</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        option<span class="token punctuation">.</span><span class="token function">UseMemcached</span><span class="token punctuation">(</span>Configuration<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//fasterKv缓存</span>
        option<span class="token punctuation">.</span><span class="token function">UseFasterKv</span><span class="token punctuation">(</span>config <span class="token operator">=&gt;</span>
        <span class="token punctuation">{</span>
            config<span class="token punctuation">.</span>SerializerName <span class="token operator">=</span> <span class="token string">&quot;msg&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">WithMessagePack</span><span class="token punctuation">(</span><span class="token string">&quot;msg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用方法</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CusController</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Controller</span></span>
<span class="token punctuation">{</span>
    <span class="token comment">//缓存</span>
    <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name">IEasyCachingProviderFactory</span> _factory<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token function">CusController</span><span class="token punctuation">(</span><span class="token class-name">IEasyCachingProviderFactory</span> factory<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_factory <span class="token operator">=</span> factory<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// GET api/cus/inmem?name=Default</span>
    <span class="token punctuation">[</span>HttpGet<span class="token punctuation">]</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Route</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;inmem&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">Get</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name <span class="token operator">=</span> EasyCachingConstValue<span class="token punctuation">.</span>DefaultInMemoryName<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//根据name，获取缓存实例</span>
        <span class="token class-name"><span class="token keyword">var</span></span> provider <span class="token operator">=</span> _factory<span class="token punctuation">.</span><span class="token function">GetCachingProvider</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">var</span></span> val <span class="token operator">=</span> name<span class="token punctuation">.</span><span class="token function">Equals</span><span class="token punctuation">(</span><span class="token string">&quot;cus&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">?</span> <span class="token string">&quot;cus&quot;</span> <span class="token punctuation">:</span> <span class="token string">&quot;default&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">var</span></span> res <span class="token operator">=</span> provider<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;demo&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> val<span class="token punctuation">,</span> TimeSpan<span class="token punctuation">.</span><span class="token function">FromMinutes</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token interpolation-string"><span class="token string">$&quot;cached value : </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">res</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token range operator">..</span><span class="token range operator">..</span><span class="token range operator">..</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ResponseCache缓存</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">ResponseCache</span><span class="token attribute-arguments"><span class="token punctuation">(</span>Duration <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">,</span> VaryByQueryKeys <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token string">&quot;page&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name">IActionResult</span> <span class="token function">List</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> page <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token keyword">return</span> <span class="token function">Content</span><span class="token punctuation">(</span>page<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Aop缓存</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">EasyCachingAble</span><span class="token attribute-arguments"><span class="token punctuation">(</span>Expiration <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetCurrentUtcTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">EasyCachingPut</span><span class="token attribute-arguments"><span class="token punctuation">(</span>CacheKeyPrefix <span class="token operator">=</span> <span class="token string">&quot;Castle&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">PutSomething</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> str<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">EasyCachingEvict</span><span class="token attribute-arguments"><span class="token punctuation">(</span>IsBefore <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DeleteSomething</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料"><span>参考资料</span></a></h2>`,13),b={href:"https://mp.weixin.qq.com/s/WK-LLmv6ifBIRhQkJLensg",target:"_blank",rel:"noopener noreferrer"};function y(f,C){const a=p("ExternalLinkIcon");return o(),c("div",null,[u,r,k,d,m,v,n("p",null,[s("仓库地址："),n("a",g,[s("https://github.com/dotnetcore/EasyCaching"),t(a)])]),h,n("p",null,[s("开源缓存中间件："),n("a",b,[s("https://mp.weixin.qq.com/s/WK-LLmv6ifBIRhQkJLensg"),t(a)])])])}const w=e(l,[["render",y],["__file","commonNuget.html.vue"]]),E=JSON.parse('{"path":"/dotnet/base/huancun/commonNuget.html","title":"开源Nuget包","lang":"zh-CN","frontmatter":{"title":"开源Nuget包","lang":"zh-CN","date":"2023-04-02T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dotNET"],"tag":["无"],"filename":"easycaching","slug":"uxycrozf3xugtb7d","docsId":"120402664","description":"FusionCache FusionCache 是一款易于使用、快速且强大的缓存，具有高级弹性功能和可选的分布式第二级缓存。 它是在处理各种不同类型的缓存多年后诞生的：内存缓存、分布式缓存、http 缓存、CDN、浏览器缓存、离线缓存，应有尽有。 仓库地址：https://github.com/ZiggyCreatures/FusionCache Ea...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dotnet/base/huancun/commonNuget.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"开源Nuget包"}],["meta",{"property":"og:description","content":"FusionCache FusionCache 是一款易于使用、快速且强大的缓存，具有高级弹性功能和可选的分布式第二级缓存。 它是在处理各种不同类型的缓存多年后诞生的：内存缓存、分布式缓存、http 缓存、CDN、浏览器缓存、离线缓存，应有尽有。 仓库地址：https://github.com/ZiggyCreatures/FusionCache Ea..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-07T02:59:06.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-04-02T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-07T02:59:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"开源Nuget包\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-04-02T00:00:00.000Z\\",\\"dateModified\\":\\"2024-04-07T02:59:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"FusionCache","slug":"fusioncache","link":"#fusioncache","children":[]},{"level":2,"title":"EasyCaching","slug":"easycaching","link":"#easycaching","children":[{"level":3,"title":"项目特色","slug":"项目特色","link":"#项目特色","children":[]},{"level":3,"title":"操作","slug":"操作","link":"#操作","children":[{"level":4,"title":"基本操作","slug":"基本操作","link":"#基本操作","children":[]}]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1697962303000,"updatedTime":1712458746000,"contributors":[{"name":"zhangyunpeng","email":"zhang.yunpeng@synyi.com","commits":1}]},"readingTime":{"minutes":1.72,"words":517},"filePathRelative":"dotnet/base/huancun/commonNuget.md","localizedDate":"2023年4月2日","excerpt":"<h2>FusionCache</h2>\\n<p>FusionCache 是一款易于使用、快速且强大的缓存，具有高级弹性功能和可选的分布式第二级缓存。</p>\\n<p>它是在处理各种不同类型的缓存多年后诞生的：内存缓存、分布式缓存、http 缓存、CDN、浏览器缓存、离线缓存，应有尽有。</p>\\n<p>仓库地址：https://github.com/ZiggyCreatures/FusionCache</p>\\n<h2>EasyCaching</h2>\\n<p>EasyCaching 是一个开源的缓存库，包含了缓存的基本用法和一些高级用法，可以帮助我们更轻松的处理缓存！</p>\\n<p>仓库地址：<a href=\\"https://github.com/dotnetcore/EasyCaching\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://github.com/dotnetcore/EasyCaching</a></p>","autoDesc":true}');export{w as comp,E as data};