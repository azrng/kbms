---
title: HTTP代理
lang: zh-CN
date: 2021-02-22
publish: true
author: azrng
isOriginal: true
category:
 - web
tag:
 - http
 - web
---
> 文章来自微信公众号【架构师修行之路】

#  HTTP 代理

"如果你有任何疑问和不满，请和我的代理人去说"，我们经常会听到某某明星又爆出什么猛料，结果都是当事人不解释，倒是由代理或者工作室来解释一大堆有的没的。

他们好像是明星的**另一张嘴**，替代明星完成他们自己无法完成或者不愿意完成的工作。

这里的代理是现实生活中的实体，是实实在在存在的人。

而在互联网中，也存在着一种`实体`，来替代网络实体完成它所无法完成的工作，这种网络实体叫服务器，不过它还有一种特殊的叫法：*Web 代理(proxy)*。

> 上面的网络实体，其实就指的是客户端和服务器。

代理通常位于服务器和客户端之间，扮演一种中间人的角色，在各个点之间传递 *HTTP 报文*，如果没有代理，HTTP 客户端就要和 HTTP 服务器进行直接对话。

> 那么，为什么 HTTP 客户端不直接和 HTTP 服务器进行对话，非要在中间加一层代理呢？它能起到什么作用呢？

首先，我们大家知道，有一些国外的网站在国内是访问不了的，但是假如我们就想访问某同性交友网站改怎么办呢？这里就需要使用代理了，它能够突破自身 IP 限制，访问国外站点。还有一些涉密公司会禁止访问外网，那要是查资料该怎么办呢？使用代理。

![图片](/web/202212101435650.webp)

其次，代理还能够**提升网络带宽，加快访问速度**，代理服务器会存储一部分带宽，而且代理服务器内部会有一块大的缓冲区，当访问了某些页面后，代理服务器就会`缓存`这些页面，等下次访问相同页面时，代理服务器会直接返回缓冲区缓冲之后的页面，这样代理服务器就会把带宽省下来的同时提高访问速度。

代理还会隐藏你主机的真实 IP，我们也可以通过这种方法免受网络攻击。

总的来说，代理的功能主要有下面几点。

![img](/web/202212101435296.webp)

私有代理和公共代理

代理服务器可以为许多客户端提供代理服务，同时代理也可以只是某个客户端专用的。就像教父中的汤姆军师只为柯里昂家族服务，而像是律师事务所的大部分律师是则面向公众服务的。所以，依据职责的不同，单个客户端专用的代理一般被称为**私有代理**，而为大多数客户端服务的代理被称为**公共代理**。

# 公共代理

我们见到的大部分代理服务器都是公共代理，公共代理最大的特点就是**共享**，但是共享也意味着风险，一般不推荐使用这种代理，不过公共代理却有他自己独有的优点：

- 大部分公共代理都是免费的，这意味着你可以随意白嫖（果然免费的才香）。
- 能够支持 HTTP 和 `SOCKSv5` 服务。

> 这里我们熟悉 HTTP 协议，那么 SOCKSv5 是个什么协议呢？我们后面会说到。

- 如果你想要从 Internet 上收集数据，那么公共代理对某些 SEO 很有用。

# 私有代理

专用的私有代理比较少见，但它们却是存在，尤其是直接运行在客户端计算机上的时候。私有代理是一个专用的 IP ，一次只能由一个客户端使用。私有代理相比公共代理，也有一些独特的优势。

- 速度快，因为只有单个客户端使用。
- 足够安全，无需担心隐私被泄漏的风险。

不过，不论是公共代理还是私有代理，它们都有一个共同的特性，那就是**既能扮演客户端，接受响应报文，返回响应报文；也能扮演服务器，接受客户端请求，处理客户端请求**。

![图片](/web/202212101435788.webp)

所以，代理服务器分别扮演不同的**职责**，完全是根据你选择的参照物来说明的。

我们大家知道，网关是一种网络硬件设备或网络节点，它是网络的入口和出口点，因为所有数据在路由之前都必须通过网关或与网关通信。网关旨在将两个不同的网络连接在一起，允许用户跨多个网络进行通信。

上面这段描述中的网关，圈重点，其实就扮演了一个代理的角色，它行使的功能就是帮助两个异构的网络进行通信。

不过，虽然网关能起到代理的作用，但是网关和代理服务器确实完全不同的东西。

**代理和网关最大的区别就是网关不会进行数据的过滤，网关不能阻止访问某些网站，而代理服务器的功能却有很多**。

可以这么理解，网关就是没有过滤功能的代理服务器。

> ⚠️这里不得不提另外一种网络设备，那就是防火墙，防火墙能够也能够过滤数据，进行安全性检查。

严格来说，代理连接的是两个或者多个使用相同协议的应用程序，依据不同的协议，代理可以分为很多种，不过我们常用的一般就下面三种代理方式。

- HTTP 代理，是我们最常见到的一种代理方式，主要是代理浏览器进行访问页面。
- SOCKS 代理，SOCKS 代理的正是 Socket，它支持多种协议，支持 HTTP 、FTP 等多种类型请求。它分SOCKS 4 和SOCKS 5两种类型，SOCKS 4只支持 TCP 协议而 SOCKS 5支持 TCP/UDP 协议，还支持各种身份验证机制等协议。
- SSL 代理，SSL 代理也叫做 HTTPS 代理，为了保护敏感数据在互联网传送中的安全性，越来越多的网站都采用 SSL 加密形式发布。

这时候可能有读者会说了，cxuan 你讲了这么多东西，那到底网关能干啥呢？能举几个示例吗？

来了来了。

# 代理服务器的作用

下面我通过几个示例来给你解释一下代理服务器都有哪些用途和作用：

**网站过滤**

这是我们上面一直在讲的，代理服务器能够访问一些网站，同时它也有过滤功能，禁止一些网站的访问。

**文档访问控制**

可以使用代理服务器在大量的 web 服务器和 web 资源之间实现统一的访问控制，通常用在大型企业或者分布式机构中。比如下面是三种拥有不同访问控制权限的客户端。

![图片](/web/202212101435635.webp)

- 客户端 A 可以无限制的访问服务器 A 中的指定页面。
- 客户端 B 可以无限制的直接访问互联网。
- 客户端 C 在访问服务器 C 的加密数据之前需要输入密码或者凭证。

**安全防火墙**

代理服务器也可以充当防火墙的角色，用于限制/过滤数据的流入和流出，进行安全性检查等。

**Web 缓存**

代理缓存能够维护常用网站的本地副本，以便减少缓慢而且昂贵的因特网通信开销。

**反向代理**

代理除了能够假扮客户端之外，它还能够假扮服务器，这种方式被称为**反向代理**。但是对于客户端而言，反向代理服务器就相当于目标服务器，这也就是说客户端直接访问代理服务器就能够直接获得目标服务器的资源。

可以使用反向代理来提高访问龟速 Web 服务器上公共内容时的性能。在这种配置中，通常将这些反向代理称为**服务器加速**。

![图片](/web/202212101435682.webp)

**转码器**

代理服务器在将内容发送给客户端之前，修改内容的主体格式，这种对数据格式进行修改的方式就被称为**转码**。

转码代理可以在传输 GIF 图片时，将其转换为 JPEG 图片，用于减小图片的传输大小，也可以对其进行压缩等。

**匿名者**

匿名者顾名思义就是代理服务器隐藏客户端特征，匿名者代理会从 HTTP 报文中删除身份特征，比如客户端的 IP 地址、From 首部、Referer 首部、cookie、URI 的会话 ID，提高私密性和安全性。

代理其实也像 DNS 一样，具有层次结构，只不过 DNS 层次结构中上下级之间都是 DNS 服务器，而代理层次结构把上下级都换成了代理服务器。

# 代理的层次结构

在代理的层次结构中，会将报文在代理之间传递，一直传递到最终的服务器，然后再将响应报文通过代理传回给客户端，例如下图是一个反向代理的层次结构。

![图片](/web/202212101435394.webp)

代理层次结构中的代理服务器被赋予了父和子的关系，靠近服务器的被称为父代理，靠近客户端的被称为子代理。

这是一种静态的代理层次结构，静态意味着这个在这个层次结构中，代理 1 总是会将报文转发给代理 2 ，而代理 2 总是会将报文转发给代理 3。

但是，代理的层次结构却不一定非得是静态的，这也就是说，在代理层次结构中，父代理和子代理都是可以改变的，下面是几个可以动态选择代理的方式：

- 负载均衡：子代理可以根据当前父代理的工作负载级别来选择父代理。
- 地理位置邻近选择：当然也可以根据地理位置的临近情况来选择父代理。
- 根据协议和类型来选择：子代理会根据 URI 将报文转发到不同的父代理或者原始服务器上去。

# 客户端的代理设置

客户端的代理设置主要有下面四种：

- 手动设置
- 预先配置浏览器代理，浏览器厂商会在客户端获取浏览器之前预先对代理进行配置
- 自动配置代理，通过提供一个 URI，指向一个用 JS 写的代理自动配置文件；客户端会取回这个 JS 文件，并运行它以决定是否应该使用代理
- WPAD 代理发现，有些浏览器支持 WPAD 代理自动发现协议，这个协议会自动检测出浏览器可以从哪个配置服务器下载到一个自动配置文件。

