import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as i,o as p,c as l,a,b as n,d as s,e as r}from"./app-vSdX8vi3.js";const o="/kbms/common/1609075441479-59bbdd19-50d9-4207-807a-02acad3cc249.png",c="/kbms/common/1615520085892-816a08cb-645f-422a-a4f2-4fa6ff71c4ad.webp",d={},u=r('<h2 id="描述" tabindex="-1"><a class="header-anchor" href="#描述"><span>描述</span></a></h2><p>nginx是一个轻量级高性能的Web服务器软件。这是一个比 Apache HTTP Server 更加灵活和轻量级的程序。</p><h3 id="优点" tabindex="-1"><a class="header-anchor" href="#优点"><span>优点</span></a></h3><p>并发能力强、内存消耗少、配置简单、成本低</p><h2 id="在线测试地址" tabindex="-1"><a class="header-anchor" href="#在线测试地址"><span>在线测试地址</span></a></h2><p>https://nginx-playground.wizardzines.com/</p><h2 id="功能" tabindex="-1"><a class="header-anchor" href="#功能"><span>功能</span></a></h2><h3 id="正向代理和反向代理" tabindex="-1"><a class="header-anchor" href="#正向代理和反向代理"><span>正向代理和反向代理</span></a></h3><p><img src="'+o+'" alt="image.png" loading="lazy"><img src="'+c+`" alt="" loading="lazy"></p><h4 id="正向代理-代理客户端" tabindex="-1"><a class="header-anchor" href="#正向代理-代理客户端"><span>正向代理(代理客户端)</span></a></h4><p>正向代理（forward）意思是一个位于客户端和原始服务器 (origin server) 之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标 (原始服务器)，然后代理向原始服务器转交请求并将获得的内容返回给客户端。 正向代理是为我们服务的，即为客户端服务的，客户端可以根据正向代理访问到它本身无法访问到的服务器资源。 正向代理对我们是透明的，对服务端是非透明的，即服务端并不知道自己收到的是来自代理的访问还是来自真实客户端的访问。</p><blockquote><p>用户通过客户端去访问某一个网站然后将生成的响应返回给客户端叫做正向代理。</p></blockquote><h4 id="反向代理-代理服务器" tabindex="-1"><a class="header-anchor" href="#反向代理-代理服务器"><span>反向代理(代理服务器)</span></a></h4><p>反向代理（Reverse Proxy）方式是指以代理服务器来接受 internet 上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给 internet 上请求连接的客户端，此时代理服务器对外就表现为一个反向代理服务器。</p><p>反向代理是为服务端服务的，反向代理可以帮助服务器接收来自客户端的请求，帮助服务器做请求转发，负载均衡等。 反向代理对服务端是透明的，对我们是非透明的，即我们并不知道自己访问的是代理服务器，而服务器知道反向代理在为他服务。</p><blockquote><p>代理服务器接收到请求后转发给内部网络服务器并返回结果叫做反向代理。</p></blockquote><h3 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡"><span>负载均衡</span></a></h3><p>默认提供三种方式负载均衡</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>location <span class="token operator">~</span> <span class="token operator">/</span>blog<span class="token operator">/</span><span class="token punctuation">{</span>
    rewrite <span class="token operator">^</span><span class="token operator">/</span>blog<span class="token operator">/</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token operator">*</span><span class="token punctuation">)</span>$ <span class="token operator">/</span>$<span class="token number">1</span> <span class="token keyword">break</span><span class="token punctuation">;</span> 
    proxy_pass http<span class="token punctuation">:</span><span class="token operator">//</span>myblogapi<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="轮询-默认" tabindex="-1"><a class="header-anchor" href="#轮询-默认"><span>轮询（默认）</span></a></h4><p>没一个请求按照时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>upstream myblogapi <span class="token punctuation">{</span><span class="token comment">#名词不能有下划线</span>
    server <span class="token number">47.104</span><span class="token number">.255</span><span class="token number">.61</span><span class="token punctuation">:</span><span class="token number">8000</span><span class="token punctuation">;</span><span class="token comment">#只写到端口部分就行了</span>
    server <span class="token number">47.104</span><span class="token number">.255</span><span class="token number">.61</span><span class="token punctuation">:</span><span class="token number">8004</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="权重" tabindex="-1"><a class="header-anchor" href="#权重"><span>权重</span></a></h4><p>会将客户端的请求，根据服务器权重的不同，分配不同的数量 weight代表权重，默认为1，权重越高被分配的客户端越多。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>    upstream myblogapi<span class="token punctuation">{</span>
        server <span class="token number">47.104</span><span class="token number">.255</span><span class="token number">.61</span><span class="token punctuation">:</span><span class="token number">8006</span> weight<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">;</span>
        server <span class="token number">47.104</span><span class="token number">.255</span><span class="token number">.61</span><span class="token punctuation">:</span><span class="token number">8016</span> weight<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="ip-hash" tabindex="-1"><a class="header-anchor" href="#ip-hash"><span>ip_hash</span></a></h4><p>每个请求按照访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>    upstream myblogapi<span class="token punctuation">{</span>
        ip_hash
        server <span class="token number">47.104</span><span class="token number">.255</span><span class="token number">.61</span><span class="token punctuation">:</span><span class="token number">8006</span><span class="token punctuation">;</span>
        server <span class="token number">47.104</span><span class="token number">.255</span><span class="token number">.61</span><span class="token punctuation">:</span><span class="token number">8016</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="fair" tabindex="-1"><a class="header-anchor" href="#fair"><span>fair</span></a></h4><p>按照后端服务器的响应时间来分配请求，响应时间短的优先分配</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>    upstream myblogapi<span class="token punctuation">{</span>
        server <span class="token number">47.104</span><span class="token number">.255</span><span class="token number">.61</span><span class="token punctuation">:</span><span class="token number">8006</span><span class="token punctuation">;</span>
        server <span class="token number">47.104</span><span class="token number">.255</span><span class="token number">.61</span><span class="token punctuation">:</span><span class="token number">8016</span><span class="token punctuation">;</span>
        fair<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h2><p>Logs nginx日志 conf.d nginx配置，代理、转发、负载、集群 Conf  nginx配置，一般配置缓存、限流在这个里面</p><h2 id="命令" tabindex="-1"><a class="header-anchor" href="#命令"><span>命令</span></a></h2><div class="language-nginx line-numbers-mode" data-ext="nginx" data-title="nginx"><pre class="language-nginx"><code>nginx -s stop 快速关闭Nginx，可能不保存相关信息，并迅速终止web服务。
nginx -s quit 平稳关闭Nginx，保存相关信息，有安排的结束web服务。
nginx -s reload 因改变了Nginx相关配置，需要重新加载配置而重载。
nginx -s reopen 重新打开日志文件。
nginx -c filename 为 Nginx 指定一个配置文件，来代替缺省的。
nginx -t 不运行，仅仅测试配置文件。nginx 将检查配置文件的语法的正确性，并尝试打开配置文件中所引用到的文件。
nginx -v 显示 nginx 的版本。
nginx -V 显示 nginx 的版本，编译器版本和配置参数。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="可视化界面" tabindex="-1"><a class="header-anchor" href="#可视化界面"><span>可视化界面</span></a></h2><p>nginx-proxy-manage</p><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2>`,38),m={href:"https://blog.csdn.net/m0_49558851/article/details/107786372",target:"_blank",rel:"noopener noreferrer"},h={href:"https://www.bookstack.cn/read/dunwu-nginx-tutorial/docs-nginx-introduction.md",target:"_blank",rel:"noopener noreferrer"},g={href:"https://mp.weixin.qq.com/s/tqTzTeI_QFoufGtXeHDutg",target:"_blank",rel:"noopener noreferrer"},b={href:"https://mp.weixin.qq.com/s/gITjhkeKVyxzVJ9wHXU7bA",target:"_blank",rel:"noopener noreferrer"};function k(v,x){const e=i("ExternalLinkIcon");return p(),l("div",null,[u,a("p",null,[n("学习笔记："),a("a",m,[n("https://blog.csdn.net/m0_49558851/article/details/107786372"),s(e)]),n(" 简明文档："),a("a",h,[n("https://www.bookstack.cn/read/dunwu-nginx-tutorial/docs-nginx-introduction.md"),s(e)]),n(" 学习手册："),a("a",g,[n("https://mp.weixin.qq.com/s/tqTzTeI_QFoufGtXeHDutg"),s(e)]),a("a",b,[n("https://mp.weixin.qq.com/s/gITjhkeKVyxzVJ9wHXU7bA"),s(e)]),n(" | 高可用：Nginx 配合 keepalived")])])}const _=t(d,[["render",k],["__file","nginx.html.vue"]]),w=JSON.parse('{"path":"/middleware/nginx/nginx.html","title":"说明","lang":"zh-CN","frontmatter":{"title":"说明","lang":"zh-CN","date":"2023-10-01T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["middleware"],"tag":["无"],"filename":"nginx","slug":"xtgr8w","docsId":"26511800","description":"描述 nginx是一个轻量级高性能的Web服务器软件。这是一个比 Apache HTTP Server 更加灵活和轻量级的程序。 优点 并发能力强、内存消耗少、配置简单、成本低 在线测试地址 https://nginx-playground.wizardzines.com/ 功能 正向代理和反向代理 image.png 正向代理(代理客户端) 正向代理...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/middleware/nginx/nginx.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"说明"}],["meta",{"property":"og:description","content":"描述 nginx是一个轻量级高性能的Web服务器软件。这是一个比 Apache HTTP Server 更加灵活和轻量级的程序。 优点 并发能力强、内存消耗少、配置简单、成本低 在线测试地址 https://nginx-playground.wizardzines.com/ 功能 正向代理和反向代理 image.png 正向代理(代理客户端) 正向代理..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://azrng.gitee.io/kbms/kbms/common/1609075441479-59bbdd19-50d9-4207-807a-02acad3cc249.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-11T13:50:20.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-10-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-01-11T13:50:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"说明\\",\\"image\\":[\\"https://azrng.gitee.io/kbms/kbms/common/1609075441479-59bbdd19-50d9-4207-807a-02acad3cc249.png\\",\\"https://azrng.gitee.io/kbms/kbms/common/1615520085892-816a08cb-645f-422a-a4f2-4fa6ff71c4ad.webp\\"],\\"datePublished\\":\\"2023-10-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-01-11T13:50:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"描述","slug":"描述","link":"#描述","children":[{"level":3,"title":"优点","slug":"优点","link":"#优点","children":[]}]},{"level":2,"title":"在线测试地址","slug":"在线测试地址","link":"#在线测试地址","children":[]},{"level":2,"title":"功能","slug":"功能","link":"#功能","children":[{"level":3,"title":"正向代理和反向代理","slug":"正向代理和反向代理","link":"#正向代理和反向代理","children":[{"level":4,"title":"正向代理(代理客户端)","slug":"正向代理-代理客户端","link":"#正向代理-代理客户端","children":[]},{"level":4,"title":"反向代理(代理服务器)","slug":"反向代理-代理服务器","link":"#反向代理-代理服务器","children":[]}]},{"level":3,"title":"负载均衡","slug":"负载均衡","link":"#负载均衡","children":[{"level":4,"title":"轮询（默认）","slug":"轮询-默认","link":"#轮询-默认","children":[]},{"level":4,"title":"权重","slug":"权重","link":"#权重","children":[]},{"level":4,"title":"ip_hash","slug":"ip-hash","link":"#ip-hash","children":[]},{"level":4,"title":"fair","slug":"fair","link":"#fair","children":[]}]}]},{"level":2,"title":"配置","slug":"配置","link":"#配置","children":[]},{"level":2,"title":"命令","slug":"命令","link":"#命令","children":[]},{"level":2,"title":"可视化界面","slug":"可视化界面","link":"#可视化界面","children":[]},{"level":2,"title":"资料","slug":"资料","link":"#资料","children":[]}],"git":{"createdTime":1697724028000,"updatedTime":1704981020000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":2}]},"readingTime":{"minutes":3.64,"words":1093},"filePathRelative":"middleware/nginx/nginx.md","localizedDate":"2023年10月1日","excerpt":"<h2>描述</h2>\\n<p>nginx是一个轻量级高性能的Web服务器软件。这是一个比 Apache HTTP Server 更加灵活和轻量级的程序。</p>\\n<h3>优点</h3>\\n<p>并发能力强、内存消耗少、配置简单、成本低</p>\\n<h2>在线测试地址</h2>\\n<p>https://nginx-playground.wizardzines.com/</p>\\n<h2>功能</h2>\\n<h3>正向代理和反向代理</h3>\\n<p><img src=\\"/common/1609075441479-59bbdd19-50d9-4207-807a-02acad3cc249.png\\" alt=\\"image.png\\" loading=\\"lazy\\">\\n<img src=\\"/common/1615520085892-816a08cb-645f-422a-a4f2-4fa6ff71c4ad.webp\\" alt=\\"\\" loading=\\"lazy\\"></p>","autoDesc":true}');export{_ as comp,w as data};