import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as a,d as n}from"./app-CF6xeyXt.js";const e={},l=n(`<h2 id="快速上手" tabindex="-1"><a class="header-anchor" href="#快速上手"><span>快速上手</span></a></h2><h3 id="安装模板" tabindex="-1"><a class="header-anchor" href="#安装模板"><span>安装模板</span></a></h3><p>运行命令安装模板，详细步骤看<a href="https://docs.avaloniaui.net/zh-Hans/docs/get-started/install" target="_blank" rel="noopener noreferrer">此处</a></p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">dotnet</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> install</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Avalonia</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Templates</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="安装可视化界面" tabindex="-1"><a class="header-anchor" href="#安装可视化界面"><span>安装可视化界面</span></a></h3><p>比如Vs中可以安装：<a href="https://marketplace.visualstudio.com/items?itemName=AvaloniaTeam.AvaloniaVS" target="_blank" rel="noopener noreferrer">Avalonia for Visual Studio 2022</a> 以及XAML格式化工具<a href="https://marketplace.visualstudio.com/items?itemName=TeamXavalon.XAMLStyler2022" target="_blank" rel="noopener noreferrer">XAML Styler for Visual Studio 2022</a>，或者在Rider中安装<a href="https://plugins.jetbrains.com/plugin/14839-avaloniarider" target="_blank" rel="noopener noreferrer">AvaloniaRider</a></p><h2 id="输入控件" tabindex="-1"><a class="header-anchor" href="#输入控件"><span>输入控件</span></a></h2><h3 id="简单操作" tabindex="-1"><a class="header-anchor" href="#简单操作"><span>简单操作</span></a></h3><div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">Grid</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">    Margin</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;5&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">    ColumnDefinitions</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;120,100&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">    RowDefinitions</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;Auto,Auto,Auto&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">    ShowGridLines</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;True&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">Label</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">        Grid.Row</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;0&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">        Grid.Column</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;0&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">        Margin</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;10&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        Celsius</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">Label</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">TextBox</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">        Grid.Row</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;0&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">        Grid.Column</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;1&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">        Margin</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;0,5&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">Label</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">        Grid.Row</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;1&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">        Grid.Column</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;0&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">        Margin</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;10&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        Fahrenheit</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">Label</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">TextBox</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">        Grid.Row</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;1&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">        Grid.Column</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;1&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">        Margin</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;0,5&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">Button</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">        Grid.Row</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;2&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">        Grid.Column</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;1&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">        Margin</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;0,5&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">        Content</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;计算&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">Grid</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="按钮控件" tabindex="-1"><a class="header-anchor" href="#按钮控件"><span>按钮控件</span></a></h2><h3 id="非按钮控件绑定点击命令" tabindex="-1"><a class="header-anchor" href="#非按钮控件绑定点击命令"><span>非按钮控件绑定点击命令</span></a></h3><p>资料来自：https://www.coderbusy.com/archives/3146.html</p><p>在 Avalonia 中鼠标点击元素触发的事件名为：<code>PointerPressed</code> 。我们要做的是：在 <code>PointerPressed</code> 事件被触发后调用 ViewModel 中的 Command。先在项目中增加对 <code>Avalonia.Xaml.Behaviors</code> 的 NuGet 引用，接着在页面上引入名称空间：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>&lt;UserControl ...</span></span>
<span class="line"><span>  xmlns:ic=&quot;clr-namespace:Avalonia.Xaml.Interactivity;assembly=Avalonia.Xaml.Interactivity&quot;</span></span>
<span class="line"><span>  xmlns:ia=&quot;clr-namespace:Avalonia.Xaml.Interactions.Core;assembly=Avalonia.Xaml.Interactions&quot;</span></span>
<span class="line"><span>&gt;</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>&lt;/UserControl&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下代码假设 ViewModel 中有一个名为 TestCommand 的命令：</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>Border 的 Background 属性必须要有值，即便是设置为透明也是有意义的。否则可能会出现鼠标点击没有效果的情况。</p></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>&lt;Border Background=&quot;Transparent&quot;&gt;</span></span>
<span class="line"><span>    &lt;ic:Interaction.Behaviors&gt;</span></span>
<span class="line"><span>        &lt;ia:EventTriggerBehavior EventName=&quot;PointerPressed&quot;&gt;</span></span>
<span class="line"><span>            &lt;ia:InvokeCommandAction Command=&quot;{Binding TestCommand}&quot;&gt;&lt;/ia:InvokeCommandAction&gt;</span></span>
<span class="line"><span>        &lt;/ia:EventTriggerBehavior&gt;</span></span>
<span class="line"><span>    &lt;/ic:Interaction.Behaviors&gt;</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>&lt;/Border&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="图片" tabindex="-1"><a class="header-anchor" href="#图片"><span>图片</span></a></h2><p>在资源字典中添加一张位图图片：https://www.coderbusy.com/archives/3266.html</p><h2 id="布局" tabindex="-1"><a class="header-anchor" href="#布局"><span>布局</span></a></h2><h3 id="stackpanel" tabindex="-1"><a class="header-anchor" href="#stackpanel"><span>StackPanel</span></a></h3><div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">StackPanel</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">Border</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">        Margin</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;5&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">        BorderBrush</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;LightBlue&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">        CornerRadius</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;10&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">TextBlock</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">            Margin</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;5&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">            HorizontalAlignment</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;Center&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">            FontSize</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;24&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">            Text</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;温度转换器&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">Border</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">StackPanel</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">Button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> HorizontalAlignment</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;Center&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;计算&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">Button</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">StackPanel</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="样式" tabindex="-1"><a class="header-anchor" href="#样式"><span>样式</span></a></h2><p>Avalonia与其他XAML框架最明显的不同之一在于其样式系统。在Avalonia中，有两种方法可以为控件设置样式：</p><ul><li><a href="https://docs.avaloniaui.net/zh-Hans/docs/basics/user-interface/styling" target="_blank" rel="noopener noreferrer"><code>Style</code></a> 是一种类似CSS的样式。样式不像在WPF中存储在<code>Resources</code>集合中，而是存储在一个独立的<code>Styles</code>集合中。</li><li><a href="https://docs.avaloniaui.net/zh-Hans/docs/basics/user-interface/styling/control-themes" target="_blank" rel="noopener noreferrer"><code>ControlTheme</code></a> 类似于WPF的<code>Style</code>，通常用于为无外观的控件创建主题。</li></ul><p>Avalonia 中的样式和控件主题：https://mp.weixin.qq.com/s/oY5SDKFG8X92aWmm7yddAQ</p><p>常见样式不生效故障：https://www.coderbusy.com/archives/3236.html</p><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h3><p>以下代码显示了一个<code>UserControl</code>，其中定义了自己的CSS样式。</p><div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">UserControl</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">UserControl.Styles</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">Style</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> Selector</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;Label.Class1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">Setter</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> Property</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;FontSize&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> Value</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;20&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">Setter</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">Style</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">UserControl.Styles</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">Label</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">        Margin</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;10&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">        Classes</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;Class1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        Celsius</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">Label</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">UserControl</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="主题" tabindex="-1"><a class="header-anchor" href="#主题"><span>主题</span></a></h2><p>切换主题颜色：https://www.coderbusy.com/archives/3136.html</p><h2 id="窗口" tabindex="-1"><a class="header-anchor" href="#窗口"><span>窗口</span></a></h2><h3 id="无边框拖动" tabindex="-1"><a class="header-anchor" href="#无边框拖动"><span>无边框拖动</span></a></h3><p>在 Avalnia 中的 Window 对象有一个名为 <code>ExtendClientAreaChromeHints</code> 的属性。设置该属性为 <code>NoChrome</code> 且 <code>ExtendClientAreaToDecorationsHint</code>为 <code>True</code> 之后，包含最大化、最小化按钮在内的系统标题栏就消失了。另一个取消掉标题栏的方式是：设置窗体的 <code>SystemDecorations</code> 为 <code>None</code> 。</p><p>因为少了标题栏，所以就需要额外的代码实现拖动功能。</p><div class="language-c# line-numbers-mode" data-highlighter="shiki" data-ext="c#" data-title="c#" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">private</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> HeaderBorder_OnPointerPressed</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">object</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> sender</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">PointerPressedEventArgs</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> e</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">e</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Pointer</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Type</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> ==</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> PointerType</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Mouse</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) </span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">    	this</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">BeginMoveDrag</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">e</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只需要将任意元素的 PointerPressed 事件增加以上事件处理器即可在该元素上实现无边框拖动。</p><h2 id="访问ui线程" tabindex="-1"><a class="header-anchor" href="#访问ui线程"><span>访问UI线程</span></a></h2><p>资料：<a href="https://docs.avaloniaui.net/zh-Hans/docs/guides/development-guides/accessing-the-ui-thread" target="_blank" rel="noopener noreferrer">https://docs.avaloniaui.net/zh-Hans/docs/guides/development-guides/accessing-the-ui-thread</a></p><p>如果使用到需要在UI线程上执行操作可以使用下面代码</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Dispatcher</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">UIThread</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">Invoke</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">xxx</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> });</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,42),t=[l];function h(p,k){return a(),i("div",null,t)}const o=s(e,[["render",h],["__file","operator.html.vue"]]),c=JSON.parse('{"path":"/dotnet/avalonia/operator.html","title":"基础操作","lang":"zh-CN","frontmatter":{"title":"基础操作","lang":"zh-CN","date":"2023-05-31T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dotNET"],"tag":["operator"],"slug":"nwl1gyg0plroop4q","docsId":"125589246","description":"快速上手 安装模板 运行命令安装模板，详细步骤看此处 安装可视化界面 比如Vs中可以安装：Avalonia for Visual Studio 2022 以及XAML格式化工具XAML Styler for Visual Studio 2022，或者在Rider中安装AvaloniaRider 输入控件 简单操作 按钮控件 非按钮控件绑定点击命令 资料...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dotnet/avalonia/operator.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"基础操作"}],["meta",{"property":"og:description","content":"快速上手 安装模板 运行命令安装模板，详细步骤看此处 安装可视化界面 比如Vs中可以安装：Avalonia for Visual Studio 2022 以及XAML格式化工具XAML Styler for Visual Studio 2022，或者在Rider中安装AvaloniaRider 输入控件 简单操作 按钮控件 非按钮控件绑定点击命令 资料..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-25T14:04:18.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"operator"}],["meta",{"property":"article:published_time","content":"2023-05-31T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-25T14:04:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"基础操作\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-05-31T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-25T14:04:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"快速上手","slug":"快速上手","link":"#快速上手","children":[{"level":3,"title":"安装模板","slug":"安装模板","link":"#安装模板","children":[]},{"level":3,"title":"安装可视化界面","slug":"安装可视化界面","link":"#安装可视化界面","children":[]}]},{"level":2,"title":"输入控件","slug":"输入控件","link":"#输入控件","children":[{"level":3,"title":"简单操作","slug":"简单操作","link":"#简单操作","children":[]}]},{"level":2,"title":"按钮控件","slug":"按钮控件","link":"#按钮控件","children":[{"level":3,"title":"非按钮控件绑定点击命令","slug":"非按钮控件绑定点击命令","link":"#非按钮控件绑定点击命令","children":[]}]},{"level":2,"title":"图片","slug":"图片","link":"#图片","children":[]},{"level":2,"title":"布局","slug":"布局","link":"#布局","children":[{"level":3,"title":"StackPanel","slug":"stackpanel","link":"#stackpanel","children":[]}]},{"level":2,"title":"样式","slug":"样式","link":"#样式","children":[{"level":3,"title":"示例","slug":"示例","link":"#示例","children":[]}]},{"level":2,"title":"主题","slug":"主题","link":"#主题","children":[]},{"level":2,"title":"窗口","slug":"窗口","link":"#窗口","children":[{"level":3,"title":"无边框拖动","slug":"无边框拖动","link":"#无边框拖动","children":[]}]},{"level":2,"title":"访问UI线程","slug":"访问ui线程","link":"#访问ui线程","children":[]}],"git":{"createdTime":1697962303000,"updatedTime":1719324258000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":4},{"name":"zhangyunpeng","email":"zhang.yunpeng@synyi.com","commits":1}]},"readingTime":{"minutes":2.68,"words":804},"filePathRelative":"dotnet/avalonia/operator.md","localizedDate":"2023年5月31日","excerpt":"<h2>快速上手</h2>\\n<h3>安装模板</h3>\\n<p>运行命令安装模板，详细步骤看<a href=\\"https://docs.avaloniaui.net/zh-Hans/docs/get-started/install\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">此处</a></p>\\n<div class=\\"language-csharp line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"csharp\\" data-title=\\"csharp\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">dotnet</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> new</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\"> install</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\"> Avalonia</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">Templates</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{o as comp,c as data};