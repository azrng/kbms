import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as i}from"./app-B3EhLA94.js";const l="/kbms/common/c1fdf6f765474cbd95660870fa28b408.png",p="/kbms/common/79966f0546eb43a8a4b2e1bdc28b05e7.png",t={};function c(r,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h2 id="_1-什么是方法拦截" tabindex="-1"><a class="header-anchor" href="#_1-什么是方法拦截"><span>1. 什么是方法拦截？</span></a></h2><p>方法拦截是指在方法被调用之前或之后，通过插入自定义的代码来修改方法的行为。通过方法拦截，开发人员可以在不修改原始代码的情况下，对方法的输入参数进行验证、修改方法的返回值、记录方法的调用日志等操作。</p><p>本文使用<code>Lib.Harmony</code>库实现第三方库方法的拦截，关于该库站长写过[快学会这个技能-.NET API拦截技法](快学会这个技能-.NET API拦截技法 - Dotnet9[2])一文，大家可以再看看，但该篇文章未介绍非public类及方法如何拦截，本文会有所补充反过来 。</p><h2 id="_2-示例程序拦截" tabindex="-1"><a class="header-anchor" href="#_2-示例程序拦截"><span>2. 示例程序拦截</span></a></h2><h3 id="_2-1-编写取数字段落的程序" tabindex="-1"><a class="header-anchor" href="#_2-1-编写取数字段落的程序"><span>2.1. 编写取数字段落的程序</span></a></h3><p>创建一个<code>.NET</code>类库工程，比如叫<code>TestDll</code>，添加工具类<code>TestTool</code>：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>namespace TestDll;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class TestTool</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    /// &lt;summary&gt;</span></span>
<span class="line"><span>    /// 带数字的优美段落</span></span>
<span class="line"><span>    /// &lt;/summary&gt;</span></span>
<span class="line"><span>    private readonly List&lt;string&gt; _sentences = new()</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        &quot;一，是孤独的象征，寂寞的代言人， 它独自站在诗句的起点，引人遐想。&quot;,</span></span>
<span class="line"><span>        &quot;二，是相对的存在，对立的伴侣， 它们如影随形，互相依存。&quot;,</span></span>
<span class="line"><span>        &quot;三，是完美的数字，三角的稳定， 它给诗歌带来了和谐的节奏。&quot;,</span></span>
<span class="line"><span>        &quot;四，是平衡的象征，四季的轮回， 它让诗歌的结构更加坚实。&quot;,</span></span>
<span class="line"><span>        &quot;五，是生机勃勃的数字，五彩斑斓的花朵， 它们在诗歌中绽放出美丽的画面。 &quot;,</span></span>
<span class="line"><span>        &quot;六，是平凡的数字，六边形的形状， 它们给诗歌带来了一种稳定的感觉。&quot;,</span></span>
<span class="line"><span>        &quot;七，是神秘的数字，七色的虹霓， 它们在诗歌中散发出神奇的光芒。&quot;,</span></span>
<span class="line"><span>        &quot;八，是无限的数字，八方的宇宙， 它们让诗歌的想象力无限延伸。&quot;,</span></span>
<span class="line"><span>        &quot;九，是完美的数字，九曲的江河， 它们给诗歌带来了一种流动的美感。 &quot;,</span></span>
<span class="line"><span>        &quot;十，是圆满的数字，十全十美的象征， 它们让诗歌的结尾更加完美。&quot;</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /// &lt;summary&gt;</span></span>
<span class="line"><span>    /// 取对应数字的段落</span></span>
<span class="line"><span>    /// &lt;/summary&gt;</span></span>
<span class="line"><span>    /// &lt;param name=&quot;number&quot;&gt;&lt;/param&gt;</span></span>
<span class="line"><span>    /// &lt;returns&gt;&lt;/returns&gt;</span></span>
<span class="line"><span>    public string GetNumberSentence(int number)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        var mo = number % _sentences.Count;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 个位为0，取最后一</span></span>
<span class="line"><span>        if (mo == 0)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            mo = 10;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (mo == 6)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            mo = 1;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        var sentencesIndex = mo - 1;</span></span>
<span class="line"><span>        return _sentences[sentencesIndex];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的方法<code>GetNumberSentence</code>逻辑：传入一个整型<code>number</code>参数，除10（集合_sentences项数）取模，返回10以内的数字美文段落，其中如果模为6会取数字1的段落（这是为了验证拦截逻辑设计添加的）。</p><p>下面是写的一个<code>AvaloniaUI</code>程序测试界面</p><figure><img src="`+l+`" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><h3 id="_2-2-为什么个位数字为6时-总是显示数字1的段落呢" tabindex="-1"><a class="header-anchor" href="#_2-2-为什么个位数字为6时-总是显示数字1的段落呢"><span>2.2. 为什么个位数字为6时，总是显示数字1的段落呢？</span></a></h3><p>分析上面的代码，我们想把<code>mo == 6</code>时让<code>mo = 1</code>逻辑去掉，除了使用<code>dnSpy</code>这些反编译工具修改代码，我们还可以使用<code>Lib.Harmony</code>（快学会这个技能-.NET API拦截技法 - Dotnet9[3]）拦截<code>GetNumberSentence</code>方法。</p><ol><li>安装<code>Lib.Harmony</code>包</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;PackageReference Include=&quot;Lib.Harmony&quot; Version=&quot;2.3.0-prerelease.2&quot; /&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol><li>编写拦截替换类</li></ol><p>参考快学会这个技能-.NET API拦截技法 - Dotnet9[4]添加如下拦截替换类：</p><ul><li>在拦截类上注册需要拦截的原类类型、原方法名和参数数据类型</li><li>可以先将原方法内代码复制到拦截替换方法<code>Prefix</code>内，对于原类中的属性、字段可通过反射获取(比如<code>_sentences</code>集合)</li><li>将<code>mo == 6</code>的代码注释</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>using HarmonyLib;</span></span>
<span class="line"><span>using System.Reflection;</span></span>
<span class="line"><span>using TestDll;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>namespace MultiVersionLibrary;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/// &lt;summary&gt;</span></span>
<span class="line"><span>/// HarmonyPatch特性关联拦截的类及方法</span></span>
<span class="line"><span>/// &lt;/summary&gt;</span></span>
<span class="line"><span>[HarmonyPatch(typeof(TestTool))]</span></span>
<span class="line"><span>[HarmonyPatch(nameof(TestTool.GetNumberSentence))]</span></span>
<span class="line"><span>[HarmonyPatch(new Type[] { typeof(int) })]</span></span>
<span class="line"><span>internal class HookGetNumberSentence</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    /// &lt;summary&gt;</span></span>
<span class="line"><span>    /// GetNumberSentence拦截替换方法</span></span>
<span class="line"><span>    /// &lt;/summary&gt;</span></span>
<span class="line"><span>    /// &lt;param name=&quot;__instance&quot;&gt;拦截的TestTool实例&lt;/param&gt;</span></span>
<span class="line"><span>    /// &lt;param name=&quot;number&quot;&gt;GetNumberSentence方法同名参数定义，修改它达到方法参数篡改&lt;/param&gt;</span></span>
<span class="line"><span>    /// &lt;param name=&quot;__result&quot;&gt;GetNumberSentence方法返回值，修改它达到方法值伪造&lt;/param&gt;</span></span>
<span class="line"><span>    /// &lt;returns&gt;&lt;/returns&gt;</span></span>
<span class="line"><span>    public static bool Prefix(ref object __instance, int number, ref string __result)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        try</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            //将原方法逻辑全部复制，然后做部分修改</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            //1、_sentences是拦截类TestTool的私胡字段，我们通过反射获取值</span></span>
<span class="line"><span>            var sentences =</span></span>
<span class="line"><span>                __instance.GetType().GetField(&quot;_sentences&quot;, BindingFlags.NonPublic | BindingFlags.Instance)</span></span>
<span class="line"><span>                    ?.GetValue(__instance) as List&lt;string&gt;;</span></span>
<span class="line"><span>            if (sentences?.Any() != true)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                __result = &quot;啊，没有优美句子吗？&quot;;</span></span>
<span class="line"><span>                return true;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            var mo = number % sentences.Count;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 个位为0，取最后一</span></span>
<span class="line"><span>            if (mo == 0)</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                mo = 10;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 2、注释我们认为有歧义的代码</span></span>
<span class="line"><span>            //if (mo == 6)</span></span>
<span class="line"><span>            //{</span></span>
<span class="line"><span>            //    mo = 1;</span></span>
<span class="line"><span>            //}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            var sentencesIndex = mo - 1;</span></span>
<span class="line"><span>            __result = sentences[sentencesIndex];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            return false;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        catch (Exception ex)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            return true;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>别忘了在<code>Program</code>或<code>App.xaml</code>初始方法内注册自动拦截类方法：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>var harmony = new Harmony(&quot;https://dotnet9.com&quot;);</span></span>
<span class="line"><span>harmony.PatchAll(Assembly.GetExecutingAssembly());</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>重新运行主程序，输入数字6时正常显示数字6对应的段落了：</p><p>这样就达到不修改第三库源码的情况实现结果篡改了，使用<code>.NET 8</code>拦截会有异常，后改为 <code>.NET 6</code> 得以正常运行，异常信息如下，可能是<code>Lib.Harmony</code>还不支持<code>.NET 8</code>吧：</p><h2 id="_3-非public方法怎么拦截" tabindex="-1"><a class="header-anchor" href="#_3-非public方法怎么拦截"><span>3. 非public方法怎么拦截？</span></a></h2><h3 id="_3-1-修改数字段落获取方法" tabindex="-1"><a class="header-anchor" href="#_3-1-修改数字段落获取方法"><span>3.1. 修改数字段落获取方法</span></a></h3><p>还是修改<code>TestTool</code>类，另外增加<code>GetNumberSentence2</code>方法，在方法中添加一个数字验证操作<code>mo = new CalNumber().GetValidNumber(mo);</code>，方法定义如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/// &lt;summary&gt;</span></span>
<span class="line"><span>/// 取对应数字的段落</span></span>
<span class="line"><span>/// &lt;/summary&gt;</span></span>
<span class="line"><span>/// &lt;param name=&quot;number&quot;&gt;&lt;/param&gt;</span></span>
<span class="line"><span>/// &lt;returns&gt;&lt;/returns&gt;</span></span>
<span class="line"><span>public string GetNumberSentence2(int number)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    var mo = number % _sentences.Count;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 个位为0，取最后一</span></span>
<span class="line"><span>    if (mo == 0)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        mo = 10;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 新增数字验证方法</span></span>
<span class="line"><span>    mo = new CalNumber().GetValidNumber(mo);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    var sentencesIndex = mo - 1;</span></span>
<span class="line"><span>    return _sentences[sentencesIndex];</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>验证方法定义如下：</p><ul><li><code>CalNumber</code>类和<code>GetValidNumber</code>方法用<code>internal</code>声明，意为类或方法只能在当前工程内使用</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>internal class CalNumber</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    internal int GetValidNumber(int number)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        // 这里可以加一些复杂的算法代码</span></span>
<span class="line"><span>        if (number == 6)</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            number = 1;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return number;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并在主工程调用数字获取段落方法处改为：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public string? Number</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    get { return _number; }</span></span>
<span class="line"><span>    set</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        _number = value;</span></span>
<span class="line"><span>        TryParse(_number, out var factNumber);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 换方法2了</span></span>
<span class="line"><span>        Message = _testTool.GetNumberSentence2(factNumber);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输入6时又返回1的段落了：</p><p>问题来了：internal方法怎么拦截？</p><p>我们不直接注释代码<code>mo = new CalNumber().GetValidNumber(mo);</code>，万一验证方法非常重要，我们只是需要修改其中部分逻辑，总体原逻辑不应该改变。</p><h3 id="_3-2-internal方法怎么拦截" tabindex="-1"><a class="header-anchor" href="#_3-2-internal方法怎么拦截"><span>3.2. internal方法怎么拦截？</span></a></h3><p>新增拦截类<code>HookGetValidNumber</code>，现在不能再在类上添加特性了（<code>[HarmonyPatch(typeof(CalNumber))]</code>），因为<code>CalNumber</code>不是public访问修饰，跨工程无法直接使用，语法不支持：</p><figure><img src="`+p+`" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><p>特性用不上，那就手工注册需要拦截的方法，这是本文的重点，代码在下面，简单提一下：</p><ul><li>手工注册代码和自动注册声明特性类似，只是换个写法；</li><li>拦截替换方法需要使用<code>HarmonyMethod</code>方法包装；</li><li><code>harmony.Patch(hookMethod, replaceHarmonyMethod);</code>用于关联被拦截方法与替换方法</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/// &lt;summary&gt;</span></span>
<span class="line"><span>/// 手工注册关联被拦截方法与替换方法</span></span>
<span class="line"><span>/// &lt;/summary&gt;</span></span>
<span class="line"><span>public static void StartHook()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    var harmony = new Harmony(&quot;https://dotnet9.com&quot;);</span></span>
<span class="line"><span>    var hookClassType = typeof(TestTool).Assembly.GetType(&quot;TestDll.CalNumber&quot;);</span></span>
<span class="line"><span>    var hookMethod = hookClassType!.GetMethod(&quot;GetValidNumber&quot;, BindingFlags.NonPublic | BindingFlags.Instance,</span></span>
<span class="line"><span>        new[] { typeof(int) });</span></span>
<span class="line"><span>    var replaceMethod = typeof(HookGetValidNumber).GetMethod(nameof(Prefix));</span></span>
<span class="line"><span>    var replaceHarmonyMethod = new HarmonyMethod(replaceMethod);</span></span>
<span class="line"><span>    harmony.Patch(hookMethod, replaceHarmonyMethod);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>替换方法定义如下：</p><ul><li><code>Prefix</code>方法命名这里不加限制，只要和上面手工注册（<code>var replaceMethod = typeof(HookGetValidNumber).GetMethod(nameof(Prefix));</code>）相同即可：</li><li>数字等于6，修改伪造结果为8</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/// &lt;summary&gt;</span></span>
<span class="line"><span>/// GetNumberSentence拦截替换方法</span></span>
<span class="line"><span>/// &lt;/summary&gt;</span></span>
<span class="line"><span>/// &lt;param name=&quot;__instance&quot;&gt;拦截的TestTool实例&lt;/param&gt;</span></span>
<span class="line"><span>/// &lt;param name=&quot;number&quot;&gt;GetNumberSentence方法同名参数定义，修改它达到方法参数篡改&lt;/param&gt;</span></span>
<span class="line"><span>/// &lt;param name=&quot;__result&quot;&gt;GetNumberSentence方法返回值，修改它达到方法值伪造&lt;/param&gt;</span></span>
<span class="line"><span>/// &lt;returns&gt;&lt;/returns&gt;</span></span>
<span class="line"><span>public static bool Prefix(ref object __instance, int number, ref int __result)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    //将原方法逻辑全部复制，然后做部分修改</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 这里可以加一些复杂的算法代码</span></span>
<span class="line"><span>    if (number == 6)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        number = 8;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    __result = number;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return false;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后在原自动注册代码下，再加一行手工注册代码就OK，打完收工：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 1、自动注册拦截类：拦截类上添加被拦截类和方法特性</span></span>
<span class="line"><span>var harmony = new Harmony(&quot;https://dotnet9.com&quot;);</span></span>
<span class="line"><span>harmony.PatchAll(Assembly.GetExecutingAssembly());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 2、自动注册拦截类，构造被拦截类和方法信息进行拦截</span></span>
<span class="line"><span>HookGetValidNumber.StartHook();</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行效果，输入6显示数字8段落：</p><h2 id="_4-总结" tabindex="-1"><a class="header-anchor" href="#_4-总结"><span>4. 总结</span></a></h2><p>使用<code>Lib.Harmony</code>库拦截注册有两种方式的用处如下：</p><ol><li><p>自动注册：</p></li><li><ul><li>通过在拦截类上使用特性关联被拦截类和方法定义，可以实现自动注册拦截逻辑。这种方式适用于需要拦截的类和方法比较多的情况，可以减少手动注册的工作量，提高开发效率。</li><li>自动注册通常只能关联public类或方法，因为IDE会根据代码的可见性进行过滤和提示。</li></ul></li><li><p>手工注册：</p></li><li><ul><li>通过代码构造被拦截类和方法定义进行手工注册，可以更加灵活地控制拦截逻辑。这种方式适用于需要对拦截逻辑进行定制化处理的情况，可以根据具体需求选择需要拦截的类和方法，并对拦截逻辑进行精细化配置。</li><li>手工注册更加灵活，可以拦截包括internal在内的各种类和方法。手工注册可以通过编写代码来实现对非public类和方法的关联，但需要注意的是，这样做可能会增加代码的复杂性和维护成本。</li></ul></li></ol><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2><p>Dotnet9: <a href="https://dotnet9.com/2023/09/Intercept-tamper-with-and-forge-classes-and-methods-in-the-dotNET-class-library-that-are-not-limited-to-public" target="_blank" rel="noopener noreferrer">https://dotnet9.com/2023/09/Intercept-tamper-with-and-forge-classes-and-methods-in-the-dotNET-class-library-that-are-not-limited-to-public</a></p><p>快学会这个技能-.NET API拦截技法: <a href="https://dotnet9.com/2023/02/Learn-this-skill-Dotnet-API-interception-technique" target="_blank" rel="noopener noreferrer">https://dotnet9.com/2023/02/Learn-this-skill-Dotnet-API-interception-technique</a></p><p>快学会这个技能-.NET API拦截技法 - Dotnet9: <a href="https://dotnet9.com/2023/02/Learn-this-skill-Dotnet-API-interception-technique" target="_blank" rel="noopener noreferrer">https://dotnet9.com/2023/02/Learn-this-skill-Dotnet-API-interception-technique</a></p><p>快学会这个技能-.NET API拦截技法 - Dotnet9: <a href="https://dotnet9.com/2023/02/Learn-this-skill-Dotnet-API-interception-technique" target="_blank" rel="noopener noreferrer">https://dotnet9.com/2023/02/Learn-this-skill-Dotnet-API-interception-technique</a></p><p>MultiVersionLibrary: <a href="https://github.com/dotnet9/TerminalMACS.ManagerForWPF/tree/master/src/Demo/MultiVersionLibrary" target="_blank" rel="noopener noreferrer">https://github.com/dotnet9/TerminalMACS.ManagerForWPF/tree/master/src/Demo/MultiVersionLibrary</a></p><p><a href="https://mp.weixin.qq.com/s/KKpaXxKQkyLoSg_Tr2NoBA" target="_blank" rel="noopener noreferrer">https://mp.weixin.qq.com/s/KKpaXxKQkyLoSg_Tr2NoBA</a> | 【细致完整】终章：模拟.NET应用场景，综合应用反编译、第三方库调试、拦截、一库多版本兼容方案</p>`,56)]))}const m=s(t,[["render",c],["__file","interceptDLL.html.vue"]]),u=JSON.parse('{"path":"/dotnet/chengxujicaozuo/interceptDLL.html","title":"拦截|篡改|伪造.NET类库中不限于public的类和方法","lang":"zh-CN","frontmatter":{"title":"拦截|篡改|伪造.NET类库中不限于public的类和方法","lang":"zh-CN","date":"2023-09-24T00:00:00.000Z","publish":true,"author":"沙漠尽头的狼","isOriginal":true,"category":["dotNet"],"tag":["Lib.Harmony"],"filename":"interceptDLL","description":"1. 什么是方法拦截？ 方法拦截是指在方法被调用之前或之后，通过插入自定义的代码来修改方法的行为。通过方法拦截，开发人员可以在不修改原始代码的情况下，对方法的输入参数进行验证、修改方法的返回值、记录方法的调用日志等操作。 本文使用Lib.Harmony库实现第三方库方法的拦截，关于该库站长写过[快学会这个技能-.NET API拦截技法](快学会这个技能...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dotnet/chengxujicaozuo/interceptDLL.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"拦截|篡改|伪造.NET类库中不限于public的类和方法"}],["meta",{"property":"og:description","content":"1. 什么是方法拦截？ 方法拦截是指在方法被调用之前或之后，通过插入自定义的代码来修改方法的行为。通过方法拦截，开发人员可以在不修改原始代码的情况下，对方法的输入参数进行验证、修改方法的返回值、记录方法的调用日志等操作。 本文使用Lib.Harmony库实现第三方库方法的拦截，关于该库站长写过[快学会这个技能-.NET API拦截技法](快学会这个技能..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://azrng.gitee.io/kbms/kbms/common/c1fdf6f765474cbd95660870fa28b408.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-29T03:06:47.000Z"}],["meta",{"property":"article:author","content":"沙漠尽头的狼"}],["meta",{"property":"article:tag","content":"Lib.Harmony"}],["meta",{"property":"article:published_time","content":"2023-09-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-29T03:06:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"拦截|篡改|伪造.NET类库中不限于public的类和方法\\",\\"image\\":[\\"https://azrng.gitee.io/kbms/kbms/common/c1fdf6f765474cbd95660870fa28b408.png\\",\\"https://azrng.gitee.io/kbms/kbms/common/79966f0546eb43a8a4b2e1bdc28b05e7.png\\"],\\"datePublished\\":\\"2023-09-24T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-29T03:06:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"沙漠尽头的狼\\"}]}"]]},"headers":[{"level":2,"title":"1. 什么是方法拦截？","slug":"_1-什么是方法拦截","link":"#_1-什么是方法拦截","children":[]},{"level":2,"title":"2. 示例程序拦截","slug":"_2-示例程序拦截","link":"#_2-示例程序拦截","children":[{"level":3,"title":"2.1. 编写取数字段落的程序","slug":"_2-1-编写取数字段落的程序","link":"#_2-1-编写取数字段落的程序","children":[]},{"level":3,"title":"2.2. 为什么个位数字为6时，总是显示数字1的段落呢？","slug":"_2-2-为什么个位数字为6时-总是显示数字1的段落呢","link":"#_2-2-为什么个位数字为6时-总是显示数字1的段落呢","children":[]}]},{"level":2,"title":"3. 非public方法怎么拦截？","slug":"_3-非public方法怎么拦截","link":"#_3-非public方法怎么拦截","children":[{"level":3,"title":"3.1. 修改数字段落获取方法","slug":"_3-1-修改数字段落获取方法","link":"#_3-1-修改数字段落获取方法","children":[]},{"level":3,"title":"3.2. internal方法怎么拦截？","slug":"_3-2-internal方法怎么拦截","link":"#_3-2-internal方法怎么拦截","children":[]}]},{"level":2,"title":"4. 总结","slug":"_4-总结","link":"#_4-总结","children":[]},{"level":2,"title":"资料","slug":"资料","link":"#资料","children":[]}],"git":{"createdTime":1695552464000,"updatedTime":1698548807000,"contributors":[{"name":"azrng","username":"azrng","email":"itzhangyunpeng@163.com","commits":3},{"name":"zhangyunpeng","username":"zhangyunpeng","email":"zhang.yunpeng@synyi.com","commits":1}]},"readingTime":{"minutes":8.28,"words":2484},"filePathRelative":"dotnet/chengxujicaozuo/interceptDLL.md","localizedDate":"2023年9月24日","excerpt":"<h2>1. 什么是方法拦截？</h2>\\n<p>方法拦截是指在方法被调用之前或之后，通过插入自定义的代码来修改方法的行为。通过方法拦截，开发人员可以在不修改原始代码的情况下，对方法的输入参数进行验证、修改方法的返回值、记录方法的调用日志等操作。</p>\\n<p>本文使用<code>Lib.Harmony</code>库实现第三方库方法的拦截，关于该库站长写过[快学会这个技能-.NET API拦截技法](快学会这个技能-.NET API拦截技法 - Dotnet9[2])一文，大家可以再看看，但该篇文章未介绍非public类及方法如何拦截，本文会有所补充反过来 。</p>\\n<h2>2. 示例程序拦截</h2>","autoDesc":true}');export{m as comp,u as data};
