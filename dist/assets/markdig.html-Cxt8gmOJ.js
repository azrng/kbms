import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as p,o as e,c as o,a as n,b as s,d as l,e as c}from"./app-vSdX8vi3.js";const r="/kbms/common/1661053412090-bbee335e-1dae-4c96-8c28-f207f7877b88.png",i="/kbms/common/1661053380079-ef5aa986-042d-4980-ae25-012a6c2135d4.png",u={},k=n("h2",{id:"概述",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#概述"},[n("span",null,"概述")])],-1),d={href:"http://commonmark.org/",target:"_blank",rel:"noopener noreferrer"},m=c(`<p>下载量：10M 最后更新时间：12天前</p><h2 id="操作" tabindex="-1"><a class="header-anchor" href="#操作"><span>操作</span></a></h2><p>安装nuget包</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code> <span class="token operator">&lt;</span><span class="token class-name">PackageReference</span> Include<span class="token operator">=</span><span class="token string">&quot;Markdig&quot;</span> Version<span class="token operator">=</span><span class="token string">&quot;0.30.3&quot;</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="无参数转换为html" tabindex="-1"><a class="header-anchor" href="#无参数转换为html"><span>无参数转换为HTML</span></a></h3><p>默认情况下，没有任何选项，Markdig使用的是普通的CommonMark解析器：</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> Markdown<span class="token punctuation">.</span><span class="token function">ToHtml</span><span class="token punctuation">(</span><span class="token string">&quot;## 张三 \\r\\n ### 李思&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span> 

<span class="token operator">--</span> 输出结果
<span class="token operator">&lt;</span>h1<span class="token operator">&gt;</span>张三<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>h2<span class="token operator">&gt;</span>李思<span class="token operator">&lt;</span><span class="token operator">/</span>h2<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>经过测试，转换后图片、文字都存在，只不过代码块样式没了</p><p>转换表格</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> str<span class="token operator">=</span><span class="token string">@&quot;| 姓名 | 性别 | 年级 |
| ---- | ---- | ---- |
| 张三 | 男   | 10   |
| 李四 | 女   | 20   |
| 王五 | 男   | 30   |&quot;</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> result1 <span class="token operator">=</span> Markdown<span class="token punctuation">.</span><span class="token function">ToHtml</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>result1<span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token comment">// 输出结果</span>
<span class="token operator">&lt;</span>p<span class="token operator">&gt;</span><span class="token operator">|</span> 姓名 <span class="token operator">|</span> 性别 <span class="token operator">|</span> 年级 <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">|</span> <span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">|</span> <span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">|</span>
<span class="token operator">|</span> 张三 <span class="token operator">|</span> 男   <span class="token operator">|</span> <span class="token number">10</span>   <span class="token operator">|</span>
<span class="token operator">|</span> 李四 <span class="token operator">|</span> 女   <span class="token operator">|</span> <span class="token number">20</span>   <span class="token operator">|</span>
<span class="token operator">|</span> 王五 <span class="token operator">|</span> 男   <span class="token operator">|</span> <span class="token number">30</span>   <span class="token operator">|</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+r+`" alt="image.png" loading="lazy"> 所以在默认配置的情况下转换表格是存在问题的。</p><h3 id="高级扩展" tabindex="-1"><a class="header-anchor" href="#高级扩展"><span>高级扩展</span></a></h3><p>使用大多数高级扩展（除了表情符号，SoftLine作为HardLine，Bootstrap，YAML Front Matter，JiraLinks和SmartyPants）</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> str <span class="token operator">=</span> <span class="token string">@&quot;| 姓名 | 性别 | 年级 |
| ---- | ---- | ---- |
| 张三 | 男   | 10   |
| 李四 | 女   | 20   |
| 王五 | 男   | 30   |&quot;</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> pipeline <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MarkdownPipelineBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UseAdvancedExtensions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> result1 <span class="token operator">=</span> Markdown<span class="token punctuation">.</span><span class="token function">ToHtml</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> pipeline<span class="token punctuation">)</span><span class="token punctuation">;</span>
Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>result1<span class="token punctuation">)</span><span class="token punctuation">;</span>

File<span class="token punctuation">.</span><span class="token function">WriteAllText</span><span class="token punctuation">(</span><span class="token string">&quot;d://aa.html&quot;</span><span class="token punctuation">,</span> result1<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token operator">--</span> 输出结果
<span class="token operator">&lt;</span>table<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>thead<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>tr<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>th<span class="token operator">&gt;</span>姓名<span class="token operator">&lt;</span><span class="token operator">/</span>th<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>th<span class="token operator">&gt;</span>性别<span class="token operator">&lt;</span><span class="token operator">/</span>th<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>th<span class="token operator">&gt;</span>年级<span class="token operator">&lt;</span><span class="token operator">/</span>th<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>tr<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>thead<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>tbody<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>tr<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>td<span class="token operator">&gt;</span>张三<span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>td<span class="token operator">&gt;</span>男<span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>td<span class="token operator">&gt;</span><span class="token number">10</span><span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>tr<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>tr<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>td<span class="token operator">&gt;</span>李四<span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>td<span class="token operator">&gt;</span>女<span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>td<span class="token operator">&gt;</span><span class="token number">20</span><span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>tr<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>tr<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>td<span class="token operator">&gt;</span>王五<span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>td<span class="token operator">&gt;</span>男<span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>td<span class="token operator">&gt;</span><span class="token number">30</span><span class="token operator">&lt;</span><span class="token operator">/</span>td<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>tr<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>tbody<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>table<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+i+`" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h3 id="单独添加表格扩展" tabindex="-1"><a class="header-anchor" href="#单独添加表格扩展"><span>单独添加表格扩展</span></a></h3><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> str <span class="token operator">=</span> <span class="token string">@&quot;| 姓名 | 性别 | 年级 |
| ---- | ---- | ---- |
| 张三 | 男   | 10   |
| 李四 | 女   | 20   |
| 王五 | 男   | 30   |&quot;</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> builder <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">MarkdownPipelineBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
builder<span class="token punctuation">.</span>Extensions<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">PipeTableExtension</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> pipeline <span class="token operator">=</span> builder<span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>Markdown<span class="token punctuation">.</span><span class="token function">ToHtml</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span>pipeline<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解析markdown" tabindex="-1"><a class="header-anchor" href="#解析markdown"><span>解析Markdown</span></a></h3><h4 id="解析表格" tabindex="-1"><a class="header-anchor" href="#解析表格"><span>解析表格</span></a></h4><p>从网上摘抄的一个解析表格的示例</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> builder <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">MarkdownPipelineBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
builder<span class="token punctuation">.</span>Extensions<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">PipeTableExtension</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> pipeline <span class="token operator">=</span> builder<span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> doc <span class="token operator">=</span> Markdown<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token string">&quot;### 标题2 \\r\\n \\r\\n&quot;</span> <span class="token operator">+</span>
<span class="token string">&quot;|表头1|表头2|\\r\\n&quot;</span> <span class="token operator">+</span>
<span class="token string">&quot;|-----|-----|\\r\\n&quot;</span> <span class="token operator">+</span>
<span class="token string">&quot;|行1列1|行1列2|\\r\\n&quot;</span> <span class="token operator">+</span>
<span class="token string">&quot;|行2列1|行2列2|\\r\\n&quot;</span><span class="token punctuation">,</span>
pipeline<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> doc<span class="token punctuation">.</span>Count<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> b <span class="token operator">=</span> doc<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>b <span class="token keyword">is</span> <span class="token class-name">HeadingBlock</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">var</span></span> heading <span class="token operator">=</span> <span class="token punctuation">(</span>Markdig<span class="token punctuation">.</span>Syntax<span class="token punctuation">.</span>HeadingBlock<span class="token punctuation">)</span>b<span class="token punctuation">;</span>
        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>heading<span class="token punctuation">.</span>Level<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">var</span></span> containerInline <span class="token operator">=</span> heading<span class="token punctuation">.</span>Inline<span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">var</span></span> literalInline <span class="token operator">=</span> containerInline<span class="token punctuation">.</span>FirstChild <span class="token keyword">as</span> <span class="token class-name">Markdig<span class="token punctuation">.</span>Syntax<span class="token punctuation">.</span>Inlines<span class="token punctuation">.</span>LiteralInline</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">var</span></span> stringSlice <span class="token operator">=</span> literalInline<span class="token punctuation">.</span>Content<span class="token punctuation">;</span>

        Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>stringSlice<span class="token punctuation">.</span>Text<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>stringSlice<span class="token punctuation">.</span>Start<span class="token punctuation">,</span> stringSlice<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>b <span class="token keyword">is</span> <span class="token class-name">Table</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">var</span></span> table <span class="token operator">=</span> <span class="token punctuation">(</span>Table<span class="token punctuation">)</span>b<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> table<span class="token punctuation">.</span>Count<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">var</span></span> row <span class="token operator">=</span> <span class="token punctuation">(</span>TableRow<span class="token punctuation">)</span>table<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> k <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> k <span class="token operator">&lt;</span> row<span class="token punctuation">.</span>Count<span class="token punctuation">;</span> k<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token class-name"><span class="token keyword">var</span></span> cell <span class="token operator">=</span> <span class="token punctuation">(</span>TableCell<span class="token punctuation">)</span>row<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">var</span></span> containerInline <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>LeafBlock<span class="token punctuation">)</span>cell<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Inline<span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">var</span></span> literalInline <span class="token operator">=</span> containerInline<span class="token punctuation">.</span>FirstChild <span class="token keyword">as</span> <span class="token class-name">Markdig<span class="token punctuation">.</span>Syntax<span class="token punctuation">.</span>Inlines<span class="token punctuation">.</span>LiteralInline</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">var</span></span> stringSlice <span class="token operator">=</span> literalInline<span class="token punctuation">.</span>Content<span class="token punctuation">;</span>

                Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>stringSlice<span class="token punctuation">.</span>Text<span class="token punctuation">.</span><span class="token function">Substring</span><span class="token punctuation">(</span>stringSlice<span class="token punctuation">.</span>Start<span class="token punctuation">,</span> stringSlice<span class="token punctuation">.</span>Length<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21);function v(g,b){const a=p("ExternalLinkIcon");return e(),o("div",null,[k,n("p",null,[s("Markdig 是一款快速、功能强大、符合 "),n("a",d,[s("CommonMark"),l(a)]),s(" 标准、可扩展的 Markdown 处理器，适用于 .NET。")]),m])}const f=t(u,[["render",v],["__file","markdig.html.vue"]]),y=JSON.parse('{"path":"/middleware/office/markdown/markdig.html","title":"Markdig","lang":"zh-CN","frontmatter":{"title":"Markdig","lang":"zh-CN","date":"2023-04-01T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["middleware"],"tag":["无"],"filename":"markdig","slug":"uvume8","docsId":"90167322","description":"概述 Markdig 是一款快速、功能强大、符合 CommonMark 标准、可扩展的 Markdown 处理器，适用于 .NET。 下载量：10M 最后更新时间：12天前 操作 安装nuget包 无参数转换为HTML 默认情况下，没有任何选项，Markdig使用的是普通的CommonMark解析器： 经过测试，转换后图片、文字都存在，只不过代码块样式...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/middleware/office/markdown/markdig.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"Markdig"}],["meta",{"property":"og:description","content":"概述 Markdig 是一款快速、功能强大、符合 CommonMark 标准、可扩展的 Markdown 处理器，适用于 .NET。 下载量：10M 最后更新时间：12天前 操作 安装nuget包 无参数转换为HTML 默认情况下，没有任何选项，Markdig使用的是普通的CommonMark解析器： 经过测试，转换后图片、文字都存在，只不过代码块样式..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://azrng.gitee.io/kbms/kbms/common/1661053412090-bbee335e-1dae-4c96-8c28-f207f7877b88.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-19T14:00:28.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-19T14:00:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Markdig\\",\\"image\\":[\\"https://azrng.gitee.io/kbms/kbms/common/1661053412090-bbee335e-1dae-4c96-8c28-f207f7877b88.png\\",\\"https://azrng.gitee.io/kbms/kbms/common/1661053380079-ef5aa986-042d-4980-ae25-012a6c2135d4.png\\"],\\"datePublished\\":\\"2023-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-19T14:00:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"操作","slug":"操作","link":"#操作","children":[{"level":3,"title":"无参数转换为HTML","slug":"无参数转换为html","link":"#无参数转换为html","children":[]},{"level":3,"title":"高级扩展","slug":"高级扩展","link":"#高级扩展","children":[]},{"level":3,"title":"单独添加表格扩展","slug":"单独添加表格扩展","link":"#单独添加表格扩展","children":[]},{"level":3,"title":"解析Markdown","slug":"解析markdown","link":"#解析markdown","children":[{"level":4,"title":"解析表格","slug":"解析表格","link":"#解析表格","children":[]}]}]}],"git":{"createdTime":1697724028000,"updatedTime":1697724028000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":1.95,"words":586},"filePathRelative":"middleware/office/markdown/markdig.md","localizedDate":"2023年4月1日","excerpt":"<h2>概述</h2>\\n<p>Markdig 是一款快速、功能强大、符合 <a href=\\"http://commonmark.org/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">CommonMark</a> 标准、可扩展的 Markdown 处理器，适用于 .NET。</p>\\n<p>下载量：10M 最后更新时间：12天前</p>\\n<h2>操作</h2>\\n<p>安装nuget包</p>\\n<div class=\\"language-csharp\\" data-ext=\\"cs\\" data-title=\\"cs\\"><pre class=\\"language-csharp\\"><code> <span class=\\"token operator\\">&lt;</span><span class=\\"token class-name\\">PackageReference</span> Include<span class=\\"token operator\\">=</span><span class=\\"token string\\">\\"Markdig\\"</span> Version<span class=\\"token operator\\">=</span><span class=\\"token string\\">\\"0.30.3\\"</span> <span class=\\"token operator\\">/</span><span class=\\"token operator\\">&gt;</span>\\n</code></pre></div>","autoDesc":true}');export{f as comp,y as data};