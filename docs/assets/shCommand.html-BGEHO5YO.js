import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as n,d as a}from"./app-CF6xeyXt.js";const e={},l=a(`<h2 id="基础语法" tabindex="-1"><a class="header-anchor" href="#基础语法"><span>基础语法</span></a></h2><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;Output content&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="输入和输出" tabindex="-1"><a class="header-anchor" href="#输入和输出"><span>输入和输出</span></a></h2><p>输出信息</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 输出普通文字</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;start build&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 输出黄色文字</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">echo</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -e</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;\\033[33m Output all the services: \\033[0m&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输入信息</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;input e to finish&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">while</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;"> read</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> input</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">do</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> [ </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">$input</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> ==</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;e&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> ]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    then</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        break</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    else</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        ehco</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;input value show&quot;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">        echo</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> $input</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    fi</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">done</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><h3 id="安装ping命令" tabindex="-1"><a class="header-anchor" href="#安装ping命令"><span>安装Ping命令</span></a></h3><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 查看系统信息 </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">cat</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /etc/os-release</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 发现是Debian系统，那我们使用apt安装ping工具</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> update</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">apt</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -y</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> iputils-ping</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="issue" tabindex="-1"><a class="header-anchor" href="#issue"><span>Issue</span></a></h2><h3 id="r-command-not-found" tabindex="-1"><a class="header-anchor" href="#r-command-not-found"><span>$&#39;\\r&#39;:command not found</span></a></h3><p>在linux上执行脚本时出现$’\\r’:command not found,然而仔细检查脚本，对应行位置只是一个空行，并没有问题，那么linux为什么会将一个回车的空行报错？</p><p>原因是这样的：脚本是在window下编辑完成后上传到linux上执行的，win下的换行是回车符+换行符，也就是\\r\\n,而unix下是换行符\\n。linux下不识别\\r为回车符，所以导致每行的配置都多了个\\r，因此是脚本编码的问题，可以在服务器上安装dos2unix并使用dos2unix 来转换sh文件格式来解决问题，例如在ubuntu中执行</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 安装</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> dos2unix</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">   </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 执行脚本 将对应的sh文件转换格式</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> dos2unix</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> run.sh</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 然后再次执行脚本</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">sh</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> run.sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),t=[l];function h(d,r){return n(),s("div",null,t)}const c=i(e,[["render",h],["__file","shCommand.html.vue"]]),o=JSON.parse(`{"path":"/soft/Linux/shCommand.html","title":"Shell命令","lang":"zh-CN","frontmatter":{"title":"Shell命令","lang":"zh-CN","date":"2023-07-24T00:00:00.000Z","publish":true,"author":"azrng","category":["Windows"],"tag":["命令","shell"],"filename":"shCommand","description":"基础语法 输入和输出 输出信息 输入信息 安装 安装Ping命令 Issue $'\\\\r':command not found 在linux上执行脚本时出现$’\\\\r’:command not found,然而仔细检查脚本，对应行位置只是一个空行，并没有问题，那么linux为什么会将一个回车的空行报错？ 原因是这样的：脚本是在window下编辑完成后上传到...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/soft/Linux/shCommand.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"Shell命令"}],["meta",{"property":"og:description","content":"基础语法 输入和输出 输出信息 输入信息 安装 安装Ping命令 Issue $'\\\\r':command not found 在linux上执行脚本时出现$’\\\\r’:command not found,然而仔细检查脚本，对应行位置只是一个空行，并没有问题，那么linux为什么会将一个回车的空行报错？ 原因是这样的：脚本是在window下编辑完成后上传到..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-31T04:07:20.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"命令"}],["meta",{"property":"article:tag","content":"shell"}],["meta",{"property":"article:published_time","content":"2023-07-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-31T04:07:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Shell命令\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-07-24T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-31T04:07:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"基础语法","slug":"基础语法","link":"#基础语法","children":[]},{"level":2,"title":"输入和输出","slug":"输入和输出","link":"#输入和输出","children":[]},{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[{"level":3,"title":"安装Ping命令","slug":"安装ping命令","link":"#安装ping命令","children":[]}]},{"level":2,"title":"Issue","slug":"issue","link":"#issue","children":[{"level":3,"title":"$'\\\\r':command not found","slug":"r-command-not-found","link":"#r-command-not-found","children":[]}]}],"git":{"createdTime":1696044510000,"updatedTime":1703995640000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":2}]},"readingTime":{"minutes":1.17,"words":350},"filePathRelative":"soft/Linux/shCommand.md","localizedDate":"2023年7月24日","excerpt":"<h2>基础语法</h2>\\n<div class=\\"language-sh line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"sh\\" data-title=\\"sh\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">#!/bin/bash</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#005CC5;--shiki-dark:#56B6C2\\">echo</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> \\"Output content\\"</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{c as comp,o as data};