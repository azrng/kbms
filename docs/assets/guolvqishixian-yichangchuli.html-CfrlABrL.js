import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,d as n}from"./app-CF6xeyXt.js";const t={},l=n(`<blockquote><p>更新时间：2022年8月14日14:17:22</p></blockquote><h2 id="目的" tabindex="-1"><a class="header-anchor" href="#目的"><span>目的</span></a></h2><p>通过异常过滤器实现业务异常捕捉，并且将异常信息进行记录并返回统一的响应报文(比如在开发环境返回具体的异常堆栈，在其他环境返回统一错误信息)。</p><h2 id="操作" tabindex="-1"><a class="header-anchor" href="#操作"><span>操作</span></a></h2><p>引用辅助包</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">PackageReference</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> Include</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;AzrngCommon&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> Version</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;1.2.6&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> /&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><blockquote><p>主要使用该包内的返回类</p></blockquote><h3 id="同步用法" tabindex="-1"><a class="header-anchor" href="#同步用法"><span>同步用法</span></a></h3><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">/// </span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">summary</span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">/// 自定义全局异常过滤器</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">/// </span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">summary</span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> CustomExceptionFilter</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> : </span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">IExceptionFilter</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    private</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> readonly</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> IWebHostEnvironment</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> _hostEnvironment</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    private</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> readonly</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> ILogger</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">CustomExceptionFilter</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;">_logger</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> CustomExceptionFilter</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">ILogger</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">CustomExceptionFilter</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">logger</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">        IWebHostEnvironment</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> hostEnvironment</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        _logger</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> logger</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        _hostEnvironment</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> hostEnvironment</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> OnException</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">ExceptionContext</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> context</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">        //如果异常没有处理</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">context</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">ExceptionHandled</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">            return</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> result</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> ResultModel</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">            Code</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;500&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">            IsSuccess</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">            Message</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;系统异常，请联系管理员&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        _logger</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">LogError</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">$&quot;异常 path:{</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">context</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Result</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">} message:{</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">context</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Exception</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Message</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">} StackTrace:{</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">context</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Exception</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">StackTrace</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">_hostEnvironment</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">IsDevelopment</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">())</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">            result</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Message</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> +=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;,&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> context</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Exception</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Message</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        context</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Result</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> JsonResult</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">result</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">        //异常已处理</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        context</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">ExceptionHandled</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>全局使用</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">builder</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Services</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">AddControllers</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">option</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> =&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    //添加全局过滤器</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">    option</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Filters</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">Add</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">typeof</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">CustomExceptionFilter</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">});</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="异步用法" tabindex="-1"><a class="header-anchor" href="#异步用法"><span>异步用法</span></a></h3><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> ExceptionFilter</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> : </span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">IAsyncExceptionFilter</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    /// </span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">summary</span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    ///</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    /// </span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">summary</span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    /// </span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">param</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> name</span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&quot;context&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">param</span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> async</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> Task</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> OnExceptionAsync</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">ExceptionContext</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> context</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">        //判断异常是否已经处理</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">context</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">ExceptionHandled</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">            var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> result</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> ApiResult</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">StatusCodes</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Status500InternalServerError</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">context</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Exception</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Message</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">            context</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Result</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> JsonResult</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">result</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">            context</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">ExceptionHandled</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>不能拦截处理Action以外的错误。</p>`,15),h=[l];function e(k,p){return a(),s("div",null,h)}const g=i(t,[["render",e],["__file","guolvqishixian-yichangchuli.html.vue"]]),B=JSON.parse('{"path":"/dotnet/base/pipeline/filter/guolvqishixian-yichangchuli.html","title":"过滤器实现-异常处理","lang":"zh-CN","frontmatter":{"title":"过滤器实现-异常处理","lang":"zh-CN","date":"2023-08-07T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dotNET"],"tag":["无"],"filename":"guolvqishixian-yichangchuli","slug":"yky2ka","docsId":"63500277","description":"更新时间：2022年8月14日14:17:22 目的 通过异常过滤器实现业务异常捕捉，并且将异常信息进行记录并返回统一的响应报文(比如在开发环境返回具体的异常堆栈，在其他环境返回统一错误信息)。 操作 引用辅助包 主要使用该包内的返回类 同步用法 全局使用 异步用法 总结 不能拦截处理Action以外的错误。","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dotnet/base/pipeline/filter/guolvqishixian-yichangchuli.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"过滤器实现-异常处理"}],["meta",{"property":"og:description","content":"更新时间：2022年8月14日14:17:22 目的 通过异常过滤器实现业务异常捕捉，并且将异常信息进行记录并返回统一的响应报文(比如在开发环境返回具体的异常堆栈，在其他环境返回统一错误信息)。 操作 引用辅助包 主要使用该包内的返回类 同步用法 全局使用 异步用法 总结 不能拦截处理Action以外的错误。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-06T14:20:50.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-08-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-05-06T14:20:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"过滤器实现-异常处理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-08-07T00:00:00.000Z\\",\\"dateModified\\":\\"2024-05-06T14:20:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"目的","slug":"目的","link":"#目的","children":[]},{"level":2,"title":"操作","slug":"操作","link":"#操作","children":[{"level":3,"title":"同步用法","slug":"同步用法","link":"#同步用法","children":[]},{"level":3,"title":"异步用法","slug":"异步用法","link":"#异步用法","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1697962303000,"updatedTime":1715005250000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":1.09,"words":327},"filePathRelative":"dotnet/base/pipeline/filter/guolvqishixian-yichangchuli.md","localizedDate":"2023年8月7日","excerpt":"<blockquote>\\n<p>更新时间：2022年8月14日14:17:22</p>\\n</blockquote>\\n<h2>目的</h2>\\n<p>通过异常过滤器实现业务异常捕捉，并且将异常信息进行记录并返回统一的响应报文(比如在开发环境返回具体的异常堆栈，在其他环境返回统一错误信息)。</p>\\n<h2>操作</h2>\\n<p>引用辅助包</p>\\n<div class=\\"language-csharp line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"csharp\\" data-title=\\"csharp\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">&lt;</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E5C07B\\">PackageReference</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E06C75\\"> Include</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">=</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">\\"AzrngCommon\\"</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\"> Version</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">=</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">\\"1.2.6\\"</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> /&gt;</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{g as comp,B as data};