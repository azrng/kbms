import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as e,d as t}from"./app-HmxoaDfj.js";const a={},n=t('<h2 id="持久化" tabindex="-1"><a class="header-anchor" href="#持久化"><span>持久化</span></a></h2><div class="language-c# line-numbers-mode" data-highlighter="shiki" data-ext="c#" data-title="c#" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">channel</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">QueueDeclare</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">queue</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;task_queue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">durable</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">exclusive</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">autoDelete</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">arguments</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>设置是否持久化，如果设置为false，那么关闭服务再打开服务，那么队列会消息，如果设置了持久化，那么关闭服务开启服务，甚至电脑关机该队列都存在。</p><h2 id="persistentchannel-timed-out" tabindex="-1"><a class="header-anchor" href="#persistentchannel-timed-out"><span>PersistentChannel timed out</span></a></h2><p>如果出现错误：System.TimeoutException: The operation requested on PersistentChannel timed out 原因是：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>var bus = RabbitHutch.CreateBus(&quot;host=localhost;username=guest;password=guest&quot;);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>这里面=必须直接接值，不能有空格</p><p>netcore使用rabbit <a href="https://www.cnblogs.com/stulzq/p/7551819.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/stulzq/p/7551819.html</a></p>',8),h=[n];function l(r,p){return e(),s("div",null,h)}const o=i(a,[["render",l],["__file","shiyongzongjie.html.vue"]]),g=JSON.parse('{"path":"/middleware/xiaoxiduilie/rabbitmq/shiyongzongjie.html","title":"使用总结","lang":"zh-CN","frontmatter":{"title":"使用总结","lang":"zh-CN","date":"2021-05-14T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["middleware"],"tag":["无"],"filename":"shiyongzongjie","slug":"ufr8ks","docsId":"29411611","description":"持久化 设置是否持久化，如果设置为false，那么关闭服务再打开服务，那么队列会消息，如果设置了持久化，那么关闭服务开启服务，甚至电脑关机该队列都存在。 PersistentChannel timed out 如果出现错误：System.TimeoutException: The operation requested on PersistentCha...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/middleware/xiaoxiduilie/rabbitmq/shiyongzongjie.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"使用总结"}],["meta",{"property":"og:description","content":"持久化 设置是否持久化，如果设置为false，那么关闭服务再打开服务，那么队列会消息，如果设置了持久化，那么关闭服务开启服务，甚至电脑关机该队列都存在。 PersistentChannel timed out 如果出现错误：System.TimeoutException: The operation requested on PersistentCha..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-09T14:03:12.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2021-05-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-05-09T14:03:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用总结\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-05-14T00:00:00.000Z\\",\\"dateModified\\":\\"2024-05-09T14:03:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"持久化","slug":"持久化","link":"#持久化","children":[]},{"level":2,"title":"PersistentChannel timed out","slug":"persistentchannel-timed-out","link":"#persistentchannel-timed-out","children":[]}],"git":{"createdTime":1697724028000,"updatedTime":1715263392000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":2}]},"readingTime":{"minutes":0.52,"words":155},"filePathRelative":"middleware/xiaoxiduilie/rabbitmq/shiyongzongjie.md","localizedDate":"2021年5月14日","excerpt":"<h2>持久化</h2>\\n<div class=\\"language-c# line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"c#\\" data-title=\\"c#\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">channel</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">QueueDeclare</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E5C07B\\">queue</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">: </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">\\"task_queue\\"</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">, </span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E5C07B\\">durable</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">: </span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">true</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">, </span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E5C07B\\">exclusive</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">: </span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">false</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">, </span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E5C07B\\">autoDelete</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">: </span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">false</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">, </span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E5C07B\\">arguments</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">: </span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">null</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">);</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{o as comp,g as data};