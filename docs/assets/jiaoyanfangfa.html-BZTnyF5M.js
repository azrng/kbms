import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as a,d as n}from"./app-HmxoaDfj.js";const t={},l=n(`<h2 id="邮箱验证" tabindex="-1"><a class="header-anchor" href="#邮箱验证"><span>邮箱验证</span></a></h2><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> bool</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> IsValidEmail</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">string</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> value</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">	if</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> ==</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">	{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">		return</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">	}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">	if</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> is</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> string</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> valueAsString</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">	{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">		return</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">	// only return true if there is only 1 &#39;@&#39; character</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">	// and it is neither the first nor the last character</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">	int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> index</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> valueAsString</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">IndexOf</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;@&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">	return</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> index</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> &gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> &amp;&amp;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">		index</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> !=</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> valueAsString</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Length</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> &amp;&amp;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">		index</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> ==</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> valueAsString</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">LastIndexOf</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;@&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),h=[l];function e(k,p){return a(),i("div",null,h)}const g=s(t,[["render",e],["__file","jiaoyanfangfa.html.vue"]]),y=JSON.parse(`{"path":"/dotnet/csharp/jiaoyanfangfa.html","title":"校验方法","lang":"zh-CN","frontmatter":{"title":"校验方法","lang":"zh-CN","date":"2023-11-09T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["csharp"],"tag":["verify"],"description":"邮箱验证","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dotnet/csharp/jiaoyanfangfa.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"校验方法"}],["meta",{"property":"og:description","content":"邮箱验证"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-19T14:58:52.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"verify"}],["meta",{"property":"article:published_time","content":"2023-11-09T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-05-19T14:58:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"校验方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-11-09T00:00:00.000Z\\",\\"dateModified\\":\\"2024-05-19T14:58:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"邮箱验证","slug":"邮箱验证","link":"#邮箱验证","children":[]}],"git":{"createdTime":1700232644000,"updatedTime":1716130732000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":2}]},"readingTime":{"minutes":0.27,"words":80},"filePathRelative":"dotnet/csharp/jiaoyanfangfa.md","localizedDate":"2023年11月9日","excerpt":"<h2>邮箱验证</h2>\\n<div class=\\"language-csharp line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"csharp\\" data-title=\\"csharp\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">public</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> static</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> bool</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\"> IsValidEmail</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">string</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E5C07B\\"> value</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">)</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">{</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">\\tif</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> (</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">value</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> ==</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\"> null</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">)</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">\\t{</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">\\t\\treturn</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\"> false</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">\\t}</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">\\tif</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> (</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">!</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">value</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#ABB2BF\\"> is</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> string</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E06C75\\"> valueAsString</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">))</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">\\t{</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">\\t\\treturn</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\"> false</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">\\t}</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">\\t// only return true if there is only 1 '@' character</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\">\\t// and it is neither the first nor the last character</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">\\tint</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E06C75\\"> index</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> =</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\"> valueAsString</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">IndexOf</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">'@'</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">);</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">\\treturn</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\"> index</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> &gt;</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\"> 0</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> &amp;&amp;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">\\t\\tindex</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> !=</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\"> valueAsString</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">Length</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> -</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\"> 1</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> &amp;&amp;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">\\t\\tindex</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> ==</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\"> valueAsString</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">LastIndexOf</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">'@'</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">);</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">}</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{g as comp,y as data};