import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,d as h}from"./app-DZ9bmjCp.js";const n={},l=h(`<h2 id="发布脚本" tabindex="-1"><a class="header-anchor" href="#发布脚本"><span>发布脚本</span></a></h2><p>Blog.IdentityServer.Publish.Linux.sh</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">git</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> pull</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">rm</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">rf</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> .</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">PublishFiles</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">dotnet</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> build</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">dotnet</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> publish</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">o</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> /</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">home</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Blog</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">IdentityServer</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Blog</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">IdentityServer</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">bin</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">Debug</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">netcoreapp3</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">cp</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">r</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> /</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">home</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Blog</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">IdentityServer</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Blog</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">IdentityServer</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">bin</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">Debug</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">netcoreapp3</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> .</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">PublishFiles</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;Successfully!!!! ^ please see the file .PublishFiles&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="生成容器脚本" tabindex="-1"><a class="header-anchor" href="#生成容器脚本"><span>生成容器脚本</span></a></h2><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">## 停止容器</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">docker</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> stop</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> idscontainer</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">## 删除容器</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">docker</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> rm</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> idscontainer</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">## 删除镜像</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">docker</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> rmi</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> laozhangisphi</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">idsimg</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">## 切换目录</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">cd</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> /</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">home</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Blog</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">IdentityServer</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">## 发布项目</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Blog</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">IdentityServer</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Publish</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Linux</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">sh</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">## 进入目录</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">cd</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> /</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">home</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Blog</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">IdentityServer</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">PublishFiles</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">## 编译镜像</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">docker</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> build</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">t</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> laozhangisphi</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">idsimg</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> .</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">## 生成容器</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">docker</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> run</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> --</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">idscontainer</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">v</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> /</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">etc</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">localtime</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">etc</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">localtime</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">it</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">p</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 5004</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">5004</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> laozhangisphi</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">idsimg</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">## 启动容器</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">docker</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> start</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> idscontainer</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),t=[l];function k(e,p){return a(),s("div",null,t)}const g=i(n,[["render",k],["__file","bushujiaoben.html.vue"]]),y=JSON.parse('{"path":"/dotnet/buildAndRelease/release/linux/bushujiaoben.html","title":"部署脚本","lang":"zh-CN","frontmatter":{"title":"部署脚本","lang":"zh-CN","date":"2022-05-03T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dotNET"],"tag":["无"],"filename":"bushujiaoben","slug":"nf8l2x","docsId":"75908984","description":"发布脚本 Blog.IdentityServer.Publish.Linux.sh 生成容器脚本","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dotnet/buildAndRelease/release/linux/bushujiaoben.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"部署脚本"}],["meta",{"property":"og:description","content":"发布脚本 Blog.IdentityServer.Publish.Linux.sh 生成容器脚本"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-25T15:31:40.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2022-05-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-25T15:31:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"部署脚本\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-05-03T00:00:00.000Z\\",\\"dateModified\\":\\"2024-02-25T15:31:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"发布脚本","slug":"发布脚本","link":"#发布脚本","children":[]},{"level":2,"title":"生成容器脚本","slug":"生成容器脚本","link":"#生成容器脚本","children":[]}],"git":{"createdTime":1697962303000,"updatedTime":1708875100000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":0.44,"words":133},"filePathRelative":"dotnet/buildAndRelease/release/linux/bushujiaoben.md","localizedDate":"2022年5月3日","excerpt":"<h2>发布脚本</h2>\\n<p>Blog.IdentityServer.Publish.Linux.sh</p>\\n<div class=\\"language-csharp line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"csharp\\" data-title=\\"csharp\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E5C07B\\">git</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E06C75\\"> pull</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">rm</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> -</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">rf</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> .</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">PublishFiles</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E5C07B\\">dotnet</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E06C75\\"> build</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">dotnet</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\"> publish</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> -</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">o</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> /</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">home</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">/</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">Blog</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">IdentityServer</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">/</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">Blog</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">IdentityServer</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">/</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">bin</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">/</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">Debug</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">/</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">netcoreapp3</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">1</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">cp</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> -</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">r</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> /</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">home</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">/</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">Blog</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">IdentityServer</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">/</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">Blog</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">IdentityServer</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">/</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">bin</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">/</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">Debug</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">/</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">netcoreapp3</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">1</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> .</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">PublishFiles</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">echo</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> \\"Successfully!!!! ^ please see the file .PublishFiles\\"</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{g as comp,y as data};