import{_ as e,W as t,X as o,Y as n,Z as s,$ as c,a0 as p,y as l}from"./framework.cf23f0c7.js";const i={},r=n("h1",{id:"介绍",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#介绍","aria-hidden":"true"},"#"),s(" 介绍")],-1),d=n("p",null,"Chocolatey是Windows上的包管理工具，就是安装软件包的。",-1),u=n("h1",{id:"_1-系统要求",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-系统要求","aria-hidden":"true"},"#"),s(" 1. 系统要求")],-1),h=n("li",null,[n("p",null,"Windows 7+ / Windows Server 2003+")],-1),v=n("li",null,[n("p",null,"PowerShell v2+")],-1),k=n("li",null,[n("p",null,".NET Framework 4+")],-1),m={href:"http://xn--6oqx61aba50d8cx6ogv7dyvyaga259e.net",target:"_blank",rel:"noopener noreferrer"},_=p(`<h1 id="_2-安装" tabindex="-1"><a class="header-anchor" href="#_2-安装" aria-hidden="true">#</a> 2. 安装</h1><p>1、管理员方式运行PowerShell</p><p>2、使用PoerShell安装</p><p>使用<code>PowerShell</code>，您必须确保<code>Get-ExecutionPolicy</code>不受限制(<strong>Restricted</strong>)</p><div class="language-csharp line-numbers-mode" data-ext="cs"><pre class="language-csharp"><code>Get<span class="token operator">-</span>ExecutionPolicy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果返回的是<code>Restricted</code>，继续运行下面的命令：</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code>Set-ExecutionPolicy AllSigned
#或者
Set-ExecutionPolicy Bypass -Scope Process
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后运行下面命令：</p><div class="language-csharp line-numbers-mode" data-ext="cs"><pre class="language-csharp"><code>Set<span class="token operator">-</span>ExecutionPolicy Bypass <span class="token operator">-</span>Scope Process <span class="token operator">-</span>Force<span class="token punctuation">;</span> <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>ServicePointManager</span></span><span class="token punctuation">]</span><span class="token punctuation">::</span>SecurityProtocol <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>ServicePointManager</span></span><span class="token punctuation">]</span><span class="token punctuation">::</span>SecurityProtocol <span class="token operator">-</span>bor <span class="token number">3072</span><span class="token punctuation">;</span> iex <span class="token punctuation">(</span><span class="token punctuation">(</span>New<span class="token operator">-</span>Object System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>WebClient<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">DownloadString</span><span class="token punctuation">(</span>&#39;https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>chocolatey<span class="token punctuation">.</span>org<span class="token operator">/</span>install<span class="token punctuation">.</span>ps1&#39;<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>等待安装完成</p><h1 id="_3-常用命令" tabindex="-1"><a class="header-anchor" href="#_3-常用命令" aria-hidden="true">#</a> 3. 常用命令</h1><div class="language-csharp line-numbers-mode" data-ext="cs"><pre class="language-csharp"><code><span class="token preprocessor property"># 安装</span>
choco install packagename

<span class="token preprocessor property"># 卸载</span>
choco uninstall packagename

<span class="token preprocessor property"># 搜索</span>
list、search、find

<span class="token preprocessor property"># 帮助 查看命令功能解释</span>
choco <span class="token punctuation">[</span>command<span class="token punctuation">]</span> <span class="token operator">-</span>help
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12);function b(g,x){const a=l("ExternalLinkIcon");return t(),o("div",null,[r,d,u,n("ul",null,[h,v,k,n("li",null,[n("ul",null,[n("li",null,[s("如果没安装，"),n("a",m,[s("安装程序就会尝试安装.net"),c(a)]),s(" framework4.0")])])])]),_])}const S=e(i,[["render",b],["__file","chocolatey.html.vue"]]);export{S as default};