import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as t,o as p,c as o,a as n,b as s,d as c,e as i}from"./app-vSdX8vi3.js";const l={},u=i(`<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span>介绍</span></a></h2><p>支持设置权重的队列</p><h2 id="操作" tabindex="-1"><a class="header-anchor" href="#操作"><span>操作</span></a></h2><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Basic</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PriorityQueue<span class="token punctuation">&lt;</span><span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//入队 添加元素</span>
    queue<span class="token punctuation">.</span><span class="token function">EnqueueDequeue</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//返回第一个元素，如果不存在报错</span>
    <span class="token class-name"><span class="token keyword">var</span></span> lookIeam <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">Peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 出队 获取最小的元素</span>
    <span class="token class-name"><span class="token keyword">var</span></span> bb <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">Dequeue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//出队  尝试获取最小的元素，如果不存在返回null</span>
    <span class="token comment">//queue.TryDequeue(out var cc, out var dd);</span>

    <span class="token comment">//设置队列最小容量 如果超出直接2倍扩容</span>
    <span class="token class-name"><span class="token keyword">var</span></span> aa <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">EnsureCapacity</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2>`,5),r={href:"https://docs.microsoft.com/zh-cn/dotnet/api/system.collections.generic.priorityqueue-2?view=net-6.0",target:"_blank",rel:"noopener noreferrer"};function k(d,m){const a=t("ExternalLinkIcon");return p(),o("div",null,[u,n("p",null,[s("API："),n("a",r,[s("https://docs.microsoft.com/zh-cn/dotnet/api/system.collections.generic.priorityqueue-2?view=net-6.0"),c(a)])])])}const y=e(l,[["render",k],["__file","priorityqueue.html.vue"]]),b=JSON.parse('{"path":"/dotnet/csharp/queue/priorityqueue.html","title":"PriorityQueue","lang":"zh-CN","frontmatter":{"title":"PriorityQueue","lang":"zh-CN","date":"2023-10-22T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["csharp"],"tag":["无"],"filename":"priorityqueue","slug":"ews0xr","docsId":"77867851","description":"介绍 支持设置权重的队列 操作 资料 API：https://docs.microsoft.com/zh-cn/dotnet/api/system.collections.generic.priorityqueue-2?view=net-6.0","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dotnet/csharp/queue/priorityqueue.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"PriorityQueue"}],["meta",{"property":"og:description","content":"介绍 支持设置权重的队列 操作 资料 API：https://docs.microsoft.com/zh-cn/dotnet/api/system.collections.generic.priorityqueue-2?view=net-6.0"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-31T13:30:26.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-10-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-31T13:30:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"PriorityQueue\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-10-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-31T13:30:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"介绍","slug":"介绍","link":"#介绍","children":[]},{"level":2,"title":"操作","slug":"操作","link":"#操作","children":[]},{"level":2,"title":"资料","slug":"资料","link":"#资料","children":[]}],"git":{"createdTime":1700232644000,"updatedTime":1711891826000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":0.52,"words":156},"filePathRelative":"dotnet/csharp/queue/priorityqueue.md","localizedDate":"2023年10月22日","excerpt":"<h2>介绍</h2>\\n<p>支持设置权重的队列</p>\\n<h2>操作</h2>\\n<div class=\\"language-csharp\\" data-ext=\\"cs\\" data-title=\\"cs\\"><pre class=\\"language-csharp\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token return-type class-name\\"><span class=\\"token keyword\\">void</span></span> <span class=\\"token function\\">Basic</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\"><span class=\\"token keyword\\">var</span></span> queue <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token constructor-invocation class-name\\">PriorityQueue<span class=\\"token punctuation\\">&lt;</span><span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">//入队 添加元素</span>\\n    queue<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">EnqueueDequeue</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">10</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">//返回第一个元素，如果不存在报错</span>\\n    <span class=\\"token class-name\\"><span class=\\"token keyword\\">var</span></span> lookIeam <span class=\\"token operator\\">=</span> queue<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Peek</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">// 出队 获取最小的元素</span>\\n    <span class=\\"token class-name\\"><span class=\\"token keyword\\">var</span></span> bb <span class=\\"token operator\\">=</span> queue<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Dequeue</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">//出队  尝试获取最小的元素，如果不存在返回null</span>\\n    <span class=\\"token comment\\">//queue.TryDequeue(out var cc, out var dd);</span>\\n\\n    <span class=\\"token comment\\">//设置队列最小容量 如果超出直接2倍扩容</span>\\n    <span class=\\"token class-name\\"><span class=\\"token keyword\\">var</span></span> aa <span class=\\"token operator\\">=</span> queue<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">EnsureCapacity</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">10</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{y as comp,b as data};