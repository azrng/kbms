import{_ as o}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as p,o as l,c,a as s,b as n,d as e,e as t}from"./app-vSdX8vi3.js";const r={},i=s("h2",{id:"vuepress",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#vuepress"},[s("span",null,"VuePress")])],-1),u=s("p",null,"Vue驱动的静态网站生成器",-1),d={href:"https://v2.vuepress.vuejs.org/zh/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://www.apifox.cn/help/app/getting-started/",target:"_blank",rel:"noopener noreferrer"},h=s("h3",{id:"vuepress-theme-hope主题",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#vuepress-theme-hope主题"},[s("span",null,"vuepress-theme-hope主题")])],-1),m=s("p",null,"官网：https://theme-hope.vuejs.press/zh/",-1),v={href:"https://github.com/vuepress-theme-hope/vuepress-theme-hope",target:"_blank",rel:"noopener noreferrer"},g={href:"https://theme-hope.vuejs.press/zh/cookbook/tutorial/command.html",target:"_blank",rel:"noopener noreferrer"},b=t(`<p>Markdown使用说明：https://theme-hope.vuejs.press/zh/cookbook/markdown/ 使用示例：https://theme-hope.vuejs.press/zh/cookbook/markdown/demo.html</p><h4 id="布局配置" tabindex="-1"><a class="header-anchor" href="#布局配置"><span>布局配置</span></a></h4><p>路径导航，默认开启关闭为</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code>breadcrumb<span class="token punctuation">:</span> <span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>网址：https://theme-hope.vuejs.press/zh/guide/layout/navbar.html</p><h4 id="页面信息配置" tabindex="-1"><a class="header-anchor" href="#页面信息配置"><span>页面信息配置</span></a></h4><p>信息 Frontmatter 配置：https://theme-hope.vuejs.press/zh/config/frontmatter/info.html</p><p>网址：https://theme-hope.vuejs.press/zh/guide/feature/page-info.html</p><h4 id="gitlab-page" tabindex="-1"><a class="header-anchor" href="#gitlab-page"><span>Gitlab page</span></a></h4><p>通过pnpm创建的项目，然后.gitlab-ci.yml内容为</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token comment">## 选择你要使用的 docker 镜像</span>
<span class="token key atrule">image</span><span class="token punctuation">:</span> docker<span class="token punctuation">-</span>mirror.com/node<span class="token punctuation">:</span>18<span class="token punctuation">-</span>buster

<span class="token key atrule">pages</span><span class="token punctuation">:</span>
  <span class="token comment">## 每当 push 到 main 分支时触发部署</span>
  <span class="token key atrule">only</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> master

  <span class="token comment">## 缓存 node_modules</span>
  <span class="token key atrule">cache</span><span class="token punctuation">:</span>
    <span class="token key atrule">key</span><span class="token punctuation">:</span>
      <span class="token key atrule">files</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> pnpm<span class="token punctuation">-</span>lock.yaml
    <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> .pnpm<span class="token punctuation">-</span>store

  <span class="token comment">## 安装 pnpm</span>
  <span class="token key atrule">before_script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> curl <span class="token punctuation">-</span>f https<span class="token punctuation">:</span>//get.pnpm.io/v6.16.js <span class="token punctuation">|</span> node <span class="token punctuation">-</span> add <span class="token punctuation">-</span><span class="token punctuation">-</span>global pnpm@7
    <span class="token punctuation">-</span> pnpm config set store<span class="token punctuation">-</span>dir .pnpm<span class="token punctuation">-</span>store

  <span class="token comment">## 安装依赖并运行构建脚本</span>
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> pnpm install <span class="token punctuation">-</span><span class="token punctuation">-</span>frozen<span class="token punctuation">-</span>lockfile
    <span class="token punctuation">-</span> pnpm docs<span class="token punctuation">:</span>build <span class="token punctuation">-</span><span class="token punctuation">-</span>dest public

  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span>
    <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> public
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vuepress-reco主题" tabindex="-1"><a class="header-anchor" href="#vuepress-reco主题"><span>vuepress-reco主题</span></a></h3>`,12),_={href:"http://v2.vuepress-reco.recoluan.com/",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/vuepress-reco/vuepress-theme-reco",target:"_blank",rel:"noopener noreferrer"},y=t(`<p>初始化</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token preprocessor property">## 安装1.x版本</span>
npm install @vuepress<span class="token operator">-</span>reco<span class="token operator">/</span>theme<span class="token operator">-</span>cli <span class="token operator">-</span>g
theme<span class="token operator">-</span>cli init

<span class="token preprocessor property">## 安装2.x版本</span>
npm install @vuepress<span class="token operator">-</span>reco<span class="token operator">/</span>theme<span class="token operator">-</span>cli@<span class="token number">1.0</span><span class="token number">.7</span> <span class="token operator">-</span>g
theme<span class="token operator">-</span>cli init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>2022年8月24日当前时间该2.x环境只支持文档类型的风格脚本，所以还得先用1.0版本</p></blockquote><p>其他问题处理</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token comment">//提示：theme-cli : 无法加载文件 C:\\Users\\user.LAPTOP-LBQ8556U\\AppData\\Roaming\\npm\\theme-cli.ps1</span>
解决方案：管理员身份运行powersheel，然后执行<span class="token keyword">set</span><span class="token operator">-</span>ExecutionPolicy RemoteSigne，回车选择A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docusaurus" tabindex="-1"><a class="header-anchor" href="#docusaurus"><span>docusaurus</span></a></h2><p>快速构建以内容为核心的最佳网站。</p><ol><li>易于使用：Docusaurus 提供了简单易用的命令行工具和配置选项，使您可以轻松创建和维护知识库。</li><li>自定义：Docusaurus 提供了可定制的主题，您可以根据您的品牌和需求进行外观和样式的自定义。</li><li>Markdown 支持：使用 Markdown 语法编写文档，方便快捷，并且支持代码高亮、表格、链接等常见的 Markdown 格式。</li><li>搜索功能：Docusaurus 内置了全文搜索功能，帮助用户快速找到所需的信息。</li><li>响应式布局：Docusaurus 的文档站点能够在不同的设备上提供出色的用户体验，包括桌面、平板和移动设备。</li><li>版本控制：Docusaurus 支持多个版本的文档，可以轻松管理和切换不同版本的文档内容。</li><li>社区支持：Docusaurus 拥有活跃的社区，您可以获得来自社区的帮助、贡献和扩展。</li></ol>`,8),w=s("br",null,null,-1),q={href:"https://docusaurus.io/zh-CN/",target:"_blank",rel:"noopener noreferrer"},x=s("br",null,null,-1),z={href:"https://www.docusaurus.cn/",target:"_blank",rel:"noopener noreferrer"},j=s("h2",{id:"skyao",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#skyao"},[s("span",null,"Skyao")])],-1),D=s("br",null,null,-1),T={href:"https://skyao.io/learning-hugo/",target:"_blank",rel:"noopener noreferrer"},P=s("h2",{id:"docsy",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#docsy"},[s("span",null,"Docsy")])],-1),M={href:"https://www.docsy.dev/",target:"_blank",rel:"noopener noreferrer"},N=s("h2",{id:"docsify",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#docsify"},[s("span",null,"docsify")])],-1),V=s("br",null,null,-1),G={href:"https://docsify.js.org/#/zh-cn/",target:"_blank",rel:"noopener noreferrer"},E=s("br",null,null,-1),A={href:"http://www.yii-china.com/docsify/quickstart.html",target:"_blank",rel:"noopener noreferrer"},C=t(`<h3 id="操作" tabindex="-1"><a class="header-anchor" href="#操作"><span>操作</span></a></h3><h4 id="基本操作" tabindex="-1"><a class="header-anchor" href="#基本操作"><span>基本操作</span></a></h4><p>找个目录然后新建一个index.html文件，文件内容如下：</p><div class="language-html line-numbers-mode" data-ext="html" data-title="html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>IE=edge,chrome=1<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width,initial-scale=1<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stylesheet<span class="token punctuation">&quot;</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>//cdn.jsdelivr.net/npm/docsify/themes/vue.css<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
    window<span class="token punctuation">.</span>$docsify <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token comment">//...</span>
    <span class="token punctuation">}</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在同目录下新建一个readme.md文件<br>然后整个技术文档都需要写到这个readme.md文件内，运行就可以看到技术文档页面</p><h4 id="评论功能" tabindex="-1"><a class="header-anchor" href="#评论功能"><span>评论功能</span></a></h4>`,6),L={href:"https://github.com/settings/applications/new",target:"_blank",rel:"noopener noreferrer"},S=s("br",null,null,-1),I=t(`<div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token operator">&lt;</span><span class="token class-name">link</span> rel<span class="token operator">=</span><span class="token string">&quot;stylesheet&quot;</span> href<span class="token operator">=</span><span class="token string">&quot;//unpkg.com/gitalk/dist/gitalk.css&quot;</span><span class="token operator">&gt;</span>

<span class="token operator">&lt;</span><span class="token class-name">script</span> src<span class="token operator">=</span><span class="token string">&quot;//unpkg.com/docsify/lib/plugins/gitalk.min.js&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token class-name">script</span> src<span class="token operator">=</span><span class="token string">&quot;//unpkg.com/gitalk/dist/gitalk.min.js&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
  <span class="token keyword">const</span> gitalk <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Gitalk</span><span class="token punctuation">(</span><span class="token punctuation">{</span> 
    clientID<span class="token punctuation">:</span> &#39;刚刚申请下来的ID&#39;<span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">clientSecret</span><span class="token punctuation">:</span> &#39;刚刚申请下来的密码&#39;<span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">repo</span><span class="token punctuation">:</span>&#39;仓库名字，用于保存你博客评论的仓库，可以和你的博客是一个仓库&#39;<span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">owner</span><span class="token punctuation">:</span>你的Github名字<span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">admin</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>&#39;你的Github名字和其他管理员的名字&#39;<span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// facebook-like distraction free mode</span>
    distractionFreeMode<span class="token punctuation">:</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span> <span class="token punctuation">)</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打开index.html文件，把<link rel="stylesheet" href="//unpkg.com/gitalk/dist/gitalk.css">，这行代码，添加到<head>...</head>中</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token operator">&lt;</span>head<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token class-name">meta</span> charset<span class="token operator">=</span><span class="token string">&quot;UTF-8&quot;</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>title<span class="token operator">&gt;</span>Document<span class="token operator">&lt;</span><span class="token operator">/</span>title<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>meta http<span class="token operator">-</span>equiv<span class="token operator">=</span><span class="token string">&quot;X-UA-Compatible&quot;</span> content<span class="token operator">=</span><span class="token string">&quot;IE=edge,chrome=1&quot;</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token class-name">meta</span> name<span class="token operator">=</span><span class="token string">&quot;description&quot;</span> content<span class="token operator">=</span><span class="token string">&quot;Description&quot;</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token class-name">meta</span> name<span class="token operator">=</span><span class="token string">&quot;viewport&quot;</span> content<span class="token operator">=</span><span class="token string">&quot;width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0&quot;</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token class-name">link</span> rel<span class="token operator">=</span><span class="token string">&quot;stylesheet&quot;</span> href<span class="token operator">=</span><span class="token string">&quot;//unpkg.com/docsify/lib/themes/vue.css&quot;</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token class-name">link</span> rel<span class="token operator">=</span><span class="token string">&quot;stylesheet&quot;</span> href<span class="token operator">=</span><span class="token string">&quot;//unpkg.com/gitalk/dist/gitalk.css&quot;</span><span class="token operator">&gt;</span>  
<span class="token operator">&lt;</span><span class="token operator">/</span>head<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后把其他代码，插入到<body>...</body>中</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token class-name">div</span> id<span class="token operator">=</span><span class="token string">&quot;app&quot;</span><span class="token operator">&gt;</span>正在努力加载中<span class="token operator">~</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
    window<span class="token punctuation">.</span>$docsify <span class="token operator">=</span> <span class="token punctuation">{</span>    
      name<span class="token punctuation">:</span> &#39;Blog&#39;<span class="token punctuation">,</span>
      <span class="token named-parameter punctuation">repo</span><span class="token punctuation">:</span> &#39;https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com<span class="token operator">/</span>yangyang0126&#39;<span class="token punctuation">,</span>  <span class="token comment">//开启github图标</span>
     <span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span>
    <span class="token punctuation">}</span> 
  <span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token class-name">script</span> src<span class="token operator">=</span><span class="token string">&quot;//unpkg.com/docsify/lib/docsify.min.js&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>  

  <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span>插入“gitalk评论”模块<span class="token operator">--</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token class-name">script</span> src<span class="token operator">=</span><span class="token string">&quot;//unpkg.com/docsify/lib/plugins/gitalk.min.js&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token class-name">script</span> src<span class="token operator">=</span><span class="token string">&quot;//unpkg.com/gitalk/dist/gitalk.min.js&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
    <span class="token keyword">const</span> gitalk <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Gitalk</span><span class="token punctuation">(</span><span class="token punctuation">{</span> 
      clientID<span class="token punctuation">:</span> &#39;<span class="token number">1</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token number">6</span>&#39;<span class="token punctuation">,</span>
      <span class="token named-parameter punctuation">clientSecret</span><span class="token punctuation">:</span> &#39;<span class="token number">9</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span>d&#39;<span class="token punctuation">,</span>
      <span class="token named-parameter punctuation">repo</span><span class="token punctuation">:</span> &#39;blog&#39;<span class="token punctuation">,</span>
      <span class="token named-parameter punctuation">owner</span><span class="token punctuation">:</span> &#39;yangyang0126&#39;<span class="token punctuation">,</span>
      <span class="token named-parameter punctuation">admin</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>&#39;yangyang0126&#39;<span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token named-parameter punctuation">id</span><span class="token punctuation">:</span> location<span class="token punctuation">.</span>pathname<span class="token punctuation">,</span>      <span class="token comment">// Ensure uniqueness and length less than 50</span>
      distractionFreeMode<span class="token punctuation">:</span> <span class="token boolean">false</span>  <span class="token comment">// Facebook-like distraction free mode</span>
    <span class="token punctuation">}</span> <span class="token punctuation">)</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后就可以网页预览了。</p><h2 id="showdoc" tabindex="-1"><a class="header-anchor" href="#showdoc"><span>showDoc</span></a></h2><p>一个API文档、技术文档工具</p>`,8),W={href:"https://www.showdoc.com.cn/",target:"_blank",rel:"noopener noreferrer"},F=s("h2",{id:"logseq",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#logseq"},[s("span",null,"Logseq")])],-1),B=s("p",null,"连接您的笔记，增加理解",-1),U={href:"https://www.logseq.com/",target:"_blank",rel:"noopener noreferrer"},Z=s("h2",{id:"vanblog",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#vanblog"},[s("span",null,"vanblog")])],-1),O=s("p",null,"VanBlog 是一款简洁实用优雅的高性能个人博客系统。支持 HTTPS 证书全自动按需申请、黑暗模式、支持移动端自适应和评论，内置流量统计与图床，内嵌评论系统，配有完备的、支持黑暗模式、支持移动端、支持一键上传剪切板图片到图床、带有强大的编辑器的后台管理面板。(后台管理、数据库保存)",-1),H=s("p",null,"主页：https://vanblog.mereith.com/",-1),R=s("p",null,"介绍：https://vanblog.mereith.com/intro.html",-1),X=s("h2",{id:"mrdoc",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#mrdoc"},[s("span",null,"MrDoc")])],-1),$=s("p",null,"MrDoc 是基于 Python 语言编写的 Web 应用，并且基于GPLv3开源协议托管在了 GitHub 和 Gitee 上。只要是能够运行 Python 的计算机上（Windows、Linux、macOS），都可以部署 MrDoc。并且借助于 Docker，还能在群晖、电视盒子等设备上进行部署。数据完全存储在自己的计算机设备中，应用完全运行在自己的网络中。",-1),J=s("p",null,"源码地址：",-1),Q={href:"https://github.com/zmister2016/MrDoc",target:"_blank",rel:"noopener noreferrer"},Y={href:"https://gitee.com/zmister/MrDoc",target:"_blank",rel:"noopener noreferrer"},K={href:"https://doc.mrdoc.pro/",target:"_blank",rel:"noopener noreferrer"},ss=s("h3",{id:"其他部署方式",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#其他部署方式"},[s("span",null,"其他部署方式")])],-1),ns={href:"https://registry.hub.docker.com/r/jonnyan404/mrdoc-nginx",target:"_blank",rel:"noopener noreferrer"},as={href:"https://gitee.com/jonnyan404/oh-my-mrdoc",target:"_blank",rel:"noopener noreferrer"},es={href:"https://gitee.com/debj031634/win-django",target:"_blank",rel:"noopener noreferrer"},ts=t(`<h4 id="docker部署" tabindex="-1"><a class="header-anchor" href="#docker部署"><span>docker部署</span></a></h4><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>// 拉取镜像并启动容器
docker run -d --name mrdoc -p 10086:10086 jonnyan404/mrdoc-nginx

// 创建管理员账户
docker exec -it mrdoc python manage.py createsuperuser

// 修改用户密码
docker exec -it mrdoc python manage.py changepassword 用户名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="trilium-notes" tabindex="-1"><a class="header-anchor" href="#trilium-notes"><span>Trilium Notes</span></a></h3>`,3),os={href:"https://so.csdn.net/so/search?q=%E7%9F%A5%E8%AF%86%E5%BA%93&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},ps=s("br",null,null,-1),ls={href:"https://trilium.netlify.app",target:"_blank",rel:"noopener noreferrer"},cs=s("br",null,null,-1),rs={href:"https://github.com/Nriver/trilium-translation",target:"_blank",rel:"noopener noreferrer"},is=s("p",null,"仓库地址：https://dotnet.github.io/docfx/",-1);function us(ds,ks){const a=p("ExternalLinkIcon");return l(),c("div",null,[i,u,s("p",null,[n("官网："),s("a",d,[n("https://v2.vuepress.vuejs.org/zh/"),e(a)])]),s("p",null,[n("示例网站："),s("a",k,[n("https://www.apifox.cn/help/app/getting-started/"),e(a)])]),h,m,s("p",null,[n("仓库地址："),s("a",v,[n("https://github.com/vuepress-theme-hope/vuepress-theme-hope"),e(a)])]),s("p",null,[n("项目升级："),s("a",g,[n("https://theme-hope.vuejs.press/zh/cookbook/tutorial/command.html"),e(a)])]),b,s("p",null,[n("官网："),s("a",_,[n("http://v2.vuepress-reco.recoluan.com/"),e(a)])]),s("p",null,[n("仓库："),s("a",f,[n("https://github.com/vuepress-reco/vuepress-theme-reco"),e(a)])]),y,s("p",null,[n("特色优点：支持文档分版本使用。"),w,n("官网："),s("a",q,[n("https://docusaurus.io/zh-CN/"),e(a)]),x,n("中文文档："),s("a",z,[n("https://www.docusaurus.cn/"),e(a)])]),j,s("p",null,[n("笔记风格静态网站"),D,n("官网："),s("a",T,[n("https://skyao.io/learning-hugo/"),e(a)])]),P,s("p",null,[n("官网："),s("a",M,[n("https://www.docsy.dev/"),e(a)])]),N,s("p",null,[n("使用这个工作来快速生成小型文档网站"),V,n("官方文档："),s("a",G,[n("https://docsify.js.org/#/zh-cn/"),e(a)]),E,n("中文文档："),s("a",A,[n("http://www.yii-china.com/docsify/quickstart.html"),e(a)])]),C,s("p",null,[n("申请Gitalk："),s("a",L,[n("https://github.com/settings/applications/new"),e(a)]),n(" ，完毕后拿到clientId等，然后修改自己的文档，如下"),S,n("填写对应的信息，修改index文件")]),I,s("p",null,[n("官方地址："),s("a",W,[n("https://www.showdoc.com.cn/"),e(a)])]),F,B,s("p",null,[n("官网："),s("a",U,[n("https://www.logseq.com/"),e(a)])]),Z,O,H,R,X,$,J,s("p",null,[n("GitHub："),s("a",Q,[n("https://github.com/zmister2016/MrDoc"),e(a)])]),s("p",null,[n("Gitee："),s("a",Y,[n("https://gitee.com/zmister/MrDoc"),e(a)])]),s("p",null,[n("文档手册："),s("a",K,[n("https://doc.mrdoc.pro/"),e(a)])]),ss,s("ul",null,[s("li",null,[s("a",ns,[n("Docker镜像"),e(a)])]),s("li",null,[s("a",as,[n("Linux一键部署脚本"),e(a)])]),s("li",null,[s("a",es,[n("Windows部署面板"),e(a)])])]),ts,s("p",null,[n("Trilium Notes 是一个分层笔记应用程序，专注于构建大型个人"),s("a",os,[n("知识库"),e(a)]),n("。支持双向链接、标签、任务待办、图谱、统计、数学公式、加密、定制插件、本地存储、网页剪辑、跨平台支持，有 Linux，macOS 和 Windows客户端。支持相当丰富的 markdown，包括 mermaid 和 latex，而且即时渲染，和 typora 一样。支持代码类型的笔记，有高亮。 Trilium与其说是笔记软件，不如说是个人wiki。")]),s("p",null,[n("GitHub：https://github.com/zadam/trilium"),ps,n("教程地址："),s("a",ls,[n("https://trilium.netlify.app"),e(a)])]),s("p",null,[n("docker部署"),cs,n("汉化版镜像："),s("a",rs,[n("https://github.com/Nriver/trilium-translation"),e(a)])]),is])}const vs=o(r,[["render",us],["__file","docsWeb.html.vue"]]),gs=JSON.parse('{"path":"/soft/windows/docsWeb.html","title":"文档网站","lang":"zh-CN","frontmatter":{"title":"文档网站","lang":"zh-CN","date":"2023-07-22T00:00:00.000Z","publish":true,"author":"azrng","order":5,"category":["小软件介绍"],"tag":["无"],"filename":"wendangwangzhan","description":"VuePress Vue驱动的静态网站生成器 官网：https://v2.vuepress.vuejs.org/zh/ 示例网站：https://www.apifox.cn/help/app/getting-started/ vuepress-theme-hope主题 官网：https://theme-hope.vuejs.press/zh/ 仓库地址...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/soft/windows/docsWeb.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"文档网站"}],["meta",{"property":"og:description","content":"VuePress Vue驱动的静态网站生成器 官网：https://v2.vuepress.vuejs.org/zh/ 示例网站：https://www.apifox.cn/help/app/getting-started/ vuepress-theme-hope主题 官网：https://theme-hope.vuejs.press/zh/ 仓库地址..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-16T14:28:34.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-07-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-16T14:28:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"文档网站\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-07-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-16T14:28:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"VuePress","slug":"vuepress","link":"#vuepress","children":[{"level":3,"title":"vuepress-theme-hope主题","slug":"vuepress-theme-hope主题","link":"#vuepress-theme-hope主题","children":[{"level":4,"title":"布局配置","slug":"布局配置","link":"#布局配置","children":[]},{"level":4,"title":"页面信息配置","slug":"页面信息配置","link":"#页面信息配置","children":[]},{"level":4,"title":"Gitlab page","slug":"gitlab-page","link":"#gitlab-page","children":[]}]},{"level":3,"title":"vuepress-reco主题","slug":"vuepress-reco主题","link":"#vuepress-reco主题","children":[]}]},{"level":2,"title":"docusaurus","slug":"docusaurus","link":"#docusaurus","children":[]},{"level":2,"title":"Skyao","slug":"skyao","link":"#skyao","children":[]},{"level":2,"title":"Docsy","slug":"docsy","link":"#docsy","children":[]},{"level":2,"title":"docsify","slug":"docsify","link":"#docsify","children":[{"level":3,"title":"操作","slug":"操作","link":"#操作","children":[{"level":4,"title":"基本操作","slug":"基本操作","link":"#基本操作","children":[]},{"level":4,"title":"评论功能","slug":"评论功能","link":"#评论功能","children":[]}]}]},{"level":2,"title":"showDoc","slug":"showdoc","link":"#showdoc","children":[]},{"level":2,"title":"Logseq","slug":"logseq","link":"#logseq","children":[]},{"level":2,"title":"vanblog","slug":"vanblog","link":"#vanblog","children":[]},{"level":2,"title":"MrDoc","slug":"mrdoc","link":"#mrdoc","children":[{"level":3,"title":"其他部署方式","slug":"其他部署方式","link":"#其他部署方式","children":[{"level":4,"title":"docker部署","slug":"docker部署","link":"#docker部署","children":[]}]},{"level":3,"title":"Trilium Notes","slug":"trilium-notes","link":"#trilium-notes","children":[]}]}],"git":{"createdTime":1690016670000,"updatedTime":1710599314000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":5.86,"words":1757},"filePathRelative":"soft/windows/docsWeb.md","localizedDate":"2023年7月22日","excerpt":"<h2>VuePress</h2>\\n<p>Vue驱动的静态网站生成器</p>\\n<p>官网：<a href=\\"https://v2.vuepress.vuejs.org/zh/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://v2.vuepress.vuejs.org/zh/</a></p>\\n<p>示例网站：<a href=\\"https://www.apifox.cn/help/app/getting-started/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://www.apifox.cn/help/app/getting-started/</a></p>","autoDesc":true}');export{vs as comp,gs as data};