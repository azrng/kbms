import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,e as t}from"./app-vSdX8vi3.js";const e={},o=t(`<h2 id="目的" tabindex="-1"><a class="header-anchor" href="#目的"><span>目的</span></a></h2><p>防止事件重复触发。</p><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span>介绍</span></a></h2><p>通过 Monitor.TryEnter 我们可以尝试获取指定对象的排他锁：</p><ul><li>若对象尚未被加锁，Monitor 就成功对该对象进行加锁，并返回 True</li><li>若对象已被加锁，Monitor 就无法再加锁，返回 False</li></ul><h2 id="操作" tabindex="-1"><a class="header-anchor" href="#操作"><span>操作</span></a></h2><p>它整体的逻辑很适合来防止事件重复触发，示例代码如下：</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name"><span class="token keyword">object</span></span> _lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">object</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">FormHexagonPosition_KeyDown</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">KeyEventArgs</span> e<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">try</span> 
    <span class="token punctuation">{</span>
        <span class="token comment">// 如果 _lock 已被加锁就直接返回</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Monitor<span class="token punctuation">.</span><span class="token function">TryEnter</span><span class="token punctuation">(</span>_lock<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
        
        <span class="token comment">// 业务逻辑代码</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">finally</span> 
    <span class="token punctuation">{</span>
        Monitor<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span>_lock<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),p=[o];function c(i,l){return s(),a("div",null,p)}const d=n(e,[["render",c],["__file","monitorTryEnter.html.vue"]]),k=JSON.parse('{"path":"/dotnet/api/controllerApi/idempotent/monitorTryEnter.html","title":"Monitor.TryEnter","lang":"zh-CN","frontmatter":{"title":"Monitor.TryEnter","lang":"zh-CN","date":"2022-02-27T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dotNET"],"tag":["无"],"filename":"monitor_tryenter","slug":"ug0xg3","docsId":"67709499","description":"目的 防止事件重复触发。 介绍 通过 Monitor.TryEnter 我们可以尝试获取指定对象的排他锁： 若对象尚未被加锁，Monitor 就成功对该对象进行加锁，并返回 True 若对象已被加锁，Monitor 就无法再加锁，返回 False 操作 它整体的逻辑很适合来防止事件重复触发，示例代码如下：","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dotnet/api/controllerApi/idempotent/monitorTryEnter.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"Monitor.TryEnter"}],["meta",{"property":"og:description","content":"目的 防止事件重复触发。 介绍 通过 Monitor.TryEnter 我们可以尝试获取指定对象的排他锁： 若对象尚未被加锁，Monitor 就成功对该对象进行加锁，并返回 True 若对象已被加锁，Monitor 就无法再加锁，返回 False 操作 它整体的逻辑很适合来防止事件重复触发，示例代码如下："}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-25T09:26:24.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2022-02-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-25T09:26:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Monitor.TryEnter\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-02-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-02-25T09:26:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"目的","slug":"目的","link":"#目的","children":[]},{"level":2,"title":"介绍","slug":"介绍","link":"#介绍","children":[]},{"level":2,"title":"操作","slug":"操作","link":"#操作","children":[]}],"git":{"createdTime":1697962303000,"updatedTime":1708853184000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":0.55,"words":165},"filePathRelative":"dotnet/api/controllerApi/idempotent/monitorTryEnter.md","localizedDate":"2022年2月27日","excerpt":"<h2>目的</h2>\\n<p>防止事件重复触发。</p>\\n<h2>介绍</h2>\\n<p>通过 Monitor.TryEnter 我们可以尝试获取指定对象的排他锁：</p>\\n<ul>\\n<li>若对象尚未被加锁，Monitor 就成功对该对象进行加锁，并返回 True</li>\\n<li>若对象已被加锁，Monitor 就无法再加锁，返回 False</li>\\n</ul>\\n<h2>操作</h2>\\n<p>它整体的逻辑很适合来防止事件重复触发，示例代码如下：</p>\\n<div class=\\"language-csharp\\" data-ext=\\"cs\\" data-title=\\"cs\\"><pre class=\\"language-csharp\\"><code><span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">readonly</span> <span class=\\"token class-name\\"><span class=\\"token keyword\\">object</span></span> _lock <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token constructor-invocation class-name\\"><span class=\\"token keyword\\">object</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">private</span> <span class=\\"token return-type class-name\\"><span class=\\"token keyword\\">void</span></span> <span class=\\"token function\\">FormHexagonPosition_KeyDown</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\"><span class=\\"token keyword\\">object</span></span> sender<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">KeyEventArgs</span> e<span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">try</span> \\n    <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token comment\\">// 如果 _lock 已被加锁就直接返回</span>\\n        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">!</span>Monitor<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">TryEnter</span><span class=\\"token punctuation\\">(</span>_lock<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">return</span><span class=\\"token punctuation\\">;</span>\\n        \\n        <span class=\\"token comment\\">// 业务逻辑代码</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token keyword\\">finally</span> \\n    <span class=\\"token punctuation\\">{</span>\\n        Monitor<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Exit</span><span class=\\"token punctuation\\">(</span>_lock<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,k as data};