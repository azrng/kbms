import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as a,d as n}from"./app-S-drW72G.js";const l={},h=n(`<h3 id="创建数据表" tabindex="-1"><a class="header-anchor" href="#创建数据表"><span>创建数据表</span></a></h3><p>通用语法： CREATE TABLE table_name (column_name column_type); 以下例子中我们将在runoob数据库中创建数据表runoob_tbl：</p><div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" data-title="sql" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">CREATE</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> TABLE</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> IF</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> NOT</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> EXISTS</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> \`chat.receptionist_buystatus\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">  \`buystatusId\`</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> bigint</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">not null</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> COMMENT </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;置忙状态ID&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">  \`name\`</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> VARCHAR</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">not null</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> COMMENT </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;置忙名称&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">  \`create_time\`</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> bigint</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">not null</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> COMMENT </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;添加时间&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">   PRIMARY KEY</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">\`BuyStatusId\`</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> BTREE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)ENGINE </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> InnoDB </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">CHARACTER</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> SET</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> utf8 </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">COLLATE</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> utf8_general_ci COMMENT </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;置忙状态表&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> ROW_FORMAT </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> Dynamic</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实例解析： • 如果你不想字段为 NULL 可以设置字段的属性为 NOT NULL， 在操作数据库时如果输入该字段的数据为NULL ，就会报错。 • AUTO_INCREMENT定义列为自增的属性，一般用于主键，数值会自动加1。 • PRIMARY KEY关键字用于定义列为主键。 您可以使用多列来定义主键，列间以逗号分隔。 • ENGINE 设置存储引擎，CHARSET 设置编码。 插入数据 INSERT INTO table_name ( field1, field2,...fieldN )                       VALUES                       ( value1, value2,...valueN ); insert插入多条数据 INSERT INTO table_name  (field1, field2,...fieldN)  VALUES  (valueA1,valueA2,...valueAN),(valueB1,valueB2,...valueBN),(valueC1,valueC2,...valueCN)......; 更新数据 UPDATE table_name SET field1=new-value1, field2=new-value2 [WHERE Clause] 查询数据 SELECT column_name,column_name FROM table_name [WHERE Clause] [LIMIT N][ OFFSET M] 删除数据表 DROP TABLE table_name ;  删除表内全部数据和表结构，立刻释放资源，不管是 Innodb 和 MyISAM; Truncatr table  student;        删除表内全部数据，保留表结构，立刻释放磁盘空间，不管是 Innodb 和 MyISAM; delete from table_nam； 删除表全部数据，表结构不变，对于 MyISAM 会立刻释放磁盘空间，InnoDB 不会释放磁盘空间; 1、当你不再需要该表时， 用 drop; 2、当你仍要保留该表，但要删除所有记录时， 用 truncate; 3、当你要删除部分记录时， 用 delete。 显示指定数据库中的所有表 SHOW TABLES 显示数据表的属性，属性类型，主键信息 ，是否为 NULL，默认值等其他信息</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">SHOW</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> COLUMNS</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> 数据表</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>显示数据表的详细索引信息，包括PRIMARY KEY（主键） SHOW INDEX FROM 数据表 输出Mysql数据库管理系统的性能及统计信息。 SHOW TABLE STATUS LIKE [FROM db_name] [LIKE &#39;pattern&#39;] \\G:   删除表内数据用 delete。格式为： delete from 表名 where 删除条件; 实例：删除学生表内姓名为张三的记录。 delete from  student where  T_name = &quot;张三&quot;;</p><p>查询数据中的表</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">show</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> tables</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> from</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> 数据库名</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>获取指定数据库下所有的表以及备注</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">SELECT</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    TABLE_NAME</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    TABLE_COMMENT</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">FROM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    information_schema</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">TABLES</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">WHERE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    TABLE_SCHEMA</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;db_name&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>获取指定数据库下指定表的详细信息</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">SELECT</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    TABLE_SCHEMA</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> AS</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;库名&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    TABLE_NAME</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> AS</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;表名&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    COLUMN_NAME</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> AS</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;列名&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    ORDINAL_POSITION</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> AS</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;列的排列顺序&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    COLUMN_DEFAULT</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> AS</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;默认值&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    IS_NULLABLE</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> AS</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;是否为空&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    DATA_TYPE</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> AS</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;数据类型&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    CHARACTER_MAXIMUM_LENGTH</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> AS</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;字符最大长度&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    NUMERIC_PRECISION</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> AS</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;数值精度(最大位数)&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    NUMERIC_SCALE</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> AS</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;小数精度&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    COLUMN_TYPE</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> AS</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;列类型&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    COLUMN_KEY</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;KEY&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    EXTRA</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> AS</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;额外说明&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    COLUMN_COMMENT</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> AS</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;注释&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">FROM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    information_schema</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">COLUMNS</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">WHERE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    TABLE_SCHEMA</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;test&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> and</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> TABLE_NAME</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;user&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">ORDER</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> BY</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    ORDINAL_POSITION</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),e=[h];function t(k,p){return a(),i("div",null,e)}const g=s(l,[["render",t],["__file","shujubiao.html.vue"]]),E=JSON.parse('{"path":"/dataBase/mysql/jichuzhishi/shujubiao.html","title":"数据表","lang":"zh-CN","frontmatter":{"title":"数据表","lang":"zh-CN","date":"2022-09-30T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dataBase"],"tag":["无"],"filename":"shujubiao","slug":"wqzuii","docsId":"60505017","description":"创建数据表 通用语法： CREATE TABLE table_name (column_name column_type); 以下例子中我们将在runoob数据库中创建数据表runoob_tbl： 实例解析： • 如果你不想字段为 NULL 可以设置字段的属性为 NOT NULL， 在操作数据库时如果输入该字段的数据为NULL ，就会报错。 • AUT...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dataBase/mysql/jichuzhishi/shujubiao.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"数据表"}],["meta",{"property":"og:description","content":"创建数据表 通用语法： CREATE TABLE table_name (column_name column_type); 以下例子中我们将在runoob数据库中创建数据表runoob_tbl： 实例解析： • 如果你不想字段为 NULL 可以设置字段的属性为 NOT NULL， 在操作数据库时如果输入该字段的数据为NULL ，就会报错。 • AUT..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-23T15:53:24.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2022-09-30T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-23T15:53:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"数据表\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-09-30T00:00:00.000Z\\",\\"dateModified\\":\\"2023-09-23T15:53:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":3,"title":"创建数据表","slug":"创建数据表","link":"#创建数据表","children":[]}],"git":{"createdTime":1695484404000,"updatedTime":1695484404000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":2.46,"words":737},"filePathRelative":"dataBase/mysql/jichuzhishi/shujubiao.md","localizedDate":"2022年9月30日","excerpt":"<h3>创建数据表</h3>\\n<p>通用语法：\\nCREATE TABLE table_name (column_name column_type);\\n以下例子中我们将在runoob数据库中创建数据表runoob_tbl：</p>\\n<div class=\\"language-sql line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"sql\\" data-title=\\"sql\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">CREATE</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> TABLE</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\"> IF</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> NOT</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> EXISTS</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> `chat.receptionist_buystatus`</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">  `buystatusId`</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> bigint</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">20</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">) </span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">not null</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> COMMENT </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">\'置忙状态ID\'</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">,</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">  `name`</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> VARCHAR</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">20</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">) </span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">not null</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> COMMENT </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">\'置忙名称\'</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">,</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">  `create_time`</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> bigint</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">20</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">) </span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">not null</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> COMMENT </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">\'添加时间\'</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">,</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">   PRIMARY KEY</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">`BuyStatusId`</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">) </span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">using</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> BTREE</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">)ENGINE </span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">=</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> InnoDB </span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">CHARACTER</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> SET</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> =</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> utf8 </span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">COLLATE</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> =</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> utf8_general_ci COMMENT </span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">=</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\"> \'置忙状态表\'</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> ROW_FORMAT </span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">=</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> Dynamic</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{g as comp,E as data};