import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as t,d as a}from"./app-HmxoaDfj.js";const e={},n=a(`<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span>介绍</span></a></h2><p>Microsoft.Extensions.DependencyInjection 的程序集扫描和装饰扩展。 仓库地址：<a href="https://github.com/khellang/Scrutor" target="_blank" rel="noopener noreferrer">https://github.com/khellang/Scrutor</a></p><h2 id="操作" tabindex="-1"><a class="header-anchor" href="#操作"><span>操作</span></a></h2><p>引用nuget包</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">PackageReference</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> Include</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;Scrutor&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> Version</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;4.2.0&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> /&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>注册示例</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">// Add services to the container.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">builder</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Services</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">Scan</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">selector</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> selector</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//加载指定类对应的程序集</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">             .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">FromAssemblyOf</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">Program</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;()</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">             //过滤程序集中需要注册的类，可以添加多个class</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">             .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">AddClasses</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">classes</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> classes</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">Where</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">t</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> t</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Name</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">EndsWith</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;Service&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)))</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">             //暴露匹配的接口</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">             .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">AsMatchingInterface</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">             //暴露每一个接口  将实现的继承的所有接口都注入</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">             //.AsImplementedInterfaces()</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">             //暴露所有接口</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">             //.As(t =&gt; t.GetInterfaces())</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">             //暴露自己，因为是单一类型 没有接口,只有实现</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">             .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">AsSelf</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">             //设置重复注册服务的替换策略</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">             //.UsingRegistrationStrategy(RegistrationStrategy.Skip)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">             //设置生命周期 单例 作用域 瞬时</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">             .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">WithScopedLifetime</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">());</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用就是正常的构造函数注入方案。</p><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2><p>你真的需要 Autofac 吗？Scrutor：更轻量的容器伴侣：<a href="https://cat.aiursoft.cn/post/2023/3/12/do-you-really-need-autofac-scrutor-a-lightweight-container-companion" target="_blank" rel="noopener noreferrer">https://cat.aiursoft.cn/post/2023/3/12/do-you-really-need-autofac-scrutor-a-lightweight-container-companion</a></p>`,10),l=[n];function h(r,p){return t(),s("div",null,l)}const c=i(e,[["render",h],["__file","scrutorpiliangzhuce.html.vue"]]),o=JSON.parse('{"path":"/dotnet/base/yilaizhuru/morenyilaizhuru/piliangzhuce/scrutorpiliangzhuce.html","title":"Scrutor批量注册","lang":"zh-CN","frontmatter":{"title":"Scrutor批量注册","lang":"zh-CN","date":"2023-06-28T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dotNET"],"tag":["无"],"filename":"scrutorpiliangzhuce","slug":"rdtsat","docsId":"81667638","description":"介绍 Microsoft.Extensions.DependencyInjection 的程序集扫描和装饰扩展。 仓库地址：https://github.com/khellang/Scrutor 操作 引用nuget包 注册示例 使用就是正常的构造函数注入方案。 资料 你真的需要 Autofac 吗？Scrutor：更轻量的容器伴侣：https://c...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dotnet/base/yilaizhuru/morenyilaizhuru/piliangzhuce/scrutorpiliangzhuce.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"Scrutor批量注册"}],["meta",{"property":"og:description","content":"介绍 Microsoft.Extensions.DependencyInjection 的程序集扫描和装饰扩展。 仓库地址：https://github.com/khellang/Scrutor 操作 引用nuget包 注册示例 使用就是正常的构造函数注入方案。 资料 你真的需要 Autofac 吗？Scrutor：更轻量的容器伴侣：https://c..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-25T13:23:37.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-06-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-25T13:23:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Scrutor批量注册\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-06-28T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-25T13:23:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"介绍","slug":"介绍","link":"#介绍","children":[]},{"level":2,"title":"操作","slug":"操作","link":"#操作","children":[]},{"level":2,"title":"资料","slug":"资料","link":"#资料","children":[]}],"git":{"createdTime":1697962303000,"updatedTime":1698240217000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":0.89,"words":267},"filePathRelative":"dotnet/base/yilaizhuru/morenyilaizhuru/piliangzhuce/scrutorpiliangzhuce.md","localizedDate":"2023年6月28日","excerpt":"<h2>介绍</h2>\\n<p>Microsoft.Extensions.DependencyInjection 的程序集扫描和装饰扩展。\\n仓库地址：<a href=\\"https://github.com/khellang/Scrutor\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://github.com/khellang/Scrutor</a></p>\\n<h2>操作</h2>\\n<p>引用nuget包</p>\\n<div class=\\"language-csharp line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"csharp\\" data-title=\\"csharp\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">&lt;</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E5C07B\\">PackageReference</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E06C75\\"> Include</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">=</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">\\"Scrutor\\"</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\"> Version</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">=</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">\\"4.2.0\\"</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> /&gt;</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{c as comp,o as data};