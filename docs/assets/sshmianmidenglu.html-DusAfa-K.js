import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as e,d as a}from"./app-HmxoaDfj.js";const t="/kbms/common/1615517715377-99a8db48-53e2-42e3-a98f-b194120b340b.png",n={},h=a(`<p>受控机器上的某个账户信任 CI机器上gitlab-runner账户。</p><ol><li>先执行<code>su gitlab-runner</code>切换到<code>gitlab-runner</code>账户</li><li>在你的CI机器(主控端)上使用 ssh-keygen命令创建公钥，使用<code>ssh-keygen -t rsa</code>来创建，程序会问你存放目录，如果不需要修改，直接回车几次即可</li><li>将~/.ssh目录下<code>id_rsa.pub</code>文件拷贝到受控机器的<code>~/.ssh</code>目录中，然后将文件内容导入到<code>~/.ssh/authorized_keys</code>文件</li></ol><div class="language-csharp line-numbers-mode" data-highlighter="shiki" data-ext="csharp" data-title="csharp" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">主控方</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">：</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">scp</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> /</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">home</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">gitlab</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">runner</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">ssh</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">id_rsa</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">pub</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> ****</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">@</span><span style="--shiki-light:#B31D28;--shiki-dark:#FFFFFF;--shiki-light-font-style:italic;--shiki-dark-font-style:inherit;">10.202.42.252</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">home</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">/***/</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">ssh</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">受控方</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">：</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">cat</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> ~/</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">ssh</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">id_rsa</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">pub</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> &gt;&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> ~/</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">ssh</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">authorized_keys</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>在受控方机器设置权限：</li></ol><p><code>~/.ssh</code>权限设置为700；<code>~/.ssh/authorized_keys</code>权限设置为600 之后在主控CI机器 就具备免密登陆 远程机器的能力。</p><figure><img src="`+t+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',6),l=[h];function r(p,k){return e(),s("div",null,l)}const g=i(n,[["render",r],["__file","sshmianmidenglu.html.vue"]]),c=JSON.parse('{"path":"/cloud/ciAndCd/gitlab/sshmianmidenglu.html","title":"SSH免密登录","lang":"zh-CN","frontmatter":{"title":"SSH免密登录","lang":"zh-CN","date":"2023-09-08T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["cloud"],"tag":["无"],"filename":"sshmianmidenglu","slug":"oaoyxe","docsId":"32765121","description":"受控机器上的某个账户信任 CI机器上gitlab-runner账户。 先执行su gitlab-runner切换到gitlab-runner账户 在你的CI机器(主控端)上使用 ssh-keygen命令创建公钥，使用ssh-keygen -t rsa来创建，程序会问你存放目录，如果不需要修改，直接回车几次即可 将~/.ssh目录下id_rsa.pub文...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/cloud/ciAndCd/gitlab/sshmianmidenglu.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"SSH免密登录"}],["meta",{"property":"og:description","content":"受控机器上的某个账户信任 CI机器上gitlab-runner账户。 先执行su gitlab-runner切换到gitlab-runner账户 在你的CI机器(主控端)上使用 ssh-keygen命令创建公钥，使用ssh-keygen -t rsa来创建，程序会问你存放目录，如果不需要修改，直接回车几次即可 将~/.ssh目录下id_rsa.pub文..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://azrng.gitee.io/kbms/kbms/common/1615517715377-99a8db48-53e2-42e3-a98f-b194120b340b.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-24T07:50:54.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-09-08T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-24T07:50:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SSH免密登录\\",\\"image\\":[\\"https://azrng.gitee.io/kbms/kbms/common/1615517715377-99a8db48-53e2-42e3-a98f-b194120b340b.png\\"],\\"datePublished\\":\\"2023-09-08T00:00:00.000Z\\",\\"dateModified\\":\\"2023-09-24T07:50:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[],"git":{"createdTime":1695541854000,"updatedTime":1695541854000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":0.73,"words":220},"filePathRelative":"cloud/ciAndCd/gitlab/sshmianmidenglu.md","localizedDate":"2023年9月8日","excerpt":"<p>受控机器上的某个账户信任 CI机器上gitlab-runner账户。</p>\\n<ol>\\n<li>先执行<code>su gitlab-runner</code>切换到<code>gitlab-runner</code>账户</li>\\n<li>在你的CI机器(主控端)上使用 ssh-keygen命令创建公钥，使用<code>ssh-keygen -t rsa</code>来创建，程序会问你存放目录，如果不需要修改，直接回车几次即可</li>\\n<li>将~/.ssh目录下<code>id_rsa.pub</code>文件拷贝到受控机器的<code>~/.ssh</code>目录中，然后将文件内容导入到<code>~/.ssh/authorized_keys</code>文件</li>\\n</ol>","autoDesc":true}');export{g as comp,c as data};