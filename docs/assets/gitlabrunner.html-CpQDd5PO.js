import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as n,d as a}from"./app-mrI7cTrN.js";const l={},e=a(`<p>安装</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">## For Debian/Ubuntu/Mint</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">## 添加存储库</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -L</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> bash</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">## 安装最新版本</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> gitlab-runner</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">## For RHEL/CentOS/Fedora</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">## 添加存储库</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -L</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.rpm.sh&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> bash</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">## 安装最新版本</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> yum</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> gitlab-runner</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">安装特定版本</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">## for DEB based systems</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">apt-cache</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> madison</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> gitlab-runner</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> gitlab-runner=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">10.0.0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">## for RPM based systems</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">yum</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> list</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> gitlab-runner</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> --showduplicates</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> sort</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -r</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> yum</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> gitlab-runner-10.0.0-1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><a href="https://docs.gitlab.com/runner/install/linux-repository.html" target="_blank" rel="noopener noreferrer">https://docs.gitlab.com/runner/install/linux-repository.html</a></p></blockquote><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">doc：https://docs.gitlab.com/ee/ci/docker/using_docker_build.html</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> gitlab-runner</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> register</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -n</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">  --url</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> https://gitlab.com/</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">  --registration-token</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;fCwTpQAQZgGngdKN__sh&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">  --executor</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> shell</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">  --description</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;My Runner&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> usermod</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -aG</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> docker</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> gitlab-runner</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> 验证是否可以gitlab-runner访问</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> Docker：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> sudo</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -u</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> gitlab-runner</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -H</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> docker</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> info</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> 输出gitlabrunner版本</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> gitlab-runner</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> status</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="linux" tabindex="-1"><a class="header-anchor" href="#linux"><span>Linux</span></a></h3><p>在 Linux 下注册Runner：</p><ol><li>运行以下命令：sudo gitlab-runner register 如果您在代理后面，请添加环境变量，然后运行注册命令</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>export HTTP_PROXY=http://yourproxyurl:3128 export HTTPS_PROXY=http://yourproxyurl:3128  sudo -E gitlab-runner register</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="2"><li>输入您的 GitLab 实例 URL（也称为gitlab-ci coordinator URL）。</li><li>输入您获得的令牌以注册跑步者。</li><li>输入跑步者的描述。您可以稍后在 GitLab 用户界面中更改此值。</li><li>输入<a href="https://docs.gitlab.com/ee/ci/runners/#using-tags" target="_blank" rel="noopener noreferrer">与 runner 关联</a>的<a href="https://docs.gitlab.com/ee/ci/runners/#using-tags" target="_blank" rel="noopener noreferrer">标签</a>，用逗号分隔。您可以稍后在 GitLab 用户界面中更改此值。</li><li>提供<a href="https://docs.gitlab.com/runner/executors/index.html" target="_blank" rel="noopener noreferrer">runner executor</a>。对于大多数用例，请输入 docker。</li><li>如果您docker作为执行人输入，系统会要求您提供用于未在.gitlab-ci.yml.</li></ol>`,9),t=[e];function h(r,p){return n(),s("div",null,t)}const c=i(l,[["render",h],["__file","gitlabrunner.html.vue"]]),g=JSON.parse('{"path":"/cloud/ciAndCd/gitlab/gitlabrunner.html","title":"Gitlab Runner","lang":"zh-CN","frontmatter":{"title":"Gitlab Runner","lang":"zh-CN","date":"2022-09-12T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["cloud"],"tag":["无"],"filename":"gitlabrunner","slug":"tx30vf","docsId":"52712542","description":"安装 https://docs.gitlab.com/runner/install/linux-repository.html Linux 在 Linux 下注册Runner： 运行以下命令：sudo gitlab-runner register 如果您在代理后面，请添加环境变量，然后运行注册命令 输入您的 GitLab 实例 URL（也称为gitla...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/cloud/ciAndCd/gitlab/gitlabrunner.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"Gitlab Runner"}],["meta",{"property":"og:description","content":"安装 https://docs.gitlab.com/runner/install/linux-repository.html Linux 在 Linux 下注册Runner： 运行以下命令：sudo gitlab-runner register 如果您在代理后面，请添加环境变量，然后运行注册命令 输入您的 GitLab 实例 URL（也称为gitla..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-29T12:50:09.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2022-09-12T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-29T12:50:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Gitlab Runner\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-09-12T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-29T12:50:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":3,"title":"Linux","slug":"linux","link":"#linux","children":[]}],"git":{"createdTime":1695541854000,"updatedTime":1698583809000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":2}]},"readingTime":{"minutes":1.25,"words":374},"filePathRelative":"cloud/ciAndCd/gitlab/gitlabrunner.md","localizedDate":"2022年9月12日","excerpt":"<p>安装</p>\\n<div class=\\"language-bash line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"bash\\" data-title=\\"bash\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">## For Debian/Ubuntu/Mint</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">## 添加存储库</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">curl</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\"> -L</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> \\"https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh\\"</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#ABB2BF\\"> |</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\"> sudo</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> bash</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">## 安装最新版本</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">sudo</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> apt-get</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> install</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> gitlab-runner</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">## For RHEL/CentOS/Fedora</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">## 添加存储库</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">curl</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\"> -L</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> \\"https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.rpm.sh\\"</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#ABB2BF\\"> |</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\"> sudo</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> bash</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">## 安装最新版本</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">sudo</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> yum</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> install</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> gitlab-runner</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">安装特定版本</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">## for DEB based systems</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">apt-cache</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> madison</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> gitlab-runner</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">sudo</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> apt-get</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> install</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> gitlab-runner=</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">10.0.0</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">## for RPM based systems</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">yum</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> list</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> gitlab-runner</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\"> --showduplicates</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#ABB2BF\\"> |</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\"> sort</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\"> -r</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">sudo</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> yum</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> install</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> gitlab-runner-10.0.0-1</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{c as comp,g as data};