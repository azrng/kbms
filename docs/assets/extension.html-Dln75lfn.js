import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as e,d as t}from"./app-HmxoaDfj.js";const a={},n=t(`<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2><p>扩展插件说明：<a href="https://pigsty.cc/zh/docs/pgsql/extension/" target="_blank" rel="noopener noreferrer">https://pigsty.cc/zh/docs/pgsql/extension/</a></p><h2 id="pg-bigm" tabindex="-1"><a class="header-anchor" href="#pg-bigm"><span>pg_bigm</span></a></h2><p>需要提前安装数据库扩展<a href="http://pgbigm.osdn.jp/pg_bigm_en-1-2.html" target="_blank" rel="noopener noreferrer">pg_bigm文档</a>,可以实现的效果如名字搜索使用like可以走索引查询</p><div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" data-title="sql" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">CREATE</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> EXTENSION pg_bigm;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">-- 支持  &#39;%张三%&#39;  走索引查询</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">CREATE</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> INDEX</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> lab_report_report_name_index</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> ON</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> lab_report </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">USING</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> gin (report_name </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">public</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">gin_bigm_ops</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="parquet-s3-fdw" tabindex="-1"><a class="header-anchor" href="#parquet-s3-fdw"><span>parquet_s3_fdw</span></a></h2><p>实现效果是讲patquet从s3同步到pgsql并实现查询。</p><p>parquet_s3_fdw仓库地址：<a href="https://github.com/pgspider/parquet_s3_fdw" target="_blank" rel="noopener noreferrer">https://github.com/pgspider/parquet_s3_fdw</a></p><p>中文说明：https://hub.docker.com/layers/dgraur/postgres_parquet/13/images/sha256-f5c8bd81f2d32701b4a2a86c24517f627505779f294f90abdad9229084fc991f?context=explore</p><p>已经封装好的镜像：https://hub.docker.com/layers/dgraur/postgres_parquet/13/images/sha256-f5c8bd81f2d32701b4a2a86c24517f627505779f294f90abdad9229084fc991f?context=explore</p><p>ChoETL.Parquet包 可以将csv转parquet格式</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">string</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> csv</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> @&quot;report_id,pat_base_id,patient_id,patient_name,sex_code,sex_name</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">24257778,3403184,2934726,袁 * 琪,1,女性</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">45187999,3959747,331688,毛 * 玉,2,女性&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//using (var r = ChoCSVReader.LoadText(csv)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//	.WithFirstLineHeader()</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//	.WithMaxScanRows(2)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//	.QuoteAllFields()</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//	)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//	using (var w = new ChoParquetWriter(@&quot;E:\\temp\\aa.parquet&quot;))</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//	{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//		w.Write(r);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//	}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> aa</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> ChoParquetReader</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">Deserialize</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">@&quot;E:\\temp\\aa.parquet&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">aa</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">Dump</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),l=[n];function p(h,r){return e(),s("div",null,l)}const g=i(a,[["render",p],["__file","extension.html.vue"]]),o=JSON.parse('{"path":"/dataBase/postgresql/extension.html","title":"扩展","lang":"zh-CN","frontmatter":{"title":"扩展","lang":"zh-CN","date":"2024-07-17T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dataBase"],"tag":["pgsql"],"description":"概述 扩展插件说明：https://pigsty.cc/zh/docs/pgsql/extension/ pg_bigm 需要提前安装数据库扩展pg_bigm文档,可以实现的效果如名字搜索使用like可以走索引查询 parquet_s3_fdw 实现效果是讲patquet从s3同步到pgsql并实现查询。 parquet_s3_fdw仓库地址：http...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dataBase/postgresql/extension.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"扩展"}],["meta",{"property":"og:description","content":"概述 扩展插件说明：https://pigsty.cc/zh/docs/pgsql/extension/ pg_bigm 需要提前安装数据库扩展pg_bigm文档,可以实现的效果如名字搜索使用like可以走索引查询 parquet_s3_fdw 实现效果是讲patquet从s3同步到pgsql并实现查询。 parquet_s3_fdw仓库地址：http..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-20T14:48:53.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"pgsql"}],["meta",{"property":"article:published_time","content":"2024-07-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-20T14:48:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"扩展\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-20T14:48:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"pg_bigm","slug":"pg-bigm","link":"#pg-bigm","children":[]},{"level":2,"title":"parquet_s3_fdw","slug":"parquet-s3-fdw","link":"#parquet-s3-fdw","children":[]}],"git":{"createdTime":1721225279000,"updatedTime":1721486933000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":2}]},"readingTime":{"minutes":0.73,"words":220},"filePathRelative":"dataBase/postgresql/extension.md","localizedDate":"2024年7月17日","excerpt":"<h2>概述</h2>\\n<p>扩展插件说明：<a href=\\"https://pigsty.cc/zh/docs/pgsql/extension/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://pigsty.cc/zh/docs/pgsql/extension/</a></p>\\n<h2>pg_bigm</h2>\\n<p>需要提前安装数据库扩展<a href=\\"http://pgbigm.osdn.jp/pg_bigm_en-1-2.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">pg_bigm文档</a>,可以实现的效果如名字搜索使用like可以走索引查询</p>","autoDesc":true}');export{g as comp,o as data};