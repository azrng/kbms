import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,d as a}from"./app-Dg7YJ3hy.js";const i={},l=a('<blockquote><p>来自：掘金，作者：哒哒哒哒打代码 链接：https://juejin.cn/post/6859214952704999438</p></blockquote><h2 id="_1-暴力破解" tabindex="-1"><a class="header-anchor" href="#_1-暴力破解"><span>1. 暴力破解</span></a></h2><p>只要网站是暴露在公网的，那么很大概率上会被人盯上，尝试爆破这种简单且有效的方式： 通过各种方式获得了网站的用户名之后，通过编写程序来遍历所有可能的密码，直至找到正确的密码为止</p><h3 id="_1-1-验证码" tabindex="-1"><a class="header-anchor" href="#_1-1-验证码"><span>1.1 验证码</span></a></h3><p>可以在密码输出错误达到一定次数时候，增加验证码校验，比如我们设置，当用户密码错误达到3次之后，则需要用户输入图片验证码才可以继续登录操作 暴露的问题： 图片验证码真的很难做到有效的防止机器人</p><h3 id="_1-2-登录限制" tabindex="-1"><a class="header-anchor" href="#_1-2-登录限制"><span>1.2 登录限制</span></a></h3><p>直接限制非正常用户的登录操作，当它密码错误达到一定次数时，直接拒绝用户的登录，隔一段时间再恢复。比如我们设置某个账号在登录时错误次数达到10次时，则5分钟内拒绝该账号的所有登录操作。 暴露问题： 攻击者虽然不能获取到网站的用户信息，但是它可以让我们网站的用户都无法登录。(攻击者只需要无线循环所有的用户名进行登录，那么这些用户就会永远处理锁定状态，导致正常的用户无法登录网站)</p><h3 id="_1-3-ip限制" tabindex="-1"><a class="header-anchor" href="#_1-3-ip限制"><span>1.3 IP限制</span></a></h3><p>设定某个IP下调用登录接口错误次数达到一定时，则禁止该IP进行登录操作。 暴露问题： 很多学校或者公司使用的同一个出口ip，如果直接通过ip限制，可能误杀其他正常的用户。 攻击者完全可以在ip被封后切换vpn来攻击。</p><h3 id="_1-4-手机验证" tabindex="-1"><a class="header-anchor" href="#_1-4-手机验证"><span>1.4 手机验证</span></a></h3><ol><li>当用户输入密码次数大于3次时，要求用户输入验证码（最好使用滑动验证）</li><li>当用户输入密码次数大于10次时，弹出手机验证，需要用户使用手机验证码和密码双重认证进行登录</li></ol><p>暴露问题： 手机验证码防刷</p><h2 id="_2-中间人攻击" tabindex="-1"><a class="header-anchor" href="#_2-中间人攻击"><span>2. 中间人攻击</span></a></h2><p>A和B在通讯过程中，攻击者通过嗅探、拦截等方式获取或修改A和B的通讯内容。</p><h3 id="_2-1-https" tabindex="-1"><a class="header-anchor" href="#_2-1-https"><span>2.1 HTTPS</span></a></h3><p>防范中间人攻击最简单也是最有效的一个操作，更换HTTPS，把网站中所有的HTTP请求修改为强制使用HTTPS。 HTTPS实际上就是在HTTP和TCP协议中间加入了SSL/TLS协议，用于保障数据的安全传输。相比于HTTP，HTTPS主要有以下几个特点：内容加密、数据完整性、身份验证</p><h3 id="_2-2-加密传输" tabindex="-1"><a class="header-anchor" href="#_2-2-加密传输"><span>2.2 加密传输</span></a></h3><p>在HTTPS之外，我们还可以手动对敏感数据进行加密传输：</p><ul><li>用户名可以在客户端使用非对称加密，在服务端解密</li><li>密码可以在客户端进行MD5之后传输，防止暴露密码明文</li></ul><h3 id="_2-3-其它" tabindex="-1"><a class="header-anchor" href="#_2-3-其它"><span>2.3 其它</span></a></h3><p>除了上面我们聊的这些以外，其实还有很多其它的工作可以考虑，比如：</p><ul><li>操作日志，用户的每次登录和敏感操作都需要记录日志（包括IP、设备等）</li><li>异常操作或登录提醒，有了上面的操作日志，那我们就可以基于日志做风险提醒，比如用户在进行非常登录地登录、修改密码、登录异常时，可以短信提醒用户</li><li>拒绝弱密码 注册或修改密码时，不允许用户设置弱密码</li><li>防止用户名被遍历 有些网站在注册时，在输入完用户名之后，会提示用户名是否存在。这样会存在网站的所有用户名被泄露的风险（遍历该接口即可），需要在交互或逻辑上做限制</li></ul>',22),r=[l];function p(s,o){return n(),t("div",null,r)}const d=e(i,[["render",p],["__file","loginSecurity.html.vue"]]),_=JSON.parse('{"path":"/softwareDesign/systemDesign/loginSecurity.html","title":"登录接口安全性","lang":"zh-CN","frontmatter":{"title":"登录接口安全性","lang":"zh-CN","date":"2023-08-18T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["软件设计"],"tag":["无"],"filename":"denglujiekouanquanxing","slug":"fbodfi","docsId":"44210395","description":"来自：掘金，作者：哒哒哒哒打代码 链接：https://juejin.cn/post/6859214952704999438 1. 暴力破解 只要网站是暴露在公网的，那么很大概率上会被人盯上，尝试爆破这种简单且有效的方式： 通过各种方式获得了网站的用户名之后，通过编写程序来遍历所有可能的密码，直至找到正确的密码为止 1.1 验证码 可以在密码输出错误达...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/softwareDesign/systemDesign/loginSecurity.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"登录接口安全性"}],["meta",{"property":"og:description","content":"来自：掘金，作者：哒哒哒哒打代码 链接：https://juejin.cn/post/6859214952704999438 1. 暴力破解 只要网站是暴露在公网的，那么很大概率上会被人盯上，尝试爆破这种简单且有效的方式： 通过各种方式获得了网站的用户名之后，通过编写程序来遍历所有可能的密码，直至找到正确的密码为止 1.1 验证码 可以在密码输出错误达..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-18T03:09:09.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-08-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-18T03:09:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"登录接口安全性\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-08-18T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-18T03:09:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"1. 暴力破解","slug":"_1-暴力破解","link":"#_1-暴力破解","children":[{"level":3,"title":"1.1 验证码","slug":"_1-1-验证码","link":"#_1-1-验证码","children":[]},{"level":3,"title":"1.2 登录限制","slug":"_1-2-登录限制","link":"#_1-2-登录限制","children":[]},{"level":3,"title":"1.3 IP限制","slug":"_1-3-ip限制","link":"#_1-3-ip限制","children":[]},{"level":3,"title":"1.4 手机验证","slug":"_1-4-手机验证","link":"#_1-4-手机验证","children":[]}]},{"level":2,"title":"2. 中间人攻击","slug":"_2-中间人攻击","link":"#_2-中间人攻击","children":[{"level":3,"title":"2.1 HTTPS","slug":"_2-1-https","link":"#_2-1-https","children":[]},{"level":3,"title":"2.2 加密传输","slug":"_2-2-加密传输","link":"#_2-2-加密传输","children":[]},{"level":3,"title":"2.3 其它","slug":"_2-3-其它","link":"#_2-3-其它","children":[]}]}],"git":{"createdTime":1693926838000,"updatedTime":1702868949000,"contributors":[{"name":"zhangyunpeng","email":"zhang.yunpeng@synyi.com","commits":1}]},"readingTime":{"minutes":3.42,"words":1026},"filePathRelative":"softwareDesign/systemDesign/loginSecurity.md","localizedDate":"2023年8月18日","excerpt":"<blockquote>\\n<p>来自：掘金，作者：哒哒哒哒打代码\\n链接：https://juejin.cn/post/6859214952704999438</p>\\n</blockquote>\\n<h2>1. 暴力破解</h2>\\n<p>只要网站是暴露在公网的，那么很大概率上会被人盯上，尝试爆破这种简单且有效的方式：\\n通过各种方式获得了网站的用户名之后，通过编写程序来遍历所有可能的密码，直至找到正确的密码为止</p>\\n<h3>1.1 验证码</h3>\\n<p>可以在密码输出错误达到一定次数时候，增加验证码校验，比如我们设置，当用户密码错误达到3次之后，则需要用户输入图片验证码才可以继续登录操作\\n暴露的问题：\\n图片验证码真的很难做到有效的防止机器人</p>","autoDesc":true}');export{d as comp,_ as data};