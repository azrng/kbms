import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as t,d as a}from"./app-CF6xeyXt.js";const n={},l=a(`<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span>介绍</span></a></h2><p>基类一般使用抽象类，目的是不让基类实例对象。 当多个类出现相同的功能，但是功能主题不同，这是可以向上抽取的。</p><p>特点</p><ul><li>不允许被实例化，只能被继承。</li><li>可以包含属性和方法。方法既可以包含代码的实现，也可以不包含代码的实现，不包含代码实现的叫做抽象方法。</li><li>子类继承抽象类，必须实现抽象类的所有抽象方法。貌似有点像虚方法一样，子类实现的时候是override。</li><li>不能使用partial，类和接口可以</li></ul><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">/// </span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">summary</span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">/// 抽象动物类</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">/// </span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">summary</span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> abstract</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> Animal</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    /// </span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">summary</span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    /// 包含实现的方法</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    /// </span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">summary</span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> Set</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        Console</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">WriteLine</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;吃东西&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    /// </span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">summary</span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    /// 抽象方法，不包含方法实现</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    /// </span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">summary</span><span style="--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> abstract</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> Sleep</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> Dog</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> : </span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">Animal</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> override</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> Sleep</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        throw</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> NotImplementedException</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="意义" tabindex="-1"><a class="header-anchor" href="#意义"><span>意义</span></a></h2><ul><li>解决代码复用，防止编写相同的代码</li><li>无法实现多态属性，比如将基类改为普通类，狗狗类子类还继承自动物类，实例化狗狗类后赋值给基类后，就无法调用Sleep的方法，但是这个时候如果基类是抽象类，那么子类在继承基类的时候，就硬性要求必须实现抽象方法。</li></ul><h2 id="对比类-抽象类-接口" tabindex="-1"><a class="header-anchor" href="#对比类-抽象类-接口"><span>对比类/抽象类/接口</span></a></h2><table><thead><tr><th>对比项\\类别</th><th>类</th><th>抽象类</th><th>接口</th></tr></thead><tbody><tr><td>成员</td><td>方法、属性、索引器、事件、字段</td><td>方法、属性、索引器、事件、字段</td><td>方法、属性、索引器、事件</td></tr><tr><td>是否可以使用构造函数</td><td>可以</td><td>可以</td><td>不可以</td></tr><tr><td>是否可以使用partial</td><td>可以</td><td>不可以</td><td>可以</td></tr><tr><td>是否可以实例化</td><td>可以</td><td>不可以</td><td>不可以</td></tr><tr><td>继承</td><td>单继承</td><td>单继承，继承的类必须重写抽象方法，除非继承类是抽象类，不能被接口继承</td><td>支持多继承，继承的类必须实现声明的所有方法</td></tr><tr><td>方法实现</td><td>可以</td><td>可以只包含声明(抽象方法)，也可以包含</td><td>可以只定义方法声明，c#8.0后可以包含方法实现，但是继承类无法使用</td></tr><tr><td>含义</td><td>对对象的抽象</td><td>对类的抽象</td><td>对行为的抽象</td></tr></tbody></table>`,9),h=[l];function e(k,p){return t(),s("div",null,h)}const y=i(n,[["render",e],["__file","chouxianglei.html.vue"]]),c=JSON.parse('{"path":"/dotnet/csharp/duixiangheleixing/chouxianglei.html","title":"抽象类","lang":"zh-CN","frontmatter":{"title":"抽象类","lang":"zh-CN","date":"2023-10-22T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["csharp"],"tag":["无"],"filename":"chouxianglei","slug":"lkt8gt","docsId":"47980980","description":"介绍 基类一般使用抽象类，目的是不让基类实例对象。 当多个类出现相同的功能，但是功能主题不同，这是可以向上抽取的。 特点 不允许被实例化，只能被继承。 可以包含属性和方法。方法既可以包含代码的实现，也可以不包含代码的实现，不包含代码实现的叫做抽象方法。 子类继承抽象类，必须实现抽象类的所有抽象方法。貌似有点像虚方法一样，子类实现的时候是override...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dotnet/csharp/duixiangheleixing/chouxianglei.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"抽象类"}],["meta",{"property":"og:description","content":"介绍 基类一般使用抽象类，目的是不让基类实例对象。 当多个类出现相同的功能，但是功能主题不同，这是可以向上抽取的。 特点 不允许被实例化，只能被继承。 可以包含属性和方法。方法既可以包含代码的实现，也可以不包含代码的实现，不包含代码实现的叫做抽象方法。 子类继承抽象类，必须实现抽象类的所有抽象方法。貌似有点像虚方法一样，子类实现的时候是override..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-17T14:50:44.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-10-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-11-17T14:50:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"抽象类\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-10-22T00:00:00.000Z\\",\\"dateModified\\":\\"2023-11-17T14:50:44.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"介绍","slug":"介绍","link":"#介绍","children":[]},{"level":2,"title":"意义","slug":"意义","link":"#意义","children":[]},{"level":2,"title":"对比类/抽象类/接口","slug":"对比类-抽象类-接口","link":"#对比类-抽象类-接口","children":[]}],"git":{"createdTime":1700232644000,"updatedTime":1700232644000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":1.96,"words":587},"filePathRelative":"dotnet/csharp/duixiangheleixing/chouxianglei.md","localizedDate":"2023年10月22日","excerpt":"<h2>介绍</h2>\\n<p>基类一般使用抽象类，目的是不让基类实例对象。\\n当多个类出现相同的功能，但是功能主题不同，这是可以向上抽取的。</p>\\n<p>特点</p>\\n<ul>\\n<li>不允许被实例化，只能被继承。</li>\\n<li>可以包含属性和方法。方法既可以包含代码的实现，也可以不包含代码的实现，不包含代码实现的叫做抽象方法。</li>\\n<li>子类继承抽象类，必须实现抽象类的所有抽象方法。貌似有点像虚方法一样，子类实现的时候是override。</li>\\n<li>不能使用partial，类和接口可以</li>\\n</ul>\\n<div class=\\"language-csharp line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"csharp\\" data-title=\\"csharp\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">/// </span><span style=\\"--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">&lt;</span><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">summary</span><span style=\\"--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">&gt;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">/// 抽象动物类</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">/// </span><span style=\\"--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">&lt;/</span><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">summary</span><span style=\\"--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">&gt;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">public</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> abstract</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> class</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E5C07B\\"> Animal</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">{</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">    /// </span><span style=\\"--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">&lt;</span><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">summary</span><span style=\\"--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">&gt;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">    /// 包含实现的方法</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">    /// </span><span style=\\"--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">&lt;/</span><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">summary</span><span style=\\"--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">&gt;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">    public</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> void</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\"> Set</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">()</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    {</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">        Console</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">WriteLine</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">\\"吃东西\\"</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">);</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    }</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">    /// </span><span style=\\"--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">&lt;</span><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">summary</span><span style=\\"--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">&gt;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">    /// 抽象方法，不包含方法实现</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">    /// </span><span style=\\"--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">&lt;/</span><span style=\\"--shiki-light:#22863A;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">summary</span><span style=\\"--shiki-light:#6A737D;--shiki-dark:#ABB2BF;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">&gt;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">    public</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> abstract</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> void</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\"> Sleep</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">();</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">}</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">public</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> class</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E5C07B\\"> Dog</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> : </span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E5C07B\\">Animal</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">{</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">    public</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> override</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> void</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\"> Sleep</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">()</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    {</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">        throw</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#ABB2BF\\"> new</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E5C07B\\"> NotImplementedException</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">();</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    }</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">}</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{y as comp,c as data};