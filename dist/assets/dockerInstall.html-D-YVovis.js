import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as t,o as p,c as r,a as s,b as a,d as o,e as l}from"./app-vSdX8vi3.js";const c={},i=l(`<blockquote><p>SQLserver从2017版本已经开始支持运行在docker上，也就是说sql server现在可以运行在linux下</p></blockquote><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 镜像地址</span>
https://hub.docker.com/_/microsoft-mssql-server  

<span class="token comment">## 拉取镜像</span>
<span class="token function">docker</span> pull mcr.microsoft.com/mssql/server:2017-latest

<span class="token comment">## 查看镜像</span>
<span class="token function">docker</span> images

<span class="token comment">## 启动镜像生成容器 </span>
<span class="token function">docker</span> run <span class="token parameter variable">-e</span> <span class="token string">&quot;ACCEPT_EULA=Y&quot;</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;SA_PASSWORD=Sql987654&quot;</span>  <span class="token parameter variable">-p</span> <span class="token number">1433</span>:1433 <span class="token parameter variable">--name</span> sqlserver  <span class="token parameter variable">-d</span> mcr.microsoft.com/mssql/server:2017-latest

<span class="token comment"># 生成容器 冰创建sa密码以及创建一个新用户以及新用户的密码</span>
<span class="token function">docker</span> run <span class="token parameter variable">--name</span> sqlserver2017  <span class="token parameter variable">-d</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;ACCEPT_EULA=Y&#39;</span>  <span class="token parameter variable">-e</span> <span class="token assign-left variable">SA_PASSWORD</span><span class="token operator">=</span><span class="token string">&#39;Sql987654&#39;</span> <span class="token parameter variable">-e</span> <span class="token assign-left variable">SQLSERVER_DATABASE</span><span class="token operator">=</span>demo <span class="token parameter variable">-e</span> <span class="token assign-left variable">SQLSERVER_USER</span><span class="token operator">=</span>azrng <span class="token parameter variable">-e</span> <span class="token assign-left variable">SQLSERVER_PASSWORD</span><span class="token operator">=</span><span class="token string">&#39;Sql987654321&#39;</span>   <span class="token parameter variable">-p</span> <span class="token number">1433</span>:1433 mcr.microsoft.com/mssql/server:2017-latest
    
<span class="token comment"># 或者使用阿里云镜像源</span>
<span class="token function">docker</span> run <span class="token parameter variable">-e</span> <span class="token string">&quot;ACCEPT_EULA=Y&quot;</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;SA_PASSWORD=Sql987654&quot;</span>  <span class="token parameter variable">-p</span> <span class="token number">1433</span>:1433 <span class="token parameter variable">--name</span> sqlserver2019  <span class="token parameter variable">-d</span> registry.cn-hangzhou.aliyuncs.com/zrng/mssql:2019-latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意： 密码过于简单启动不来会提示：密码长度至少为8位字符，并且包含以下四种字符中的三种:大写字母、小写字母、基数10数字和符号。 记得指定data目录挂载到容器外，避免因为不小心删除容器而丢失了数据</p></blockquote><h2 id="操作" tabindex="-1"><a class="header-anchor" href="#操作"><span>操作</span></a></h2><p>可以使用可视化界面或者命令的方式创建数据库，以下介绍几个常用的命令 通过命令进入容器</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code>docker exec <span class="token operator">-</span>it 容器ID bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建库创建表</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token preprocessor property">## 创建库</span>
CREATE DATABASE TestDB

<span class="token preprocessor property">## 使用库创建表</span>
USE TestDB
CREATE <span class="token return-type class-name">TABLE</span> <span class="token function">UserInfo</span><span class="token punctuation">(</span><span class="token class-name">id</span> INT<span class="token punctuation">,</span> <span class="token return-type class-name">LastName</span> <span class="token function">NVARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token return-type class-name">FirstName</span> <span class="token function">NVARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token preprocessor property">## 查询</span>
Select <span class="token operator">*</span> <span class="token keyword">from</span>  Inventory
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="其他配置" tabindex="-1"><a class="header-anchor" href="#其他配置"><span>其他配置</span></a></h2><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token preprocessor property">## 更改sa的登录密码</span>
sudo docker exec <span class="token operator">-</span>it sql1 <span class="token operator">/</span>opt<span class="token operator">/</span>mssql<span class="token operator">-</span>tools<span class="token operator">/</span>bin<span class="token operator">/</span>sqlcmd  <span class="token operator">-</span>S localhost <span class="token operator">-</span>U SA <span class="token operator">-</span>P <span class="token string">&quot;MyPassWord123&quot;</span>  <span class="token operator">-</span>Q &#39;ALTER LOGIN SA <span class="token class-name">WITH</span> PASSWORD<span class="token operator">=</span><span class="token string">&quot;MyPassWord456&quot;</span>&#39;
    
<span class="token preprocessor property">## 将主机目录装载为数据卷</span>
docker run <span class="token operator">-</span>e &#39;ACCEPT_EULA<span class="token operator">=</span>Y&#39; <span class="token operator">-</span>e &#39;MSSQL_SA_PASSWORD<span class="token operator">=</span>MyPassWord456&#39; <span class="token operator">-</span>p <span class="token number">1433</span><span class="token punctuation">:</span><span class="token number">1433</span> <span class="token operator">-</span>v  <span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>opt<span class="token operator">/</span>mssql <span class="token operator">-</span>d mcr<span class="token punctuation">.</span>microsoft<span class="token punctuation">.</span>com<span class="token operator">/</span>mssql<span class="token operator">/</span>server<span class="token punctuation">:</span><span class="token number">2017</span><span class="token operator">-</span>latest    

<span class="token preprocessor property">## 使用数据卷容器</span>
docker run <span class="token operator">-</span>e &#39;ACCEPT_EULA<span class="token operator">=</span>Y&#39; <span class="token operator">-</span>e &#39;MSSQL_SA_PASSWORD<span class="token operator">=</span>MyPassWord456&#39; <span class="token operator">-</span>p <span class="token number">1433</span><span class="token punctuation">:</span><span class="token number">1433</span> <span class="token operator">-</span><span class="token class-name">v</span> sqlvolume<span class="token punctuation">:</span><span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>opt<span class="token operator">/</span>mssql <span class="token operator">-</span>d mcr<span class="token punctuation">.</span>microsoft<span class="token punctuation">.</span>com<span class="token operator">/</span>mssql<span class="token operator">/</span>server<span class="token punctuation">:</span><span class="token number">2017</span><span class="token operator">-</span>latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文档" tabindex="-1"><a class="header-anchor" href="#参考文档"><span>参考文档</span></a></h2>`,12),m={href:"https://www.cnblogs.com/hulizhong/p/11271739.html",target:"_blank",rel:"noopener noreferrer"};function d(k,u){const n=t("ExternalLinkIcon");return p(),r("div",null,[i,s("blockquote",null,[s("p",null,[a("小世界的野孩子："),s("a",m,[a("https://www.cnblogs.com/hulizhong/p/11271739.html"),o(n)])])])])}const g=e(c,[["render",d],["__file","dockerInstall.html.vue"]]),h=JSON.parse(`{"path":"/dataBase/sqlserver/install/dockerInstall.html","title":"docker下安装","lang":"zh-CN","frontmatter":{"title":"docker下安装","lang":"zh-CN","date":"2023-09-23T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dataBase"],"tag":["无"],"filename":"dockerxiaanzhuang","slug":"agvmtl","docsId":"26493261","description":"SQLserver从2017版本已经开始支持运行在docker上，也就是说sql server现在可以运行在linux下 安装 注意： 密码过于简单启动不来会提示：密码长度至少为8位字符，并且包含以下四种字符中的三种:大写字母、小写字母、基数10数字和符号。 记得指定data目录挂载到容器外，避免因为不小心删除容器而丢失了数据 操作 可以使用可视化界面...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dataBase/sqlserver/install/dockerInstall.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"docker下安装"}],["meta",{"property":"og:description","content":"SQLserver从2017版本已经开始支持运行在docker上，也就是说sql server现在可以运行在linux下 安装 注意： 密码过于简单启动不来会提示：密码长度至少为8位字符，并且包含以下四种字符中的三种:大写字母、小写字母、基数10数字和符号。 记得指定data目录挂载到容器外，避免因为不小心删除容器而丢失了数据 操作 可以使用可视化界面..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-15T08:11:37.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-09-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-11-15T08:11:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"docker下安装\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-09-23T00:00:00.000Z\\",\\"dateModified\\":\\"2023-11-15T08:11:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":2,"title":"操作","slug":"操作","link":"#操作","children":[]},{"level":2,"title":"其他配置","slug":"其他配置","link":"#其他配置","children":[]},{"level":2,"title":"参考文档","slug":"参考文档","link":"#参考文档","children":[]}],"git":{"createdTime":1695484404000,"updatedTime":1700035897000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1},{"name":"zhangyunpeng","email":"zhang.yunpeng@synyi.com","commits":1}]},"readingTime":{"minutes":1.55,"words":465},"filePathRelative":"dataBase/sqlserver/install/dockerInstall.md","localizedDate":"2023年9月23日","excerpt":"<blockquote>\\n<p>SQLserver从2017版本已经开始支持运行在docker上，也就是说sql server现在可以运行在linux下</p>\\n</blockquote>\\n<h2>安装</h2>\\n<div class=\\"language-bash\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code><span class=\\"token comment\\"># 镜像地址</span>\\nhttps://hub.docker.com/_/microsoft-mssql-server  \\n\\n<span class=\\"token comment\\">## 拉取镜像</span>\\n<span class=\\"token function\\">docker</span> pull mcr.microsoft.com/mssql/server:2017-latest\\n\\n<span class=\\"token comment\\">## 查看镜像</span>\\n<span class=\\"token function\\">docker</span> images\\n\\n<span class=\\"token comment\\">## 启动镜像生成容器 </span>\\n<span class=\\"token function\\">docker</span> run <span class=\\"token parameter variable\\">-e</span> <span class=\\"token string\\">\\"ACCEPT_EULA=Y\\"</span> <span class=\\"token parameter variable\\">-e</span> <span class=\\"token string\\">\\"SA_PASSWORD=Sql987654\\"</span>  <span class=\\"token parameter variable\\">-p</span> <span class=\\"token number\\">1433</span>:1433 <span class=\\"token parameter variable\\">--name</span> sqlserver  <span class=\\"token parameter variable\\">-d</span> mcr.microsoft.com/mssql/server:2017-latest\\n\\n<span class=\\"token comment\\"># 生成容器 冰创建sa密码以及创建一个新用户以及新用户的密码</span>\\n<span class=\\"token function\\">docker</span> run <span class=\\"token parameter variable\\">--name</span> sqlserver2017  <span class=\\"token parameter variable\\">-d</span> <span class=\\"token parameter variable\\">-e</span> <span class=\\"token string\\">'ACCEPT_EULA=Y'</span>  <span class=\\"token parameter variable\\">-e</span> <span class=\\"token assign-left variable\\">SA_PASSWORD</span><span class=\\"token operator\\">=</span><span class=\\"token string\\">'Sql987654'</span> <span class=\\"token parameter variable\\">-e</span> <span class=\\"token assign-left variable\\">SQLSERVER_DATABASE</span><span class=\\"token operator\\">=</span>demo <span class=\\"token parameter variable\\">-e</span> <span class=\\"token assign-left variable\\">SQLSERVER_USER</span><span class=\\"token operator\\">=</span>azrng <span class=\\"token parameter variable\\">-e</span> <span class=\\"token assign-left variable\\">SQLSERVER_PASSWORD</span><span class=\\"token operator\\">=</span><span class=\\"token string\\">'Sql987654321'</span>   <span class=\\"token parameter variable\\">-p</span> <span class=\\"token number\\">1433</span>:1433 mcr.microsoft.com/mssql/server:2017-latest\\n    \\n<span class=\\"token comment\\"># 或者使用阿里云镜像源</span>\\n<span class=\\"token function\\">docker</span> run <span class=\\"token parameter variable\\">-e</span> <span class=\\"token string\\">\\"ACCEPT_EULA=Y\\"</span> <span class=\\"token parameter variable\\">-e</span> <span class=\\"token string\\">\\"SA_PASSWORD=Sql987654\\"</span>  <span class=\\"token parameter variable\\">-p</span> <span class=\\"token number\\">1433</span>:1433 <span class=\\"token parameter variable\\">--name</span> sqlserver2019  <span class=\\"token parameter variable\\">-d</span> registry.cn-hangzhou.aliyuncs.com/zrng/mssql:2019-latest\\n</code></pre></div>","autoDesc":true}`);export{g as comp,h as data};