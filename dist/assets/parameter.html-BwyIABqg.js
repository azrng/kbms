import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as p,o as c,c as o,a as n,b as s,d as l,e as a}from"./app-vSdX8vi3.js";const i={},u=a(`<h2 id="公共" tabindex="-1"><a class="header-anchor" href="#公共"><span>公共</span></a></h2><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> parameters <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DynamicParameters</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
parameters<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;@stime&quot;</span><span class="token punctuation">,</span> input<span class="token punctuation">.</span>StartTime<span class="token punctuation">.</span><span class="token function">To24HString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> DbType<span class="token punctuation">.</span>DateTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,2),r={class:"hint-container tip"},d=n("p",{class:"hint-container-title"},"提示",-1),k={href:"https://mp.weixin.qq.com/s/CGswG-wWIf7capeAYe_Stg",target:"_blank",rel:"noopener noreferrer"},m=a(`<h2 id="" tabindex="-1"><a class="header-anchor" href="#"><span>=</span></a></h2><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token class-name">SqlCommand</span> comm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SqlCommand</span><span class="token punctuation">(</span><span class="token string">@&quot;
   SELECT * 
   FROM   Products 
   WHERE  Category_ID = @categoryid&quot;</span><span class="token punctuation">,</span> 
   conn<span class="token punctuation">)</span><span class="token punctuation">;</span>
comm<span class="token punctuation">.</span>Parameters<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;@categoryid&quot;</span><span class="token punctuation">,</span> SqlDbType<span class="token punctuation">.</span>Int<span class="token punctuation">)</span><span class="token punctuation">;</span>
comm<span class="token punctuation">.</span>Parameters<span class="token punctuation">[</span><span class="token string">&quot;@categoryid&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Value <span class="token operator">=</span> CategoryID<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql"><span>MySql</span></a></h3><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name">List<span class="token punctuation">&lt;</span>TopicCitys<span class="token punctuation">&gt;</span></span> <span class="token function">GetCustomerHistorBestList</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> TopicLibaryId<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> db <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">RepositoryBase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">BeginTrans</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">string</span></span> strSql <span class="token operator">=</span> <span class="token keyword">string</span><span class="token punctuation">.</span><span class="token function">Format</span><span class="token punctuation">(</span><span class="token string">@&quot;select a.*,b.F_id topicid from  yht_cityinfo as a left join yht_topic as b on a.CityName=b.CityName 
and b.TopicLibaryId =@TopicLibaryId&quot;</span><span class="token punctuation">,</span> TopicLibaryId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">DbParameter<span class="token punctuation">[</span><span class="token punctuation">]</span></span> parameters <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MySqlParameter</span><span class="token punctuation">(</span><span class="token string">&quot;@TopicLibaryId&quot;</span><span class="token punctuation">,</span>TopicLibaryId<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
   或者
      <span class="token class-name">SqlParameter<span class="token punctuation">[</span><span class="token punctuation">]</span></span> parameters <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MySqlParameter</span><span class="token punctuation">(</span><span class="token string">&quot;@TopicLibaryId&quot;</span><span class="token punctuation">,</span>TopicLibaryId<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">FindList</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>TopicCitys<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>strSql<span class="token punctuation">,</span>parameters<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="clickhourse" tabindex="-1"><a class="header-anchor" href="#clickhourse"><span>clickhourse</span></a></h3><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>var conn = new ClickHouseConnection(connectionString);

var selectSql = &quot;select count(1) from user where id =@id&quot;;
var parameter = new DynamicParameters();
parameter.Add(&quot;@id&quot;, 1);
var num = await conn.QueryFirstOrDefaultAsync&lt;int&gt;(selectSql, parameter);
Console.WriteLine(num);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="like" tabindex="-1"><a class="header-anchor" href="#like"><span>Like</span></a></h2><p>模糊查询</p><h3 id="mysql-1" tabindex="-1"><a class="header-anchor" href="#mysql-1"><span>MySql</span></a></h3><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// 后台管理系统用户列表</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>RealName<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>真实姓名<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>PhoneNumber<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>手机号码<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>returns</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>returns</span><span class="token punctuation">&gt;</span></span></span>
<span class="token keyword">public</span> <span class="token return-type class-name">List<span class="token punctuation">&lt;</span>CustomerInfoResponse<span class="token punctuation">&gt;</span></span> <span class="token function">GetCustomerDeployList</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> db <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">RepositoryBase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">BeginTrans</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">var</span></span> sb <span class="token operator">=</span> <span class="token string">&quot;SELECT * from el_cardrecord c WHERE c.a.RealName like @RealName&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name">MySqlParameter<span class="token punctuation">[</span><span class="token punctuation">]</span></span> parameters <span class="token operator">=</span> <span class="token punctuation">{</span>
           <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MySqlParameter</span><span class="token punctuation">(</span><span class="token string">&quot;@F_Id&quot;</span><span class="token punctuation">,</span><span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
           <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MySqlParameter</span><span class="token punctuation">(</span><span class="token string">&quot;@RealName&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;%&quot;</span><span class="token operator">+</span><span class="token keyword">value</span><span class="token operator">+</span><span class="token string">&quot;%&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
           <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MySqlParameter</span><span class="token punctuation">(</span><span class="token string">&quot;@CellPhoneNumber&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;%&quot;</span><span class="token operator">+</span><span class="token keyword">value</span><span class="token operator">+</span><span class="token string">&quot;%&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
           <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MySqlParameter</span><span class="token punctuation">(</span><span class="token string">&quot;@IdCardNumber&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;%&quot;</span><span class="token operator">+</span><span class="token keyword">value</span><span class="token operator">+</span><span class="token string">&quot;%&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> db<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">FindList</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>CustomerInfoResponse<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>sb<span class="token punctuation">,</span> parameters<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pgsql" tabindex="-1"><a class="header-anchor" href="#pgsql"><span>Pgsql</span></a></h3><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> sql <span class="token operator">=</span> <span class="token string">&quot;SELECT * FROM my_table WHERE name LIKE @Search&quot;</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> <span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">QueryAsync</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token punctuation">{</span> Search <span class="token operator">=</span> search <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> sql <span class="token operator">=</span> <span class="token string">&quot;SELECT * FROM my_table WHERE name ILIKE @Search&quot;</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> <span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">QueryAsync</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token punctuation">{</span> Search <span class="token operator">=</span> search <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Postgres 中，ILIKE 运算符支持大小写不敏感的模糊匹配，将运算符从 LIKE 更改为 ILIKE。查询结果将是大小写不敏感的模糊匹配。</p><h2 id="in-not-in" tabindex="-1"><a class="header-anchor" href="#in-not-in"><span>In/Not in</span></a></h2><h3 id="sqlserver" tabindex="-1"><a class="header-anchor" href="#sqlserver"><span>sqlserver</span></a></h3><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>var parameters = new DynamicParameters();

// in参数化
var selectSql = &quot;select count(1) from Users where account IN @account&quot;;
selectSql = &quot;select count(1) from Users where account IN (@account)&quot;;
parameters.Add(&quot;@account&quot;, new List&lt;string&gt; { &quot;admin11&quot; });
var count = await connection.QueryFirstOrDefaultAsync&lt;int&gt;(selectSql, parameters);
count.Dump();


// not in 参数化
selectSql = &quot;select count(1) from Users where account NOT IN(@account2)&quot;;
selectSql = &quot;select count(1) from Users where account NOT IN @account2&quot;;
parameters.Add(&quot;@account2&quot;, new List&lt;string&gt; { &quot;admin&quot; });
count = await connection.QueryFirstOrDefaultAsync&lt;int&gt;(selectSql, parameters);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mysql-2" tabindex="-1"><a class="header-anchor" href="#mysql-2"><span>mysql</span></a></h3><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> ids <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">int</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// in</span>
<span class="token class-name"><span class="token keyword">var</span></span> sql <span class="token operator">=</span> <span class="token string">&quot;SELECT * FROM my_table WHERE id IN @Ids&quot;</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> <span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">QueryAsync</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token punctuation">{</span> Ids <span class="token operator">=</span> ids <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// not in</span>
<span class="token class-name"><span class="token keyword">var</span></span> sql <span class="token operator">=</span> <span class="token string">&quot;SELECT * FROM my_table WHERE id NOT IN @Ids&quot;</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> <span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">QueryAsync</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token punctuation">{</span> Ids <span class="token operator">=</span> ids <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pgsql-1" tabindex="-1"><a class="header-anchor" href="#pgsql-1"><span>pgsql</span></a></h3><p>in示例</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>var ids = new List&lt;int&gt;() { 1, 2, 3 };

var sql = &quot;SELECT * FROM my_table v WHERE  v.visit_state_id =ANY(@notValidVisitCodes)&quot;;
var dapperParam = new DynamicParameters();
dapperParam.Add(&quot;@notValidVisitCodes&quot;, ids);// 这里ids使用list或者array都可以
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>not in示例</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">int</span><span class="token punctuation">&gt;</span></span> ids <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">int</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 查询visit_state_id不包含某一个值的参数化查询方法</span>
<span class="token class-name"><span class="token keyword">var</span></span> sql <span class="token operator">=</span> <span class="token string">&quot;SELECT * FROM my_table v WHERE  NOT (v.visit_state_id =ANY(@notValidVisitCodes))&quot;</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> dapperParam <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DynamicParameters</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dapperParam<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;@notValidVisitCodes&quot;</span><span class="token punctuation">,</span> ids<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 这里使用list或者array都可以</span>

<span class="token comment">// 查询不在这个集合的账号</span>
<span class="token class-name"><span class="token keyword">var</span></span> sql <span class="token operator">=</span> <span class="token string">&quot;select count(1) from  sample.\\&quot;user\\&quot; where account !=ANY(@Ids)&quot;</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> <span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">QueryAsync</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token punctuation">{</span> Ids <span class="token operator">=</span> ids<span class="token punctuation">.</span><span class="token function">ToArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="oracle" tabindex="-1"><a class="header-anchor" href="#oracle"><span>oracle</span></a></h3><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>var conn = new OracleConnection(connectionString);

// in 参数化
var selectSql = &quot;select count(1) from SYS_CODE_DICT where ID in :id&quot;;
var parameter = new DynamicParameters();
parameter.Add(&quot;@id&quot;, new List&lt;int&gt; { 1, 2 });
var num = await conn.QueryFirstOrDefaultAsync&lt;int&gt;(selectSql, parameter);
Console.WriteLine(num);

// not in 参数化
selectSql = &quot;select count(1) from SYS_CODE_DICT where ID not in :id2&quot;;
parameter.Add(&quot;@id2&quot;, new List&lt;int&gt; { 1, 2 });
var num2 = await conn.QueryFirstOrDefaultAsync&lt;int&gt;(selectSql, parameter);
Console.WriteLine(num2);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="clickhourse-1" tabindex="-1"><a class="header-anchor" href="#clickhourse-1"><span>clickhourse</span></a></h3><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>var connectionString = &quot;Host=localhost;Port=8123;Database=sample;User=default;Password=Clickhouse123$;Compress=True;CheckCompressedHash=False;Compressor=lz4;&quot;;
var conn = new ClickHouseConnection(connectionString);

// 等号+dapper参数化
var selectSql = &quot;select count(1) from user where id =@id&quot;;
var parameter = new DynamicParameters();
parameter.Add(&quot;@id&quot;, 1);
var num = await conn.QueryFirstOrDefaultAsync&lt;int&gt;(selectSql, parameter);
Console.WriteLine(num);

// in+dapper参数化没有测试成功
// var selectSql = &quot;select count(1) from user where id in @id&quot;;
// var parameter = new DynamicParameters();
// parameter.Add(&quot;@id&quot;, new List&lt;int&gt; { 1, 2 }, DbType.Object);
// var num = await conn.QueryFirstOrDefaultAsync&lt;int&gt;(selectSql, parameter);
// Console.WriteLine(num);

// 原生的in参数化
// var com = conn.CreateCommand();
// com.CommandText = selectSql;
// var p = new ClickHouseParameter
// {
//     DbType = DbType.Object,
//     ParameterName = &quot;id&quot;,
//     Value = new List&lt;int&gt; { 1, 2 }
// };
// com.Parameters.Add(p);
//  conn.Open();
// var num =  com.ExecuteScalar();
// Console.WriteLine(num);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,27);function v(b,g){const e=p("ExternalLinkIcon");return c(),o("div",null,[u,n("div",r,[d,n("p",null,[s("大多数情况下这个DbType是可以直接不写，忽略的，但是有时候这个类型还是很重要的，会导致和数据库类型不一致的情况，然后导致查询变慢，比如"),n("a",k,[s("一次不规范的参数化导致的超时问题"),l(e)])])]),m])}const h=t(i,[["render",v],["__file","parameter.html.vue"]]),w=JSON.parse('{"path":"/orm/dapper/parameter.html","title":"参数化查询","lang":"zh-CN","frontmatter":{"title":"参数化查询","lang":"zh-CN","date":"2023-06-13T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["orm"],"tag":["无"],"filename":"canshuhuachaxun","slug":"sl261q","docsId":"70253182","description":"公共 提示 大多数情况下这个DbType是可以直接不写，忽略的，但是有时候这个类型还是很重要的，会导致和数据库类型不一致的情况，然后导致查询变慢，比如一次不规范的参数化导致的超时问题 = MySql clickhourse Like 模糊查询 MySql Pgsql 在 Postgres 中，ILIKE 运算符支持大小写不敏感的模糊匹配，将运算符从 L...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/orm/dapper/parameter.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"参数化查询"}],["meta",{"property":"og:description","content":"公共 提示 大多数情况下这个DbType是可以直接不写，忽略的，但是有时候这个类型还是很重要的，会导致和数据库类型不一致的情况，然后导致查询变慢，比如一次不规范的参数化导致的超时问题 = MySql clickhourse Like 模糊查询 MySql Pgsql 在 Postgres 中，ILIKE 运算符支持大小写不敏感的模糊匹配，将运算符从 L..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-09T15:09:06.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-06-13T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-09T15:09:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"参数化查询\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-06-13T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-09T15:09:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"公共","slug":"公共","link":"#公共","children":[]},{"level":2,"title":"=","slug":"","link":"#","children":[{"level":3,"title":"MySql","slug":"mysql","link":"#mysql","children":[]},{"level":3,"title":"clickhourse","slug":"clickhourse","link":"#clickhourse","children":[]}]},{"level":2,"title":"Like","slug":"like","link":"#like","children":[{"level":3,"title":"MySql","slug":"mysql-1","link":"#mysql-1","children":[]},{"level":3,"title":"Pgsql","slug":"pgsql","link":"#pgsql","children":[]}]},{"level":2,"title":"In/Not in","slug":"in-not-in","link":"#in-not-in","children":[{"level":3,"title":"sqlserver","slug":"sqlserver","link":"#sqlserver","children":[]},{"level":3,"title":"mysql","slug":"mysql-2","link":"#mysql-2","children":[]},{"level":3,"title":"pgsql","slug":"pgsql-1","link":"#pgsql-1","children":[]},{"level":3,"title":"oracle","slug":"oracle","link":"#oracle","children":[]},{"level":3,"title":"clickhourse","slug":"clickhourse-1","link":"#clickhourse-1","children":[]}]}],"git":{"createdTime":1690042937000,"updatedTime":1709996946000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":3.02,"words":907},"filePathRelative":"orm/dapper/parameter.md","localizedDate":"2023年6月13日","excerpt":"<h2>公共</h2>\\n<div class=\\"language-csharp\\" data-ext=\\"cs\\" data-title=\\"cs\\"><pre class=\\"language-csharp\\"><code><span class=\\"token class-name\\"><span class=\\"token keyword\\">var</span></span> parameters <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token constructor-invocation class-name\\">DynamicParameters</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> \\nparameters<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Add</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"@stime\\"</span><span class=\\"token punctuation\\">,</span> input<span class=\\"token punctuation\\">.</span>StartTime<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">To24HString</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> DbType<span class=\\"token punctuation\\">.</span>DateTime<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{h as comp,w as data};