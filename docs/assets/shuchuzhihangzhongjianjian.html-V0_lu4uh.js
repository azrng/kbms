import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as e,d as n}from"./app-41nmD-Ik.js";const a={},t=n(`<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2><p>输出都执行了哪些中间件</p><h2 id="操作" tabindex="-1"><a class="header-anchor" href="#操作"><span>操作</span></a></h2><h3 id="安装nuget包" tabindex="-1"><a class="header-anchor" href="#安装nuget包"><span>安装nuget包</span></a></h3><p>需要添加两个Nuget包分别是：Microsoft.AspNetCore.MiddlewareAnalysis和Microsoft.Extensions.DiagnosticAdapter，前者是分析记录中间件核心代码实现后者是用来接收日志输出的，由于是用的DiagnosticSource方式记录日志，所以需要使用DiagnosticListener对象的SubscribeWithAdapter方法来订阅。</p><h3 id="实现分析诊断适配器" tabindex="-1"><a class="header-anchor" href="#实现分析诊断适配器"><span>实现分析诊断适配器</span></a></h3><p>这个适配器是为了方便我们把从DiagnosticSource接收到的日志对象输出到控制台，具体代码实现如下</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>    public class AnalysisDiagnosticAdapter</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        private readonly ILogger&lt;AnalysisDiagnosticAdapter&gt; _logger;</span></span>
<span class="line"><span>        public AnalysisDiagnosticAdapter(ILogger&lt;AnalysisDiagnosticAdapter&gt; logger)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            _logger = logger;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        [DiagnosticName(&quot;Microsoft.AspNetCore.MiddlewareAnalysis.MiddlewareStarting&quot;)]</span></span>
<span class="line"><span>        public void OnMiddlewareStarting(HttpContext httpContext, string name, Guid instance, long timestamp)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            _logger.LogInformation($&quot;中间件-启动: &#39;{name}&#39;; Request Path: &#39;{httpContext.Request.Path}&#39;&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        [DiagnosticName(&quot;Microsoft.AspNetCore.MiddlewareAnalysis.MiddlewareException&quot;)]</span></span>
<span class="line"><span>        public void OnMiddlewareException(Exception exception, HttpContext httpContext, string name, Guid instance, long timestamp, long duration)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            _logger.LogInformation($&quot;中间件-异常: &#39;{name}&#39;; &#39;{exception.Message}&#39;&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        [DiagnosticName(&quot;Microsoft.AspNetCore.MiddlewareAnalysis.MiddlewareFinished&quot;)]</span></span>
<span class="line"><span>        public void OnMiddlewareFinished(HttpContext httpContext, string name, Guid instance, long timestamp, long duration)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            _logger.LogInformation($&quot;中间件-结束: 耗时[{duration/10000}] &#39;{name}&#39;; Status: &#39;{httpContext.Response.StatusCode}&#39;&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="注册服务启用中间件" tabindex="-1"><a class="header-anchor" href="#注册服务启用中间件"><span>注册服务启用中间件</span></a></h3><p>注册中间件分析服务</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>var builder = WebApplication.CreateBuilder(args);</span></span>
<span class="line"><span>builder.Services.AddMiddlewareAnalysis();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>订阅我们的分析诊断适配器</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>var listener = app.Services.GetRequiredService&lt;DiagnosticListener&gt;();</span></span>
<span class="line"><span>var observer = ActivatorUtilities.CreateInstance&lt;AnalysisDiagnosticAdapter&gt;(app.Services);</span></span>
<span class="line"><span>using var disposable = listener.SubscribeWithAdapter(observer);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样基本就完成了分析记录中间件的功能，启动程序看看效果</p><p>日志已经成功的输出到我们的控制台了，不过才四个中间件，应该不止这么少的，再在注册中间件分析服务哪里添加一句代码</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> builder</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> WebApplication</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">CreateBuilder</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">args</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">// 新增的下面这句代码</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">builder</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Services</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">Insert</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">ServiceDescriptor</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">Transient</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">IStartupFilter</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">AnalysisStartupFilter</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;());</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">builder</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Services</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">AddMiddlewareAnalysis</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在再来看看效果，发现变成8个中间件了多了四个</p><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料"><span>参考资料</span></a></h2><p>ASP.NET Core如何知道一个请求执行了哪些中间件：<a href="https://www.cnblogs.com/Ax0ne/p/17300692.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/Ax0ne/p/17300692.html</a></p>`,19),l=[t];function p(r,d){return e(),i("div",null,l)}const o=s(a,[["render",p],["__file","shuchuzhihangzhongjianjian.html.vue"]]),g=JSON.parse('{"path":"/dotnet/base/pipeline/middleware/shuchuzhihangzhongjianjian.html","title":"输出执行中间件","lang":"zh-CN","frontmatter":{"title":"输出执行中间件","lang":"zh-CN","date":"2023-06-27T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dotNET"],"tag":["无"],"filename":"shuchuzhihangzhongjianjian","slug":"li9elf0kgs7qwoyg","docsId":"121335795","description":"概述 输出都执行了哪些中间件 操作 安装nuget包 需要添加两个Nuget包分别是：Microsoft.AspNetCore.MiddlewareAnalysis和Microsoft.Extensions.DiagnosticAdapter，前者是分析记录中间件核心代码实现后者是用来接收日志输出的，由于是用的DiagnosticSource方式记录日...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dotnet/base/pipeline/middleware/shuchuzhihangzhongjianjian.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"输出执行中间件"}],["meta",{"property":"og:description","content":"概述 输出都执行了哪些中间件 操作 安装nuget包 需要添加两个Nuget包分别是：Microsoft.AspNetCore.MiddlewareAnalysis和Microsoft.Extensions.DiagnosticAdapter，前者是分析记录中间件核心代码实现后者是用来接收日志输出的，由于是用的DiagnosticSource方式记录日..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-06T14:20:50.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-05-06T14:20:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"输出执行中间件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-05-06T14:20:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"操作","slug":"操作","link":"#操作","children":[{"level":3,"title":"安装nuget包","slug":"安装nuget包","link":"#安装nuget包","children":[]},{"level":3,"title":"实现分析诊断适配器","slug":"实现分析诊断适配器","link":"#实现分析诊断适配器","children":[]},{"level":3,"title":"注册服务启用中间件","slug":"注册服务启用中间件","link":"#注册服务启用中间件","children":[]}]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1697962303000,"updatedTime":1715005250000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":1.51,"words":452},"filePathRelative":"dotnet/base/pipeline/middleware/shuchuzhihangzhongjianjian.md","localizedDate":"2023年6月27日","excerpt":"<h2>概述</h2>\\n<p>输出都执行了哪些中间件</p>\\n<h2>操作</h2>\\n<h3>安装nuget包</h3>\\n<p>需要添加两个Nuget包分别是：Microsoft.AspNetCore.MiddlewareAnalysis和Microsoft.Extensions.DiagnosticAdapter，前者是分析记录中间件核心代码实现后者是用来接收日志输出的，由于是用的DiagnosticSource方式记录日志，所以需要使用DiagnosticListener对象的SubscribeWithAdapter方法来订阅。</p>\\n<h3>实现分析诊断适配器</h3>\\n<p>这个适配器是为了方便我们把从DiagnosticSource接收到的日志对象输出到控制台，具体代码实现如下</p>","autoDesc":true}');export{o as comp,g as data};