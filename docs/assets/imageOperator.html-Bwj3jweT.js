import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as e,d as a}from"./app-HmxoaDfj.js";const n={},t=a(`<h2 id="阿里云镜像源" tabindex="-1"><a class="header-anchor" href="#阿里云镜像源"><span>阿里云镜像源</span></a></h2><h3 id="打包推送步骤" tabindex="-1"><a class="header-anchor" href="#打包推送步骤"><span>打包推送步骤</span></a></h3><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> tag</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 2c61462bc771</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> registry.cn-hangzhou.aliyuncs.com/zrng/test:0.0.1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 推送镜像</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> push</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> registry.cn-hangzhou.aliyuncs.com/zrng/test:0.0.1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 拉取镜像</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> pull</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> registry.cn-hangzhou.aliyuncs.com/zrng/test:0.0.1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试镜像" tabindex="-1"><a class="header-anchor" href="#测试镜像"><span>测试镜像</span></a></h3><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 连接sqlserver2008的内容</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">registry.cn-hangzhou.aliyuncs.com/zrng/test:0.0.1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># NetByDocker测试，依赖一个数据库</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">registry.cn-hangzhou.aliyuncs.com/zrng/test:0.0.2</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 可观测性追踪</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),l=[t];function h(r,p){return e(),s("div",null,l)}const k=i(n,[["render",h],["__file","imageOperator.html.vue"]]),o=JSON.parse('{"path":"/temp/imageOperator.html","title":"镜像操作","lang":"zh-CN","frontmatter":{"title":"镜像操作","lang":"zh-CN","date":"2023-11-25T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["cloud"],"tag":["images"],"article":false,"description":"阿里云镜像源 打包推送步骤 测试镜像","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/temp/imageOperator.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"镜像操作"}],["meta",{"property":"og:description","content":"阿里云镜像源 打包推送步骤 测试镜像"}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-02T08:43:04.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"images"}],["meta",{"property":"article:published_time","content":"2023-11-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-02T08:43:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"镜像操作\\",\\"description\\":\\"阿里云镜像源 打包推送步骤 测试镜像\\"}"]]},"headers":[{"level":2,"title":"阿里云镜像源","slug":"阿里云镜像源","link":"#阿里云镜像源","children":[{"level":3,"title":"打包推送步骤","slug":"打包推送步骤","link":"#打包推送步骤","children":[]},{"level":3,"title":"测试镜像","slug":"测试镜像","link":"#测试镜像","children":[]}]}],"git":{"createdTime":1700916639000,"updatedTime":1709368984000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":3}]},"readingTime":{"minutes":0.34,"words":101},"filePathRelative":"temp/imageOperator.md","localizedDate":"2023年11月25日","excerpt":"<h2>阿里云镜像源</h2>\\n<h3>打包推送步骤</h3>\\n<div class=\\"language-shell line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"shell\\" data-title=\\"shell\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">docker</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> tag</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> 2c61462bc771</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> registry.cn-hangzhou.aliyuncs.com/zrng/test:0.0.1</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\"># 推送镜像</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">docker</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> push</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> registry.cn-hangzhou.aliyuncs.com/zrng/test:0.0.1</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\"># 拉取镜像</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">docker</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> pull</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> registry.cn-hangzhou.aliyuncs.com/zrng/test:0.0.1</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{k as comp,o as data};