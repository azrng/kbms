import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,e as t}from"./app-vSdX8vi3.js";const e={},o=t(`<h2 id="时间" tabindex="-1"><a class="header-anchor" href="#时间"><span>时间</span></a></h2><p>pg数据库有两个时间类型<code>timestamp</code>和<code>timestamptz</code>，其中<code>timestamp</code>是<code>timestamp without time zone</code>的别名，<code>timestamptz</code>是<code>timestamp with time zone</code>的别名。</p><ul><li>timestamp应存储所在时区的本地时间</li><li>timestamptz 应存储utc时间</li></ul><h2 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串"><span>字符串</span></a></h2><p>varchar：存储固定长度的文本数据 text：存储大量文本数据</p><h2 id="范围类型" tabindex="-1"><a class="header-anchor" href="#范围类型"><span>范围类型</span></a></h2><p>PostgreSQL中的范围类型表示其底层类型的值范围。Postgres提供了几个内置的范围类型:<code>int4range</code>和<code>int8range</code>表示int和bigint类型的范围，<code>numrange </code>-数字范围，<code>tstzrange</code>, <code>daterange</code>和<code>tsrange</code>表示时间戳，日期和时间类型的范围。</p><p>示例</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token keyword">public</span><span class="token punctuation">.</span><span class="token string">&quot;Meetings&quot;</span>
<span class="token punctuation">(</span>
    <span class="token string">&quot;Id&quot;</span> <span class="token keyword">integer</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> GENERATED <span class="token keyword">BY</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">AS</span> <span class="token keyword">IDENTITY</span> <span class="token punctuation">(</span> INCREMENT <span class="token number">1</span> <span class="token keyword">START</span> <span class="token number">1</span> MINVALUE <span class="token number">1</span> MAXVALUE <span class="token number">2147483647</span> CACHE <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token string">&quot;RoomName&quot;</span> <span class="token keyword">character</span> <span class="token keyword">varying</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token string">&quot;Title&quot;</span> <span class="token keyword">character</span> <span class="token keyword">varying</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token string">&quot;Time&quot;</span> tstzrange <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token keyword">CONSTRAINT</span> <span class="token string">&quot;PK_Meetings&quot;</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token string">&quot;Id&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>

<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token keyword">public</span><span class="token punctuation">.</span><span class="token string">&quot;Meetings&quot;</span><span class="token punctuation">(</span><span class="token string">&quot;RoomName&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Title&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Time&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">&#39;Winterfell&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;PostgreSQL Demo&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;[2023-12-23 11:30, 2023-12-23 12:30)&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token keyword">public</span><span class="token punctuation">.</span><span class="token string">&quot;Meetings&quot;</span><span class="token punctuation">(</span><span class="token string">&quot;RoomName&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Title&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Time&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">&#39;Jobria&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Npgsql Demo&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;[2023-12-23 13:00, 2023-12-23 13:30]&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token keyword">public</span><span class="token punctuation">.</span><span class="token string">&quot;Meetings&quot;</span><span class="token punctuation">(</span><span class="token string">&quot;RoomName&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Title&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Time&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">&#39;Casterly Rock&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Upgrade PostgreSQL&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;[2023-12-23 14:00, 2023-12-23 15:30]&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>PostgreSQL 范围类型和 Entity Framework Core：https://www.giorgi.dev/database/postgresql-range-types-entity-framework/</p>`,10),p=[o];function i(c,l){return s(),a("div",null,p)}const d=n(e,[["render",i],["__file","biaoziduanleixing.html.vue"]]),m=JSON.parse('{"path":"/dataBase/postgresql/biaoziduanleixing/biaoziduanleixing.html","title":"表字段类型","lang":"zh-CN","frontmatter":{"title":"表字段类型","lang":"zh-CN","date":"2023-03-23T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dataBase"],"tag":["无"],"filename":"biaoziduanleixing","slug":"dkp7cg","docsId":"69739396","description":"时间 pg数据库有两个时间类型timestamp和timestamptz，其中timestamp是timestamp without time zone的别名，timestamptz是timestamp with time zone的别名。 timestamp应存储所在时区的本地时间 timestamptz 应存储utc时间 字符串 varchar：存...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dataBase/postgresql/biaoziduanleixing/biaoziduanleixing.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"表字段类型"}],["meta",{"property":"og:description","content":"时间 pg数据库有两个时间类型timestamp和timestamptz，其中timestamp是timestamp without time zone的别名，timestamptz是timestamp with time zone的别名。 timestamp应存储所在时区的本地时间 timestamptz 应存储utc时间 字符串 varchar：存..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-29T01:32:55.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-03-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-29T01:32:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"表字段类型\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-03-23T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-29T01:32:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"时间","slug":"时间","link":"#时间","children":[]},{"level":2,"title":"字符串","slug":"字符串","link":"#字符串","children":[]},{"level":2,"title":"范围类型","slug":"范围类型","link":"#范围类型","children":[]}],"git":{"createdTime":1695484404000,"updatedTime":1703813575000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1},{"name":"zhangyunpeng","email":"zhang.yunpeng@synyi.com","commits":1}]},"readingTime":{"minutes":1.03,"words":310},"filePathRelative":"dataBase/postgresql/biaoziduanleixing/biaoziduanleixing.md","localizedDate":"2023年3月23日","excerpt":"<h2>时间</h2>\\n<p>pg数据库有两个时间类型<code>timestamp</code>和<code>timestamptz</code>，其中<code>timestamp</code>是<code>timestamp without time zone</code>的别名，<code>timestamptz</code>是<code>timestamp with time zone</code>的别名。</p>\\n<ul>\\n<li>timestamp应存储所在时区的本地时间</li>\\n<li>timestamptz 应存储utc时间</li>\\n</ul>\\n<h2>字符串</h2>\\n","autoDesc":true}');export{d as comp,m as data};