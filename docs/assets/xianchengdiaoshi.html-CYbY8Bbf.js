import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as a,d as n}from"./app-DZ9bmjCp.js";const l="/kbms/common/1688220107993-d8427d3e-17db-4693-acff-b485442ec90a.png",h="/kbms/common/1688220491360-6ec9bb8c-b218-47d7-8170-7c58f60567a4.png",k="/kbms/common/1688220510717-908abf84-57eb-412d-991d-4ab306f0d3f9.png",e="/kbms/common/1688220586332-9b8b949a-0e83-4bf9-a56d-c18a9a1070b1.png",t="/kbms/common/1688220690348-8c20f32a-3cc1-4980-91d4-50621f0cc194.png",p={},d=n(`<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2><p>通过利用Vs的线程窗口来查看目前所有活动线程的运行情况以及线程目前在代码何处运行。</p><h2 id="操作" tabindex="-1"><a class="header-anchor" href="#操作"><span>操作</span></a></h2><h3 id="死锁测试" tabindex="-1"><a class="header-anchor" href="#死锁测试"><span>死锁测试</span></a></h3><p>实现一个简单的死锁程序：声明两个对象，让两个线程各自占用一个锁，然后再取拿另外一个锁，从而形成死锁</p><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">internal</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> Program</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    private</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> object</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> _lock_1</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> new</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> object</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    private</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> object</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> _lock</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> new</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> object</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    private</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> Main</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">[] </span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;">args</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> task1</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Task</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">Run</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">DeadLock</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        var</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E06C75;"> task2</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Task</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">Run</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">DeadLock_1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        Task</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">WaitAll</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">task1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">task2</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        Console</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">WriteLine</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;Hello, World!&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    private</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> DeadLock</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        lock</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">_lock</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">            Thread</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">Sleep</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">200</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">            lock</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">_lock_1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">                Console</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">WriteLine</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;DeadLock&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    private</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> DeadLock_1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        lock</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">_lock_1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">            Thread</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">Sleep</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">200</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">            lock</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">_lock</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">                Console</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">WriteLine</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;DeadLock_1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行程序后，将程序中断 <img src="`+l+'" alt="image.png" loading="lazy"> 然后点击调试=&gt;窗口=&gt;线程，可以看到工作线程 <img src="'+h+'" alt="image.png" loading="lazy"> 双击后可以查看到线程中断所处的位置，然后分析线程是否阻塞到这里 <img src="'+k+'" alt="image.png" loading="lazy"></p><p>还可以点击调试=&gt;窗口=&gt;任务来查看任务列表 <img src="'+e+'" alt="image.png" loading="lazy"> 这里就可以看到任务的状态，还可以看到当前死锁的原因 <img src="'+t+'" alt="image.png" loading="lazy"></p><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2><p><a href="https://mp.weixin.qq.com/s/eN2_6clqnhrZq1DY3Wpz6w" target="_blank" rel="noopener noreferrer">https://mp.weixin.qq.com/s/eN2_6clqnhrZq1DY3Wpz6w</a> | VS 2022调试技巧：远程调试、线程检查、性能检查</p>',10),r=[d];function g(B,c){return a(),i("div",null,r)}const E=s(p,[["render",g],["__file","xianchengdiaoshi.html.vue"]]),A=JSON.parse('{"path":"/dotnet/debugging/xianchengdiaoshi.html","title":"线程调试","lang":"zh-CN","frontmatter":{"title":"线程调试","lang":"zh-CN","date":"2023-07-01T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dotNET"],"tag":["无"],"filename":"xianchengdiaoshi","slug":"ewlz1fs3o5hvidrs","docsId":"131941449","description":"概述 通过利用Vs的线程窗口来查看目前所有活动线程的运行情况以及线程目前在代码何处运行。 操作 死锁测试 实现一个简单的死锁程序：声明两个对象，让两个线程各自占用一个锁，然后再取拿另外一个锁，从而形成死锁 运行程序后，将程序中断 image.png 然后点击调试=>窗口=>线程，可以看到工作线程 image.png 双击后可以查看到线程中断所处的位置，...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dotnet/debugging/xianchengdiaoshi.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"线程调试"}],["meta",{"property":"og:description","content":"概述 通过利用Vs的线程窗口来查看目前所有活动线程的运行情况以及线程目前在代码何处运行。 操作 死锁测试 实现一个简单的死锁程序：声明两个对象，让两个线程各自占用一个锁，然后再取拿另外一个锁，从而形成死锁 运行程序后，将程序中断 image.png 然后点击调试=>窗口=>线程，可以看到工作线程 image.png 双击后可以查看到线程中断所处的位置，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://azrng.gitee.io/kbms/kbms/common/1688220107993-d8427d3e-17db-4693-acff-b485442ec90a.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-18T04:27:19.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-07-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-18T04:27:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"线程调试\\",\\"image\\":[\\"https://azrng.gitee.io/kbms/kbms/common/1688220107993-d8427d3e-17db-4693-acff-b485442ec90a.png\\",\\"https://azrng.gitee.io/kbms/kbms/common/1688220491360-6ec9bb8c-b218-47d7-8170-7c58f60567a4.png\\",\\"https://azrng.gitee.io/kbms/kbms/common/1688220510717-908abf84-57eb-412d-991d-4ab306f0d3f9.png\\",\\"https://azrng.gitee.io/kbms/kbms/common/1688220586332-9b8b949a-0e83-4bf9-a56d-c18a9a1070b1.png\\",\\"https://azrng.gitee.io/kbms/kbms/common/1688220690348-8c20f32a-3cc1-4980-91d4-50621f0cc194.png\\"],\\"datePublished\\":\\"2023-07-01T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-18T04:27:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"操作","slug":"操作","link":"#操作","children":[{"level":3,"title":"死锁测试","slug":"死锁测试","link":"#死锁测试","children":[]}]},{"level":2,"title":"资料","slug":"资料","link":"#资料","children":[]}],"git":{"createdTime":1697962303000,"updatedTime":1702873639000,"contributors":[{"name":"zhangyunpeng","email":"zhang.yunpeng@synyi.com","commits":1}]},"readingTime":{"minutes":1.13,"words":339},"filePathRelative":"dotnet/debugging/xianchengdiaoshi.md","localizedDate":"2023年7月1日","excerpt":"<h2>概述</h2>\\n<p>通过利用Vs的线程窗口来查看目前所有活动线程的运行情况以及线程目前在代码何处运行。</p>\\n<h2>操作</h2>\\n<h3>死锁测试</h3>\\n<p>实现一个简单的死锁程序：声明两个对象，让两个线程各自占用一个锁，然后再取拿另外一个锁，从而形成死锁</p>\\n<div class=\\"language-csharp line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"csharp\\" data-title=\\"csharp\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">internal</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> class</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E5C07B\\"> Program</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">{</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">    private</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> static</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> object</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E06C75\\"> _lock_1</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> =</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#ABB2BF\\"> new</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> object</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">();</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">    private</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> static</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> object</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E06C75\\"> _lock</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> =</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#ABB2BF\\"> new</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> object</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">();</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">    private</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> static</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> void</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\"> Main</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">string</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">[] </span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E5C07B\\">args</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">)</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    {</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">        var</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E06C75\\"> task1</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> =</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\"> Task</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">Run</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">DeadLock</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">);</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">        var</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#E06C75\\"> task2</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\"> =</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\"> Task</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">Run</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">DeadLock_1</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">);</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">        Task</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">WaitAll</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">task1</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">, </span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">task2</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">);</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">        Console</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">WriteLine</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">\\"Hello, World!\\"</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">);</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    }</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">    private</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> static</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> void</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\"> DeadLock</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">()</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    {</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">        lock</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> (</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">_lock</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">)</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">        {</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">            Thread</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">Sleep</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">200</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">);</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">            lock</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> (</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">_lock_1</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">)</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">            {</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">                Console</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">WriteLine</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">\\"DeadLock\\"</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">);</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">            }</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">        }</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    }</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">    private</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> static</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> void</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\"> DeadLock_1</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">()</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    {</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">        lock</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> (</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">_lock_1</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">)</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">        {</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">            Thread</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">Sleep</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">200</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">);</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">            lock</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> (</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">_lock</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">)</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">            {</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E5C07B\\">                Console</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">WriteLine</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">\\"DeadLock_1\\"</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">);</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">            }</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">        }</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    }</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">}</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{E as comp,A as data};