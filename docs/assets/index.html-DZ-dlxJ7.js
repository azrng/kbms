import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,d as n}from"./app-CF6xeyXt.js";const i="/kbms/common/1614393522008-c1e3678c-fb4f-4fcf-94fc-21abccc2dc85.png",o={},r=n('<h2 id="描述" tabindex="-1"><a class="header-anchor" href="#描述"><span>描述</span></a></h2><p>OAuth2.0是授权的行业标准协议，是一种授权机制、委托协议。可以让拥有资源的用户允许某一个应用程序代表他们来访问控制的资源，这个应用从资源所有者哪里获取授权(Authorization)和access_token，随后通过access_token代替密码来访问资源。</p><p>OAuth解决是Authorization问题，并不关心Authentication。 为了安全，OAuth2.0引入了两个措施</p><blockquote><p>1，Oauth2.0 要求，refresh token 一定是保存在客户端的服务器上的，而绝不能存放在狭义的客户端（例如移动 app、PC端软件） 上。调用 refresh 接口的时候，一定是从服务器到服务器的访问； 2，Oauth2.0 引入了 client_secret 机制。即每一个 client_id 都对应一个 client_secret。这个 client_secret 会在客户端申请 client_id 时，随 client_id 一起分配给客户端。客户端必须把 client_secret 妥善保管在服务器上，决不能泄露。刷新 access token 时，需要验证这个 client_secret。</p></blockquote><h2 id="场景" tabindex="-1"><a class="header-anchor" href="#场景"><span>场景</span></a></h2><p>为了让A网站应用访问在B网站上的存储的照片、视频或者联系方式等等私密资源，我们可能需要做到的就是让B网站同意A网站访问读取这些资源，那么，在传统的方式中，会将自己在B网站中的用户名和密码告诉A，后者就可以读取用户的资源信息了，但是这样做存在了严重的问题： A网站为了后续服务，会保存用户的密码，这样不安全。 B网站必须部署密码登录方式，才能以此方式获取，但这种单纯的密码登录也不安全。 A网站用户获取某个网站资源的权力，但却没有限制获取的范围和期限。 当用户修改密码的时候，就会收回A网站的权力，但是这样做，会使得其他所有获得用户授权的A应用程序全部失效。 只要有一个A应用程序被破解，就会导致用户密码泄漏，以及所有被密码保护的数据泄漏。 因此，这种方式是不安全的，所以为了解决这种问题，OAuth就解决了这种问题。 用户允许第三方A应用访问该用户在B网站上存储的私密的资源（如照片，视频，联系人列表），而无需将用户名和密码提供给第三方应用。就比如我用QQ登录博客园，那博客园（第三方应用）的昵称就可以是我的QQ（某网站）昵称，它获取到了我的QQ昵称，并存到了博客园的数据库，我以后就一直可以使用QQ来登录博客园，但是博客园却不知道我QQ的用户名和密码。 说明： <img src="'+i+'" alt="image.png" loading="lazy"> （A）用户打开客户端以后，客户端要求用户给予授权。（B）用户同意给予客户端授权。（C）客户端使用上一步获得的授权，向认证服务器申请令牌。（D）认证服务器对客户端进行认证以后，确认无误，同意发放令牌。（E）客户端使用令牌，向资源服务器申请获取资源。（F）资源服务器确认令牌无误，同意向客户端开放资源。</p><h2 id="名词解释" tabindex="-1"><a class="header-anchor" href="#名词解释"><span>名词解释</span></a></h2><ol><li>Resource Owner —— 资源拥有者，同时也是 Application 的用户</li><li>Application —— 用户正在准备使用的web app （当然也可以是手机APP或其他应用，本文只关注web app）</li><li>Authorization Server —— 授权服务器，所有的权限信息、安全信息都在这个服务器上管理</li><li>Resource Server —— 资源服务器，存储资源、材料、内容的服务器</li></ol><h3 id="resource-资源" tabindex="-1"><a class="header-anchor" href="#resource-资源"><span>Resource(资源)</span></a></h3><p>包含：资源名称、资源的密钥、资源对应的claim、scopes 身份资源：用户ID、名称、电子邮件地址等 api资源：表示客户想要访问的功能。</p><h3 id="client-客户端" tabindex="-1"><a class="header-anchor" href="#client-客户端"><span>Client(客户端)</span></a></h3><p>包含：客户端ID、客户端密钥、授权类型(多)、Scopes</p><h3 id="scope" tabindex="-1"><a class="header-anchor" href="#scope"><span>Scope</span></a></h3><p>官网解释：Scope是资源拥有者(服务端)用来授予客户端特定权限的一个参数。</p><p>怎么访问资源、访问资源的哪些部分/哪个程度。 举个生活中的例子，你拥有一套房子，你可以授权别人进入你的房子 —— 比如邀请你的朋友来家里作客，那么他们就能进入你的房子；但是如果小偷进入房子，那就是非法侵入住宅 ！你可以请保洁阿姨进房子打扫，但是她们只能打扫房屋不能把你的房子给装修了！</p><p>Client的scope就是对应的资源名称、资源对应的scope。</p><h2 id="四种模式" tabindex="-1"><a class="header-anchor" href="#四种模式"><span>四种模式</span></a></h2><p>OAuth 2.0规定了四种获取令牌的流程： 客户端模式(Client Credentials Grant) 密码模式(Resource owner password credentials) 授权码模式（authorization code） 简化模式（implicit grant type） 可以选择最适合自己的那种，向第三方颁发令牌。不管哪种授权方式，第三方应用申请令牌之前，都必须到系统进行备案，说明自己的身份，然后会拿到两个身份识别码：客户端ID和客户端密钥。 Authentication &amp; Authorization 认证和授权，认证是用来确认来者是谁，确认身份，授权是用来确认持有此身份的来者是否能访问当前的资源。</p><h2 id="oauth2对比jwt" tabindex="-1"><a class="header-anchor" href="#oauth2对比jwt"><span>OAuth2对比JWT</span></a></h2><p>要比较JWT和OAuth2，首先要明白一点就是，这两个根本没有可比性，是两个完全不同的东西。 但是既然是没有可比性，为何还要放一块比较呢？实际开发应用中，就发现很多拿 JWT和OAuth2.0 作对比，很多情况下，在讨论OAuth2的实现时，会把JSON Web Token作为一种认证机制使用。这也是为什么他们会经常一起出现。</p><h3 id="内容对比" tabindex="-1"><a class="header-anchor" href="#内容对比"><span>内容对比</span></a></h3><ul><li>JWT是一种认证协议 JWT提供了一种用于发布接入令牌（Access Token)，并对发布的签名接入令牌进行验证的方法。令牌（Token）本身包含了一系列声明，应用程序可以根据这些声明限制用户对资源的访问。</li></ul><blockquote><p>一个token包含三部分：header、claims、signature</p></blockquote><ul><li>OAuth2是一种安全的授权框架提供了一套详细的授权机制。用户或应用可以通过公开的或私有的设置，授权第三方应用访问特定资源。</li></ul><blockquote><p>Oauth2定义了一组想当复杂的规范。涉及到：Roles角色、Client Types客户端类型、Client Profile客户端描述、Authorization Grants认证授权、Endpoints终端等。</p></blockquote><h3 id="场景区别" tabindex="-1"><a class="header-anchor" href="#场景区别"><span>场景区别</span></a></h3><ul><li>jwt应用场景1）无状态的分布式API</li></ul><blockquote><p>JWT的主要优势在于使用无状态、可扩展的方式处理应用中的用户会话。服务端可以通过内嵌编码的声明信息，很容易地获取用户的会话信息，而不需要去访问用户或会话的数据库。但是，如果系统中需要使用黑名单实现长期有效的token刷新机制，这种无状态的优势就不明显了。</p></blockquote><ul><li>Oauth2应用场景1）第三方认证服务器2）大型企业解决方案</li></ul><blockquote><p>API的使用依赖于外部的第三方认证提供者。去认证服务商 那里注册你的应用，然后设置需要访问的用户信息，比如电子邮箱、姓名等。当用户访问站点的注册页面时，会看到连接到第三方认证提供商的入口。用户点击以后被重定向到对应的认证服务商网站，获得用户的授权后就可以访问到需要的信息，然后重定向回来你的应用中。</p></blockquote><h3 id="归纳说明" tabindex="-1"><a class="header-anchor" href="#归纳说明"><span>归纳说明</span></a></h3><ul><li>Oauth2和JWT是完全不同的两种东西，一个是授权认证的框架，另一种则是认证验证的方式方法。OAuth2不像JWT一样是一个严格的标准协议，因此在实施过程中更容易出错。</li><li>两种方案都需要SSL安全保护，也就是对要传输的数据进行加密编码。安全地传输用户提供的私密信息，在任何一个安全的系统里都是必要的。否则任何人都可以通过侵入网络，在用户登录的时候窃取用户的用户名和密码等信息。</li></ul><h2 id="组件" tabindex="-1"><a class="header-anchor" href="#组件"><span>组件</span></a></h2><p>https://mp.weixin.qq.com/s/H6M6jSBg0kmoTTReAGOdoQ | 使用 C# 开发的开源 SSO 单点登录认证框架</p><h3 id="collectiveoauth" tabindex="-1"><a class="header-anchor" href="#collectiveoauth"><span>CollectiveOAuth</span></a></h3><p>.Net平台(C#) 史上最全的整合第三方登录的开源库 =&gt; 环境支持 .NET Framework 4.5 ~ 4.6.2 和 .NetCore 3.1。目前已包含Github、Gitee、钉钉、百度、支付宝、微信、企业微信、腾讯云开发者平台(Coding)、OSChina、微博、QQ、Google、Facebook、抖音、领英、小米、微软、今日头条、Teambition、StackOverflow、Pinterest、人人、华为、酷家乐、Gitlab、美团、饿了么、等第三方平台的授权登录</p><p><a href="https://mp.weixin.qq.com/s/j24Wm_HAPr6Gb8k5yVBIUw" target="_blank" rel="noopener noreferrer">https://mp.weixin.qq.com/s/j24Wm_HAPr6Gb8k5yVBIUw</a> | 【开源项目】.Net平台(C#) 史上最全的整合第三方登录的开源库</p><h3 id="mrhuo-oauth" tabindex="-1"><a class="header-anchor" href="#mrhuo-oauth"><span>MrHuo.OAuth</span></a></h3><p>也是一个认证开源库</p><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2><p>官网：<a href="https://oauth.net/2/" target="_blank" rel="noopener noreferrer">https://oauth.net/2/</a> 深入理解OAuth原理和实践细节：<a href="https://zhuanlan.zhihu.com/p/380561372" target="_blank" rel="noopener noreferrer">https://zhuanlan.zhihu.com/p/380561372</a><a href="https://mp.weixin.qq.com/s/G-ax9y66MOI0edowKb7esg" target="_blank" rel="noopener noreferrer">https://mp.weixin.qq.com/s/G-ax9y66MOI0edowKb7esg</a> | IdentityServer4系列 | 初识基础知识点 id4+RFC文档：<a href="https://www.rfc-editor.org/rfc/rfc6749" target="_blank" rel="noopener noreferrer">https://www.rfc-editor.org/rfc/rfc6749</a></p>',41),l=[r];function c(h,s){return a(),t("div",null,l)}const d=e(o,[["render",c],["__file","index.html.vue"]]),m=JSON.parse('{"path":"/middleware/authorize/oauth/","title":"概述","lang":"zh-CN","frontmatter":{"title":"概述","lang":"zh-CN","date":"2023-10-19T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["middleware"],"tag":["无"],"filename":"gaishu","slug":"flsi1d","docsId":"29635294","description":"描述 OAuth2.0是授权的行业标准协议，是一种授权机制、委托协议。可以让拥有资源的用户允许某一个应用程序代表他们来访问控制的资源，这个应用从资源所有者哪里获取授权(Authorization)和access_token，随后通过access_token代替密码来访问资源。 OAuth解决是Authorization问题，并不关心Authentica...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/middleware/authorize/oauth/"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"概述"}],["meta",{"property":"og:description","content":"描述 OAuth2.0是授权的行业标准协议，是一种授权机制、委托协议。可以让拥有资源的用户允许某一个应用程序代表他们来访问控制的资源，这个应用从资源所有者哪里获取授权(Authorization)和access_token，随后通过access_token代替密码来访问资源。 OAuth解决是Authorization问题，并不关心Authentica..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://azrng.gitee.io/kbms/kbms/common/1614393522008-c1e3678c-fb4f-4fcf-94fc-21abccc2dc85.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-16T05:03:06.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-10-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-16T05:03:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"概述\\",\\"image\\":[\\"https://azrng.gitee.io/kbms/kbms/common/1614393522008-c1e3678c-fb4f-4fcf-94fc-21abccc2dc85.png\\"],\\"datePublished\\":\\"2023-10-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-02-16T05:03:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"描述","slug":"描述","link":"#描述","children":[]},{"level":2,"title":"场景","slug":"场景","link":"#场景","children":[]},{"level":2,"title":"名词解释","slug":"名词解释","link":"#名词解释","children":[{"level":3,"title":"Resource(资源)","slug":"resource-资源","link":"#resource-资源","children":[]},{"level":3,"title":"Client(客户端)","slug":"client-客户端","link":"#client-客户端","children":[]},{"level":3,"title":"Scope","slug":"scope","link":"#scope","children":[]}]},{"level":2,"title":"四种模式","slug":"四种模式","link":"#四种模式","children":[]},{"level":2,"title":"OAuth2对比JWT","slug":"oauth2对比jwt","link":"#oauth2对比jwt","children":[{"level":3,"title":"内容对比","slug":"内容对比","link":"#内容对比","children":[]},{"level":3,"title":"场景区别","slug":"场景区别","link":"#场景区别","children":[]},{"level":3,"title":"归纳说明","slug":"归纳说明","link":"#归纳说明","children":[]}]},{"level":2,"title":"组件","slug":"组件","link":"#组件","children":[{"level":3,"title":"CollectiveOAuth","slug":"collectiveoauth","link":"#collectiveoauth","children":[]},{"level":3,"title":"MrHuo.OAuth","slug":"mrhuo-oauth","link":"#mrhuo-oauth","children":[]}]},{"level":2,"title":"资料","slug":"资料","link":"#资料","children":[]}],"git":{"createdTime":1697724028000,"updatedTime":1708059786000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":7.95,"words":2384},"filePathRelative":"middleware/authorize/oauth/readme.md","localizedDate":"2023年10月19日","excerpt":"<h2>描述</h2>\\n<p>OAuth2.0是授权的行业标准协议，是一种授权机制、委托协议。可以让拥有资源的用户允许某一个应用程序代表他们来访问控制的资源，这个应用从资源所有者哪里获取授权(Authorization)和access_token，随后通过access_token代替密码来访问资源。</p>\\n<p>OAuth解决是Authorization问题，并不关心Authentication。\\n为了安全，OAuth2.0引入了两个措施</p>\\n<blockquote>\\n<p>1，Oauth2.0 要求，refresh token 一定是保存在客户端的服务器上的，而绝不能存放在狭义的客户端（例如移动 app、PC端软件） 上。调用 refresh 接口的时候，一定是从服务器到服务器的访问；\\n2，Oauth2.0 引入了 client_secret 机制。即每一个 client_id 都对应一个 client_secret。这个 client_secret 会在客户端申请 client_id 时，随 client_id 一起分配给客户端。客户端必须把 client_secret 妥善保管在服务器上，决不能泄露。刷新 access token 时，需要验证这个 client_secret。</p>\\n</blockquote>","autoDesc":true}');export{d as comp,m as data};