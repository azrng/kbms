import{_ as s,W as t,X as i,Y as e,Z as a,$ as r,a0 as d,y as o}from"./framework.cf23f0c7.js";const c={},l=e("h1",{id:"介绍",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#介绍","aria-hidden":"true"},"#"),a(" 介绍")],-1),h=e("p",null,"是一个linux操作系统",-1),u=e("h1",{id:"安装",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#安装","aria-hidden":"true"},"#"),a(" 安装")],-1),p={href:"https://releases.ubuntu.com/jammy/",target:"_blank",rel:"noopener noreferrer"},_={href:"https://mirrors.aliyun.com/ubuntu-releases/focal/",target:"_blank",rel:"noopener noreferrer"},m=e("h1",{id:"镜像源",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#镜像源","aria-hidden":"true"},"#"),a(" 镜像源")],-1),b={href:"https://mirrors.tuna.tsinghua.edu.cn/ubuntu/",target:"_blank",rel:"noopener noreferrer"},v=d(`<h1 id="操作命令" tabindex="-1"><a class="header-anchor" href="#操作命令" aria-hidden="true">#</a> 操作命令</h1><h2 id="系统命令" tabindex="-1"><a class="header-anchor" href="#系统命令" aria-hidden="true">#</a> 系统命令</h2><div class="language-csharp line-numbers-mode" data-ext="cs"><pre class="language-csharp"><code><span class="token comment">//查询发行版本号</span>
lsb_release <span class="token operator">-</span>a

<span class="token comment">// 检查系统更新</span>
sudo apt update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="目录操作" tabindex="-1"><a class="header-anchor" href="#目录操作" aria-hidden="true">#</a> 目录操作</h2><div class="language-csharp line-numbers-mode" data-ext="cs"><pre class="language-csharp"><code><span class="token operator">--</span> 创建文件
touch 文件名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="参考文档" tabindex="-1"><a class="header-anchor" href="#参考文档" aria-hidden="true">#</a> 参考文档</h1>`,6),f={href:"https://blog.csdn.net/qq_41004932/article/details/124955610",target:"_blank",rel:"noopener noreferrer"};function g(x,k){const n=o("ExternalLinkIcon");return t(),i("div",null,[l,h,u,e("p",null,[a("系统下载地址："),e("a",p,[a("https://releases.ubuntu.com/jammy/"),r(n)]),a(" (根据需要安装界面版本或者无界面版本)")]),e("p",null,[a("或者下载阿里云的系统镜像："),e("a",_,[a("https://mirrors.aliyun.com/ubuntu-releases/focal/"),r(n)])]),m,e("p",null,[a("镜像源："),e("a",b,[a("https://mirrors.tuna.tsinghua.edu.cn/ubuntu/"),r(n)])]),v,e("p",null,[a("vm安装教程："),e("a",f,[a("https://blog.csdn.net/qq_41004932/article/details/124955610"),r(n)])])])}const q=s(c,[["render",g],["__file","overview.html.vue"]]);export{q as default};