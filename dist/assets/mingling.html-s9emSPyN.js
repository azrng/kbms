import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as a,e as s}from"./app-vSdX8vi3.js";const i={},l=s(`<h2 id="文件" tabindex="-1"><a class="header-anchor" href="#文件"><span>文件</span></a></h2><h3 id="目录" tabindex="-1"><a class="header-anchor" href="#目录"><span>目录</span></a></h3><h4 id="ls" tabindex="-1"><a class="header-anchor" href="#ls"><span>ls</span></a></h4><p>查看目录下文件</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>-- 查看当前目录文件
<span class="token function">ls</span>

-- 查看指定目录文件
<span class="token function">ls</span>  /var/tmp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="mkdir" tabindex="-1"><a class="header-anchor" href="#mkdir"><span>mkdir</span></a></h4><p>创建目录</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>-- 创建目录
<span class="token function">mkdir</span> testFolder
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="mv" tabindex="-1"><a class="header-anchor" href="#mv"><span>mv</span></a></h4><p>移动目录或者文件</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>-- 移动一个文件夹到指定目录
<span class="token function">mv</span> testFolder /var/tmp

-- 移动文件到指定目录
<span class="token function">mv</span> aa.txt /var/tmp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件-1" tabindex="-1"><a class="header-anchor" href="#文件-1"><span>文件</span></a></h3><h4 id="touch" tabindex="-1"><a class="header-anchor" href="#touch"><span>touch</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>-- 创建文件
<span class="token function">touch</span> ~/testFile
<span class="token function">touch</span> testFile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="cp" tabindex="-1"><a class="header-anchor" href="#cp"><span>cp</span></a></h4><p>复制文件</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>-- 复制当前目录文件到当前目录
<span class="token function">cp</span> testFile testNewFile

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="rm" tabindex="-1"><a class="header-anchor" href="#rm"><span>rm</span></a></h4><p>删除文件，输入y后回车确认删除</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>-- 删除当前目录文件
<span class="token function">rm</span> testFile

-- 删除目录
<span class="token function">rm</span> <span class="token parameter variable">-f</span> testFolder
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="cat" tabindex="-1"><a class="header-anchor" href="#cat"><span>cat</span></a></h4><p>查看文件内容</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>-- 查看操作历史文件的内容
<span class="token function">cat</span> ~/.bash_history


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="grep" tabindex="-1"><a class="header-anchor" href="#grep"><span>grep</span></a></h4><p>过滤文件</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>-- 过滤出 /etc/passwd 文件中包含 root 的记录
<span class="token function">grep</span> <span class="token string">&#39;root&#39;</span> /etc/passwd

--递归地过滤出 /var/log/ 目录中包含 linux 的记录
<span class="token function">grep</span> <span class="token parameter variable">-r</span> <span class="token string">&#39;linux&#39;</span> /var/log/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="管道" tabindex="-1"><a class="header-anchor" href="#管道"><span>管道</span></a></h2><p>Linux 中管道的作用是将上一个命令的输出作为下一个命令的输入, 像 pipe 一样将各个命令串联起来执行, 管道的操作符是 |</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>-- 可以将 <span class="token function">cat</span> 和 <span class="token function">grep</span> 两个命令用管道组合在一起
<span class="token function">cat</span> /etc/passwd <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39;root&#39;</span>

-- 过滤出 /etc 目录中名字包含 <span class="token function">ssh</span> 的目录<span class="token punctuation">(</span>不包括子目录<span class="token punctuation">)</span>
<span class="token function">ls</span> /etc <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39;ssh&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="重定向" tabindex="-1"><a class="header-anchor" href="#重定向"><span>重定向</span></a></h2><p>可以使用 &gt; 或 &lt; 将命令的输出重定向到一个文件中</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>-- 将hello world 输入到一个txt中
<span class="token builtin class-name">echo</span> <span class="token string">&#39;Hello World&#39;</span> <span class="token operator">&gt;</span> ~/test.txt

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="网络" tabindex="-1"><a class="header-anchor" href="#网络"><span>网络</span></a></h2><h3 id="ip" tabindex="-1"><a class="header-anchor" href="#ip"><span>IP</span></a></h3><h4 id="ping" tabindex="-1"><a class="header-anchor" href="#ping"><span>ping</span></a></h4><p>检查是否联通</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>--对 cloud.tencent.com 发送 <span class="token number">4</span> 个 <span class="token function">ping</span> 包, 检查与其是否联通
<span class="token function">ping</span> <span class="token parameter variable">-c</span> <span class="token number">4</span> cloud.tencent.com


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="netstat" tabindex="-1"><a class="header-anchor" href="#netstat"><span>netstat</span></a></h3><p>显示各种网络相关信息，如网络连接、路由表接口状态等</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>-- 列出所有处于监听状态的tcp端口
<span class="token function">netstat</span> <span class="token parameter variable">-lt</span>

--查看所有的端口信息, 包括 PID 和进程名称
<span class="token function">netstat</span> <span class="token parameter variable">-tulpn</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="系统" tabindex="-1"><a class="header-anchor" href="#系统"><span>系统</span></a></h2><h3 id="进程" tabindex="-1"><a class="header-anchor" href="#进程"><span>进程</span></a></h3><h4 id="ps" tabindex="-1"><a class="header-anchor" href="#ps"><span>ps</span></a></h4><p>获取进程信息</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>-- 获取当前进程信息
<span class="token function">ps</span> aux

-- 过滤得到当前系统中的 <span class="token function">ssh</span> 进程信息
<span class="token function">ps</span> aux <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39;ssh&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,45),t=[l];function d(r,c){return n(),a("div",null,t)}const h=e(i,[["render",d],["__file","mingling.html.vue"]]),u=JSON.parse('{"path":"/soft/Linux/Centos/mingling.html","title":"命令","lang":"zh-CN","frontmatter":{"title":"命令","lang":"zh-CN","date":"2023-07-22T00:00:00.000Z","publish":true,"author":"azrng","order":3,"category":["Linux"],"tag":["无"],"filename":"mingling","description":"文件 目录 ls 查看目录下文件 mkdir 创建目录 mv 移动目录或者文件 文件 touch cp 复制文件 rm 删除文件，输入y后回车确认删除 cat 查看文件内容 grep 过滤文件 管道 Linux 中管道的作用是将上一个命令的输出作为下一个命令的输入, 像 pipe 一样将各个命令串联起来执行, 管道的操作符是 | 重定向 可以使用 > ...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/soft/Linux/Centos/mingling.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"命令"}],["meta",{"property":"og:description","content":"文件 目录 ls 查看目录下文件 mkdir 创建目录 mv 移动目录或者文件 文件 touch cp 复制文件 rm 删除文件，输入y后回车确认删除 cat 查看文件内容 grep 过滤文件 管道 Linux 中管道的作用是将上一个命令的输出作为下一个命令的输入, 像 pipe 一样将各个命令串联起来执行, 管道的操作符是 | 重定向 可以使用 > ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-22T09:04:30.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-07-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-07-22T09:04:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"命令\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-07-22T00:00:00.000Z\\",\\"dateModified\\":\\"2023-07-22T09:04:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"文件","slug":"文件","link":"#文件","children":[{"level":3,"title":"目录","slug":"目录","link":"#目录","children":[{"level":4,"title":"ls","slug":"ls","link":"#ls","children":[]},{"level":4,"title":"mkdir","slug":"mkdir","link":"#mkdir","children":[]},{"level":4,"title":"mv","slug":"mv","link":"#mv","children":[]}]},{"level":3,"title":"文件","slug":"文件-1","link":"#文件-1","children":[{"level":4,"title":"touch","slug":"touch","link":"#touch","children":[]},{"level":4,"title":"cp","slug":"cp","link":"#cp","children":[]},{"level":4,"title":"rm","slug":"rm","link":"#rm","children":[]},{"level":4,"title":"cat","slug":"cat","link":"#cat","children":[]},{"level":4,"title":"grep","slug":"grep","link":"#grep","children":[]}]}]},{"level":2,"title":"管道","slug":"管道","link":"#管道","children":[]},{"level":2,"title":"重定向","slug":"重定向","link":"#重定向","children":[]},{"level":2,"title":"网络","slug":"网络","link":"#网络","children":[{"level":3,"title":"IP","slug":"ip","link":"#ip","children":[{"level":4,"title":"ping","slug":"ping","link":"#ping","children":[]}]},{"level":3,"title":"netstat","slug":"netstat","link":"#netstat","children":[]}]},{"level":2,"title":"系统","slug":"系统","link":"#系统","children":[{"level":3,"title":"进程","slug":"进程","link":"#进程","children":[{"level":4,"title":"ps","slug":"ps","link":"#ps","children":[]}]}]}],"git":{"createdTime":1690016670000,"updatedTime":1690016670000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":1.67,"words":502},"filePathRelative":"soft/Linux/Centos/mingling.md","localizedDate":"2023年7月22日","excerpt":"<h2>文件</h2>\\n<h3>目录</h3>\\n<h4>ls</h4>\\n<p>查看目录下文件</p>\\n<div class=\\"language-bash\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code>-- 查看当前目录文件\\n<span class=\\"token function\\">ls</span>\\n\\n-- 查看指定目录文件\\n<span class=\\"token function\\">ls</span>  /var/tmp\\n</code></pre></div><h4>mkdir</h4>\\n<p>创建目录</p>\\n","autoDesc":true}');export{h as comp,u as data};