import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as a,d as n}from"./app-41nmD-Ik.js";const t={},h=n(`<p>第一种缓存： 服务器端缓存  在ASP.NET中页面缓存的使用方法非常的简单，只需要在aspx页的顶部加这样一句声明即可：     &lt;%@ OutputCache Duration=&quot;60&quot; VaryByParam=&quot;none&quot; %&gt;       Duration：缓存时间，单位是s；      VaryByParam：分号分隔的字符串列表，用于使输出缓存发生变化。默认情况下，这些字符串对应于使用 GET 方法特性发送的查询字符串值，或者使用 POST 方法发送的参数。将该特性设置为多个参数时，对于每个指定参数组合，输出缓存都包含一个不同版本的请求文档。 <strong>varyByParam=&quot;none&quot;</strong> 当 VaryByParam 设置为 none 时，将不考虑任何参数；无论提供什么附加参数，都将向所有用户发送相同的页：  **VaryByParam =“*”**对于每个唯一的请求参数组合，将缓存一个唯一页 第二种缓存 客户端缓存 从cache中获取</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> Bind</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">            DataTable</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> dt</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> DataTable</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();           </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">            if</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Cache</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;Keys&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">                string</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> connstring</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> ConfigurationManager</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">ConnectionStrings</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;DefaultConnection&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">].</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">ConnectionString</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">                SqlConnection</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> conn</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> SqlConnection</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">connstring</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">                conn</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">Open</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">                string</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> sql</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;select top 100000 * from SF_InstanceActivity&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">                SqlDataAdapter</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> da</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> SqlDataAdapter</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">sql</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">conn</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">                da</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">Fill</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">dt</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">                conn</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">Close</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">                // Go get the data from the database</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">                this</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Cache</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">Insert</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;Keys&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">dt</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">DateTime</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Now</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">AddHours</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">), </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">TimeSpan</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Zero</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">            else</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">               dt</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Cache</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;Keys&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">as</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> DataTable</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">            ASPxGridView1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">DataSource</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> dt</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">            ASPxGridView1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">DataBind</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参考文章：<a href="https://www.cnblogs.com/Gxiaopan/p/4187204.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/Gxiaopan/p/4187204.html</a></p>`,3),l=[h];function e(p,k){return a(),i("div",null,l)}const B=s(t,[["render",e],["__file","webformhuancunchuli.html.vue"]]),g=JSON.parse('{"path":"/dotnet/webyingyong/webform/webformhuancunchuli.html","title":"WebForm缓存处理","lang":"zh-CN","frontmatter":{"title":"WebForm缓存处理","lang":"zh-CN","date":"2021-02-17T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dotNET"],"tag":["无"],"filename":"webformhuancunchuli","slug":"oyvelu","docsId":"31541436","description":"第一种缓存： 服务器端缓存 在ASP.NET中页面缓存的使用方法非常的简单，只需要在aspx页的顶部加这样一句声明即可： <%@ OutputCache Duration=\\"60\\" VaryByParam=\\"none\\" %> Duration：缓存时间，单位是s； VaryByParam：分号分隔的字符串列表，用于使输出缓存发生变化。默认情况下，这些字...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dotnet/webyingyong/webform/webformhuancunchuli.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"WebForm缓存处理"}],["meta",{"property":"og:description","content":"第一种缓存： 服务器端缓存 在ASP.NET中页面缓存的使用方法非常的简单，只需要在aspx页的顶部加这样一句声明即可： <%@ OutputCache Duration=\\"60\\" VaryByParam=\\"none\\" %> Duration：缓存时间，单位是s； VaryByParam：分号分隔的字符串列表，用于使输出缓存发生变化。默认情况下，这些字..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-22T08:11:43.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2021-02-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-22T08:11:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"WebForm缓存处理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-02-17T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-22T08:11:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[],"git":{"createdTime":1697962303000,"updatedTime":1697962303000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":1.14,"words":341},"filePathRelative":"dotnet/webyingyong/webform/webformhuancunchuli.md","localizedDate":"2021年2月17日","excerpt":"<p>第一种缓存：\\n服务器端缓存&nbsp; 在ASP.NET中页面缓存的使用方法非常的简单，只需要在aspx页的顶部加这样一句声明即可：\\n&nbsp;&nbsp;&nbsp; &lt;%@ OutputCache Duration=\\"60\\" VaryByParam=\\"none\\" %&gt;&nbsp;\\n&nbsp;&nbsp;&nbsp;&nbsp; Duration：缓存时间，单位是s；\\n&nbsp;&nbsp;&nbsp;&nbsp; VaryByParam：分号分隔的字符串列表，用于使输出缓存发生变化。默认情况下，这些字符串对应于使用 GET 方法特性发送的查询字符串值，或者使用 POST 方法发送的参数。将该特性设置为多个参数时，对于每个指定参数组合，输出缓存都包含一个不同版本的请求文档。\\n<strong>varyByParam=\\"none\\"</strong>&nbsp;当&nbsp;VaryByParam 设置为&nbsp;none 时，将不考虑任何参数；无论提供什么附加参数，都将向所有用户发送相同的页：\\n&nbsp;**VaryByParam =“*”**对于每个唯一的请求参数组合，将缓存一个唯一页\\n第二种缓存\\n客户端缓存 从cache中获取</p>","autoDesc":true}');export{B as comp,g as data};