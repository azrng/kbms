import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,e}from"./app-vSdX8vi3.js";const t="/kbms/common/1638618914158-269370b9-6593-464b-a002-d50fc3d1c087.png",p="/kbms/common/1638620421102-fdd44e31-1c18-45ee-97c3-b579b5f793a4.png",o={},c=e(`<p>gRPC程序也是需要鉴权的，否则都可以随意请求如何处理?下面我们就来演示下如何进行鉴权。</p><h3 id="配置jwt认证" tabindex="-1"><a class="header-anchor" href="#配置jwt认证"><span>配置Jwt认证</span></a></h3><p>我们需要先在服务端配置jwt认证方案，此处我直接引用封装的组件包</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token operator">&lt;</span><span class="token class-name">PackageReference</span> Include<span class="token operator">=</span><span class="token string">&quot;Common.JwtToken&quot;</span> Version<span class="token operator">=</span><span class="token string">&quot;1.1.2&quot;</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>startup中配置</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token comment">//使用jwt鉴权</span>
services<span class="token punctuation">.</span><span class="token function">AddJwtTokenService</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AuthorizationConfig</span>
    <span class="token punctuation">{</span>
        JwtAudience <span class="token operator">=</span> <span class="token string">&quot;audience&quot;</span><span class="token punctuation">,</span>
        JwtIssuer <span class="token operator">=</span> <span class="token string">&quot;issuer&quot;</span><span class="token punctuation">,</span>
        JwtSecretKey <span class="token operator">=</span> <span class="token string">&quot;secretkeysecretkeysecretkeysecretkeysecretkey&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Configure配置</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code>app<span class="token punctuation">.</span><span class="token function">UseAuthentication</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">UseAuthorization</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="服务鉴权" tabindex="-1"><a class="header-anchor" href="#服务鉴权"><span>服务鉴权</span></a></h3><p>对grpc服务配置需要认证才能访问</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// 用户服务</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token punctuation">[</span>Authorize<span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserInfoGrpcService</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">UserInfoServiceBase</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当没有传token的情况下访问 <img src="`+t+`" alt="image.png" loading="lazy"></p><h3 id="访问服务" tabindex="-1"><a class="header-anchor" href="#访问服务"><span>访问服务</span></a></h3><p>那么我们在服务端编写一个获取token的方法，然后获取token</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">HttpGet</span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> token <span class="token operator">=</span> _jwtAuthService<span class="token punctuation">.</span><span class="token function">CreateToken</span><span class="token punctuation">(</span><span class="token string">&quot;admin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> token<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们再请求grpc的时候就可以带着token进行访问了</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token comment">//传递token请求</span>
<span class="token class-name"><span class="token keyword">var</span></span> header <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Metadata</span>
<span class="token punctuation">{</span>
    <span class="token punctuation">{</span> <span class="token string">&quot;Authorization&quot;</span><span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">$&quot;Bearer </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">token</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> <span class="token keyword">await</span> _userInfoServiceClient<span class="token punctuation">.</span><span class="token function">GetUserInfoAsync</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">GetUserInfoRequest</span> <span class="token punctuation">{</span> UserId <span class="token operator">=</span> userId <span class="token punctuation">}</span><span class="token punctuation">,</span> header<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再一次请求接口查看返回的结果 <img src="`+p+'" alt="image.png" loading="lazy"> 已经可以正常的请求了</p>',18),i=[c];function l(r,u){return s(),a("div",null,i)}const m=n(o,[["render",l],["__file","jianquan.html.vue"]]),g=JSON.parse('{"path":"/middleware/grpc/jianquan.html","title":"鉴权","lang":"zh-CN","frontmatter":{"title":"鉴权","lang":"zh-CN","date":"2023-09-12T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["middleware"],"tag":["无"],"filename":"jianquan","slug":"xrs9ke","docsId":"61883727","description":"gRPC程序也是需要鉴权的，否则都可以随意请求如何处理?下面我们就来演示下如何进行鉴权。 配置Jwt认证 我们需要先在服务端配置jwt认证方案，此处我直接引用封装的组件包 startup中配置 Configure配置 服务鉴权 对grpc服务配置需要认证才能访问 当没有传token的情况下访问 image.png 访问服务 那么我们在服务端编写一个获取...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/middleware/grpc/jianquan.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"鉴权"}],["meta",{"property":"og:description","content":"gRPC程序也是需要鉴权的，否则都可以随意请求如何处理?下面我们就来演示下如何进行鉴权。 配置Jwt认证 我们需要先在服务端配置jwt认证方案，此处我直接引用封装的组件包 startup中配置 Configure配置 服务鉴权 对grpc服务配置需要认证才能访问 当没有传token的情况下访问 image.png 访问服务 那么我们在服务端编写一个获取..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://azrng.gitee.io/kbms/kbms/common/1638618914158-269370b9-6593-464b-a002-d50fc3d1c087.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-19T14:00:28.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-09-12T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-19T14:00:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"鉴权\\",\\"image\\":[\\"https://azrng.gitee.io/kbms/kbms/common/1638618914158-269370b9-6593-464b-a002-d50fc3d1c087.png\\",\\"https://azrng.gitee.io/kbms/kbms/common/1638620421102-fdd44e31-1c18-45ee-97c3-b579b5f793a4.png\\"],\\"datePublished\\":\\"2023-09-12T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-19T14:00:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":3,"title":"配置Jwt认证","slug":"配置jwt认证","link":"#配置jwt认证","children":[]},{"level":3,"title":"服务鉴权","slug":"服务鉴权","link":"#服务鉴权","children":[]},{"level":3,"title":"访问服务","slug":"访问服务","link":"#访问服务","children":[]}],"git":{"createdTime":1697724028000,"updatedTime":1697724028000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":0.99,"words":297},"filePathRelative":"middleware/grpc/jianquan.md","localizedDate":"2023年9月12日","excerpt":"<p>gRPC程序也是需要鉴权的，否则都可以随意请求如何处理?下面我们就来演示下如何进行鉴权。</p>\\n<h3>配置Jwt认证</h3>\\n<p>我们需要先在服务端配置jwt认证方案，此处我直接引用封装的组件包</p>\\n<div class=\\"language-csharp\\" data-ext=\\"cs\\" data-title=\\"cs\\"><pre class=\\"language-csharp\\"><code><span class=\\"token operator\\">&lt;</span><span class=\\"token class-name\\">PackageReference</span> Include<span class=\\"token operator\\">=</span><span class=\\"token string\\">\\"Common.JwtToken\\"</span> Version<span class=\\"token operator\\">=</span><span class=\\"token string\\">\\"1.1.2\\"</span> <span class=\\"token operator\\">/</span><span class=\\"token operator\\">&gt;</span>\\n</code></pre></div>","autoDesc":true}');export{m as comp,g as data};