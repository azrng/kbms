import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as a,d as s}from"./app-CF6xeyXt.js";const t={},n=s('<h2 id="操作" tabindex="-1"><a class="header-anchor" href="#操作"><span>操作</span></a></h2><h3 id="配置动态schema" tabindex="-1"><a class="header-anchor" href="#配置动态schema"><span>配置动态Schema</span></a></h3><p>首先在EfCore在指定表名的时候，是可以顺带指定schema的，例如</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">builder</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">ToTable</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">genericType</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Name</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">ToLower</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(), </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;sample&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>但是你修改了不起作用，是因为 EF 生成模型并仅运行一次 OnModelCreating，出于性能考虑，缓存了结果。 但是，可以挂接到模型缓存机制，使 EF 知道生成不同模型的属性。 所以就需要重写IModelCacheKeyFactory，并且要将服务替换为正确的实现； 参考资料：<a href="https://www.shuzhiduo.com/A/pRdBaDa25n/" target="_blank" rel="noopener noreferrer">https://www.shuzhiduo.com/A/pRdBaDa25n/</a></p><h2 id="shardingcore" tabindex="-1"><a class="header-anchor" href="#shardingcore"><span>ShardingCore</span></a></h2><p>仓库地址：<a href="https://github.com/Coldairarrow/EFCore.Sharding" target="_blank" rel="noopener noreferrer">https://github.com/Coldairarrow/EFCore.Sharding</a></p><p>https://mp.weixin.qq.com/s/TDW2sZHPKYRDPWlsBA-aQg | ShardingCore 如何呈现“完美”分表 https://mp.weixin.qq.com/s/Eaer-QjHz-uIkR4p5WAeXw | “ShardingCore”是如何针对分表下的分页进行优化的 https://mp.weixin.qq.com/s/wyt0uUk37D3sY6RopdZBFQ | 支持c#的分表分库组件-Ctrip DAL https://mp.weixin.qq.com/s/7wg583hqVyQNDTo3QzZ2dw | 分库分表下极致的优化 https://mp.weixin.qq.com/s/UBu03KLC3H5_clJ1sirEwA | MariaDB Spider 数据库分库分表实践 分库分表 https://mp.weixin.qq.com/s/QfidtLyBB0EeDKi-57D1fw | 分库分表之历史表如何选择最佳分片路由规则 efcore 分表 https://www.cnblogs.com/xuejiaming/p/15173965.html#!comments https://www.cnblogs.com/xuejiaming/p/15728340.html https://mp.weixin.qq.com/s/ZwhLCzVs1foBvzBdeHCwGQ | .NET 分库分表高性能：瀑布流分页</p><p>efcore如何优雅的实现按年分库按月分表https://www.cnblogs.com/xuejiaming/p/18198827</p><h2 id="参考文档" tabindex="-1"><a class="header-anchor" href="#参考文档"><span>参考文档</span></a></h2><p>具有相同DbContext的交替模型：<a href="https://learn.microsoft.com/zh-cn/ef/core/modeling/dynamic-model" target="_blank" rel="noopener noreferrer">https://learn.microsoft.com/zh-cn/ef/core/modeling/dynamic-model</a> 分库分表查询优化：<a href="https://mp.weixin.qq.com/s/S1P_gDHjDPh-Cn-8dw5jHg" target="_blank" rel="noopener noreferrer">https://mp.weixin.qq.com/s/S1P_gDHjDPh-Cn-8dw5jHg</a></p>',11),r=[n];function h(o,l){return a(),i("div",null,r)}const d=e(t,[["render",h],["__file","fenkufenbiao.html.vue"]]),m=JSON.parse('{"path":"/orm/efcore/upgrade/fenkufenbiao.html","title":"分库分表","lang":"zh-CN","frontmatter":{"title":"分库分表","lang":"zh-CN","date":"2023-04-02T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["orm"],"tag":["无"],"filename":"fenkufenbiao","slug":"nghqe3wpg0c3lhbk","docsId":"116787577","description":"操作 配置动态Schema 首先在EfCore在指定表名的时候，是可以顺带指定schema的，例如 但是你修改了不起作用，是因为 EF 生成模型并仅运行一次 OnModelCreating，出于性能考虑，缓存了结果。 但是，可以挂接到模型缓存机制，使 EF 知道生成不同模型的属性。 所以就需要重写IModelCacheKeyFactory，并且要将服务...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/orm/efcore/upgrade/fenkufenbiao.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"分库分表"}],["meta",{"property":"og:description","content":"操作 配置动态Schema 首先在EfCore在指定表名的时候，是可以顺带指定schema的，例如 但是你修改了不起作用，是因为 EF 生成模型并仅运行一次 OnModelCreating，出于性能考虑，缓存了结果。 但是，可以挂接到模型缓存机制，使 EF 知道生成不同模型的属性。 所以就需要重写IModelCacheKeyFactory，并且要将服务..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-30T14:08:37.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-04-02T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-30T14:08:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"分库分表\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-04-02T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-30T14:08:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"操作","slug":"操作","link":"#操作","children":[{"level":3,"title":"配置动态Schema","slug":"配置动态schema","link":"#配置动态schema","children":[]}]},{"level":2,"title":"ShardingCore","slug":"shardingcore","link":"#shardingcore","children":[]},{"level":2,"title":"参考文档","slug":"参考文档","link":"#参考文档","children":[]}],"git":{"createdTime":1690042937000,"updatedTime":1722348517000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":1.14,"words":341},"filePathRelative":"orm/efcore/upgrade/fenkufenbiao.md","localizedDate":"2023年4月2日","excerpt":"<h2>操作</h2>\\n<h3>配置动态Schema</h3>\\n<p>首先在EfCore在指定表名的时候，是可以顺带指定schema的，例如</p>\\n<div class=\\"language-csharp line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"csharp\\" data-title=\\"csharp\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">builder</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">ToTable</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">genericType</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">Name</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">ToLower</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(), </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">\\"sample\\"</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">);</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{d as comp,m as data};