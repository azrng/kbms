import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,d as n}from"./app-mrI7cTrN.js";const t={},e=n(`<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2><p>IronPDF帮助c#软件工程师在。net项目中创建、编辑和提取PDF内容。 官网：<a href="https://ironpdf.com/" target="_blank" rel="noopener noreferrer">https://ironpdf.com/</a></p><p>最近更新：2023.06.10 下载量：6.28(2023年6月24日)</p><h2 id="操作" tabindex="-1"><a class="header-anchor" href="#操作"><span>操作</span></a></h2><h3 id="html转pdf基础操作" tabindex="-1"><a class="header-anchor" href="#html转pdf基础操作"><span>html转pdf基础操作</span></a></h3><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">// 使用IronPDF将HTML字符串转换为PDF</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> renderer</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> HtmlToPdf</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">renderer</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">PrintOptions</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">MarginTop</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">renderer</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">PrintOptions</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">MarginBottom</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">renderer</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">PrintOptions</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">MarginLeft</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">renderer</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">PrintOptions</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">MarginRight</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> pdf</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> renderer</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">RenderHtmlAsPdf</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">htmlContent</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">// 保存PDF文件</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">pdf</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">SaveAs</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;d://temp//11.pdf&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="视频教程" tabindex="-1"><a class="header-anchor" href="#视频教程"><span>视频教程</span></a></h2><p><a href="https://www.bilibili.com/video/BV1Et421G7gu?spm_id_from=333.1245.0.0" target="_blank" rel="noopener noreferrer">使用 IronPDF 和 Razor 视图在 .NET 中灵活地进行 PDF 报告</a></p>`,8),h=[e];function l(p,r){return a(),s("div",null,h)}const g=i(t,[["render",l],["__file","ironpdf.html.vue"]]),o=JSON.parse('{"path":"/middleware/office/pdf/ironpdf.html","title":"IronPdf","lang":"zh-CN","frontmatter":{"title":"IronPdf","lang":"zh-CN","date":"2023-06-24T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["middleware"],"tag":["无"],"filename":"ironpdf","slug":"ips6dsghdntdopms","docsId":"128415861","description":"概述 IronPDF帮助c#软件工程师在。net项目中创建、编辑和提取PDF内容。 官网：https://ironpdf.com/ 最近更新：2023.06.10 下载量：6.28(2023年6月24日) 操作 html转pdf基础操作 视频教程 使用 IronPDF 和 Razor 视图在 .NET 中灵活地进行 PDF 报告","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/middleware/office/pdf/ironpdf.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"IronPdf"}],["meta",{"property":"og:description","content":"概述 IronPDF帮助c#软件工程师在。net项目中创建、编辑和提取PDF内容。 官网：https://ironpdf.com/ 最近更新：2023.06.10 下载量：6.28(2023年6月24日) 操作 html转pdf基础操作 视频教程 使用 IronPDF 和 Razor 视图在 .NET 中灵活地进行 PDF 报告"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-31T02:36:37.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-06-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-31T02:36:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"IronPdf\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-06-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-31T02:36:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"操作","slug":"操作","link":"#操作","children":[{"level":3,"title":"html转pdf基础操作","slug":"html转pdf基础操作","link":"#html转pdf基础操作","children":[]}]},{"level":2,"title":"视频教程","slug":"视频教程","link":"#视频教程","children":[]}],"git":{"createdTime":1697724028000,"updatedTime":1711852597000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":2}]},"readingTime":{"minutes":0.49,"words":146},"filePathRelative":"middleware/office/pdf/ironpdf.md","localizedDate":"2023年6月24日","excerpt":"<h2>概述</h2>\\n<p>IronPDF帮助c#软件工程师在。net项目中创建、编辑和提取PDF内容。\\n官网：<a href=\\"https://ironpdf.com/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://ironpdf.com/</a></p>\\n<p>最近更新：2023.06.10\\n下载量：6.28(2023年6月24日)</p>\\n<h2>操作</h2>\\n<h3>html转pdf基础操作</h3>\\n<div class=\\"language-csharp line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"csharp\\" data-title=\\"csharp\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">// 使用IronPDF将HTML字符串转换为PDF</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">var</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E06C75\\"> renderer</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> =</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#ABB2BF\\"> new</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E5C07B\\"> HtmlToPdf</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">();</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">renderer</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">PrintOptions</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">MarginTop</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> =</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\"> 0</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">renderer</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">PrintOptions</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">MarginBottom</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> =</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\"> 0</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">renderer</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">PrintOptions</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">MarginLeft</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> =</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\"> 0</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">renderer</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">PrintOptions</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">MarginRight</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> =</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\"> 0</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">var</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E06C75\\"> pdf</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> =</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\"> renderer</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">RenderHtmlAsPdf</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">htmlContent</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">);</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">// 保存PDF文件</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">pdf</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">SaveAs</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">\\"d://temp//11.pdf\\"</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">);</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{g as comp,o as data};