import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as e,e as s}from"./app-vSdX8vi3.js";const t={},i=s(`<h2 id="docker安装" tabindex="-1"><a class="header-anchor" href="#docker安装"><span>docker安装</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">## 拉取镜像</span>
<span class="token function">docker</span> pull nginx

<span class="token comment">## 启动nginx容器</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8080</span>:80 <span class="token parameter variable">--name</span> hellonginx nginx

<span class="token comment">## 进入nginx容器</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> nginx <span class="token function">bash</span>
<span class="token comment">## Nginx.conf文件分为http块  events块 server块 </span>
 
<span class="token comment">## 如果nginx容器使用vi或者vim，需要执行命令安装</span>
<span class="token function">apt-get</span> update
<span class="token function">apt-get</span> <span class="token function">install</span> <span class="token function">vim</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose"><span>docker-compose</span></a></h2><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.1&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span> 
  <span class="token key atrule">nginx</span><span class="token punctuation">:</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx <span class="token comment">#daocloud.io/library/nginx:1.13.2</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span> 
      <span class="token punctuation">-</span> <span class="token datetime number">80:80</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./conf.d<span class="token punctuation">:</span>/etc/nginx/conf.d
      <span class="token comment">## - html:/usr/share/nginx/html</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span> 
        <span class="token punctuation">-</span> my<span class="token punctuation">-</span>bridge

<span class="token key atrule">networks</span><span class="token punctuation">:</span> 
    <span class="token key atrule">my-bridge</span><span class="token punctuation">:</span>
        <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),c=[i];function o(l,p){return a(),e("div",null,c)}const u=n(t,[["render",o],["__file","dockeranzhuangnginx.html.vue"]]),m=JSON.parse('{"path":"/middleware/nginx/anzhuang/dockeranzhuangnginx.html","title":"docker安装nginx","lang":"zh-CN","frontmatter":{"title":"docker安装nginx","lang":"zh-CN","date":"2023-09-21T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["middleware"],"tag":["无"],"filename":"dockeranzhuangnginx","slug":"bddemz","docsId":"29395183","description":"docker安装 docker-compose","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/middleware/nginx/anzhuang/dockeranzhuangnginx.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"docker安装nginx"}],["meta",{"property":"og:description","content":"docker安装 docker-compose"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-19T14:00:28.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-09-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-19T14:00:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"docker安装nginx\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-09-21T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-19T14:00:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"docker安装","slug":"docker安装","link":"#docker安装","children":[]},{"level":2,"title":"docker-compose","slug":"docker-compose","link":"#docker-compose","children":[]}],"git":{"createdTime":1697724028000,"updatedTime":1697724028000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":0.44,"words":131},"filePathRelative":"middleware/nginx/anzhuang/dockeranzhuangnginx.md","localizedDate":"2023年9月21日","excerpt":"<h2>docker安装</h2>\\n<div class=\\"language-bash\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code><span class=\\"token comment\\">## 拉取镜像</span>\\n<span class=\\"token function\\">docker</span> pull nginx\\n\\n<span class=\\"token comment\\">## 启动nginx容器</span>\\n<span class=\\"token function\\">docker</span> run <span class=\\"token parameter variable\\">-d</span> <span class=\\"token parameter variable\\">-p</span> <span class=\\"token number\\">8080</span>:80 <span class=\\"token parameter variable\\">--name</span> hellonginx nginx\\n\\n<span class=\\"token comment\\">## 进入nginx容器</span>\\n<span class=\\"token function\\">docker</span> <span class=\\"token builtin class-name\\">exec</span> <span class=\\"token parameter variable\\">-it</span> nginx <span class=\\"token function\\">bash</span>\\n<span class=\\"token comment\\">## Nginx.conf文件分为http块  events块 server块 </span>\\n \\n<span class=\\"token comment\\">## 如果nginx容器使用vi或者vim，需要执行命令安装</span>\\n<span class=\\"token function\\">apt-get</span> update\\n<span class=\\"token function\\">apt-get</span> <span class=\\"token function\\">install</span> <span class=\\"token function\\">vim</span> \\n</code></pre></div>","autoDesc":true}');export{u as comp,m as data};