import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as p,o as e,c as o,a as n,b as s,d as c,e as i}from"./app-vSdX8vi3.js";const l={},u=i(`<h2 id="需求" tabindex="-1"><a class="header-anchor" href="#需求"><span>需求</span></a></h2><p>现在我们应该都是将配置写入到appsettings中，那么我想写入密文来保护隐私，那么我如何实现对appsettings的内容进行自动化解密？</p><h2 id="操作" tabindex="-1"><a class="header-anchor" href="#操作"><span>操作</span></a></h2><blockquote><p>示例代码环境：vs2022、.Net6</p></blockquote><h3 id="其他操作" tabindex="-1"><a class="header-anchor" href="#其他操作"><span>其他操作</span></a></h3><p>继承并实现 ConfigurationProvider, IConfigurationSource</p><h3 id="本文操作" tabindex="-1"><a class="header-anchor" href="#本文操作"><span>本文操作</span></a></h3><p>重写 JsonConfigurationProvider 方法</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JsonConfigurationProvider2</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">JsonConfigurationProvider</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">JsonConfigurationProvider2</span><span class="token punctuation">(</span><span class="token class-name">JsonConfigurationSource2</span> source<span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Load</span><span class="token punctuation">(</span><span class="token class-name">Stream</span> stream<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Let the base class do the heavy lifting.</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span>stream<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//自动解密信息，以Password为例</span>
        Data<span class="token punctuation">[</span><span class="token string">&quot;Password&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> DESDEncrypt<span class="token punctuation">.</span><span class="token function">DesDecrypt</span><span class="token punctuation">(</span>Data<span class="token punctuation">[</span><span class="token string">&quot;Password&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// But you have to make your own MyEncryptionLibrary, not included here</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JsonConfigurationSource2</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">JsonConfigurationSource</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name">IConfigurationProvider</span> <span class="token function">Build</span><span class="token punctuation">(</span><span class="token class-name">IConfigurationBuilder</span> builder<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">EnsureDefaults</span><span class="token punctuation">(</span>builder<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JsonConfigurationProvider2</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">JsonConfigurationExtensions2</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">IConfigurationBuilder</span> <span class="token function">AddJsonFile2</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token class-name">IConfigurationBuilder</span> builder<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> path<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> optional<span class="token punctuation">,</span>
        <span class="token class-name"><span class="token keyword">bool</span></span> reloadOnChange<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>builder <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArgumentNullException</span><span class="token punctuation">(</span><span class="token keyword">nameof</span><span class="token punctuation">(</span>builder<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">.</span><span class="token function">IsNullOrEmpty</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;File path must be a non-empty string.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name"><span class="token keyword">var</span></span> source <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JsonConfigurationSource2</span>
        <span class="token punctuation">{</span>
            FileProvider <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
            Path <span class="token operator">=</span> path<span class="token punctuation">,</span>
            Optional <span class="token operator">=</span> optional<span class="token punctuation">,</span>
            ReloadOnChange <span class="token operator">=</span> reloadOnChange
        <span class="token punctuation">}</span><span class="token punctuation">;</span>

        source<span class="token punctuation">.</span><span class="token function">ResolveFileProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        builder<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> builder<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置服务</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code>builder<span class="token punctuation">.</span>Host<span class="token punctuation">.</span><span class="token function">ConfigureAppConfiguration</span><span class="token punctuation">(</span>config <span class="token operator">=&gt;</span>
<span class="token punctuation">{</span>
    config<span class="token punctuation">.</span><span class="token function">AddJsonFile2</span><span class="token punctuation">(</span><span class="token string">&quot;appsettings.json&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后读取配置就可以得到解密后的数据。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>该方法防君子不防止小人，虽然说没法一下子从配置中得到明文密码，但是还是可以通过其他调试工具得到明文密码。</p><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2>`,15),r={href:"https://mp.weixin.qq.com/s/FMzjYS2jhC7VqL-BCQaHKg",target:"_blank",rel:"noopener noreferrer"};function k(d,m){const a=p("ExternalLinkIcon");return e(),o("div",null,[u,n("p",null,[n("a",r,[s("https://mp.weixin.qq.com/s/FMzjYS2jhC7VqL-BCQaHKg"),c(a)]),s(" | ASP.NET Core 中如何加密 Configuration")])])}const b=t(l,[["render",k],["__file","peizhijianchanjiami.html.vue"]]),g=JSON.parse('{"path":"/dotnet/base/peizhikuangjia/peizhijianchanjiami.html","title":"配置简单加密","lang":"zh-CN","frontmatter":{"title":"配置简单加密","lang":"zh-CN","date":"2022-02-10T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dotNET"],"tag":["无"],"filename":"peizhijianchanjiami","slug":"eiovkc","docsId":"65938630","description":"需求 现在我们应该都是将配置写入到appsettings中，那么我想写入密文来保护隐私，那么我如何实现对appsettings的内容进行自动化解密？ 操作 示例代码环境：vs2022、.Net6 其他操作 继承并实现 ConfigurationProvider, IConfigurationSource 本文操作 重写 JsonConfiguratio...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dotnet/base/peizhikuangjia/peizhijianchanjiami.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"配置简单加密"}],["meta",{"property":"og:description","content":"需求 现在我们应该都是将配置写入到appsettings中，那么我想写入密文来保护隐私，那么我如何实现对appsettings的内容进行自动化解密？ 操作 示例代码环境：vs2022、.Net6 其他操作 继承并实现 ConfigurationProvider, IConfigurationSource 本文操作 重写 JsonConfiguratio..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-25T13:23:37.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2022-02-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-25T13:23:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"配置简单加密\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-02-10T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-25T13:23:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"需求","slug":"需求","link":"#需求","children":[]},{"level":2,"title":"操作","slug":"操作","link":"#操作","children":[{"level":3,"title":"其他操作","slug":"其他操作","link":"#其他操作","children":[]},{"level":3,"title":"本文操作","slug":"本文操作","link":"#本文操作","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"资料","slug":"资料","link":"#资料","children":[]}],"git":{"createdTime":1697962303000,"updatedTime":1698240217000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":1.11,"words":333},"filePathRelative":"dotnet/base/peizhikuangjia/peizhijianchanjiami.md","localizedDate":"2022年2月10日","excerpt":"<h2>需求</h2>\\n<p>现在我们应该都是将配置写入到appsettings中，那么我想写入密文来保护隐私，那么我如何实现对appsettings的内容进行自动化解密？</p>\\n<h2>操作</h2>\\n<blockquote>\\n<p>示例代码环境：vs2022、.Net6</p>\\n</blockquote>\\n<h3>其他操作</h3>\\n<p>继承并实现 ConfigurationProvider, IConfigurationSource</p>\\n<h3>本文操作</h3>\\n<p>重写 JsonConfigurationProvider 方法</p>\\n<div class=\\"language-csharp\\" data-ext=\\"cs\\" data-title=\\"cs\\"><pre class=\\"language-csharp\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">JsonConfigurationProvider2</span> <span class=\\"token punctuation\\">:</span> <span class=\\"token type-list\\"><span class=\\"token class-name\\">JsonConfigurationProvider</span></span>\\n<span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token function\\">JsonConfigurationProvider2</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">JsonConfigurationSource2</span> source<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">base</span><span class=\\"token punctuation\\">(</span>source<span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">override</span> <span class=\\"token return-type class-name\\"><span class=\\"token keyword\\">void</span></span> <span class=\\"token function\\">Load</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Stream</span> stream<span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token comment\\">// Let the base class do the heavy lifting.</span>\\n        <span class=\\"token keyword\\">base</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Load</span><span class=\\"token punctuation\\">(</span>stream<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n        <span class=\\"token comment\\">//自动解密信息，以Password为例</span>\\n        Data<span class=\\"token punctuation\\">[</span><span class=\\"token string\\">\\"Password\\"</span><span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=</span> DESDEncrypt<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">DesDecrypt</span><span class=\\"token punctuation\\">(</span>Data<span class=\\"token punctuation\\">[</span><span class=\\"token string\\">\\"Password\\"</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n        <span class=\\"token comment\\">// But you have to make your own MyEncryptionLibrary, not included here</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">JsonConfigurationSource2</span> <span class=\\"token punctuation\\">:</span> <span class=\\"token type-list\\"><span class=\\"token class-name\\">JsonConfigurationSource</span></span>\\n<span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">override</span> <span class=\\"token return-type class-name\\">IConfigurationProvider</span> <span class=\\"token function\\">Build</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">IConfigurationBuilder</span> builder<span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token function\\">EnsureDefaults</span><span class=\\"token punctuation\\">(</span>builder<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">new</span> <span class=\\"token constructor-invocation class-name\\">JsonConfigurationProvider2</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">JsonConfigurationExtensions2</span>\\n<span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token return-type class-name\\">IConfigurationBuilder</span> <span class=\\"token function\\">AddJsonFile2</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">this</span> <span class=\\"token class-name\\">IConfigurationBuilder</span> builder<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\"><span class=\\"token keyword\\">string</span></span> path<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\"><span class=\\"token keyword\\">bool</span></span> optional<span class=\\"token punctuation\\">,</span>\\n        <span class=\\"token class-name\\"><span class=\\"token keyword\\">bool</span></span> reloadOnChange<span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>builder <span class=\\"token operator\\">==</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">)</span>\\n        <span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token keyword\\">throw</span> <span class=\\"token keyword\\">new</span> <span class=\\"token constructor-invocation class-name\\">ArgumentNullException</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">nameof</span><span class=\\"token punctuation\\">(</span>builder<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">string</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">IsNullOrEmpty</span><span class=\\"token punctuation\\">(</span>path<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span>\\n        <span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token keyword\\">throw</span> <span class=\\"token keyword\\">new</span> <span class=\\"token constructor-invocation class-name\\">ArgumentException</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"File path must be a non-empty string.\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n\\n        <span class=\\"token class-name\\"><span class=\\"token keyword\\">var</span></span> source <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token constructor-invocation class-name\\">JsonConfigurationSource2</span>\\n        <span class=\\"token punctuation\\">{</span>\\n            FileProvider <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span>\\n            Path <span class=\\"token operator\\">=</span> path<span class=\\"token punctuation\\">,</span>\\n            Optional <span class=\\"token operator\\">=</span> optional<span class=\\"token punctuation\\">,</span>\\n            ReloadOnChange <span class=\\"token operator\\">=</span> reloadOnChange\\n        <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n        source<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">ResolveFileProvider</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        builder<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Add</span><span class=\\"token punctuation\\">(</span>source<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">return</span> builder<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{b as comp,g as data};