import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,d as e}from"./app-HmxoaDfj.js";const t={},n=e(`<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span>介绍</span></a></h2><p>支持使用 <a href="https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2Fredis%2Fredis-om-spring" target="_blank" rel="noopener noreferrer">LINQ</a> 查询 Redis 域对象</p><h3 id="安装redis" tabindex="-1"><a class="header-anchor" href="#安装redis"><span>安装redis</span></a></h3><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">docker</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> run</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">p</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 6379</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">6379</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> redislabs</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;">redismod</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">preview</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="操作" tabindex="-1"><a class="header-anchor" href="#操作"><span>操作</span></a></h2><p>没有查询到数据</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> provider</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> RedisConnectionProvider</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;redis://localhost:6379&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">           </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> connection</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> provider</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Connection</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//只执行一次</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">// connection.CreateIndex(typeof(Customer));</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> customers</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> provider</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">RedisCollection</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">Customer</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//customers.Insert(new Customer</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//    Age = 1,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//    Email = &quot;bbb&quot;,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//    FirstName = &quot;aaa&quot;,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//    LastName = &quot;bbb&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//});</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//customers.Save();</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> bb</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> customers</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">Where</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">x</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> x</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">LastName</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> ==</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;e&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">Select</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">x</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> x</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">FirstName</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文档" tabindex="-1"><a class="header-anchor" href="#参考文档"><span>参考文档</span></a></h2><p>github：<a href="https://github.com/redis/redis-om-dotnet" target="_blank" rel="noopener noreferrer">https://github.com/redis/redis-om-dotnet</a></p>`,9),h=[n];function l(r,k){return a(),s("div",null,h)}const o=i(t,[["render",l],["__file","redisom.html.vue"]]),c=JSON.parse('{"path":"/dataBase/redis/zujian/redisom.html","title":"RedisOM","lang":"zh-CN","frontmatter":{"title":"RedisOM","lang":"zh-CN","date":"2022-03-04T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dataBase"],"tag":["无"],"filename":"redisom","slug":"lnrwk3","docsId":"61529328","description":"介绍 支持使用 LINQ 查询 Redis 域对象 安装redis 操作 没有查询到数据 参考文档 github：https://github.com/redis/redis-om-dotnet","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dataBase/redis/zujian/redisom.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"RedisOM"}],["meta",{"property":"og:description","content":"介绍 支持使用 LINQ 查询 Redis 域对象 安装redis 操作 没有查询到数据 参考文档 github：https://github.com/redis/redis-om-dotnet"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-23T15:53:24.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2022-03-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-23T15:53:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"RedisOM\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-03-04T00:00:00.000Z\\",\\"dateModified\\":\\"2023-09-23T15:53:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"介绍","slug":"介绍","link":"#介绍","children":[{"level":3,"title":"安装redis","slug":"安装redis","link":"#安装redis","children":[]}]},{"level":2,"title":"操作","slug":"操作","link":"#操作","children":[]},{"level":2,"title":"参考文档","slug":"参考文档","link":"#参考文档","children":[]}],"git":{"createdTime":1695484404000,"updatedTime":1695484404000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":0.45,"words":134},"filePathRelative":"dataBase/redis/zujian/redisom.md","localizedDate":"2022年3月4日","excerpt":"<h2>介绍</h2>\\n<p>支持使用 <a href=\\"https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2Fredis%2Fredis-om-spring\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">LINQ</a> 查询 Redis 域对象</p>\\n<h3>安装redis</h3>\\n<div class=\\"language-csharp line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"csharp\\" data-title=\\"csharp\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">docker</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\"> run</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> -</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">p</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\"> 6379</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#ABB2BF\\">:</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">6379</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\"> redislabs</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">/</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E06C75\\">redismod</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">:</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">preview</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{o as comp,c as data};