import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,d as i}from"./app-DZ9bmjCp.js";const n="/kbms/common/1615636138636-b86e46a3-4db9-4400-bf1d-6c3938f24d9d.png",r={},o=i('<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2><p>模块化就是将复杂系统分解为更容易更好的可管理模块的管理方式。 模块化开发就是封装细节、提供接口互不影响，存在的意义就是以更少的代码来实现更多的功能(代码复用)。</p><h2 id="项目依赖" tabindex="-1"><a class="header-anchor" href="#项目依赖"><span>项目依赖</span></a></h2><figure><img src="'+n+'" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h2 id="模块介绍" tabindex="-1"><a class="header-anchor" href="#模块介绍"><span>模块介绍</span></a></h2><h5 id="domain-shared-项目" tabindex="-1"><a class="header-anchor" href="#domain-shared-项目"><span>Domain.Shared 项目</span></a></h5><p>项目包含常量,枚举和其他对象,这些对象实际上是领域层的一部分,但是解决方案中所有的层/项目中都会使用到. 例如 BookType 枚举和 BookConsts 类 (可能是 Book 实体用到的常数字段,像MaxNameLength)都适合放在这个项目中.</p><ul><li>该项目不依赖解决方案中的其他项目. 其他项目直接或间接依赖该项目</li></ul><h5 id="domain-项目" tabindex="-1"><a class="header-anchor" href="#domain-项目"><span>Domain 项目</span></a></h5><p>解决方案的领域层. 它主要包含 <a href="https://docs.abp.io/zh-Hans/abp/latest/Entities" target="_blank" rel="noopener noreferrer">实体, 集合根</a>, <a href="https://docs.abp.io/zh-Hans/abp/latest/Domain-Services" target="_blank" rel="noopener noreferrer">领域服务</a>, <a href="https://docs.abp.io/zh-Hans/abp/latest/Value-Types" target="_blank" rel="noopener noreferrer">值类型</a>, <a href="https://docs.abp.io/zh-Hans/abp/latest/Repositories" target="_blank" rel="noopener noreferrer">仓储接口</a> 和解决方案的其他领域对象. 例如 Book 实体和 IBookRepository 接口都适合放在这个项目中.</p><ul><li>它依赖 .Domain.Shared 项目,因为项目中会用到它的一些常量,枚举和定义其他对象.</li></ul><h5 id="application-contracts-项目" tabindex="-1"><a class="header-anchor" href="#application-contracts-项目"><span>Application.Contracts 项目</span></a></h5><p>项目主要包含 <a href="https://docs.abp.io/zh-Hans/abp/latest/Application-Services" target="_blank" rel="noopener noreferrer">应用服务</a> <strong>interfaces</strong> 和应用层的 <a href="https://docs.abp.io/zh-Hans/abp/latest/Data-Transfer-Objects" target="_blank" rel="noopener noreferrer">数据传输对象</a> (DTO). 它用于分离应用层的接口和实现. 这种方式可以将接口项目做为约定包共享给客户端. 例如 IBookAppService 接口和 BookCreationDto 类都适合放在这个项目中.</p><ul><li>它依赖 .Domain.Shared 因为它可能会在应用接口和DTO中使用常量,枚举和其他的共享对象.</li></ul><h5 id="application-项目" tabindex="-1"><a class="header-anchor" href="#application-项目"><span>Application 项目</span></a></h5><p>项目包含 .Application.Contracts 项目的 <a href="https://docs.abp.io/zh-Hans/abp/latest/Application-Services" target="_blank" rel="noopener noreferrer">应用服务</a> 接口<strong>实现</strong>. 例如 BookAppService 类适合放在这个项目中.</p><ul><li>它依赖 .Application.Contracts 项目, 因为它需要实现接口与使用DTO.</li><li>它依赖 .Domain 项目,因为它需要使用领域对象(实体,仓储接口等)执行应用程序逻辑.</li></ul><h5 id="entityframeworkcore-项目" tabindex="-1"><a class="header-anchor" href="#entityframeworkcore-项目"><span>EntityFrameworkCore 项目</span></a></h5><p>这是集成EF Core的项目. 它定义了 DbContext 并实现 .Domain 项目中定义的仓储接口.</p><ul><li>它依赖 .Domain 项目,因为它需要引用实体和仓储接口.</li></ul><h5 id="entityframeworkcore-dbmigrations-项目" tabindex="-1"><a class="header-anchor" href="#entityframeworkcore-dbmigrations-项目"><span>EntityFrameworkCore.DbMigrations 项目</span></a></h5><p>包含解决方案的EF Core数据库迁移. 它有独立的 DbContext 来专门管理迁移. ABP是一个模块化的框架,理想的设计是让每个模块都有自己的 DbContext 类. 这时用于迁移的 DbContext 就会发挥作用. 它将所有的 DbContext 配置统一到单个模型中以维护单个数据库的模式. 对于更高级的场景,可以程序可以拥有多个数据库(每个数据库有一个或多个模块表)和多个迁移DbContext(每个都维护不同的数据库模式) 需要注意,迁移 DbContext 仅用于数据库迁移,而不在_运行时_使用.</p><ul><li>它依赖 .EntityFrameworkCore 项目,因为它重用了应用程序的 DbContext 配置 .</li></ul><h5 id="dbmigrator-项目" tabindex="-1"><a class="header-anchor" href="#dbmigrator-项目"><span>DbMigrator 项目</span></a></h5><p>这是一个控制台应用程序,它简化了在开发和生产环境执行数据库迁移的操作.当你使用它时;</p><ul><li>必要时创建数据库(没有数据库时).</li><li>应用未迁移的数据库迁移.</li><li>初始化种子数据(当你需要时).</li></ul><p>初始化种子数据很重要,ABP具有模块化的种子数据基础设施. 种子数据的更多信息,请参阅<a href="https://docs.abp.io/zh-Hans/abp/latest/Data-Seeding" target="_blank" rel="noopener noreferrer">文档</a>. 虽然创建数据库和应用迁移似乎只对关系数据库有用,但即使你选择NoSQL数据库提供程序(如MongoDB),也会生成此项目. 这时,它会为应用程序提供必要的初始数据.</p><ul><li>它依赖 .EntityFrameworkCore.DbMigrations 项目 (针对EF Core),因为它需要访问迁移文件.</li><li>它依赖 .Application.Contracts 项目,因为它需要访问权限定义在初始化种子数据时为管理员用户赋予所有权限.</li></ul><h5 id="httpapi-项目" tabindex="-1"><a class="header-anchor" href="#httpapi-项目"><span>HttpApi 项目</span></a></h5><p>用于定义API控制器. 大多数情况下,你不需要手动定义API控制器,因为ABP的<a href="https://docs.abp.io/zh-Hans/abp/latest/API/Auto-API-Controllers" target="_blank" rel="noopener noreferrer">动态API</a>功能会根据你的应用层自动创建API控制器. 但是,如果你需要编写API控制器,那么它是最合适的地方.</p><ul><li>它依赖 .Application.Contracts 项目,因为它需要注入应用服务接口.</li></ul><h5 id="httpapi-client-项目" tabindex="-1"><a class="header-anchor" href="#httpapi-client-项目"><span>HttpApi.Client 项目</span></a></h5><p>定义C#客户端代理使用解决方案的HTTP API项目. 可以共享给第三方客户端,使其轻松的在DotNet应用程序中使用你的HTTP API(其他类型的应用程序可以手动或使用其平台的工具来使用你的API). ABP有<a href="https://docs.abp.io/zh-Hans/abp/latest/API/Dynamic-CSharp-API-Clients" target="_blank" rel="noopener noreferrer">动态 C## API 客户端</a>功能,所以大多数情况下你不需要手动的创建C#客户端代理. .HttpApi.Client.ConsoleTestApp 项目是一个用于演示客户端代理用法的控制台应用程序.</p><ul><li>它依赖 .Application.Contracts 项目,因为它需要使用应用服务接口和DTO.</li></ul><blockquote><p>如果你不需要为API创建动态C#客户端代理,可以删除此项目和依赖项</p></blockquote><h5 id="web-项目" tabindex="-1"><a class="header-anchor" href="#web-项目"><span>Web 项目</span></a></h5><p>包含应用程序的用户界面(UI).如果使用ASP.NET Core MVC UI, 它包括Razor页面,javascript文件,样式文件,图片等... 包含应用程序主要的 appsettings.json 配置文件,用于配置数据库连接字符串和应用程序的其他配置</p><ul><li>依赖 .HttpApi 项目,因为UI层需要使用解决方案的API和应用服务接口.</li></ul><blockquote><p>如果查看 .Web.csproj 源码, 你会看到对 .Application 和 .EntityFrameworkCore.DbMigrations 项目的引用. 在编写UI层时实际上不需要这些引用. 因为UI层通常不依赖于EF Core或应用层的实现. 这个启动模板已经为分层部署做好了准备,API层托管在不同与UI层的服务器中. 但是如果你不选择 --tiered 选项, .Web项目会有这些引用,以便能够将Web,Api和应用层托管在单个应用程序站点. 你可以在表示层中使用领域实体和仓储,但是根据DDD的理论,这被认为是一种不好的做法.</p></blockquote><h5 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h5><p>Test 项目 解决方案有多个测试项目,每一层都会有一个:</p><ul><li>.Domain.Tests 用于测试领域层.</li><li>.Application.Tests 用于测试应用层.</li><li>.EntityFrameworkCore.Tests 用于测试EF Core配置与自定义仓储.</li><li>.Web.Tests 用于测试UI(适用于ASP.NET Core MVC UI).</li><li>.TestBase 所有测试项目的基础(共享)项目.</li></ul><p>此外, .HttpApi.Client.ConsoleTestApp 是一个控制台应用程序(不是自动化测试项目),它用于演示.Net应用程序中HTTP API的用法. 测试项目是用于做集成测试的:</p><ul><li>它完全集成到ABP框架和应用程序的所有服务.</li><li>如果数据库提供程序是EF Core,测试项目会使用SQLite内存数据库,如果是MongoDB,它使用<a href="https://github.com/Mongo2Go/Mongo2Go" target="_blank" rel="noopener noreferrer">Mongo2Go</a>库.</li><li>授权被禁用,任何的应用服务都可以在测试中轻松调用.</li></ul><p>你依然可以编写单元测试,只不过它很难写(因为你需要准备mock/fake对象),但它的运行速度更快(因为只测试单个类并跳过所有初始化过程).</p>',45),l=[o];function p(s,c){return t(),a("div",null,l)}const m=e(r,[["render",p],["__file","mokuaiheyilai.html.vue"]]),g=JSON.parse('{"path":"/softwareDesign/openSourceFrame/abp/mokuaiheyilai.html","title":"模块和依赖","lang":"zh-CN","frontmatter":{"title":"模块和依赖","lang":"zh-CN","date":"2023-09-05T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["软件设计"],"tag":["无"],"filename":"mokuaiheyilai","slug":"aermeq","docsId":"95838196","description":"概述 模块化就是将复杂系统分解为更容易更好的可管理模块的管理方式。 模块化开发就是封装细节、提供接口互不影响，存在的意义就是以更少的代码来实现更多的功能(代码复用)。 项目依赖 image.pngimage.png 模块介绍 Domain.Shared 项目 项目包含常量,枚举和其他对象,这些对象实际上是领域层的一部分,但是解决方案中所有的层/项目中都...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/softwareDesign/openSourceFrame/abp/mokuaiheyilai.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"模块和依赖"}],["meta",{"property":"og:description","content":"概述 模块化就是将复杂系统分解为更容易更好的可管理模块的管理方式。 模块化开发就是封装细节、提供接口互不影响，存在的意义就是以更少的代码来实现更多的功能(代码复用)。 项目依赖 image.pngimage.png 模块介绍 Domain.Shared 项目 项目包含常量,枚举和其他对象,这些对象实际上是领域层的一部分,但是解决方案中所有的层/项目中都..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://azrng.gitee.io/kbms/kbms/common/1615636138636-b86e46a3-4db9-4400-bf1d-6c3938f24d9d.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-16T14:28:34.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-09-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-16T14:28:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"模块和依赖\\",\\"image\\":[\\"https://azrng.gitee.io/kbms/kbms/common/1615636138636-b86e46a3-4db9-4400-bf1d-6c3938f24d9d.png\\"],\\"datePublished\\":\\"2023-09-05T00:00:00.000Z\\",\\"dateModified\\":\\"2024-03-16T14:28:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"项目依赖","slug":"项目依赖","link":"#项目依赖","children":[]},{"level":2,"title":"模块介绍","slug":"模块介绍","link":"#模块介绍","children":[{"level":5,"title":"Domain.Shared 项目","slug":"domain-shared-项目","link":"#domain-shared-项目","children":[]},{"level":5,"title":"Domain 项目","slug":"domain-项目","link":"#domain-项目","children":[]},{"level":5,"title":"Application.Contracts 项目","slug":"application-contracts-项目","link":"#application-contracts-项目","children":[]},{"level":5,"title":"Application 项目","slug":"application-项目","link":"#application-项目","children":[]},{"level":5,"title":"EntityFrameworkCore 项目","slug":"entityframeworkcore-项目","link":"#entityframeworkcore-项目","children":[]},{"level":5,"title":"EntityFrameworkCore.DbMigrations 项目","slug":"entityframeworkcore-dbmigrations-项目","link":"#entityframeworkcore-dbmigrations-项目","children":[]},{"level":5,"title":"DbMigrator 项目","slug":"dbmigrator-项目","link":"#dbmigrator-项目","children":[]},{"level":5,"title":"HttpApi 项目","slug":"httpapi-项目","link":"#httpapi-项目","children":[]},{"level":5,"title":"HttpApi.Client 项目","slug":"httpapi-client-项目","link":"#httpapi-client-项目","children":[]},{"level":5,"title":"Web 项目","slug":"web-项目","link":"#web-项目","children":[]},{"level":5,"title":"","slug":"","link":"#","children":[]}]}],"git":{"createdTime":1693926838000,"updatedTime":1710599314000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":6.44,"words":1933},"filePathRelative":"softwareDesign/openSourceFrame/abp/mokuaiheyilai.md","localizedDate":"2023年9月5日","excerpt":"<h2>概述</h2>\\n<p>模块化就是将复杂系统分解为更容易更好的可管理模块的管理方式。\\n模块化开发就是封装细节、提供接口互不影响，存在的意义就是以更少的代码来实现更多的功能(代码复用)。</p>\\n<h2>项目依赖</h2>\\n<figure><img src=\\"/common/1615636138636-b86e46a3-4db9-4400-bf1d-6c3938f24d9d.png\\" alt=\\"image.png\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>image.png</figcaption></figure>\\n<h2>模块介绍</h2>\\n<h5>Domain.Shared 项目</h5>","autoDesc":true}');export{m as comp,g as data};