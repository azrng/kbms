import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as n,d as t}from"./app-41nmD-Ik.js";const i={},r=t('<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2><p>MAUI 是 Xamarin.Forms 的进化（Xamarin.Forms 已经有6年历史了）。支持Model-View-ViewModel（MVVM）和Model-View-Update (MVU)等模式编写。NET MAUI 的目的是简化多平台应用程序开发。使用 .NET MAUI，您可以使用单个项目创建多平台应用程序，但您可以根据需要添加特定于平台的源代码和资源。.NET MAUI 的主要目标是使您能够在单个代码库中实现尽可能多的应用程序逻辑和 UI 布局。</p><p>官网：<a href="https://learn.microsoft.com/zh-cn/dotnet/maui/" target="_blank" rel="noopener noreferrer">https://learn.microsoft.com/zh-cn/dotnet/maui/ </a><a href="https://learn.microsoft.com/zh-cn/training/browse/?expanded=dotnet&amp;products=dotnet-maui" target="_blank" rel="noopener noreferrer">Learn练习教程</a></p><h2 id="开源项目" tabindex="-1"><a class="header-anchor" href="#开源项目"><span>开源项目</span></a></h2><p>Awesome .NET MAUI：https://github.com/jsuarezruiz/awesome-dotnet-maui</p><h2 id="技术栈" tabindex="-1"><a class="header-anchor" href="#技术栈"><span>技术栈</span></a></h2><p>.NET 提供了一系列用于创建应用程序的特定于平台的框架：.NET for Android、.NET for iOS（和 iPadOS）、.NET for Mac 和 WinUI 3（利用 Windows App SDK）。这些框架都可以访问相同的 .NET 6 基类库 (BCL)。这个库提供了创建和管理资源的功能，以及从代码中抽象出底层设备细节的功能。BCL 依赖于 .NET 运行时来为您的代码提供执行环境。对于 Android、iOS（和 iPadOS）和 macOS，环境由 Mono 实现，Mono 是 .NET 运行时的开源实现。在 Windows 上，Win32 执行相同的角色，只是它针对 Windows 平台进行了优化。</p><p>虽然 BCL 允许在不同类型的设备上运行的应用程序共享通用的业务逻辑，但各种平台有不同的方式来定义应用程序的用户界面。这些平台提供了不同的模型来指定用户界面元素如何通信和互操作。您可以使用适当的平台特定框架（Android 的 .NET、iOS 的 .NET、Mac 的 .NET 或 WinUI 3）分别为每个平台制作 UI，但是这种方法需要您维护一个代码库每个单独的设备系列。.NET MAUI 提供单一框架来构建移动和桌面应用程序的 UI。您使用此框架创建 UI（如下图中的箭头 1 所示），.NET MAUI 负责将其转换为适当的平台。</p><h2 id="如何工作" tabindex="-1"><a class="header-anchor" href="#如何工作"><span>如何工作</span></a></h2><p>.NET MAUI 始终为目标设备生成本机代码，因此您可以获得最佳性能。.NET MAUI 使用特定于每个平台和 UI 元素的“处理程序”来执行操作。例如，如果您的应用程序以 iOS 为目标，.NET MAUI 处理程序会将此代码映射到 iOS UIButton。如果您在 Android 上运行，您将获得一个 Android AppCompatButton。</p><h2 id="对比avalonia" tabindex="-1"><a class="header-anchor" href="#对比avalonia"><span>对比Avalonia</span></a></h2><ul><li>Maui是微软的一个跨平台框架，旨在为.NET开发人员提供一种简单的方法，以在多个操作系统和设备上构建本机应用程序。Maui使用Xamarin.Forms代码库作为基础，同时添加了一些新的API和特性。Maui的设计理念是使用原生控件，以获得更好的性能和更好的用户体验。Maui支持多种设备类型，包括移动设备、平板电脑、台式机和Web浏览器。</li><li>Avalonia UI是一个跨平台的GUI框架，旨在为开发人员提供一种构建本机应用程序的方法，而无需在不同的操作系统上使用不同的工具和技术。Avalonia UI的设计理念是使用XAML语言描述UI，同时使用Skia图形库绘制控件。Avalonia UI的控件库与WPF非常相似，但是可以在多个平台上运行，包括Windows、Linux和macOS。</li><li>在绑定控件方面，Avalonia UI使用XAML语言提供的语法，而Maui使用C#代码实现。Avalonia UI的绑定语法与WPF类似，可以绑定到命名控件或祖先控件。Maui的绑定语法类似于Xamarin.Forms，可以使用绑定器或属性来绑定控件。</li></ul><p>如果需要在多个平台上运行本机应用程序，并且希望使用XAML语言来描述UI，可以选择Avalonia UI。如果需要在多个设备类型上构建本机应用程序，并且希望使用原生控件来获得更好的性能和用户体验，可以选择Maui。</p><h2 id="ui框架" tabindex="-1"><a class="header-anchor" href="#ui框架"><span>UI框架</span></a></h2><p>使用 .NET MAUI 为 iOS、Android、macOS 和 Windows 构建应用程序的动手实验手册：<a href="https://github.com/kinfey/dotnet-maui-workshop" target="_blank" rel="noopener noreferrer">https://github.com/kinfey/dotnet-maui-workshop</a></p><ol><li>Telerik UI for Maui：Telerik UI是一个流行的UI库，提供了丰富的控件和功能，可用于创建具有复杂布局和动画效果的现代化应用程序。收费</li><li>Syncfusion Essential UI Kit for Maui：Syncfusion Essential UI Kit是一个全面的UI库，包含许多高质量的控件和主题，可用于创建现代化的Maui应用程序。</li><li>Material Design for MaUI：Material Design是Google的设计语言，该UI库为Maui应用程序提供了现代化的外观和感觉，并包含许多常用的控件和布局。</li><li>DevExpress UI for Maui：DevExpress UI是一个全面的UI库，提供了丰富的控件和特性，可用于创建高度定制化的Maui应用程序。</li></ol><h3 id="syncfusion" tabindex="-1"><a class="header-anchor" href="#syncfusion"><span>Syncfusion</span></a></h3><p>商业控件</p><p>官网：<a href="https://www.syncfusion.com/maui-controls" target="_blank" rel="noopener noreferrer">https://www.syncfusion.com/maui-controls</a></p><h3 id="uraniumui" tabindex="-1"><a class="header-anchor" href="#uraniumui"><span>UraniumUI</span></a></h3><p>Uranium 是 .NET MAUI 的免费开源 UI 工具包。它提供了一组控件和实用工具来构建新式应用程序。它基于 .NET MAUI 基础结构构建，并提供一组用于生成新式 UI 的控件和布局。它还提供用于在其上生成自定义控件和主题的基础结构。</p><p>仓库地址：<a href="https://github.com/enisn/UraniumUI" target="_blank" rel="noopener noreferrer">https://github.com/enisn/UraniumUI</a></p><p>文档地址：<a href="https://enisn-projects.io/docs/en/uranium/latest" target="_blank" rel="noopener noreferrer">https://enisn-projects.io/docs/en/uranium/latest</a></p><h3 id="mdc-maui" tabindex="-1"><a class="header-anchor" href="#mdc-maui"><span>MDC-MAUI</span></a></h3><div class="hint-container tip"><p class="hint-container-title">提示</p><p>该仓库已经不维护了</p></div><p>文档地址：<a href="https://mdc-maui.github.io/" target="_blank" rel="noopener noreferrer">https://mdc-maui.github.io/</a></p><p>仓库地址：<a href="https://github.com/mdc-maui/mdc-maui" target="_blank" rel="noopener noreferrer">https://github.com/mdc-maui/mdc-maui</a></p><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>demo：<a href="https://github.com/MauiDeveloperOrg/MauiDemo" target="_blank" rel="noopener noreferrer">https://github.com/MauiDeveloperOrg/MauiDemo</a> 官方示例：<a href="https://github.com/dotnet/maui-samples" target="_blank" rel="noopener noreferrer">https://github.com/dotnet/maui-samples</a></p><h2 id="视频教程" tabindex="-1"><a class="header-anchor" href="#视频教程"><span>视频教程</span></a></h2><p><a href="https://www.bilibili.com/video/BV1r1421D71c?spm_id_from=333.1245.0.0" target="_blank" rel="noopener noreferrer">在 .NET MAUI 中使用 MediaElement 进行全屏视频播放！</a></p><p>系列教程：https://space.bilibili.com/226440/channel/collectiondetail?sid=448819</p><p>Maui多媒体流播放 https://www.bilibili.com/video/BV1Pz421Q7uU</p><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2><p>dotnet界面大白博客园：<a href="https://www.cnblogs.com/jasondun/" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/jasondun/</a> 绑定相关的文章：<a href="https://www.cnblogs.com/jasondun/p/9215572.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/jasondun/p/9215572.html</a></p>',35),o=[r];function l(s,p){return n(),a("div",null,o)}const h=e(i,[["render",l],["__file","index.html.vue"]]),m=JSON.parse('{"path":"/dotnet/maui/","title":"说明","lang":"zh-CN","frontmatter":{"title":"说明","lang":"zh-CN","date":"2023-10-15T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dotNET"],"tag":["无"],"filename":"readme","slug":"gkci06","docsId":"44168271","description":"概述 MAUI 是 Xamarin.Forms 的进化（Xamarin.Forms 已经有6年历史了）。支持Model-View-ViewModel（MVVM）和Model-View-Update (MVU)等模式编写。NET MAUI 的目的是简化多平台应用程序开发。使用 .NET MAUI，您可以使用单个项目创建多平台应用程序，但您可以根据需要添加...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dotnet/maui/"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"说明"}],["meta",{"property":"og:description","content":"概述 MAUI 是 Xamarin.Forms 的进化（Xamarin.Forms 已经有6年历史了）。支持Model-View-ViewModel（MVVM）和Model-View-Update (MVU)等模式编写。NET MAUI 的目的是简化多平台应用程序开发。使用 .NET MAUI，您可以使用单个项目创建多平台应用程序，但您可以根据需要添加..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-26T11:09:25.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-10-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-08-26T11:09:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"说明\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-10-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-08-26T11:09:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"开源项目","slug":"开源项目","link":"#开源项目","children":[]},{"level":2,"title":"技术栈","slug":"技术栈","link":"#技术栈","children":[]},{"level":2,"title":"如何工作","slug":"如何工作","link":"#如何工作","children":[]},{"level":2,"title":"对比Avalonia","slug":"对比avalonia","link":"#对比avalonia","children":[]},{"level":2,"title":"UI框架","slug":"ui框架","link":"#ui框架","children":[{"level":3,"title":"Syncfusion","slug":"syncfusion","link":"#syncfusion","children":[]},{"level":3,"title":"UraniumUI","slug":"uraniumui","link":"#uraniumui","children":[]},{"level":3,"title":"MDC-MAUI","slug":"mdc-maui","link":"#mdc-maui","children":[]}]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]},{"level":2,"title":"视频教程","slug":"视频教程","link":"#视频教程","children":[]},{"level":2,"title":"资料","slug":"资料","link":"#资料","children":[]}],"git":{"createdTime":1697962303000,"updatedTime":1724670565000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":5},{"name":"zhangyunpeng","email":"zhang.yunpeng@synyi.com","commits":2}]},"readingTime":{"minutes":5.07,"words":1522},"filePathRelative":"dotnet/maui/readme.md","localizedDate":"2023年10月15日","excerpt":"<h2>概述</h2>\\n<p>MAUI 是&nbsp;Xamarin.Forms 的进化（Xamarin.Forms 已经有6年历史了）。支持Model-View-ViewModel（MVVM）和Model-View-Update (MVU)等模式编写。NET MAUI 的目的是简化多平台应用程序开发。使用 .NET MAUI，您可以使用单个项目创建多平台应用程序，但您可以根据需要添加特定于平台的源代码和资源。.NET MAUI 的主要目标是使您能够在单个代码库中实现尽可能多的应用程序逻辑和 UI 布局。</p>\\n<p>官网：<a href=\\"https://learn.microsoft.com/zh-cn/dotnet/maui/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://learn.microsoft.com/zh-cn/dotnet/maui/ </a>\\n<a href=\\"https://learn.microsoft.com/zh-cn/training/browse/?expanded=dotnet&amp;products=dotnet-maui\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Learn练习教程</a></p>","autoDesc":true}');export{h as comp,m as data};