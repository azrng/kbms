import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,d as e}from"./app-CF6xeyXt.js";const n={},t=e(`<h2 id="连接池" tabindex="-1"><a class="header-anchor" href="#连接池"><span>连接池</span></a></h2><p>数据库服务器建立连接的过程是比较耗时的，对此，ADO.NET中使用了连接池来进行优化。在.NET中不同的Data Provider对于连接池的处理方式不尽相同。默认情况下，ADO.NET 启用连接池优化，可以通过连接字符串来配置是否启用连接池。 连接池可以减少和数据库建立连接的次数，连接池中维护着一组活跃的数据库连接。在我们调用IDbConnection的Open方法时，CLR会去连接池中寻找是否有可用的连接，若有则返回该连接而无需与数据库建立新的连接。当我们调用IDbConnection的Close方法时，连接会被连接池回收但不断开与数据库的连接，以备下次使用。连接池中的连接空闲一段时间（约4~8分钟）后或者连接池检测到连接已与服务器断开（需要与服务器通讯才能检测连接是否已断开），那么该连接将会被销毁。 在第一次打开连接时，ADO.NET会根据连接配置来建立连接池。ADO.NET为每个连接配置创建一个连接池，所以若程序中用到多个不同的连接配置（如，不同的连接字符串），则会有多个连接池。 若连接池中发生了超时或者其它登录错误，则会抛出异常，那么在接下来的5s内尝试该连接都将失败，这5s钟成为阻塞期。若阻塞期结束后的连接再次失败，则会进入一个新的阻塞期，新的阻塞期时长是上个阻塞期时长的2倍，但最多不超过1分钟。 如果连接字符串中没有设置MinPoolSize的值，或者将该值设为0，那么当池中没有活动连接时，连接池也会被销毁。但若将MinPoolSize的值设为大于0，那么只有在卸载AppDomain时，连接池才会被销毁。当连接池中发生了较为严重的错误，连接池也会自我清理。 连接池中最大连接数默认为100，当连接池中连接数已达到上限，且均被占用，那么新的请求会进入队列等到，等待时间超过15s（默认）则会抛出异常。 数据库连接推荐使用如下写法，这样using语句结束后，连接对象会回到连接池中以便下次请求使用。</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">IDbConnection</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> conn</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> SqlConnection</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">())</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了客户端维持的连接池外，数据库服务本身还有连接数的限制，我将数据库最大并发连接数设为1，ADO.NET连接池使用默认配置，循环打开3000个连接并未发生异常：</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> i</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">; </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">i</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> &lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 3000</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">; </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">i</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> conn</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> SqlConnection</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">connStr</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">    conn</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">Open</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但若将连接池最大连接数设置成一个比较小的数，如3，再次执行上述代码则会发生异常，按这种情况看，连接池中的连接公用了同一个数据库连接。在连接池连接数耗尽时，则因为等待超时而抛出异常。</p><blockquote><p>资料来自雪飞鸿：<a href="https://www.cnblogs.com/Cwj-XFH/p/8967876.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/Cwj-XFH/p/8967876.html</a></p></blockquote>`,7),l=[t];function h(r,p){return a(),s("div",null,l)}const d=i(n,[["render",h],["__file","index.html.vue"]]),c=JSON.parse('{"path":"/orm/adoNet/","title":"说明","lang":"zh-CN","frontmatter":{"title":"说明","lang":"zh-CN","date":"2023-05-27T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["orm"],"tag":["无"],"filename":"readme.md","slug":"mq4hodazhgwhg9im","docsId":"125949589","description":"连接池 数据库服务器建立连接的过程是比较耗时的，对此，ADO.NET中使用了连接池来进行优化。在.NET中不同的Data Provider对于连接池的处理方式不尽相同。默认情况下，ADO.NET 启用连接池优化，可以通过连接字符串来配置是否启用连接池。 连接池可以减少和数据库建立连接的次数，连接池中维护着一组活跃的数据库连接。在我们调用IDbConne...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/orm/adoNet/"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"说明"}],["meta",{"property":"og:description","content":"连接池 数据库服务器建立连接的过程是比较耗时的，对此，ADO.NET中使用了连接池来进行优化。在.NET中不同的Data Provider对于连接池的处理方式不尽相同。默认情况下，ADO.NET 启用连接池优化，可以通过连接字符串来配置是否启用连接池。 连接池可以减少和数据库建立连接的次数，连接池中维护着一组活跃的数据库连接。在我们调用IDbConne..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-09T14:51:30.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-05-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-09T14:51:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"说明\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-05-27T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-09T14:51:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"连接池","slug":"连接池","link":"#连接池","children":[]}],"git":{"createdTime":1690042937000,"updatedTime":1696863090000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":2.84,"words":853},"filePathRelative":"orm/adoNet/readme.md","localizedDate":"2023年5月27日","excerpt":"<h2>连接池</h2>\\n<p>数据库服务器建立连接的过程是比较耗时的，对此，ADO.NET中使用了连接池来进行优化。在.NET中不同的Data Provider对于连接池的处理方式不尽相同。默认情况下，ADO.NET 启用连接池优化，可以通过连接字符串来配置是否启用连接池。\\n连接池可以减少和数据库建立连接的次数，连接池中维护着一组活跃的数据库连接。在我们调用IDbConnection的Open方法时，CLR会去连接池中寻找是否有可用的连接，若有则返回该连接而无需与数据库建立新的连接。当我们调用IDbConnection的Close方法时，连接会被连接池回收但不断开与数据库的连接，以备下次使用。连接池中的连接空闲一段时间（约4~8分钟）后或者连接池检测到连接已与服务器断开（需要与服务器通讯才能检测连接是否已断开），那么该连接将会被销毁。\\n在第一次打开连接时，ADO.NET会根据连接配置来建立连接池。ADO.NET为每个连接配置创建一个连接池，所以若程序中用到多个不同的连接配置（如，不同的连接字符串），则会有多个连接池。\\n若连接池中发生了超时或者其它登录错误，则会抛出异常，那么在接下来的5s内尝试该连接都将失败，这5s钟成为阻塞期。若阻塞期结束后的连接再次失败，则会进入一个新的阻塞期，新的阻塞期时长是上个阻塞期时长的2倍，但最多不超过1分钟。\\n如果连接字符串中没有设置MinPoolSize的值，或者将该值设为0，那么当池中没有活动连接时，连接池也会被销毁。但若将MinPoolSize的值设为大于0，那么只有在卸载AppDomain时，连接池才会被销毁。当连接池中发生了较为严重的错误，连接池也会自我清理。\\n连接池中最大连接数默认为100，当连接池中连接数已达到上限，且均被占用，那么新的请求会进入队列等到，等待时间超过15s（默认）则会抛出异常。\\n数据库连接推荐使用如下写法，这样using语句结束后，连接对象会回到连接池中以便下次请求使用。</p>","autoDesc":true}');export{d as comp,c as data};