import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as o,o as e,c,a as n,b as s,d as t,e as l}from"./app-vSdX8vi3.js";const u={},i=n("h2",{id:"概述",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#概述"},[n("span",null,"概述")])],-1),k={href:"https://github.com/shimat/opencvsharp",target:"_blank",rel:"noopener noreferrer"},r=l(`<h2 id="操作" tabindex="-1"><a class="header-anchor" href="#操作"><span>操作</span></a></h2><h2 id="直方图算法比较图片相似度" tabindex="-1"><a class="header-anchor" href="#直方图算法比较图片相似度"><span>直方图算法比较图片相似度</span></a></h2><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// 直方图相关性 </span>
<span class="token doc-comment comment">/// 结果越接近1 则越相似</span>
<span class="token doc-comment comment">/// 图片相似度识别（精度不高，速度较快，可用于以图搜图）</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>imgFile1<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>imgFile2<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">&gt;</span></span></span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">double</span></span> <span class="token function">Compare_Hist</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> imgFile1<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> imgFile2<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> matA <span class="token operator">=</span> Cv2<span class="token punctuation">.</span><span class="token function">ImRead</span><span class="token punctuation">(</span>imgFile1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> matB <span class="token operator">=</span> Cv2<span class="token punctuation">.</span><span class="token function">ImRead</span><span class="token punctuation">(</span>imgFile2<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 拆分通道</span>
    Cv2<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>matA<span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name">Mat<span class="token punctuation">[</span><span class="token punctuation">]</span></span> matA_S<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Cv2<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>matB<span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name">Mat<span class="token punctuation">[</span><span class="token punctuation">]</span></span> matB_S<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//直方图的像素范围   </span>
    <span class="token class-name">Rangef<span class="token punctuation">[</span><span class="token punctuation">]</span></span> histRange <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Rangef</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">256</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token comment">//直方图数组大小</span>
    <span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> histSize <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token number">256</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token comment">//直方图输出数组</span>
    <span class="token class-name">Mat</span> hist_A <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Mat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Mat</span> hist_B <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Mat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name"><span class="token keyword">bool</span></span> uniform <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> accumulate <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    Cv2<span class="token punctuation">.</span><span class="token function">CalcHist</span><span class="token punctuation">(</span>matA_S<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> hist_A<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> histSize<span class="token punctuation">,</span> histRange<span class="token punctuation">,</span> uniform<span class="token punctuation">,</span> accumulate<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Cv2<span class="token punctuation">.</span><span class="token function">CalcHist</span><span class="token punctuation">(</span>matB_S<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name"><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> hist_B<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> histSize<span class="token punctuation">,</span> histRange<span class="token punctuation">,</span> uniform<span class="token punctuation">,</span> accumulate<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//归一化，排除图像分辨率不一致的影响</span>
    Cv2<span class="token punctuation">.</span><span class="token function">Normalize</span><span class="token punctuation">(</span>hist_A<span class="token punctuation">,</span> hist_A<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> NormTypes<span class="token punctuation">.</span>MinMax<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Cv2<span class="token punctuation">.</span><span class="token function">Normalize</span><span class="token punctuation">(</span>hist_B<span class="token punctuation">,</span> hist_B<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> NormTypes<span class="token punctuation">.</span>MinMax<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//相关性比较</span>
    <span class="token class-name"><span class="token keyword">var</span></span> res <span class="token operator">=</span> Cv2<span class="token punctuation">.</span><span class="token function">CompareHist</span><span class="token punctuation">(</span>hist_A<span class="token punctuation">,</span> hist_B<span class="token punctuation">,</span> HistCompMethods<span class="token punctuation">.</span>Correl<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> res<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),m={href:"https://www.cnblogs.com/ycit/p/17688625.html",target:"_blank",rel:"noopener noreferrer"};function d(h,v){const a=o("ExternalLinkIcon");return e(),c("div",null,[i,n("p",null,[s("适用于 .NET 的 OpenCV 包装器 仓库地址："),n("a",k,[s("https://github.com/shimat/opencvsharp"),t(a)])]),r,n("p",null,[s("C#结合OpenCVSharp4图片相似度识别 "),n("a",m,[s("https://www.cnblogs.com/ycit/p/17688625.html"),t(a)]),s(" 需求背景：需要计算两个图片的相似度，然后将相似的图片进行归纳。")])])}const y=p(u,[["render",d],["__file","opencvsharp4.html.vue"]]),w=JSON.parse('{"path":"/middleware/tuxiangchuli/opencv/opencvsharp4.html","title":"OpenCVSharp4","lang":"zh-CN","frontmatter":{"title":"OpenCVSharp4","lang":"zh-CN","date":"2023-09-17T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["middleware"],"tag":["无"],"filename":"opencvsharp4","slug":"od52an2m8nkdshpk","docsId":"140124487","description":"概述 适用于 .NET 的 OpenCV 包装器 仓库地址：https://github.com/shimat/opencvsharp 操作 直方图算法比较图片相似度 C#结合OpenCVSharp4图片相似度识别 https://www.cnblogs.com/ycit/p/17688625.html 需求背景：需要计算两个图片的相似度，然后将相似的...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/middleware/tuxiangchuli/opencv/opencvsharp4.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"OpenCVSharp4"}],["meta",{"property":"og:description","content":"概述 适用于 .NET 的 OpenCV 包装器 仓库地址：https://github.com/shimat/opencvsharp 操作 直方图算法比较图片相似度 C#结合OpenCVSharp4图片相似度识别 https://www.cnblogs.com/ycit/p/17688625.html 需求背景：需要计算两个图片的相似度，然后将相似的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-27T05:34:48.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-09-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-27T05:34:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"OpenCVSharp4\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-09-17T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-27T05:34:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"操作","slug":"操作","link":"#操作","children":[]},{"level":2,"title":"直方图算法比较图片相似度","slug":"直方图算法比较图片相似度","link":"#直方图算法比较图片相似度","children":[]}],"git":{"createdTime":1697724028000,"updatedTime":1698384888000,"contributors":[{"name":"zhangyunpeng","email":"zhang.yunpeng@synyi.com","commits":1}]},"readingTime":{"minutes":1.03,"words":309},"filePathRelative":"middleware/tuxiangchuli/opencv/opencvsharp4.md","localizedDate":"2023年9月17日","excerpt":"<h2>概述</h2>\\n<p>适用于 .NET 的 OpenCV 包装器\\n仓库地址：<a href=\\"https://github.com/shimat/opencvsharp\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://github.com/shimat/opencvsharp</a></p>\\n<h2>操作</h2>\\n<h2>直方图算法比较图片相似度</h2>\\n<div class=\\"language-csharp\\" data-ext=\\"cs\\" data-title=\\"cs\\"><pre class=\\"language-csharp\\"><code><span class=\\"token doc-comment comment\\">/// <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>summary</span><span class=\\"token punctuation\\">&gt;</span></span></span>\\n<span class=\\"token doc-comment comment\\">/// 直方图相关性 </span>\\n<span class=\\"token doc-comment comment\\">/// 结果越接近1 则越相似</span>\\n<span class=\\"token doc-comment comment\\">/// 图片相似度识别（精度不高，速度较快，可用于以图搜图）</span>\\n<span class=\\"token doc-comment comment\\">/// <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>summary</span><span class=\\"token punctuation\\">&gt;</span></span></span>\\n<span class=\\"token doc-comment comment\\">/// <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>param</span> <span class=\\"token attr-name\\">name</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>imgFile1<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>param</span><span class=\\"token punctuation\\">&gt;</span></span></span>\\n<span class=\\"token doc-comment comment\\">/// <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>param</span> <span class=\\"token attr-name\\">name</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>imgFile2<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>param</span><span class=\\"token punctuation\\">&gt;</span></span></span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token return-type class-name\\"><span class=\\"token keyword\\">double</span></span> <span class=\\"token function\\">Compare_Hist</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\"><span class=\\"token keyword\\">string</span></span> imgFile1<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\"><span class=\\"token keyword\\">string</span></span> imgFile2<span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\"><span class=\\"token keyword\\">var</span></span> matA <span class=\\"token operator\\">=</span> Cv2<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">ImRead</span><span class=\\"token punctuation\\">(</span>imgFile1<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\"><span class=\\"token keyword\\">var</span></span> matB <span class=\\"token operator\\">=</span> Cv2<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">ImRead</span><span class=\\"token punctuation\\">(</span>imgFile2<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">// 拆分通道</span>\\n    Cv2<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Split</span><span class=\\"token punctuation\\">(</span>matA<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">out</span> <span class=\\"token class-name\\">Mat<span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span></span> matA_S<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    Cv2<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Split</span><span class=\\"token punctuation\\">(</span>matB<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">out</span> <span class=\\"token class-name\\">Mat<span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span></span> matB_S<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">//直方图的像素范围   </span>\\n    <span class=\\"token class-name\\">Rangef<span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span></span> histRange <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span> <span class=\\"token keyword\\">new</span> <span class=\\"token constructor-invocation class-name\\">Rangef</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">256</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">//直方图数组大小</span>\\n    <span class=\\"token class-name\\"><span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span></span> histSize <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span> <span class=\\"token number\\">256</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">//直方图输出数组</span>\\n    <span class=\\"token class-name\\">Mat</span> hist_A <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token constructor-invocation class-name\\">Mat</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">Mat</span> hist_B <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token constructor-invocation class-name\\">Mat</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token class-name\\"><span class=\\"token keyword\\">bool</span></span> uniform <span class=\\"token operator\\">=</span> <span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">,</span> accumulate <span class=\\"token operator\\">=</span> <span class=\\"token boolean\\">false</span><span class=\\"token punctuation\\">;</span>\\n    Cv2<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">CalcHist</span><span class=\\"token punctuation\\">(</span>matA_S<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">new</span> <span class=\\"token constructor-invocation class-name\\"><span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span></span> <span class=\\"token punctuation\\">{</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span> hist_A<span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> histSize<span class=\\"token punctuation\\">,</span> histRange<span class=\\"token punctuation\\">,</span> uniform<span class=\\"token punctuation\\">,</span> accumulate<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    Cv2<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">CalcHist</span><span class=\\"token punctuation\\">(</span>matB_S<span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">new</span> <span class=\\"token constructor-invocation class-name\\"><span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span></span> <span class=\\"token punctuation\\">{</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">,</span> hist_B<span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> histSize<span class=\\"token punctuation\\">,</span> histRange<span class=\\"token punctuation\\">,</span> uniform<span class=\\"token punctuation\\">,</span> accumulate<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">//归一化，排除图像分辨率不一致的影响</span>\\n    Cv2<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Normalize</span><span class=\\"token punctuation\\">(</span>hist_A<span class=\\"token punctuation\\">,</span> hist_A<span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> NormTypes<span class=\\"token punctuation\\">.</span>MinMax<span class=\\"token punctuation\\">,</span> <span class=\\"token operator\\">-</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    Cv2<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">Normalize</span><span class=\\"token punctuation\\">(</span>hist_B<span class=\\"token punctuation\\">,</span> hist_B<span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> NormTypes<span class=\\"token punctuation\\">.</span>MinMax<span class=\\"token punctuation\\">,</span> <span class=\\"token operator\\">-</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token comment\\">//相关性比较</span>\\n    <span class=\\"token class-name\\"><span class=\\"token keyword\\">var</span></span> res <span class=\\"token operator\\">=</span> Cv2<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">CompareHist</span><span class=\\"token punctuation\\">(</span>hist_A<span class=\\"token punctuation\\">,</span> hist_B<span class=\\"token punctuation\\">,</span> HistCompMethods<span class=\\"token punctuation\\">.</span>Correl<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">return</span> res<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{y as comp,w as data};