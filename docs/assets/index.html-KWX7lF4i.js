import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as a,d as n}from"./app-DZ9bmjCp.js";const e={},t=n(`<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2><p>.NET Compiler Platform (Roslyn) 分析器会检查 C## 或 Visual Basic 代码的代码质量和样式问题。 从 .NET 5 开始，这些分析器包含在 .NET SDK 中，无需单独安装。 如果项目面向 .NET 5 或更高版本，则默认启用代码分析。 如果项目面向之前版本的 .NET 实现（例如 .NET Core、. NET Standard 或 .NET Framework），则必须通过将 <a href="https://learn.microsoft.com/zh-cn/dotnet/core/project-sdk/msbuild-props#enablenetanalyzers" target="_blank" rel="noopener noreferrer">EnableNETAnalyzers</a> 属性设置为true以手动启用代码分析。</p><h2 id="分析包" tabindex="-1"><a class="header-anchor" href="#分析包"><span>分析包</span></a></h2><h3 id="microsoft-codeanalysis-netanalyzers" tabindex="-1"><a class="header-anchor" href="#microsoft-codeanalysis-netanalyzers"><span>Microsoft.CodeAnalysis.NetAnalyzers</span></a></h3><p>如果你不想升级到 .NET 5+ SDK、具有非 SDK 样式的 .NET Framework 项目或更倾向于使用基于 NuGet 包的模型，则也可以在 Microsoft.CodeAnalysis.NetAnalyzers NuGet 包中使用该分析器(老版本的是：Microsoft.CodeAnalysis.FxCopAnalyzers)。</p><div class="language-powershell line-numbers-mode" data-highlighter="shiki" data-ext="powershell" data-title="powershell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">PackageReference Include</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;Microsoft.CodeAnalysis.NetAnalyzers&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> Version</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;7.0.3&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">  &lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">PrivateAssets</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">all</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">PrivateAssets</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">  &lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">IncludeAssets</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">runtime; build; native; contentfiles; analyzers</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">IncludeAssets</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">PackageReference</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于按需版本更新，你可能更倾向于使用基于包的模型。</p><blockquote><p>.NET 分析器与目标框架无关。 即，你的项目不需要面向特定的 .NET 实现。 分析器适用于面向 .NET 5+ 及更早 .NET 版本（如 .NET Core 3.1 和 .NET Framework 4.7.2）的项目。 但是，若要使用 EnableNETAnalyzers 属性启用代码分析，则项目必须引用项目 SDK(<a href="https://learn.microsoft.com/zh-cn/dotnet/core/project-sdk/overview" target="_blank" rel="noopener noreferrer">https://learn.microsoft.com/zh-cn/dotnet/core/project-sdk/overview</a>)。</p></blockquote><p>如果分析器发现规则冲突，则这些冲突会被报告为建议、警告或错误，具体取决于每个规则的<a href="https://learn.microsoft.com/zh-cn/dotnet/fundamentals/code-analysis/configuration-options" target="_blank" rel="noopener noreferrer">配置</a>方式。 代码分析冲突以前缀“CA”或“IDE”显示，以便将它们与编译器错误区分开来。</p><p>资料：https://learn.microsoft.com/zh-cn/dotnet/fundamentals/code-analysis/overview?tabs=net-7</p><h3 id="sonaranalyzer-csharp" tabindex="-1"><a class="header-anchor" href="#sonaranalyzer-csharp"><span>SonarAnalyzer.CSharp</span></a></h3><p>SonarAnalyzer.CSharp是一个非常强大的代码分析器(基于Roslyn分析器)，它现阶段一共有343条规范并且主要是面向了代码的使用，包含了缺陷检测、性能、约定、错误处理、事件、异步、测试等等多类规则，规则参见：https://rules.sonarsource.com/csharp 项目主页：https://www.sonarsource.com/products/codeanalyzers/sonarcsharp.html</p><p>要想使用我们可以直接安装nuget包，如</p><div class="language-c# line-numbers-mode" data-highlighter="shiki" data-ext="c#" data-title="c#" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">ItemGroup</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">  &lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">PackageReference</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> Include</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;SonarAnalyzer.CSharp&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> Version</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;9.14.0.81108&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">    &lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">PrivateAssets</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">all</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&lt;/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">PrivateAssets</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">    &lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">IncludeAssets</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">runtime</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">; </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">build</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">; </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">native</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">; </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">contentfiles</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">; </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">analyzers</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">; </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">buildtransitive</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&lt;/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">IncludeAssets</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">  &lt;/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">PackageReference</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&lt;/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">ItemGroup</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然还可以在项目<code>.csproj</code>文件中，配置如下配置</p><div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">PropertyGroup</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">TargetFramework</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;net6.0&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">TargetFramework</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">Nullable</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;enable&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">Nullable</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">ImplicitUsings</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;enable&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">ImplicitUsings</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">  &lt;!--使用最新版本的代码分析工具来对代码进行分析，以帮助开发者找出潜在的问题--&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">AnalysisLevel</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;latest&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">AnalysisLevel</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">  &lt;!--对所有代码进行分析，包括第三方库和依赖项中的代码--&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">AnalysisMode</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;all&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">AnalysisMode</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">  &lt;!--将编译器生成的警告视为错误，即如果有任何警告，则编译过程将停止并报告错误--&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">TreatWarningsAsErrors</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;true&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">TreatWarningsAsErrors</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">  &lt;!--将代码分析工具生成的警告视为错误。与上一个设置类似--&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">CodeAnalysisTreatWarningsAsErrors</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;true&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">CodeAnalysisTreatWarningsAsErrors</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">  &lt;!--在编译时启用代码风格规则检查--&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">EnforceCodeStyleInBuild</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;true&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">EnforceCodeStyleInBuild</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">PropertyGroup</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然如果你想给当前解决方案中的所有配置安装该分析包，那么还可以使用<code>Directory.Build.props</code>文件统一配置，如</p><div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">Project</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">PropertyGroup</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">        &lt;!--使用最新版本的代码分析工具来对代码进行分析，以帮助开发者找出潜在的问题--&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">AnalysisLevel</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;latest&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">AnalysisLevel</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">        &lt;!--对所有代码进行分析，包括第三方库和依赖项中的代码--&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">AnalysisMode</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;all&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">AnalysisMode</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">        &lt;!--将编译器生成的警告视为错误，即如果有任何警告，则编译过程将停止并报告错误--&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">TreatWarningsAsErrors</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;true&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">TreatWarningsAsErrors</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">        &lt;!--将代码分析工具生成的警告视为错误。与上一个设置类似--&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">CodeAnalysisTreatWarningsAsErrors</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;true&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">CodeAnalysisTreatWarningsAsErrors</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">        &lt;!--在编译时启用代码风格规则检查--&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">EnforceCodeStyleInBuild</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;true&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">EnforceCodeStyleInBuild</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">PropertyGroup</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">ItemGroup</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">PackageReference</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> Include</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;SonarAnalyzer.CSharp&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">                          Version</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;9.14.0.81108&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">                          PrivateAssets</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;all&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">                          Condition</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;$(MSBuildProjectExtension)==&#39;.csproj&#39;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">/&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">ItemGroup</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">Project</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="microsoft-codeanalysis-fxcopanalyzers" tabindex="-1"><a class="header-anchor" href="#microsoft-codeanalysis-fxcopanalyzers"><span>Microsoft.CodeAnalysis.FxCopAnalyzers</span></a></h3><div class="hint-container tip"><p class="hint-container-title">提示</p><p>该包已经弃用</p></div><p>FxCop是.Net Framework中用来分析托管代码的应用程序，它主要关注的代码的设计、国际化、可维护性、性能和安全性等方面，并按照这些类别定义了一个规则集： https://docs.microsoft.com/en-us/visualstudio/code-quality/code-analysis-for-managed-code-warnings FxCopAnalyzers安装： https://www.nuget.org/packages/Microsoft.CodeAnalysis.FxCopAnalyzers</p><h3 id="stylecop-analyzers" tabindex="-1"><a class="header-anchor" href="#stylecop-analyzers"><span>StyleCop.Analyzers</span></a></h3><p>StyleCop本身就是一个用于规范代码格式的工具，所以它的规则也是面向代码格式的，如注释、布局、命名、排序、可维护性、可读性等，StyleCop的规则集参考：https://github.com/DotNetAnalyzers/StyleCopAnalyzers/tree/master/documentation StyleCop.Analyzers的项目主页：https://github.com/DotNetAnalyzers/StyleCopAnalyzers</p><h3 id="codecracker-csharp" tabindex="-1"><a class="header-anchor" href="#codecracker-csharp"><span>Codecracker.CSharp</span></a></h3><p>Codecracker.CSharp也是以个开源的代码分析器，它的规则主要是设计、命名、性能、代码风格、代码使用以及重构，具体参见：http://code-cracker.github.io/diagnostics.html 项目主页：https://github.com/code-cracker/code-cracker 注：Codecracker.CSharp可以通过安装VS拓展工具的方式实现代码分析：https://marketplace.visualstudio.com/items?itemName=GiovanniBassi-MVP.CodeCrackerforC，其它大部分Roslyn分析器需要安装Nuget包。</p><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2><p>源代码分析概述：<a href="https://learn.microsoft.com/zh-cn/dotnet/fundamentals/code-analysis/overview?tabs=net-7" target="_blank" rel="noopener noreferrer">https://learn.microsoft.com/zh-cn/dotnet/fundamentals/code-analysis/overview?tabs=net-7</a><a href="https://mp.weixin.qq.com/s/0zBjYHF882k_wCVrk9JBOQ" target="_blank" rel="noopener noreferrer">https://mp.weixin.qq.com/s/0zBjYHF882k_wCVrk9JBOQ</a> | 好代码是管出来的——.Net中的代码规范工具及使用</p>`,27),l=[t];function h(r,p){return a(),i("div",null,l)}const o=s(e,[["render",h],["__file","index.html.vue"]]),c=JSON.parse('{"path":"/dotnet/daimafenxi/","title":"说明","lang":"zh-CN","frontmatter":{"title":"说明","lang":"zh-CN","date":"2023-08-05T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dotNET"],"tag":["无"],"filename":"readme","slug":"ryuu6ctbvhfkvg27","docsId":"134803656","description":"概述 .NET Compiler Platform (Roslyn) 分析器会检查 C## 或 Visual Basic 代码的代码质量和样式问题。 从 .NET 5 开始，这些分析器包含在 .NET SDK 中，无需单独安装。 如果项目面向 .NET 5 或更高版本，则默认启用代码分析。 如果项目面向之前版本的 .NET 实现（例如 .NET Cor...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dotnet/daimafenxi/"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"说明"}],["meta",{"property":"og:description","content":"概述 .NET Compiler Platform (Roslyn) 分析器会检查 C## 或 Visual Basic 代码的代码质量和样式问题。 从 .NET 5 开始，这些分析器包含在 .NET SDK 中，无需单独安装。 如果项目面向 .NET 5 或更高版本，则默认启用代码分析。 如果项目面向之前版本的 .NET 实现（例如 .NET Cor..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-01T07:45:50.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-08-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-01T07:45:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"说明\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-08-05T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-01T07:45:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"分析包","slug":"分析包","link":"#分析包","children":[{"level":3,"title":"Microsoft.CodeAnalysis.NetAnalyzers","slug":"microsoft-codeanalysis-netanalyzers","link":"#microsoft-codeanalysis-netanalyzers","children":[]},{"level":3,"title":"SonarAnalyzer.CSharp","slug":"sonaranalyzer-csharp","link":"#sonaranalyzer-csharp","children":[]},{"level":3,"title":"Microsoft.CodeAnalysis.FxCopAnalyzers","slug":"microsoft-codeanalysis-fxcopanalyzers","link":"#microsoft-codeanalysis-fxcopanalyzers","children":[]},{"level":3,"title":"StyleCop.Analyzers","slug":"stylecop-analyzers","link":"#stylecop-analyzers","children":[]},{"level":3,"title":"Codecracker.CSharp","slug":"codecracker-csharp","link":"#codecracker-csharp","children":[]}]},{"level":2,"title":"资料","slug":"资料","link":"#资料","children":[]}],"git":{"createdTime":1697962303000,"updatedTime":1701416750000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":3}]},"readingTime":{"minutes":4.04,"words":1211},"filePathRelative":"dotnet/daimafenxi/readme.md","localizedDate":"2023年8月5日","excerpt":"<h2>概述</h2>\\n<p>.NET Compiler Platform (Roslyn) 分析器会检查 C## 或 Visual Basic 代码的代码质量和样式问题。 从 .NET 5 开始，这些分析器包含在 .NET SDK 中，无需单独安装。 如果项目面向 .NET 5 或更高版本，则默认启用代码分析。 如果项目面向之前版本的 .NET 实现（例如 .NET Core、. NET Standard 或 .NET Framework），则必须通过将 <a href=\\"https://learn.microsoft.com/zh-cn/dotnet/core/project-sdk/msbuild-props#enablenetanalyzers\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">EnableNETAnalyzers</a> 属性设置为true以手动启用代码分析。</p>","autoDesc":true}');export{o as comp,c as data};