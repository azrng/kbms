import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,e as t}from"./app-vSdX8vi3.js";const p={},e=t(`<h2 id="目的" tabindex="-1"><a class="header-anchor" href="#目的"><span>目的</span></a></h2><p>该方法的目的是：在miniapi中上传文件使用HttpRequest不支持swagger显示，所以提供该方法让swagger显示</p><h2 id="操作" tabindex="-1"><a class="header-anchor" href="#操作"><span>操作</span></a></h2><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// 文件上传操作过滤器</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FileUploadOperationFilter</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IOperationFilter</span></span>
<span class="token punctuation">{</span>
    <span class="token comment">//在 OpenAPI 3.0 中，文件上传的请求可以用下列结构描述（https://swagger.io/docs/specification/describing-request-body/file-upload/）</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">///该方法的目的是：在miniapi中上传文件使用HttpRequest不支持swagger显示，所以提供该方法让swagger显示</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>operation<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>context<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exception</span> <span class="token attr-name">cref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>NotImplementedException<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exception</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Apply</span><span class="token punctuation">(</span><span class="token class-name">OpenApiOperation</span> operation<span class="token punctuation">,</span> <span class="token class-name">OperationFilterContext</span> context<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> FileUploadContentType <span class="token operator">=</span> <span class="token string">&quot;multipart/form-data&quot;</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>operation<span class="token punctuation">.</span>RequestBody <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span>
            <span class="token operator">!</span>operation<span class="token punctuation">.</span>RequestBody<span class="token punctuation">.</span>Content<span class="token punctuation">.</span><span class="token function">Any</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span>Key<span class="token punctuation">.</span><span class="token function">Equals</span><span class="token punctuation">(</span>FileUploadContentType<span class="token punctuation">,</span> StringComparison<span class="token punctuation">.</span>InvariantCultureIgnoreCase<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>context<span class="token punctuation">.</span>ApiDescription<span class="token punctuation">.</span>ParameterDescriptions<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Type <span class="token operator">!=</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">HttpRequest</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>

        operation<span class="token punctuation">.</span>RequestBody <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OpenApiRequestBody</span>
        <span class="token punctuation">{</span>
            Description <span class="token operator">=</span> <span class="token string">&quot;HttpRequest&quot;</span><span class="token punctuation">,</span>
            Content <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> OpenApiMediaType<span class="token punctuation">&gt;</span></span>
                <span class="token punctuation">{</span>
                    <span class="token punctuation">{</span>
                        FileUploadContentType<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OpenApiMediaType</span>
                        <span class="token punctuation">{</span>
                            Schema <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OpenApiSchema</span>
                            <span class="token punctuation">{</span>
                                Type <span class="token operator">=</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">,</span>
                                Required <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">HashSet<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span> <span class="token string">&quot;file&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
                                Properties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> OpenApiSchema<span class="token punctuation">&gt;</span></span>
                                <span class="token punctuation">{</span>
                                    <span class="token punctuation">{</span>
                                        <span class="token string">&quot;file&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OpenApiSchema</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                                        <span class="token punctuation">{</span>
                                            Type <span class="token operator">=</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">,</span>
                                            Format <span class="token operator">=</span> <span class="token string">&quot;binary&quot;</span>
                                        <span class="token punctuation">}</span>
                                    <span class="token punctuation">}</span>
                                <span class="token punctuation">}</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在配置swagger的时候去设置</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token comment">//显示文件上传的选项</span>
c<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">OperationFilter</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>FileUploadOperationFilter<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,6),o=[e];function c(i,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","miniapishangchuanwenjianxianshiyichang.html.vue"]]),d=JSON.parse('{"path":"/dotnet/api/swagger/tazhan/miniapishangchuanwenjianxianshiyichang.html","title":"MiniApi上传文件显示异常","lang":"zh-CN","frontmatter":{"title":"MiniApi上传文件显示异常","lang":"zh-CN","date":"2023-09-17T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dotNET"],"tag":["无"],"filename":"miniapishangchuanwenjianxianshiyichang","slug":"ffg5gb","docsId":"96097728","description":"目的 该方法的目的是：在miniapi中上传文件使用HttpRequest不支持swagger显示，所以提供该方法让swagger显示 操作 在配置swagger的时候去设置","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dotnet/api/swagger/tazhan/miniapishangchuanwenjianxianshiyichang.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"MiniApi上传文件显示异常"}],["meta",{"property":"og:description","content":"目的 该方法的目的是：在miniapi中上传文件使用HttpRequest不支持swagger显示，所以提供该方法让swagger显示 操作 在配置swagger的时候去设置"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-22T08:11:43.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-09-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-22T08:11:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MiniApi上传文件显示异常\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-09-17T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-22T08:11:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"目的","slug":"目的","link":"#目的","children":[]},{"level":2,"title":"操作","slug":"操作","link":"#操作","children":[]}],"git":{"createdTime":1697962303000,"updatedTime":1697962303000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":0.85,"words":256},"filePathRelative":"dotnet/api/swagger/tazhan/miniapishangchuanwenjianxianshiyichang.md","localizedDate":"2023年9月17日","excerpt":"<h2>目的</h2>\\n<p>该方法的目的是：在miniapi中上传文件使用HttpRequest不支持swagger显示，所以提供该方法让swagger显示</p>\\n<h2>操作</h2>\\n<div class=\\"language-csharp\\" data-ext=\\"cs\\" data-title=\\"cs\\"><pre class=\\"language-csharp\\"><code><span class=\\"token doc-comment comment\\">/// <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>summary</span><span class=\\"token punctuation\\">&gt;</span></span></span>\\n<span class=\\"token doc-comment comment\\">/// 文件上传操作过滤器</span>\\n<span class=\\"token doc-comment comment\\">/// <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>summary</span><span class=\\"token punctuation\\">&gt;</span></span></span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">FileUploadOperationFilter</span> <span class=\\"token punctuation\\">:</span> <span class=\\"token type-list\\"><span class=\\"token class-name\\">IOperationFilter</span></span>\\n<span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token comment\\">//在 OpenAPI 3.0 中，文件上传的请求可以用下列结构描述（https://swagger.io/docs/specification/describing-request-body/file-upload/）</span>\\n\\n    <span class=\\"token doc-comment comment\\">/// <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>summary</span><span class=\\"token punctuation\\">&gt;</span></span></span>\\n    <span class=\\"token doc-comment comment\\">///该方法的目的是：在miniapi中上传文件使用HttpRequest不支持swagger显示，所以提供该方法让swagger显示</span>\\n    <span class=\\"token doc-comment comment\\">/// <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>summary</span><span class=\\"token punctuation\\">&gt;</span></span></span>\\n    <span class=\\"token doc-comment comment\\">/// <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>param</span> <span class=\\"token attr-name\\">name</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>operation<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>param</span><span class=\\"token punctuation\\">&gt;</span></span></span>\\n    <span class=\\"token doc-comment comment\\">/// <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>param</span> <span class=\\"token attr-name\\">name</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>context<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>param</span><span class=\\"token punctuation\\">&gt;</span></span></span>\\n    <span class=\\"token doc-comment comment\\">/// <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>exception</span> <span class=\\"token attr-name\\">cref</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>NotImplementedException<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>exception</span><span class=\\"token punctuation\\">&gt;</span></span></span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token return-type class-name\\"><span class=\\"token keyword\\">void</span></span> <span class=\\"token function\\">Apply</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">OpenApiOperation</span> operation<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">OperationFilterContext</span> context<span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">const</span> <span class=\\"token class-name\\"><span class=\\"token keyword\\">string</span></span> FileUploadContentType <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"multipart/form-data\\"</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>operation<span class=\\"token punctuation\\">.</span>RequestBody <span class=\\"token operator\\">==</span> <span class=\\"token keyword\\">null</span> <span class=\\"token operator\\">||</span>\\n            <span class=\\"token operator\\">!</span>operation<span class=\\"token punctuation\\">.</span>RequestBody<span class=\\"token punctuation\\">.</span>Content<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Any</span><span class=\\"token punctuation\\">(</span>x <span class=\\"token operator\\">=&gt;</span> x<span class=\\"token punctuation\\">.</span>Key<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Equals</span><span class=\\"token punctuation\\">(</span>FileUploadContentType<span class=\\"token punctuation\\">,</span> StringComparison<span class=\\"token punctuation\\">.</span>InvariantCultureIgnoreCase<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span>\\n        <span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token keyword\\">return</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n\\n        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>context<span class=\\"token punctuation\\">.</span>ApiDescription<span class=\\"token punctuation\\">.</span>ParameterDescriptions<span class=\\"token punctuation\\">[</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">.</span>Type <span class=\\"token operator\\">!=</span> <span class=\\"token keyword\\">typeof</span><span class=\\"token punctuation\\">(</span><span class=\\"token type-expression class-name\\">HttpRequest</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span>\\n            <span class=\\"token keyword\\">return</span><span class=\\"token punctuation\\">;</span>\\n\\n        operation<span class=\\"token punctuation\\">.</span>RequestBody <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token constructor-invocation class-name\\">OpenApiRequestBody</span>\\n        <span class=\\"token punctuation\\">{</span>\\n            Description <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"HttpRequest\\"</span><span class=\\"token punctuation\\">,</span>\\n            Content <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token constructor-invocation class-name\\">Dictionary<span class=\\"token punctuation\\">&lt;</span><span class=\\"token keyword\\">string</span><span class=\\"token punctuation\\">,</span> OpenApiMediaType<span class=\\"token punctuation\\">&gt;</span></span>\\n                <span class=\\"token punctuation\\">{</span>\\n                    <span class=\\"token punctuation\\">{</span>\\n                        FileUploadContentType<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">new</span> <span class=\\"token constructor-invocation class-name\\">OpenApiMediaType</span>\\n                        <span class=\\"token punctuation\\">{</span>\\n                            Schema <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token constructor-invocation class-name\\">OpenApiSchema</span>\\n                            <span class=\\"token punctuation\\">{</span>\\n                                Type <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"object\\"</span><span class=\\"token punctuation\\">,</span>\\n                                Required <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token constructor-invocation class-name\\">HashSet<span class=\\"token punctuation\\">&lt;</span><span class=\\"token keyword\\">string</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">{</span> <span class=\\"token string\\">\\"file\\"</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n                                Properties <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token constructor-invocation class-name\\">Dictionary<span class=\\"token punctuation\\">&lt;</span><span class=\\"token keyword\\">string</span><span class=\\"token punctuation\\">,</span> OpenApiSchema<span class=\\"token punctuation\\">&gt;</span></span>\\n                                <span class=\\"token punctuation\\">{</span>\\n                                    <span class=\\"token punctuation\\">{</span>\\n                                        <span class=\\"token string\\">\\"file\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">new</span> <span class=\\"token constructor-invocation class-name\\">OpenApiSchema</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n                                        <span class=\\"token punctuation\\">{</span>\\n                                            Type <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"string\\"</span><span class=\\"token punctuation\\">,</span>\\n                                            Format <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"binary\\"</span>\\n                                        <span class=\\"token punctuation\\">}</span>\\n                                    <span class=\\"token punctuation\\">}</span>\\n                                <span class=\\"token punctuation\\">}</span>\\n                            <span class=\\"token punctuation\\">}</span>\\n                        <span class=\\"token punctuation\\">}</span>\\n                    <span class=\\"token punctuation\\">}</span>\\n                <span class=\\"token punctuation\\">}</span>\\n        <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};