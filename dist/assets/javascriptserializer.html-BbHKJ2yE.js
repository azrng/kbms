import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,e as t}from"./app-vSdX8vi3.js";const s={},i=t(`<blockquote><p>最后更新时间：2022年1月27日16:28:19</p></blockquote><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2><p>在.NetF中使用一种序列化方法。</p><h2 id="操作" tabindex="-1"><a class="header-anchor" href="#操作"><span>操作</span></a></h2><blockquote><p>示例环境：.NetF4.7</p></blockquote><p>引用组件</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code>System.Web.Extensions
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>先编写要序列化的类</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">[</span>Serializable<span class="token punctuation">]</span>
public class Person
<span class="token punctuation">{</span>
    public string Name <span class="token punctuation">{</span> set; get; <span class="token punctuation">}</span>
    public int Age <span class="token punctuation">{</span> set; get; <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>序列化和反序列化</p><div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token comment">// 创建对象</span>
var p = new Person
<span class="token punctuation">{</span>
    Name = <span class="token string">&quot;xfh&quot;</span><span class="token punctuation">,</span>
    Age = <span class="token number">26</span>
<span class="token punctuation">}</span>;
var javaScript = new JavaScriptSerializer();
var json = javaScript.Serialize(p);<span class="token comment">//序列化：{\\&quot;Name\\&quot;:\\&quot;xfh\\&quot;,\\&quot;Age\\&quot;:26}</span>
var result = javaScript.Deserialize&lt;Person&gt;(json);<span class="token comment">//反序列化</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>目前该方法已经不用了已经有更好的Newtonsoft或者官方的System.Test.Json。</p>`,13),o=[i];function r(l,c){return n(),a("div",null,o)}const u=e(s,[["render",r],["__file","javascriptserializer.html.vue"]]),m=JSON.parse('{"path":"/dotnet/base/serialize/json/javascriptserializer.html","title":"JavaScriptSerializer","lang":"zh-CN","frontmatter":{"title":"JavaScriptSerializer","lang":"zh-CN","date":"2022-01-27T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dotNET"],"tag":["无"],"filename":"javascriptserializer","slug":"mpqyxq","docsId":"65787053","description":"最后更新时间：2022年1月27日16:28:19 概述 在.NetF中使用一种序列化方法。 操作 示例环境：.NetF4.7 引用组件 先编写要序列化的类 序列化和反序列化 总结 目前该方法已经不用了已经有更好的Newtonsoft或者官方的System.Test.Json。","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dotnet/base/serialize/json/javascriptserializer.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"JavaScriptSerializer"}],["meta",{"property":"og:description","content":"最后更新时间：2022年1月27日16:28:19 概述 在.NetF中使用一种序列化方法。 操作 示例环境：.NetF4.7 引用组件 先编写要序列化的类 序列化和反序列化 总结 目前该方法已经不用了已经有更好的Newtonsoft或者官方的System.Test.Json。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-25T13:23:37.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2022-01-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-25T13:23:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JavaScriptSerializer\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-01-27T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-25T13:23:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"操作","slug":"操作","link":"#操作","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1697962303000,"updatedTime":1698240217000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":0.55,"words":164},"filePathRelative":"dotnet/base/serialize/json/javascriptserializer.md","localizedDate":"2022年1月27日","excerpt":"<blockquote>\\n<p>最后更新时间：2022年1月27日16:28:19</p>\\n</blockquote>\\n<h2>概述</h2>\\n<p>在.NetF中使用一种序列化方法。</p>\\n<h2>操作</h2>\\n<blockquote>\\n<p>示例环境：.NetF4.7</p>\\n</blockquote>\\n<p>引用组件</p>\\n<div class=\\"language-json\\" data-ext=\\"json\\" data-title=\\"json\\"><pre class=\\"language-json\\"><code>System.Web.Extensions\\n</code></pre></div>","autoDesc":true}');export{u as comp,m as data};