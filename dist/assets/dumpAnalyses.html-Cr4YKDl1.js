import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as p,o as i,c as o,a as n,b as s,d as e,e as l}from"./app-vSdX8vi3.js";const c={},u=l(`<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2><p>C#内存转储，或称为<code>dump</code>文件，是应用程序在特定时刻状态的快照。可以把程序的执行状态通过调试器保存到dump文件中，它们对于诊断问题（如性能问题、崩溃和内存泄漏）非常有帮助。</p><h2 id="什么是内存转储" tabindex="-1"><a class="header-anchor" href="#什么是内存转储"><span>什么是内存转储</span></a></h2><p>内存转储实质上是一个应用程序在特定点状态的快照。它包含了与应用程序相关的系统内存中的所有内容，包括变量、线程和堆栈跟踪。当进行调试，特别是尝试复制难以重现的错误时，这些数据可能会非常有用。</p><blockquote><p>内容来自：https://mp.weixin.qq.com/s/YfkO6cVrwXn0x0PlHmMfrg</p></blockquote><h2 id="生成dump文件" tabindex="-1"><a class="header-anchor" href="#生成dump文件"><span>生成dump文件</span></a></h2><h3 id="任务管理器-windows" tabindex="-1"><a class="header-anchor" href="#任务管理器-windows"><span>任务管理器(windows)</span></a></h3><p>通过任务管理器=&gt;进程=&gt;右键=&gt;创建转储文件生成</p><h3 id="dotnet-dump-windows、容器" tabindex="-1"><a class="header-anchor" href="#dotnet-dump-windows、容器"><span>dotnet-dump(windows、容器)</span></a></h3><p><strong>dotnet-dump 全局工具</strong>是一种收集和分析.NET 核心应用程序 Dump 的方法。</p><p>使用之前需要安装<code>.NetSdk</code>或者直接下载，在操作前看下具体是服务中哪些线程引发的异常，然后针对特定线程进行分析</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># windnows</span>
dotnet tool <span class="token function">install</span> <span class="token parameter variable">--global</span> dotnet-dump
<span class="token comment"># 找到进程id</span>
dotnet-dump <span class="token function">ps</span>
<span class="token comment"># 根据指定进程id创建dump文件</span>
dotnet-dump collect --process-id <span class="token operator">&lt;</span>ProcessId<span class="token operator">&gt;</span>


<span class="token comment"># 进入容器安装htop</span>
<span class="token function">apt-get</span> update
<span class="token comment"># 执行命令htop来查看资源使用情况    </span>
<span class="token function">apt-get</span> <span class="token function">install</span> <span class="token function">htop</span>

<span class="token comment"># 下载 dotnet-dump</span>
<span class="token function">apt-get</span> update<span class="token operator">&amp;&amp;</span><span class="token function">apt-get</span> <span class="token function">install</span> <span class="token function">wget</span>
<span class="token function">wget</span> https://aka.ms/dotnet-dump/linux-x64 <span class="token parameter variable">-O</span> /usr/local/bin/dotnet-dump<span class="token operator">&amp;&amp;</span><span class="token function">chmod</span> +x /usr/local/bin/dotnet-dump
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行以下命令即可创建 dump 文件（容器内默认 dotnet 进程对应 pid 均为 1）：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">find</span> /usr/share <span class="token parameter variable">-name</span> createdump

<span class="token comment"># 2.2.8</span>
/usr/share/dotnet/shared/Microsoft.NETCore.App/2.2.8/createdump <span class="token number">1</span>
<span class="token comment"># 6.0.0</span>
/usr/share/dotnet/shared/Microsoft.NETCore.App/6.0.0/createdump <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令执行完成后，将生成 dump 文件 /tmp/coredump.1，我们需要通过 docker cp 或 kubectl cp 将 coredump.1 文件复制到主机目录下，然后下载到用于 dump 分析的机器上。 注意：在 Docker 部署模式下，createdump 命令执行需要有容器特权，所以在容器启动时需要加 --privileged = true 参数。另外 dump 文件生成需要使用较大内存，需适当调整容器内存限制参数。</p><h3 id="procdump-windows、linux" tabindex="-1"><a class="header-anchor" href="#procdump-windows、linux"><span>ProcDump(Windows、linux)</span></a></h3><p><code>ProcDump</code>是一个命令行工具，当应用程序假死或进程使用太多的 CPU 时，可以生成一个 Dump 文件。支持在程序运行期间达到指定的条件后自动生成dump文件</p><p>https://medium.com/@marioh_78322/investigating-net-out-of-memory-exceptions-using-sysinternals-procdump-for-linux-8a59c8b289 | Investigating .NET Out of Memory Exceptions Using Sysinternals ProcDump for Linux | by Mario Hewardt | Sep, 2023 | Medium --- 使用 Sysinternals ProcDump for Linux 调查 .NET 内存不足异常 |作者：马里奥·赫沃德特 |9月， 2023 |中等</p><h3 id="windows平台代码生成" tabindex="-1"><a class="header-anchor" href="#windows平台代码生成"><span>windows平台代码生成</span></a></h3><p>熟悉 Windows 平台的朋友都知道，在 Win32 API 中有一个 MiniDumpWriteDump 的方法声明，方法实现是在 dbghelp.dll中，而且 dbghelp 是操作系统自带的，有了这些知识，我们可以将 dbghelp.lib 静态链接过来生成dump，参考代码如下：</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token preprocessor property">#include &lt;iostream&gt;</span>
<span class="token preprocessor property">#include &lt;Windows.h&gt;</span>
<span class="token preprocessor property">#include &lt;minidumpapiset.h&gt;</span>
<span class="token preprocessor property">#include </span><span class="token string">&quot;Dbghelp.h&quot;</span>
<span class="token preprocessor property">#</span><span class="token return-type class-name">pragma</span> <span class="token function">comment</span><span class="token punctuation">(</span>lib<span class="token punctuation">,</span> <span class="token string">&quot;dbghelp.lib&quot;</span><span class="token punctuation">)</span>

<span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
 <span class="token comment">//1. 创建文件</span>
 <span class="token class-name">HANDLE</span> hFile <span class="token operator">=</span> <span class="token function">CreateFile</span><span class="token punctuation">(</span>L<span class="token string">&quot;D:\\\\testdump\\\\MiniDump.dmp&quot;</span><span class="token punctuation">,</span> GENERIC_READ <span class="token operator">|</span> GENERIC_WRITE<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> NULL<span class="token punctuation">,</span>
  CREATE_ALWAYS<span class="token punctuation">,</span> FILE_ATTRIBUTE_NORMAL<span class="token punctuation">,</span> NULL<span class="token punctuation">)</span><span class="token punctuation">;</span>

 <span class="token function">MiniDumpWriteDump</span><span class="token punctuation">(</span><span class="token function">GetCurrentProcess</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">GetCurrentProcessId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> hFile<span class="token punctuation">,</span> MiniDumpWithFullMemory<span class="token punctuation">,</span> NULL<span class="token punctuation">,</span>
  NULL<span class="token punctuation">,</span> NULL<span class="token punctuation">)</span><span class="token punctuation">;</span>

 <span class="token function">CloseHandle</span><span class="token punctuation">(</span>hFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认用的 dbghelp.dll 是 Windows 系统目录下的，版本比较老，新功能可能不支持，如果我想用新版本的 dbghelp.dll 去哪里找呢？ 其实有一个快捷途径，就是windbg 的安装目录下都会有最新的 dbghelp.dll，可以用 .chain 去寻找。</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token number">0</span><span class="token punctuation">:</span><span class="token number">000</span><span class="token operator">&gt;</span> <span class="token punctuation">.</span>chain
Extension <span class="token class-name">DLL</span> chain<span class="token punctuation">:</span>
    dbghelp<span class="token punctuation">:</span> image <span class="token number">10.0</span><span class="token number">.25877</span><span class="token number">.1004</span><span class="token punctuation">,</span> API <span class="token number">10.0</span><span class="token number">.6</span><span class="token punctuation">,</span> 
        <span class="token punctuation">[</span>path<span class="token punctuation">:</span> C<span class="token punctuation">:</span>\\Program Files\\WindowsApps\\Microsoft<span class="token punctuation">.</span>WinDbg_1<span class="token punctuation">.</span><span class="token number">2306.14001</span><span class="token punctuation">.</span>0_x64__8wekyb3d8bbwe\\amd64\\dbghelp<span class="token punctuation">.</span>dll<span class="token punctuation">]</span>
    exts<span class="token punctuation">:</span> image <span class="token number">10.0</span><span class="token number">.25877</span><span class="token number">.1004</span><span class="token punctuation">,</span> API <span class="token number">1.0</span><span class="token number">.0</span><span class="token punctuation">,</span> 
        <span class="token punctuation">[</span>path<span class="token punctuation">:</span> C<span class="token punctuation">:</span>\\Program Files\\WindowsApps\\Microsoft<span class="token punctuation">.</span>WinDbg_1<span class="token punctuation">.</span><span class="token number">2306.14001</span><span class="token punctuation">.</span>0_x64__8wekyb3d8bbwe\\amd64\\WINXP\\exts<span class="token punctuation">.</span>dll<span class="token punctuation">]</span>
    <span class="token range operator">..</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的 dbghelp 就是，接下来用 LoadLibrary 加载进来即可，失败逻辑就不写了哈，参考代码如下：</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token preprocessor property">#include &lt;iostream&gt;</span>
<span class="token preprocessor property">#include &lt;windows.h&gt;</span>
<span class="token preprocessor property">#include &lt;dbghelp.h&gt;</span>

<span class="token return-type class-name">typedef</span> <span class="token function">BOOL</span><span class="token punctuation">(</span>WINAPI<span class="token operator">*</span> MiniDumpWriteDumpT<span class="token punctuation">)</span><span class="token punctuation">(</span>
 HANDLE<span class="token punctuation">,</span>
 DWORD<span class="token punctuation">,</span>
 HANDLE<span class="token punctuation">,</span>
 MINIDUMP_TYPE<span class="token punctuation">,</span>
 PMINIDUMP_EXCEPTION_INFORMATION<span class="token punctuation">,</span>
 PMINIDUMP_USER_STREAM_INFORMATION<span class="token punctuation">,</span>
 PMINIDUMP_CALLBACK_INFORMATION<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
 <span class="token comment">//1. 创建文件</span>
 <span class="token class-name">HANDLE</span> hFile <span class="token operator">=</span> <span class="token function">CreateFile</span><span class="token punctuation">(</span>L<span class="token string">&quot;D:\\\\testdump\\\\MiniDump2.dmp&quot;</span><span class="token punctuation">,</span> GENERIC_READ <span class="token operator">|</span> GENERIC_WRITE<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> NULL<span class="token punctuation">,</span>
  CREATE_ALWAYS<span class="token punctuation">,</span> FILE_ATTRIBUTE_NORMAL<span class="token punctuation">,</span> NULL<span class="token punctuation">)</span><span class="token punctuation">;</span>

 <span class="token class-name">HMODULE</span> hDbgHelp <span class="token operator">=</span> <span class="token function">LoadLibrary</span><span class="token punctuation">(</span>L<span class="token string">&quot;dbghelp.dll&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

 <span class="token class-name">MiniDumpWriteDumpT</span> pfnMinidumpWriteDump <span class="token operator">=</span> <span class="token punctuation">(</span>MiniDumpWriteDumpT<span class="token punctuation">)</span><span class="token function">GetProcAddress</span><span class="token punctuation">(</span>hDbgHelp<span class="token punctuation">,</span> <span class="token string">&quot;MiniDumpWriteDump&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

 <span class="token function">pfnMinidumpWriteDump</span><span class="token punctuation">(</span><span class="token function">GetCurrentProcess</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">GetCurrentProcessId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> hFile<span class="token punctuation">,</span> MiniDumpWithFullMemory<span class="token punctuation">,</span> NULL<span class="token punctuation">,</span>
  NULL<span class="token punctuation">,</span> NULL<span class="token punctuation">)</span><span class="token punctuation">;</span>

 <span class="token function">CloseHandle</span><span class="token punctuation">(</span>hFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="microsoft-diagnostics-netcore-clien-linux" tabindex="-1"><a class="header-anchor" href="#microsoft-diagnostics-netcore-clien-linux"><span>Microsoft.Diagnostics.NETCore.Clien(linux)</span></a></h3><p>从 nuget 安装 Microsoft.Diagnostics.NETCore.Client 包</p><blockquote><p>它是微软提供的 EventPipe 收集机制，可以收集 .NET 的 ETW 和 EventSource 发生的事件，更多详情可以观察微软的官方文档。</p><ul><li>https://learn.microsoft.com/zh-cn/dotnet/core/diagnostics/diagnostics-client-library?source=recommendations</li><li>https://learn.microsoft.com/zh-cn/dotnet/core/diagnostics/eventpipe</li></ul></blockquote><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token keyword">internal</span> <span class="token keyword">class</span> <span class="token class-name">Program</span>
<span class="token punctuation">{</span>
	<span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		Task<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
		<span class="token punctuation">{</span>
			Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">&quot;指标异常，要抓 dump 啦！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			Dumper<span class="token punctuation">.</span><span class="token function">TriggerCoreDump</span><span class="token punctuation">(</span>Environment<span class="token punctuation">.</span>ProcessId<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		Console<span class="token punctuation">.</span><span class="token function">ReadLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Dumper</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">TriggerCoreDump</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> processId<span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token class-name"><span class="token keyword">var</span></span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DiagnosticsClient</span><span class="token punctuation">(</span>processId<span class="token punctuation">)</span><span class="token punctuation">;</span>
			client<span class="token punctuation">.</span><span class="token function">WriteDump</span><span class="token punctuation">(</span>DumpType<span class="token punctuation">.</span>Full<span class="token punctuation">,</span> <span class="token string">&quot;/data/minidump.dmp&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上传到 Linux ，执行 dotnet Example_5_1_7.dll 后，minidump.dmp 就出来了。</p><p>DumpType枚举值：</p><div class="language-c# line-numbers-mode" data-ext="c#" data-title="c#"><pre class="language-c#"><code>public enum DumpType
{
    Normal = 1,
    WithHeap = 2,
    Triage = 3,
    Full = 4
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>各个枚举值的含义如下：</p><ul><li><strong>Normal</strong>：主要包含线程和某些系统信息，但不包括堆信息。此类型的 dump 文件较小，适用于在处理能力有限的环境中快速捕获应用程序的状态。</li><li><strong>WithHeap</strong>：包含 Normal 类型的所有信息，还额外包含所有托管堆内存的信息。此类型的 dump 文件可以用于进行更详细的分析，例如内存泄漏分析。</li><li><strong>Triage</strong>：包含一些关键线程和模块数据，以及与异常相关的对象。此类型的 dump 文件主要用于快速诊断常见问题。</li><li><strong>Full</strong>：包含进程的所有内存，包括所有线程、堆和非堆内存。此类型的 dump 文件最大，可以用于进行全面的分析。</li></ul><h2 id="分析转储文件" tabindex="-1"><a class="header-anchor" href="#分析转储文件"><span>分析转储文件</span></a></h2><h3 id="visual-studio" tabindex="-1"><a class="header-anchor" href="#visual-studio"><span>Visual Studio</span></a></h3><ol><li><p>打开 Visual Studio。</p></li><li><p>转到 <strong>文件 &gt; 打开 &gt; 项目/解决方案</strong>。</p></li><li><p>导航到你的 <code>.dmp</code> 文件并打开它。</p></li><li><p>Visual Studio 将自动分析崩溃转储并突出显示重要信息。</p></li></ol><h3 id="windbg" tabindex="-1"><a class="header-anchor" href="#windbg"><span>WinDbg</span></a></h3><p>WinDbg 是一个更高级的工具，但它允许对内存转储进行深度分析：</p><ol><li>下载并安装包含 WinDbg 的 Windows 调试工具。</li><li>打开 WinDbg，并加载你的转储文件（<code>文件 &gt; 打开崩溃转储</code>）。</li><li>加载调试 .NET 应用程序所需的扩展，如 SOS (<code>!loadby sos clr</code>)。</li><li>使用各种命令来分析转储（例如，使用 <code>!clrstack</code> 来查看管理堆栈）。</li></ol><h3 id="dotnet-dump" tabindex="-1"><a class="header-anchor" href="#dotnet-dump"><span>dotnet-dump</span></a></h3><p>在.NetCore3之前，可以通过网上的镜像，然后进行lldb分析，如6opuc/lldb-netcore，该镜像默认是基于2.2.8构建的，可以通过执行命令进入lldb</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code>docker run <span class="token operator">--</span>rm <span class="token operator">-</span>it <span class="token operator">-</span>v <span class="token operator">/</span>root<span class="token operator">/</span>coredump<span class="token punctuation">.</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token operator">/</span>tmp<span class="token operator">/</span>coredump 6opuc<span class="token operator">/</span>lldb<span class="token operator">-</span>netcore
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在.NetCore3以及之后，官网提供了dotnet-dump工具进行dump分析，下面进行安装</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>-- 安装
dotnet tool <span class="token function">install</span> <span class="token parameter variable">--global</span> dotnet-dump
    
-- 分析
dotnet-dump analyze /root/coredump.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h4><div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><pre class="language-powershell"><code><span class="token comment"># 查看正在运行的托管线程</span>
clrthreads

<span class="token comment"># 指定当前需要分析的线程</span>
setthread 7

<span class="token comment"># 查看当前线程在托管代码中的堆栈信息</span>
clrstack

<span class="token comment"># 查看gc2</span>
dg gen2

<span class="token comment"># 查看某一个类型信息</span>
dumpheap <span class="token operator">-</span>mt  <span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span>

<span class="token comment"># 查看某个具体对象</span>
<span class="token keyword">do</span> <span class="token operator">*</span><span class="token operator">*</span>

<span class="token comment"># 查看这个具体对象的gc 根</span>
gcroot <span class="token operator">-</span>all <span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,47),d={href:"https://learn.microsoft.com/zh-cn/dotnet/core/diagnostics/dotnet-dump#analyze-sos-commands",target:"_blank",rel:"noopener noreferrer"},r=n("h3",{id:"分析文档",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#分析文档"},[n("span",null,"分析文档")])],-1),m=n("p",null,"https://medium.com/@marioh_78322/investigating-net-out-of-memory-exceptions-using-sysinternals-procdump-for-linux-8a59c8b289 | Investigating .NET Out of Memory Exceptions Using Sysinternals ProcDump for Linux | by Mario Hewardt | Sep, 2023 | Medium --- 使用 Sysinternals ProcDump for Linux 调查 .NET 内存不足异常 |作者：马里奥·赫沃德特 |9月， 2023 |中等",-1),k={href:"https://blog.csdn.net/sD7O95O/article/details/114650326",target:"_blank",rel:"noopener noreferrer"},v=n("h2",{id:"参考文档",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#参考文档"},[n("span",null,"参考文档")])],-1),b={href:"https://mp.weixin.qq.com/s/LY4hLa6rGRK6U14efAa3Gw",target:"_blank",rel:"noopener noreferrer"},h={href:"https://mp.weixin.qq.com/s/nB1RrHAJcpdnZcVsqDtRXg",target:"_blank",rel:"noopener noreferrer"},g=n("p",null,"内存分析工具dot-Memory：https://www.cnblogs.com/qinhuan/p/13913460.html",-1);function w(f,y){const a=p("ExternalLinkIcon");return i(),o("div",null,[u,n("p",null,[s("官网文档："),n("a",d,[s("https://learn.microsoft.com/zh-cn/dotnet/core/diagnostics/dotnet-dump#analyze-sos-commands"),e(a)])]),r,m,n("p",null,[s(".netcore dump分析："),n("a",k,[s("https://blog.csdn.net/sD7O95O/article/details/114650326open in new window"),e(a)]),s(" 使用dotnet-dump查询cpu占用高的问题：https://www.cnblogs.com/fanfan-90/p/14508282.html")]),v,n("p",null,[s("创建.Net程序Dump的几种姿势："),n("a",b,[s("https://mp.weixin.qq.com/s/LY4hLa6rGRK6U14efAa3Gw"),e(a)]),s(" linux上.Net如何自主生成Dump："),n("a",h,[s("https://mp.weixin.qq.com/s/nB1RrHAJcpdnZcVsqDtRXg"),e(a)])]),g])}const _=t(c,[["render",w],["__file","dumpAnalyses.html.vue"]]),N=JSON.parse('{"path":"/dotnet/debugging/dumpAnalyses.html","title":"内存转储Dump","lang":"zh-CN","frontmatter":{"title":"内存转储Dump","lang":"zh-CN","date":"2023-08-05T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dotNET"],"tag":["无"],"filename":"dumpwenjian","slug":"hxbhwsygytzhztvc","docsId":"105906693","description":"概述 C#内存转储，或称为dump文件，是应用程序在特定时刻状态的快照。可以把程序的执行状态通过调试器保存到dump文件中，它们对于诊断问题（如性能问题、崩溃和内存泄漏）非常有帮助。 什么是内存转储 内存转储实质上是一个应用程序在特定点状态的快照。它包含了与应用程序相关的系统内存中的所有内容，包括变量、线程和堆栈跟踪。当进行调试，特别是尝试复制难以重现...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dotnet/debugging/dumpAnalyses.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"内存转储Dump"}],["meta",{"property":"og:description","content":"概述 C#内存转储，或称为dump文件，是应用程序在特定时刻状态的快照。可以把程序的执行状态通过调试器保存到dump文件中，它们对于诊断问题（如性能问题、崩溃和内存泄漏）非常有帮助。 什么是内存转储 内存转储实质上是一个应用程序在特定点状态的快照。它包含了与应用程序相关的系统内存中的所有内容，包括变量、线程和堆栈跟踪。当进行调试，特别是尝试复制难以重现..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-10T15:09:39.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-08-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-10T15:09:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"内存转储Dump\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-08-05T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-10T15:09:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"什么是内存转储","slug":"什么是内存转储","link":"#什么是内存转储","children":[]},{"level":2,"title":"生成dump文件","slug":"生成dump文件","link":"#生成dump文件","children":[{"level":3,"title":"任务管理器(windows)","slug":"任务管理器-windows","link":"#任务管理器-windows","children":[]},{"level":3,"title":"dotnet-dump(windows、容器)","slug":"dotnet-dump-windows、容器","link":"#dotnet-dump-windows、容器","children":[]},{"level":3,"title":"ProcDump(Windows、linux)","slug":"procdump-windows、linux","link":"#procdump-windows、linux","children":[]},{"level":3,"title":"windows平台代码生成","slug":"windows平台代码生成","link":"#windows平台代码生成","children":[]},{"level":3,"title":"Microsoft.Diagnostics.NETCore.Clien(linux)","slug":"microsoft-diagnostics-netcore-clien-linux","link":"#microsoft-diagnostics-netcore-clien-linux","children":[]}]},{"level":2,"title":"分析转储文件","slug":"分析转储文件","link":"#分析转储文件","children":[{"level":3,"title":"Visual Studio","slug":"visual-studio","link":"#visual-studio","children":[]},{"level":3,"title":"WinDbg","slug":"windbg","link":"#windbg","children":[]},{"level":3,"title":"dotnet-dump","slug":"dotnet-dump","link":"#dotnet-dump","children":[{"level":4,"title":"常用命令","slug":"常用命令","link":"#常用命令","children":[]}]},{"level":3,"title":"分析文档","slug":"分析文档","link":"#分析文档","children":[]}]},{"level":2,"title":"参考文档","slug":"参考文档","link":"#参考文档","children":[]}],"git":{"createdTime":1697962303000,"updatedTime":1710083379000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1},{"name":"zhangyunpeng","email":"zhang.yunpeng@synyi.com","commits":1}]},"readingTime":{"minutes":6.09,"words":1826},"filePathRelative":"dotnet/debugging/dumpAnalyses.md","localizedDate":"2023年8月5日","excerpt":"<h2>概述</h2>\\n<p>C#内存转储，或称为<code>dump</code>文件，是应用程序在特定时刻状态的快照。可以把程序的执行状态通过调试器保存到dump文件中，它们对于诊断问题（如性能问题、崩溃和内存泄漏）非常有帮助。</p>\\n<h2>什么是内存转储</h2>\\n<p>内存转储实质上是一个应用程序在特定点状态的快照。它包含了与应用程序相关的系统内存中的所有内容，包括变量、线程和堆栈跟踪。当进行调试，特别是尝试复制难以重现的错误时，这些数据可能会非常有用。</p>\\n<blockquote>\\n<p>内容来自：https://mp.weixin.qq.com/s/YfkO6cVrwXn0x0PlHmMfrg</p>\\n</blockquote>","autoDesc":true}');export{_ as comp,N as data};