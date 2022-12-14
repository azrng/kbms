---
title: 实时通信-技术大乱斗
lang: zh-CN
date: 2021-08-25
publish: true
author: azrng
isOriginal: true
category:
 - dotNet
tag:
 - 实时通信
---
# 实时通信技术大乱斗

现代应用程序的很多功能依赖于实时通信技术：

- 聊天
- 实时股票更新
- 现场拍卖
- 体育/新闻实时更新
- 多人游戏
- 位置服务
- 进度条

HTTP通信的核心一直没变，依旧是**请求/响应模型**，这给实时通信带来了根本性挑战。

多年来，开发者一直在尝试以各种姿势规避HTTP障碍。
我们快速总结流行的几种技术，每种技术都有一个真实的轶事，以便于解释。

## 定期轮询

> 带小孩徒步旅行？
> 孩子们间隔1,2分钟就问：“我们到了吗？”，你的回答干脆友善，但询问/应答会持续出现。

![img](https://gitee.com/AZRNG/picture-storage/raw/master/kbms/regularpoll.png)
客户端定期询问服务器是否有新信息， 显然这不是实时的，如果轮询间隔足够短，可能会有一点效果。

定期轮询确实会导致客户端-服务器之间反复不必要的往返。

## 长轮询

> 与你的孩子开启另一趟徒步旅程。
> 但这一次，当孩子询问， “我们到了吗？”，你只是保持沉默，一直到下一站（或者发脾气）才做出回应。

![img](https://gitee.com/AZRNG/picture-storage/raw/master/kbms/longpoll.png)

长轮询是轮询的一种高级形式，可满足实时通信的需要。

客户端向服务器发出信息请求，服务器hold请求，直到发生值得关注的事情（或请求即将超时）。

于此同时，客户端需要针对响应和超时进行编程，以立即发起另一个请求。这样确保客户端/服务器具有持续的Comet请求以接受实时响应。

长轮询和轮询比起来，明显减少了很多不必要的http请求次数，相比之下节约了资源。长轮询的缺点在于，连接挂起也会导致资源的浪费。

长轮询仍然很流行，但它通常需要在服务器和客户端自定义编程才能成功实现。

## 服务端发送事件 (SSE)

> 你在电商上购物，勾选了推送复选框。
> 之后你每天都会收到三次营销邮件。

![img](https://gitee.com/AZRNG/picture-storage/raw/master/kbms/sse257b450a591144e28ff3fbe36892dd2f.png)

SSE是HTML5 新增的功能，SSE最大的特点就是不需要客户端发送请求，可以实现只要服务器端数据有更新，就可以马上发送到客户端。

SSE很大程度上是从服务器到客户端的定向推送，客户端使用EventSource对象（HTML5标准）捕获来自服务器的流式通知。

## WebSockets

> 你首次去国外旅行，一旦与对方确认了语言，后续沟通就无障碍。

![img](https://gitee.com/AZRNG/picture-storage/raw/master/kbms/websocketsbad3e7cd28fd4b4c9b45a3d0617cb2d8.png)
WebSockets依赖于http1.1的持久连接机制，WebSockets握手阶段需要http，连接一旦建立，客户端和服务器端就处于平等的地位，可以全双工通信，不存在请求和响应的区别。

以上技术可以解决HTTP障碍并促进实时通信。问题在于，大多数这些技术都需要开发人员的大量工作。
如果有一些框架可以消除通信的复杂性，让开发人员可以专注于构建实时应用程序，那岂不是很好吗？

### SignalR是.NET技术栈成熟的实时通信框架。

SignalR为服务器和客户端之间的双向远程过程调用（RPC）提供API，消除了实时通信的复杂性。

> SignalR提供了统一的API画布用于连接和客户端管理，以及进行扩展以处理增加的流量。
> SignalR使用服务器端集线器的概念来帮助已连接客户端的实时通信和管理。服务器和客户端可以无缝地相互调用方法，这种交互方法是强类型的。
> 虽然默认使用基于文本的JSON格式，但SignalR还支持Messagepack协议-(二进制数据序列化/反序列化)，以提高效率。

signalr是微软推出的标准框架， 目前我已知有node，golang的实现。

## gRPC

> 2015年推出的基于HTTP/2，专注于安全、数据压缩、更好的性能和更低的延迟。

![img](https://gitee.com/AZRNG/picture-storage/raw/master/kbms/21.jpg)

gRPC是由Google开发的基于HTTP/2协议实现的高性能通用RPC框架。**HTTP/2 的多路复用特性**支撑了gRPC的流式传输能力。

开箱即用的gRPC提供了丰富的功能，例如集成身份验证，双向流和流控制。

> gRPC自动为各种语言和平台生成跨平台客户端和服务器绑定代码。gRPC服务的定义和信息交换的格式是Protocol Buffers（一种功能强大的二进制序列化/反序列化工具集和语言）。

# 资料

来源：博客猿马甲哥 https://www.cnblogs.com/JulianHuang/p/15379648.html