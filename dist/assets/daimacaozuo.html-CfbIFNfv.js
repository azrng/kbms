import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as o,o as p,c,a as s,b as n,d as t,e as l}from"./app-vSdX8vi3.js";const i={},u=l(`<h2 id="连接" tabindex="-1"><a class="header-anchor" href="#连接"><span>连接</span></a></h2><p>连接数据库并查询</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MongoClient</span><span class="token punctuation">(</span><span class="token string">&quot;mongodb://localhost:27017&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> database <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">GetDatabase</span><span class="token punctuation">(</span><span class="token string">&quot;mydatabase&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> collection <span class="token operator">=</span> database<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetCollection</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>MyEntity<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;mycollection&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 使用 Builders&lt;T&gt;.Filter.Eq 进行查询</span>
<span class="token class-name"><span class="token keyword">var</span></span> filter <span class="token operator">=</span> Builders<span class="token operator">&lt;</span>MyEntity<span class="token operator">&gt;</span><span class="token punctuation">.</span>Filter<span class="token punctuation">.</span><span class="token function">Eq</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span>Id<span class="token punctuation">,</span> <span class="token string">&quot;62a39d27025ca1ba8f1f1c1e&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> collection<span class="token punctuation">.</span><span class="token function">Find</span><span class="token punctuation">(</span>filter<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">FirstOrDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查询" tabindex="-1"><a class="header-anchor" href="#查询"><span>查询</span></a></h2><p>查询时间类型</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">MongoDB<span class="token punctuation">.</span>Bson</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token comment">// 构建查询条件</span>
<span class="token class-name"><span class="token keyword">var</span></span> filter <span class="token operator">=</span> Builders<span class="token operator">&lt;</span>BsonDocument<span class="token operator">&gt;</span><span class="token punctuation">.</span>Filter<span class="token punctuation">.</span><span class="token function">Eq</span><span class="token punctuation">(</span><span class="token string">&quot;DateTime&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BsonDocument</span><span class="token punctuation">(</span><span class="token string">&quot;$date&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BsonDocument</span><span class="token punctuation">(</span><span class="token string">&quot;$numberLong&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1654027230566&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 执行查询</span>
<span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> collection<span class="token punctuation">.</span><span class="token function">Find</span><span class="token punctuation">(</span>filter<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">FirstOrDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取 DateTime 值</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">BsonDateTime</span> bsonDateTime <span class="token operator">=</span> result<span class="token punctuation">[</span><span class="token string">&quot;DateTime&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>AsBsonDateTime<span class="token punctuation">;</span>
    <span class="token class-name">DateTime</span> dateTime <span class="token operator">=</span> bsonDateTime<span class="token punctuation">.</span><span class="token function">ToUniversalTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 使用获取到的 DateTime 值进行后续操作</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2>`,7),r={href:"https://mp.weixin.qq.com/s/QDvE7fgQ_xU9CILXxtAEmA",target:"_blank",rel:"noopener noreferrer"},k={href:"https://mp.weixin.qq.com/s/Pj1vc5F0FP8Y0HJxxURNDA",target:"_blank",rel:"noopener noreferrer"},d={href:"https://mp.weixin.qq.com/s/L89x_MBfo9FVNsxXZonYKA",target:"_blank",rel:"noopener noreferrer"};function m(g,v){const a=o("ExternalLinkIcon");return p(),c("div",null,[u,s("p",null,[s("a",r,[n("https://mp.weixin.qq.com/s/QDvE7fgQ_xU9CILXxtAEmA"),t(a)]),n(" | MongoDB 索引以及在.NET7 中如何创建索引 "),s("a",k,[n("https://mp.weixin.qq.com/s/Pj1vc5F0FP8Y0HJxxURNDA"),t(a)]),n(" | MongoDB入门与实战：学习总结目录 "),s("a",d,[n("https://mp.weixin.qq.com/s/L89x_MBfo9FVNsxXZonYKA"),t(a)]),n(" | MongoDB读写分离设置")])])}const f=e(i,[["render",m],["__file","daimacaozuo.html.vue"]]),x=JSON.parse('{"path":"/dataBase/mongodb/daimacaozuo.html","title":"代码操作","lang":"zh-CN","frontmatter":{"title":"代码操作","lang":"zh-CN","date":"2023-08-05T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dataBase"],"tag":["无"],"filename":"daimacaozuo","slug":"rer69m34t3x586xg","docsId":"133150591","description":"连接 连接数据库并查询 查询 查询时间类型 资料 https://mp.weixin.qq.com/s/QDvE7fgQ_xU9CILXxtAEmA | MongoDB 索引以及在.NET7 中如何创建索引 https://mp.weixin.qq.com/s/Pj1vc5F0FP8Y0HJxxURNDA | MongoDB入门与实战：学习总结目录 h...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dataBase/mongodb/daimacaozuo.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"代码操作"}],["meta",{"property":"og:description","content":"连接 连接数据库并查询 查询 查询时间类型 资料 https://mp.weixin.qq.com/s/QDvE7fgQ_xU9CILXxtAEmA | MongoDB 索引以及在.NET7 中如何创建索引 https://mp.weixin.qq.com/s/Pj1vc5F0FP8Y0HJxxURNDA | MongoDB入门与实战：学习总结目录 h..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-23T15:53:24.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-08-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-23T15:53:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"代码操作\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-08-05T00:00:00.000Z\\",\\"dateModified\\":\\"2023-09-23T15:53:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"连接","slug":"连接","link":"#连接","children":[]},{"level":2,"title":"查询","slug":"查询","link":"#查询","children":[]},{"level":2,"title":"资料","slug":"资料","link":"#资料","children":[]}],"git":{"createdTime":1695484404000,"updatedTime":1695484404000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":0.66,"words":199},"filePathRelative":"dataBase/mongodb/daimacaozuo.md","localizedDate":"2023年8月5日","excerpt":"<h2>连接</h2>\\n<p>连接数据库并查询</p>\\n<div class=\\"language-csharp\\" data-ext=\\"cs\\" data-title=\\"cs\\"><pre class=\\"language-csharp\\"><code><span class=\\"token class-name\\"><span class=\\"token keyword\\">var</span></span> client <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token constructor-invocation class-name\\">MongoClient</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"mongodb://localhost:27017\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\"><span class=\\"token keyword\\">var</span></span> database <span class=\\"token operator\\">=</span> client<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">GetDatabase</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"mydatabase\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\"><span class=\\"token keyword\\">var</span></span> collection <span class=\\"token operator\\">=</span> database<span class=\\"token punctuation\\">.</span><span class=\\"token generic-method\\"><span class=\\"token function\\">GetCollection</span><span class=\\"token generic class-name\\"><span class=\\"token punctuation\\">&lt;</span>MyEntity<span class=\\"token punctuation\\">&gt;</span></span></span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"mycollection\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token comment\\">// 使用 Builders&lt;T&gt;.Filter.Eq 进行查询</span>\\n<span class=\\"token class-name\\"><span class=\\"token keyword\\">var</span></span> filter <span class=\\"token operator\\">=</span> Builders<span class=\\"token operator\\">&lt;</span>MyEntity<span class=\\"token operator\\">&gt;</span><span class=\\"token punctuation\\">.</span>Filter<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Eq</span><span class=\\"token punctuation\\">(</span>x <span class=\\"token operator\\">=&gt;</span> x<span class=\\"token punctuation\\">.</span>Id<span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"62a39d27025ca1ba8f1f1c1e\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token class-name\\"><span class=\\"token keyword\\">var</span></span> result <span class=\\"token operator\\">=</span> collection<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Find</span><span class=\\"token punctuation\\">(</span>filter<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">FirstOrDefault</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{f as comp,x as data};