import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,d as e}from"./app-DZ9bmjCp.js";const n={},t=e(`<h2 id="目的" tabindex="-1"><a class="header-anchor" href="#目的"><span>目的</span></a></h2><p>虽然.net项目可以执行单文件发布，但是不能将前端静态文件包含到里面，如何将wwwroot目录下的静态文件打包到exe文件内？</p><h2 id="思路" tabindex="-1"><a class="header-anchor" href="#思路"><span>思路</span></a></h2><p>默认情况下，FileProvider 是读取本地物理文件。 如果改成从 EXE 文件中读取静态文件的 FileProvider，不就实现了我们的目的了吗？！ 而实际上，.NET 已经提供了这样一个 FileProvider：ManifestEmbeddedFileProvider，用于访问嵌入在程序集中的文件。</p><h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现"><span>实现</span></a></h2><ol><li>将 Microsoft.Extensions.FileProviders.Embedded NuGet 包添加到 Web API 项目。</li><li>修改项目文件，将 GenerateEmbeddedFilesManifest 属性设置为 true，并指定嵌入的文件来源：</li></ol><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">PropertyGroup</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">    &lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">TargetFramework</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">net6</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&lt;/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">TargetFramework</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">    &lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">Nullable</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">enable</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&lt;/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">Nullable</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">    &lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">ImplicitUsings</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">enable</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&lt;/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">ImplicitUsings</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">     &lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">GenerateEmbeddedFilesManifest</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">true</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&lt;/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">GenerateEmbeddedFilesManifest</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&lt;/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">PropertyGroup</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">ItemGroup</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">    &lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">EmbeddedResource</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> Include</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;wwwroot</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">\\*</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">*&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&lt;/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">ItemGroup</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>修改program，设置静态文件中间件</li></ol><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">app</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">UseFileServer</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> FileServerOptions</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    FileProvider</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> ManifestEmbeddedFileProvider</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        typeof</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">Program</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">).</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Assembly</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;wwwroot&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">});</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>发布 Web API，将生成的独立 EXE 文件进行部署。可以看到，不依赖任何其他文件，前后端功能使用正常。</li></ol><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2><p><a href="https://mp.weixin.qq.com/s/ZV6FWLaCXoY5ZeBGWuMGZg" target="_blank" rel="noopener noreferrer">https://mp.weixin.qq.com/s/ZV6FWLaCXoY5ZeBGWuMGZg</a> | 如何打造单文件前后端集成 ASP.NET Core 应用</p>`,12),l=[t];function h(r,p){return a(),s("div",null,l)}const o=i(n,[["render",h],["__file","jiangjingtaiwenjiandabao.html.vue"]]),g=JSON.parse('{"path":"/dotnet/base/jingtaiwenjian/jiangjingtaiwenjiandabao.html","title":"将静态文件打包","lang":"zh-CN","frontmatter":{"title":"将静态文件打包","lang":"zh-CN","date":"2023-09-16T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dotNET"],"tag":["无"],"filename":"jiangjingtaiwenjiandabao","slug":"nnmdks","docsId":"93509415","description":"目的 虽然.net项目可以执行单文件发布，但是不能将前端静态文件包含到里面，如何将wwwroot目录下的静态文件打包到exe文件内？ 思路 默认情况下，FileProvider 是读取本地物理文件。 如果改成从 EXE 文件中读取静态文件的 FileProvider，不就实现了我们的目的了吗？！ 而实际上，.NET 已经提供了这样一个 FileProv...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dotnet/base/jingtaiwenjian/jiangjingtaiwenjiandabao.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"将静态文件打包"}],["meta",{"property":"og:description","content":"目的 虽然.net项目可以执行单文件发布，但是不能将前端静态文件包含到里面，如何将wwwroot目录下的静态文件打包到exe文件内？ 思路 默认情况下，FileProvider 是读取本地物理文件。 如果改成从 EXE 文件中读取静态文件的 FileProvider，不就实现了我们的目的了吗？！ 而实际上，.NET 已经提供了这样一个 FileProv..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-08T14:39:11.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-09-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-08T14:39:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"将静态文件打包\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-09-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-04-08T14:39:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"目的","slug":"目的","link":"#目的","children":[]},{"level":2,"title":"思路","slug":"思路","link":"#思路","children":[]},{"level":2,"title":"实现","slug":"实现","link":"#实现","children":[]},{"level":2,"title":"资料","slug":"资料","link":"#资料","children":[]}],"git":{"createdTime":1697962303000,"updatedTime":1712587151000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":2}]},"readingTime":{"minutes":1.01,"words":304},"filePathRelative":"dotnet/base/jingtaiwenjian/jiangjingtaiwenjiandabao.md","localizedDate":"2023年9月16日","excerpt":"<h2>目的</h2>\\n<p>虽然.net项目可以执行单文件发布，但是不能将前端静态文件包含到里面，如何将wwwroot目录下的静态文件打包到exe文件内？</p>\\n<h2>思路</h2>\\n<p>默认情况下，FileProvider 是读取本地物理文件。\\n如果改成从 EXE 文件中读取静态文件的 FileProvider，不就实现了我们的目的了吗？！\\n而实际上，.NET 已经提供了这样一个 FileProvider：ManifestEmbeddedFileProvider，用于访问嵌入在程序集中的文件。</p>\\n<h2>实现</h2>\\n<ol>\\n<li>将 Microsoft.Extensions.FileProviders.Embedded NuGet 包添加到 Web API 项目。</li>\\n<li>修改项目文件，将 GenerateEmbeddedFilesManifest 属性设置为 true，并指定嵌入的文件来源：</li>\\n</ol>","autoDesc":true}');export{o as comp,g as data};