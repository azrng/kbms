import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as t,d as a}from"./app-mrI7cTrN.js";const s={},r=a('<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span>介绍</span></a></h2><p>IdHelper是一个.NET（支持.NET45+或.NET Standard2+）生成分布式趋势自增Id组件，有两个版本：原始版为基于雪花Id方案，需要手动管理设置WorkerId；完美版在原始版的基础上使用Zookeeper来解决原始版中的WorkerId的分配问题和时间回拨问题。</p><p>原始版安装方式：Nuget安装IdHelper即可 完美版安装方式：Nuget安装IdHelper.Zookeeper即可 github：<a href="https://github.com/Coldairarrow/IdHelper" target="_blank" rel="noopener noreferrer">https://github.com/Coldairarrow/IdHelper</a></p><h2 id="操作" tabindex="-1"><a class="header-anchor" href="#操作"><span>操作</span></a></h2><h3 id="原始版" tabindex="-1"><a class="header-anchor" href="#原始版"><span>原始版</span></a></h3><p>引用组件</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">PackageReference</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> Include</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;IdHelper&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> Version</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;1.4.1&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> /&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>配置服务</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> IdHelperBootstrapper</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">SetWorkderId</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">workId</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">Boot</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//workId是机器码</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>获取ID</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> id</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> IdHelper</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">GetLongId</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>',11),d=[r];function l(h,n){return t(),i("div",null,d)}const k=e(s,[["render",l],["__file","idhelperxuehuaid.html.vue"]]),c=JSON.parse('{"path":"/middleware/identityId/idhelperxuehuaid.html","title":"IdHelper雪花Id","lang":"zh-CN","frontmatter":{"title":"IdHelper雪花Id","lang":"zh-CN","date":"2023-08-08T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["middleware"],"tag":["无"],"filename":"idhelperxuehuaid","slug":"av22d6","docsId":"65978806","description":"介绍 IdHelper是一个.NET（支持.NET45+或.NET Standard2+）生成分布式趋势自增Id组件，有两个版本：原始版为基于雪花Id方案，需要手动管理设置WorkerId；完美版在原始版的基础上使用Zookeeper来解决原始版中的WorkerId的分配问题和时间回拨问题。 原始版安装方式：Nuget安装IdHelper即可 完美版安...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/middleware/identityId/idhelperxuehuaid.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"IdHelper雪花Id"}],["meta",{"property":"og:description","content":"介绍 IdHelper是一个.NET（支持.NET45+或.NET Standard2+）生成分布式趋势自增Id组件，有两个版本：原始版为基于雪花Id方案，需要手动管理设置WorkerId；完美版在原始版的基础上使用Zookeeper来解决原始版中的WorkerId的分配问题和时间回拨问题。 原始版安装方式：Nuget安装IdHelper即可 完美版安..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-19T14:00:28.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-08-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-19T14:00:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"IdHelper雪花Id\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-08-08T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-19T14:00:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"介绍","slug":"介绍","link":"#介绍","children":[]},{"level":2,"title":"操作","slug":"操作","link":"#操作","children":[{"level":3,"title":"原始版","slug":"原始版","link":"#原始版","children":[]}]}],"git":{"createdTime":1697724028000,"updatedTime":1697724028000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":0.61,"words":182},"filePathRelative":"middleware/identityId/idhelperxuehuaid.md","localizedDate":"2023年8月8日","excerpt":"<h2>介绍</h2>\\n<p>IdHelper是一个.NET（支持.NET45+或.NET Standard2+）生成分布式趋势自增Id组件，有两个版本：原始版为基于雪花Id方案，需要手动管理设置WorkerId；完美版在原始版的基础上使用Zookeeper来解决原始版中的WorkerId的分配问题和时间回拨问题。</p>\\n<p>原始版安装方式：Nuget安装IdHelper即可\\n完美版安装方式：Nuget安装IdHelper.Zookeeper即可\\ngithub：<a href=\\"https://github.com/Coldairarrow/IdHelper\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://github.com/Coldairarrow/IdHelper</a></p>","autoDesc":true}');export{k as comp,c as data};