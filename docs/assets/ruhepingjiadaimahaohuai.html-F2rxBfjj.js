import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as l,d as a}from"./app-CF6xeyXt.js";const t={},n=a('<h2 id="评判标准" tabindex="-1"><a class="header-anchor" href="#评判标准"><span>评判标准</span></a></h2><ul><li>可维护性</li><li>可读性</li><li>可扩展性</li><li>灵活性</li><li>简洁性</li><li>可复用性</li><li>可测试性</li></ul><h3 id="可维护性" tabindex="-1"><a class="header-anchor" href="#可维护性"><span>可维护性</span></a></h3><p>在不破坏原有代码设计、不引入新的bug的情况下，能够快速修改或者添加代码。</p><p>代码分层情清晰、模块化好、高内聚低耦合、遵从基于接口而非实现编程的设计原则等等。</p><p>简单理解：如果bug容易修复，修改、添加功能能够轻松完成，那么就可以主观认为代码易维护。</p><h3 id="可读性" tabindex="-1"><a class="header-anchor" href="#可读性"><span>可读性</span></a></h3><p>考虑代码是否易读、易理解。</p><p>简单理解：编码是否符合规范、命名是否达意、注释是否详细、函数是否长短适合、模块划分是否清晰、是否符合高内聚低耦合等等。</p><h3 id="可扩展性" tabindex="-1"><a class="header-anchor" href="#可扩展性"><span>可扩展性</span></a></h3><p>代码应对未来需求变化的能力。</p><p>简单理解：在不修改或者少量修改原有代码的情况下，通过扩展的方式添加新的功能。</p><h3 id="灵活性" tabindex="-1"><a class="header-anchor" href="#灵活性"><span>灵活性</span></a></h3><p>一个方法或者一个接口可以应对多种使用场景，满足各种不同的需求。</p><p>简单理解：如果一段代码易扩展、易复用或者易用，我们都可以称这段代码写得比较灵活。</p><h3 id="简洁性" tabindex="-1"><a class="header-anchor" href="#简洁性"><span>简洁性</span></a></h3><p>kiss原则，尽量保持代码简单、逻辑清晰，也就意味着易读、易维护。</p><h3 id="可复用性" tabindex="-1"><a class="header-anchor" href="#可复用性"><span>可复用性</span></a></h3><p>尽量减少重复代码的编写，复用已有的代码。</p><p>继承、多态存在的目的之一，就是提高代码的可复用性；设计原则的单一职责原则也跟代码的可复用性相关；重构里面的，解耦、高内聚、模块化等都可以提高代码的可复用性。</p><h4 id="提到代码可复用性" tabindex="-1"><a class="header-anchor" href="#提到代码可复用性"><span>提到代码可复用性</span></a></h4><ul><li>减少代码耦合 <ul><li>高低耦合的代码会影响代码的复用性，尽量减少代码耦合。</li></ul></li><li>满足单一职责原则 <ul><li>如果职责不够单一，那么依赖它的代码或者它依赖的代码就会比较多，增加了代码的耦合性。所以会影响代码复用性。</li></ul></li><li>模块化 <ul><li>善于将功能独立的代码封装成模块。独立的模块就想一块一块积木，更加容易复用，可以直接使用。</li></ul></li><li>业务与非业务逻辑分离 <ul><li>将业务与非业务逻辑代码分离，抽取成一些通用的框架、类库、组件。</li></ul></li><li>通用代码下沉 <ul><li>永通的代码尽量下沉到更下层</li></ul></li><li>继承、多态、抽象、封装 <ul><li>继承可以复用父类属性和方法。多态可以动态替换代码的部分逻辑。抽象和封装越抽象越不依赖具体的实现，越容易复用。</li></ul></li><li>应用模板等设计模式 <ul><li>模板模式利用多态来实现。可以灵活替换其中的部分代码，整个流程模板代码可复用。</li></ul></li><li>泛型编程</li></ul><h3 id="可测试性" tabindex="-1"><a class="header-anchor" href="#可测试性"><span>可测试性</span></a></h3><p>代码的可测试性差，比较难写单元测试，那基本就说明代码设计得有问题。</p><h2 id="要求" tabindex="-1"><a class="header-anchor" href="#要求"><span>要求</span></a></h2><p>写出上述这些评价标准的高质量代码，需要掌握一些更加细化、更加能够落地的变成方法论，包括面向对象设计思想、设计原则、设计模式、编码规范、重构技巧等。</p><ul><li>面向对象中的继承、多态能够让我们写出可复用的代码；</li><li>编码规范能让我们写出可读性好的代码；</li><li>设计原则中的单一职责、DRY、基于接口而非是实现、里式替换等，可以让我们写出可复用、灵活、可读性好、易扩展、易维护的代码；</li><li>设计模式可以让我们写出易扩展的代码；</li><li>持续重构可以时刻保持代码的可维护性等等。</li></ul>',27),r=[n];function h(p,s){return l(),i("div",null,r)}const c=e(t,[["render",h],["__file","ruhepingjiadaimahaohuai.html.vue"]]),u=JSON.parse('{"path":"/softwareDesign/highQualityCode/ruhepingjiadaimahaohuai.html","title":"如何评价代码好坏","lang":"zh-CN","frontmatter":{"title":"如何评价代码好坏","lang":"zh-CN","date":"2022-04-10T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["软件设计"],"tag":["无"],"filename":"ruhepingjiadaimahaohuai","slug":"meqhs2","docsId":"67090696","description":"评判标准 可维护性 可读性 可扩展性 灵活性 简洁性 可复用性 可测试性 可维护性 在不破坏原有代码设计、不引入新的bug的情况下，能够快速修改或者添加代码。 代码分层情清晰、模块化好、高内聚低耦合、遵从基于接口而非实现编程的设计原则等等。 简单理解：如果bug容易修复，修改、添加功能能够轻松完成，那么就可以主观认为代码易维护。 可读性 考虑代码是否易...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/softwareDesign/highQualityCode/ruhepingjiadaimahaohuai.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"如何评价代码好坏"}],["meta",{"property":"og:description","content":"评判标准 可维护性 可读性 可扩展性 灵活性 简洁性 可复用性 可测试性 可维护性 在不破坏原有代码设计、不引入新的bug的情况下，能够快速修改或者添加代码。 代码分层情清晰、模块化好、高内聚低耦合、遵从基于接口而非实现编程的设计原则等等。 简单理解：如果bug容易修复，修改、添加功能能够轻松完成，那么就可以主观认为代码易维护。 可读性 考虑代码是否易..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-23T01:45:31.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2022-04-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-23T01:45:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何评价代码好坏\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-10T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-23T01:45:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"评判标准","slug":"评判标准","link":"#评判标准","children":[{"level":3,"title":"可维护性","slug":"可维护性","link":"#可维护性","children":[]},{"level":3,"title":"可读性","slug":"可读性","link":"#可读性","children":[]},{"level":3,"title":"可扩展性","slug":"可扩展性","link":"#可扩展性","children":[]},{"level":3,"title":"灵活性","slug":"灵活性","link":"#灵活性","children":[]},{"level":3,"title":"简洁性","slug":"简洁性","link":"#简洁性","children":[]},{"level":3,"title":"可复用性","slug":"可复用性","link":"#可复用性","children":[{"level":4,"title":"提到代码可复用性","slug":"提到代码可复用性","link":"#提到代码可复用性","children":[]}]},{"level":3,"title":"可测试性","slug":"可测试性","link":"#可测试性","children":[]}]},{"level":2,"title":"要求","slug":"要求","link":"#要求","children":[]}],"git":{"createdTime":1693926838000,"updatedTime":1698025531000,"contributors":[{"name":"zhangyunpeng","email":"zhang.yunpeng@synyi.com","commits":1}]},"readingTime":{"minutes":3.35,"words":1005},"filePathRelative":"softwareDesign/highQualityCode/ruhepingjiadaimahaohuai.md","localizedDate":"2022年4月10日","excerpt":"<h2>评判标准</h2>\\n<ul>\\n<li>可维护性</li>\\n<li>可读性</li>\\n<li>可扩展性</li>\\n<li>灵活性</li>\\n<li>简洁性</li>\\n<li>可复用性</li>\\n<li>可测试性</li>\\n</ul>\\n<h3>可维护性</h3>\\n<p>在不破坏原有代码设计、不引入新的bug的情况下，能够快速修改或者添加代码。</p>\\n<p>代码分层情清晰、模块化好、高内聚低耦合、遵从基于接口而非实现编程的设计原则等等。</p>\\n<p>简单理解：如果bug容易修复，修改、添加功能能够轻松完成，那么就可以主观认为代码易维护。</p>\\n<h3>可读性</h3>\\n<p>考虑代码是否易读、易理解。</p>","autoDesc":true}');export{c as comp,u as data};