import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as s,d as a}from"./app-CF6xeyXt.js";const t="/kbms/common/1693647762970-f0972e02-0fe1-4cf6-be9e-46acc40276ad.png",n={},r=a(`<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2><p>QrCodeGenerator 是开源的 .NET 二维码生成库，它支持从文本字符串和字节数组生成二维码图片。 这个库是基于 .NET Standard 2.0 构建的，所以它可以在大多数现代 .NET 平台（.NET Core、.NET Framework、Mono 等）上运行，包括 .NET 6, .NET 7。</p><p>仓库地址：<a href="https://github.com/manuelbl/QrCodeGenerator" target="_blank" rel="noopener noreferrer">https://github.com/manuelbl/QrCodeGenerator</a></p><h2 id="操作" tabindex="-1"><a class="header-anchor" href="#操作"><span>操作</span></a></h2><p>1、通过 Nuget 安装 Net.Codecrete.QrCodeGenerator。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>Install-Package Net.Codecrete.QrCodeGenerator -Version 2.0.3</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>在程序中添加下面的代码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>var text = &quot;https://dotnet.microsoft.com&quot;; </span></span>
<span class="line"><span>var qr = QrCode.EncodeText(text, QrCode.Ecc.Medium);</span></span>
<span class="line"><span>string svg = qr.ToSvgString(4);</span></span>
<span class="line"><span>File.WriteAllText(&quot;qrcode.svg&quot;, svg, Encoding.UTF8);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行后，程序会生成下面的二维码。</p><p>QrCode.Ecc.Medium 用来配置纠错级别。比如设置为 QrCode.Ecc.High 时，代表二维码损坏 30% 以下，还是可以正常识别的。 另外 Medium 是 15%, Low 是 7%。另外还支持设置前景和背景颜色, 下面的就变成绿码了。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">var</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> text</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;https://dotnet.microsoft.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;  </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">var</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> qr</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> QrCode.EncodeText</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">text,</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> QrCode.Ecc.High</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">string</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> svg</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> qr.ToSvgString</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">4,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">&quot;green&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">&quot;white&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">File.WriteAllText(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">&quot;qrcode.svg&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> svg,</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> Encoding.UTF8</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成 PNG 格式的二维码从 .NET 6 开始，System.Drawing 只在 Windows 操作系统上支持，所以对于 Linux 平台，就要另寻辟径了。 好在作者提供了解决方案，灵活地以扩展方法的形式提供了三个选项。 1、选择下面任一个图像库 2、安装 对应的 Nuget 包 3、把 QrCodeBitmapExtensions.cs 文件复制到您的项目中 <img src="`+t+`" alt="" loading="lazy"> 使用这些扩展方法，生成 PNG 图像非常简单：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>var text = &quot;https://dotnet.microsoft.com&quot;;  </span></span>
<span class="line"><span>var qr = QrCode.EncodeText(text, QrCode.Ecc.High);  </span></span>
<span class="line"><span>qr.SaveAsPng(&quot;qrcode.png&quot;, 10, 3, </span></span>
<span class="line"><span>    foreground:SKColor.Parse(&quot;#45aae5&quot;),</span></span>
<span class="line"><span>    background:SKColor.Parse(&quot;#ffffff&quot;)</span></span>
<span class="line"><span>);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),l=[r];function o(d,h){return s(),i("div",null,l)}const g=e(n,[["render",o],["__file","qrcodegenerator.html.vue"]]),k=JSON.parse('{"path":"/middleware/tuxiangchuli/qrcodegenerator.html","title":"QrCodeGenerator","lang":"zh-CN","frontmatter":{"title":"QrCodeGenerator","lang":"zh-CN","date":"2023-09-02T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["middleware"],"tag":["无"],"filename":"qrcodegenerator","slug":"qbohg24z5uggdmmk","docsId":"138121173","description":"概述 QrCodeGenerator 是开源的 .NET 二维码生成库，它支持从文本字符串和字节数组生成二维码图片。 这个库是基于 .NET Standard 2.0 构建的，所以它可以在大多数现代 .NET 平台（.NET Core、.NET Framework、Mono 等）上运行，包括 .NET 6, .NET 7。 仓库地址：https://g...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/middleware/tuxiangchuli/qrcodegenerator.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"QrCodeGenerator"}],["meta",{"property":"og:description","content":"概述 QrCodeGenerator 是开源的 .NET 二维码生成库，它支持从文本字符串和字节数组生成二维码图片。 这个库是基于 .NET Standard 2.0 构建的，所以它可以在大多数现代 .NET 平台（.NET Core、.NET Framework、Mono 等）上运行，包括 .NET 6, .NET 7。 仓库地址：https://g..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://azrng.gitee.io/kbms/kbms/common/1693647762970-f0972e02-0fe1-4cf6-be9e-46acc40276ad.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-19T14:00:28.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-09-02T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-19T14:00:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"QrCodeGenerator\\",\\"image\\":[\\"https://azrng.gitee.io/kbms/kbms/common/1693647762970-f0972e02-0fe1-4cf6-be9e-46acc40276ad.png\\"],\\"datePublished\\":\\"2023-09-02T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-19T14:00:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"操作","slug":"操作","link":"#操作","children":[]}],"git":{"createdTime":1697724028000,"updatedTime":1697724028000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":1.31,"words":393},"filePathRelative":"middleware/tuxiangchuli/qrcodegenerator.md","localizedDate":"2023年9月2日","excerpt":"<h2>概述</h2>\\n<p>QrCodeGenerator 是开源的 .NET 二维码生成库，它支持从文本字符串和字节数组生成二维码图片。\\n这个库是基于 .NET Standard 2.0 构建的，所以它可以在大多数现代 .NET 平台（.NET Core、.NET Framework、Mono 等）上运行，包括 .NET 6, .NET 7。</p>\\n<p>仓库地址：<a href=\\"https://github.com/manuelbl/QrCodeGenerator\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://github.com/manuelbl/QrCodeGenerator</a></p>","autoDesc":true}');export{g as comp,k as data};