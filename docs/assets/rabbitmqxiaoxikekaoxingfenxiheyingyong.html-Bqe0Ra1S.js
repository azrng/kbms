import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as b,d as p}from"./app-S-drW72G.js";const e="/kbms/common/1609400243138-0d995cac-4498-4c03-a0a1-151e3a3dfdd0.png",a="/kbms/common/1609400243132-e36d5f75-f697-4fd9-b953-dcac59c07e29.gif",i="/kbms/common/1609400243178-c3424240-5b6a-426c-94e7-7b07d4fc4c84.gif",t="/kbms/common/1609400243127-262fc79a-4c12-471c-82b3-d86fb77b6423.gif",o="/kbms/common/1609400243149-6462b212-d0c2-4784-81ad-03e214a3b676.gif",c="/kbms/common/1609400243134-9bedb472-37e4-4d09-8dc0-a05ea25323ca.gif",r="/kbms/common/1609400243137-574d78ca-f4ce-4962-9b04-2d693ec77c32.gif",g={},m=p('<p><strong>RabbitMQ流程简介（带Exchange）</strong>        RabbitMQ使用一些机制来保证可靠性，如持久化、消费确认及发布确认等。        先看以下这个图： <img src="'+e+'" alt="image.png" loading="lazy">         P为生产者，X为中转站（Exchange），红色部分为消息队列，C1、C2为消费者。        整个流程分成三部分：第一，生产者生产消息，发送到中转站；第二，中转站按定义的规则转发消息到消息队列；第三，消费者从消息队列获取消息进行消费（处理）。 <strong>RabbitMQ消息可靠性分析和应用</strong>        应用代码均使用C#客户端代码实现。 <strong>一、发布确认</strong>        生产者生产消息，发送到中转站的过程中，可能会因为网络丢包、网络故障等问题造成消息丢失。为了确保生产者发送的消息不会丢失，RabbitMQ提供了发布确认（Publisher Confirms）机制，从而提高消息的可靠性（注意：发布确认机制不能和事务机制一起使用）。 **       单条消息发布确认：**       channel.ConfirmSelect();//发布确认机制                string message = &quot;msg&quot;;                var body = Encoding.UTF8.GetBytes(message);               channel.BasicPublish(                        exchange: &quot;MarkTopicChange&quot;,                        routingKey: &quot;MarkRouteKey.one&quot;,                        basicProperties: null,                        body: body                        );                bool isPublished = channel.WaitForConfirms();//通道（channel）里消息发送成功返回true <img src="'+a+'" alt="image.gif" loading="lazy">          使用channel.ConfirmSelect，一旦信道进入确认模式，所有在该信道上面发布的消息都会被指派一个唯一的ID（从1开始）。消息被投递到所有匹配的队列之后，RabbitMQ就会发送（Basic.Ack）给生产者（包含消息的唯一ID），生产者从而知道消息发送成功。 **       多条消息发布确认：** <img src="'+i+'" alt="image.gif" loading="lazy">   channel.ConfirmSelect();//发布确认机制                foreach (var itemMsg in lstMsg)                {                    byte[] sendBytes = Encoding.UTF8.GetBytes(itemMsg);                    //发布消息                   channel.BasicPublish(                        exchange: &quot;MarkTopicChange&quot;,                        routingKey: &quot;MarkRouteKey.one&quot;,                        basicProperties: null,                        body: sendBytes                        );                }                bool isAllPublished = channel.WaitForConfirms();//通道（channel）里所有消息均发送才返回true <img src="'+t+'" alt="image.gif" loading="lazy">            注意：多消息发布确认机制情况下，倘若要发送100条消息，发送90条后，突然网络故障，后面的消息发送失败了，那么isAllPublished返回的是false，而前面90条消息已经发送到消息队列了。我们还不知道哪些消息是发送失败的，所以很多条消息发布确认，建议分几次发送或多通道发送。        此外，需要确保在中转站（Exchange）的消息可以顺利到达消息队列。        （1）首先需要定义匹配的Exchange和Queue，根据Exchange的类型和routingKey确定转发的关系。        （2）确保消息队列有足够内存存储消息。        RabbitMQ默认配置vm_memory_high_watermark为0.4。意思是控制消息占40%内存左右。vm_memory_high_watermark_paging_ratio为0.5，当消息占用内存超过50%，RabbitMQ会把消息转移到磁盘上以释放内存。当磁盘剩余空间小于阀值disk_free_limit（默认为50M），所有生产者阻塞，避免充满磁盘，导致所有的写操作失败。        RabbitMQ配置文件一般在%APPDATA%\\RabbitMQ\\rabbitmq.config.        %APPDATA% 一般为 C:\\Users%USERNAME%\\AppData\\Roaming（Windows环境） <strong>二、持久化</strong>        消息存放到消息队列后，在不配置消息持久化的情况下，若服务器重启、关闭或宕机等，消息都会丢失。配置持久化可以有效提高消息的可靠性。持久化需要同时配置消息持久化和队列持久化。单配置消息持久化，队列消失了，消息没有地方存放；单配置队列持久化，队列还在，消息没了。        队列持久化在定义队列时候配置                 //定义队列               channel.QueueDeclare(                    queue: &quot;Mark_Queue&quot;, //队列名称                    durable: true, //队列磁盘持久化                                     exclusive: false,//是否排他的，false。如果一个队列声明为排他队列，该队列首次声明它的连接可见，并在连接断开时自动删除                    autoDelete: false,//是否自动删除，一般设成false                    arguments: null                    ); <img src="'+o+'" alt="image.gif" loading="lazy"> 消息持久化在发布消息时候配置 <img src="'+c+'" alt="image.gif" loading="lazy">                 //消息持久化，把DeliveryMode设成2                IBasicProperties properties = channel.CreateBasicProperties();                properties.DeliveryMode = 2;                    //发布消息                   channel.BasicPublish(                        exchange: &quot;MarkTopicChange&quot;,                        routingKey: &quot;MarkRouteKey.one&quot;,                        basicProperties: properties,                        body: sendBytes                        ); <img src="'+r+'" alt="image.gif" loading="lazy">        如何配置了事务机制或发布确认（publisher confirm）机制，服务端的返回Basic.Ack是在消息落盘之后执行的，进一步的提高了消息的可靠性。        为了防止磁盘损坏带来的消息丢失，可以配置镜像队列，这里不作介绍。 <strong>三、消费确认</strong>        为了确保消息被消费者消费，RabbitMQ提供消费确认模式（consumer Acknowledgements）。自动确认模式，当消费者<strong>成功接收到</strong>消息后，自动通知RabbitMQ，把消息队列中相应消息删除。这很大程度上满足不了我们，假如消费者接收到消息后，服务器宕机，消息还没处理完成，这样就会造成消息丢失。手动确认模式，当消费者<strong>成功处理完</strong>消息后，手动发消息通知RabbitMQ，把消息队列中相应消息删除。                     consumer.Received += (model, ea) =&gt;                     {                         var body = ea.Body;                         var message = Encoding.UTF8.GetString(body);                         var routingKey = ea.RoutingKey;                        Console.WriteLine(&quot; [x] Received &#39;{0}&#39;:&#39;{1}&#39;&quot;,                                          routingKey,                                          message); //确认该消息已被消费,发删除消息给RabbitMQ，把消息队列中的消息删除                   channel.BasicAck(ea.DeliveryTag, false);                    //消费消息失败，拒绝此消息，重回队列，让它可以继续发送到其他消费者                   //channel.BasicReject(ea.DeliveryTag, true);                    //消费消息失败，拒绝多条消息，重回队列，让它们可以继续发送到其他消费者                   //channel.BasicNack(ea.DeliveryTag, true, true);                    };                    //手动确认消息，把autoAck设成false                   channel.BasicConsume(queue: &quot;Mark_Queue&quot;,                                        autoAck: false,        这里值得注意的是，消息处理完成后，一定要把处理完成的消息发送到RabbitMQ（channel.BasicAck(ea.DeliveryTag, false)），不然RabbitMQ会一直等待，从而造成内存泄露。若处理消息过程中发生异常，可以使用channel.BasicReject(ea.DeliveryTag, true)来拒绝此消息，让它重回队列。若RabbitMQ收不到消费者任何确认消息的信号（包括确认信号，拒绝信号灯），直到此消费者断开连接，消息才能重回队列，继续发送到其他消费者。        提醒一下，假如消费者消费消息的方法不支持并发（取决于需求），可以限制消费者每次只接收一条消息。 channel.BasicQos(0, 1, false);</p>',1),l=[m];function d(u,h){return b(),s("div",null,l)}const k=n(g,[["render",d],["__file","rabbitmqxiaoxikekaoxingfenxiheyingyong.html.vue"]]),M=JSON.parse(`{"path":"/middleware/messageQueue/rabbitmq/kuozhan/rabbitmqxiaoxikekaoxingfenxiheyingyong.html","title":"RabbitMQ消息可靠性分析和应用","lang":"zh-CN","frontmatter":{"title":"RabbitMQ消息可靠性分析和应用","lang":"zh-CN","date":"2021-05-14T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["middleware"],"tag":["无"],"filename":"rabbitmqxiaoxikekaoxingfenxiheyingyong","slug":"yb3lfs","docsId":"29412195","description":"RabbitMQ流程简介（带Exchange） RabbitMQ使用一些机制来保证可靠性，如持久化、消费确认及发布确认等。 先看以下这个图： image.png P为生产者，X为中转站（Exchange），红色部分为消息队列，C1、C2为消费者。 整个流程分成三部分：第一，生产者生产消息，发送到中转站；第二，中转站按定义的规则转发消息到消息队列；第三，...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/middleware/messageQueue/rabbitmq/kuozhan/rabbitmqxiaoxikekaoxingfenxiheyingyong.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"RabbitMQ消息可靠性分析和应用"}],["meta",{"property":"og:description","content":"RabbitMQ流程简介（带Exchange） RabbitMQ使用一些机制来保证可靠性，如持久化、消费确认及发布确认等。 先看以下这个图： image.png P为生产者，X为中转站（Exchange），红色部分为消息队列，C1、C2为消费者。 整个流程分成三部分：第一，生产者生产消息，发送到中转站；第二，中转站按定义的规则转发消息到消息队列；第三，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://azrng.gitee.io/kbms/kbms/common/1609400243138-0d995cac-4498-4c03-a0a1-151e3a3dfdd0.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T14:28:50.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2021-05-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T14:28:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"RabbitMQ消息可靠性分析和应用\\",\\"image\\":[\\"https://azrng.gitee.io/kbms/kbms/common/1609400243138-0d995cac-4498-4c03-a0a1-151e3a3dfdd0.png\\",\\"https://azrng.gitee.io/kbms/kbms/common/1609400243132-e36d5f75-f697-4fd9-b953-dcac59c07e29.gif\\",\\"https://azrng.gitee.io/kbms/kbms/common/1609400243178-c3424240-5b6a-426c-94e7-7b07d4fc4c84.gif\\",\\"https://azrng.gitee.io/kbms/kbms/common/1609400243127-262fc79a-4c12-471c-82b3-d86fb77b6423.gif\\",\\"https://azrng.gitee.io/kbms/kbms/common/1609400243149-6462b212-d0c2-4784-81ad-03e214a3b676.gif\\",\\"https://azrng.gitee.io/kbms/kbms/common/1609400243134-9bedb472-37e4-4d09-8dc0-a05ea25323ca.gif\\",\\"https://azrng.gitee.io/kbms/kbms/common/1609400243137-574d78ca-f4ce-4962-9b04-2d693ec77c32.gif\\"],\\"datePublished\\":\\"2021-05-14T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-23T14:28:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[],"git":{"createdTime":1697724028000,"updatedTime":1721744930000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":5.44,"words":1631},"filePathRelative":"middleware/messageQueue/rabbitmq/kuozhan/rabbitmqxiaoxikekaoxingfenxiheyingyong.md","localizedDate":"2021年5月14日","excerpt":"<p><strong>RabbitMQ流程简介（带Exchange）</strong>\\n&nbsp; &nbsp; &nbsp; &nbsp;RabbitMQ使用一些机制来保证可靠性，如持久化、消费确认及发布确认等。\\n&nbsp; &nbsp; &nbsp; &nbsp;先看以下这个图：\\n<img src=\\"/common/1609400243138-0d995cac-4498-4c03-a0a1-151e3a3dfdd0.png\\" alt=\\"image.png\\" loading=\\"lazy\\">\\n&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;P为生产者，X为中转站（Exchange），红色部分为消息队列，C1、C2为消费者。\\n&nbsp; &nbsp; &nbsp; &nbsp;整个流程分成三部分：第一，生产者生产消息，发送到中转站；第二，中转站按定义的规则转发消息到消息队列；第三，消费者从消息队列获取消息进行消费（处理）。\\n<strong>RabbitMQ消息可靠性分析和应用</strong>\\n&nbsp; &nbsp; &nbsp; &nbsp;应用代码均使用C#客户端代码实现。\\n<strong>一、发布确认</strong>\\n&nbsp; &nbsp; &nbsp; &nbsp;生产者生产消息，发送到中转站的过程中，可能会因为网络丢包、网络故障等问题造成消息丢失。为了确保生产者发送的消息不会丢失，RabbitMQ提供了发布确认（Publisher Confirms）机制，从而提高消息的可靠性（注意：发布确认机制不能和事务机制一起使用）。\\n**&nbsp; &nbsp; &nbsp; &nbsp;单条消息发布确认：**\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;channel.ConfirmSelect();//发布确认机制\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; string message = \\"msg\\";\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; var body = Encoding.UTF8.GetBytes(message);\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;channel.BasicPublish(\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; exchange: \\"MarkTopicChange\\",\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; routingKey: \\"MarkRouteKey.one\\",\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; basicProperties: null,\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; body: body\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; );\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; bool isPublished = channel.WaitForConfirms();//通道（channel）里消息发送成功返回true\\n<img src=\\"/common/1609400243132-e36d5f75-f697-4fd9-b953-dcac59c07e29.gif\\" alt=\\"image.gif\\" loading=\\"lazy\\">\\n&nbsp;\\n&nbsp; &nbsp; &nbsp; &nbsp;使用channel.ConfirmSelect，一旦信道进入确认模式，所有在该信道上面发布的消息都会被指派一个唯一的ID（从1开始）。消息被投递到所有匹配的队列之后，RabbitMQ就会发送（Basic.Ack）给生产者（包含消息的唯一ID），生产者从而知道消息发送成功。\\n**&nbsp; &nbsp; &nbsp; &nbsp;多条消息发布确认：**\\n<img src=\\"/common/1609400243178-c3424240-5b6a-426c-94e7-7b07d4fc4c84.gif\\" alt=\\"image.gif\\" loading=\\"lazy\\">\\n&nbsp;&nbsp;channel.ConfirmSelect();//发布确认机制\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; foreach (var itemMsg in lstMsg)\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; byte[] sendBytes = Encoding.UTF8.GetBytes(itemMsg);\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //发布消息\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;channel.BasicPublish(\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; exchange: \\"MarkTopicChange\\",\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; routingKey: \\"MarkRouteKey.one\\",\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; basicProperties: null,\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; body: sendBytes\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; );\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; bool isAllPublished = channel.WaitForConfirms();//通道（channel）里所有消息均发送才返回true\\n<img src=\\"/common/1609400243127-262fc79a-4c12-471c-82b3-d86fb77b6423.gif\\" alt=\\"image.gif\\" loading=\\"lazy\\">\\n&nbsp; &nbsp;\\n&nbsp; &nbsp; &nbsp; &nbsp;注意：多消息发布确认机制情况下，倘若要发送100条消息，发送90条后，突然网络故障，后面的消息发送失败了，那么isAllPublished返回的是false，而前面90条消息已经发送到消息队列了。我们还不知道哪些消息是发送失败的，所以很多条消息发布确认，建议分几次发送或多通道发送。\\n&nbsp; &nbsp; &nbsp; &nbsp;此外，需要确保在中转站（Exchange）的消息可以顺利到达消息队列。\\n&nbsp; &nbsp; &nbsp; &nbsp;（1）首先需要定义匹配的Exchange和Queue，根据Exchange的类型和routingKey确定转发的关系。\\n&nbsp; &nbsp; &nbsp; &nbsp;（2）确保消息队列有足够内存存储消息。\\n&nbsp; &nbsp; &nbsp; &nbsp;RabbitMQ默认配置vm_memory_high_watermark为0.4。意思是控制消息占40%内存左右。vm_memory_high_watermark_paging_ratio为0.5，当消息占用内存超过50%，RabbitMQ会把消息转移到磁盘上以释放内存。当磁盘剩余空间小于阀值disk_free_limit（默认为50M），所有生产者阻塞，避免充满磁盘，导致所有的写操作失败。\\n&nbsp; &nbsp; &nbsp; &nbsp;RabbitMQ配置文件一般在%APPDATA%\\\\RabbitMQ\\\\rabbitmq.config.\\n&nbsp; &nbsp; &nbsp; &nbsp;%APPDATA% 一般为 C:\\\\Users%USERNAME%\\\\AppData\\\\Roaming（Windows环境）\\n<strong>二、持久化</strong>\\n&nbsp; &nbsp; &nbsp; &nbsp;消息存放到消息队列后，在不配置消息持久化的情况下，若服务器重启、关闭或宕机等，消息都会丢失。配置持久化可以有效提高消息的可靠性。持久化需要同时配置消息持久化和队列持久化。单配置消息持久化，队列消失了，消息没有地方存放；单配置队列持久化，队列还在，消息没了。\\n&nbsp; &nbsp; &nbsp; &nbsp;队列持久化在定义队列时候配置\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //定义队列\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;channel.QueueDeclare(\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; queue: \\"Mark_Queue\\", //队列名称\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; durable: true, //队列磁盘持久化 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; exclusive: false,//是否排他的，false。如果一个队列声明为排他队列，该队列首次声明它的连接可见，并在连接断开时自动删除\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; autoDelete: false,//是否自动删除，一般设成false\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; arguments: null\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; );\\n<img src=\\"/common/1609400243149-6462b212-d0c2-4784-81ad-03e214a3b676.gif\\" alt=\\"image.gif\\" loading=\\"lazy\\">\\n消息持久化在发布消息时候配置\\n<img src=\\"/common/1609400243134-9bedb472-37e4-4d09-8dc0-a05ea25323ca.gif\\" alt=\\"image.gif\\" loading=\\"lazy\\">\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //消息持久化，把DeliveryMode设成2\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; IBasicProperties properties = channel.CreateBasicProperties();\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; properties.DeliveryMode = 2;\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //发布消息\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;channel.BasicPublish(\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; exchange: \\"MarkTopicChange\\",\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; routingKey: \\"MarkRouteKey.one\\",\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; basicProperties: properties,\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; body: sendBytes\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; );\\n<img src=\\"/common/1609400243137-574d78ca-f4ce-4962-9b04-2d693ec77c32.gif\\" alt=\\"image.gif\\" loading=\\"lazy\\">\\n&nbsp; &nbsp; &nbsp; &nbsp;如何配置了事务机制或发布确认（publisher confirm）机制，服务端的返回Basic.Ack是在消息落盘之后执行的，进一步的提高了消息的可靠性。\\n&nbsp; &nbsp; &nbsp; &nbsp;为了防止磁盘损坏带来的消息丢失，可以配置镜像队列，这里不作介绍。\\n<strong>三、消费确认</strong>\\n&nbsp; &nbsp; &nbsp; &nbsp;为了确保消息被消费者消费，RabbitMQ提供消费确认模式（consumer Acknowledgements）。自动确认模式，当消费者<strong>成功接收到</strong>消息后，自动通知RabbitMQ，把消息队列中相应消息删除。这很大程度上满足不了我们，假如消费者接收到消息后，服务器宕机，消息还没处理完成，这样就会造成消息丢失。手动确认模式，当消费者<strong>成功处理完</strong>消息后，手动发消息通知RabbitMQ，把消息队列中相应消息删除。\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; consumer.Received += (model, ea) =&gt;\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; var body = ea.Body;\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; var message = Encoding.UTF8.GetString(body);\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; var routingKey = ea.RoutingKey;\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Console.WriteLine(\\" [x] Received '{0}':'{1}'\\",\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;routingKey,\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;message);\\n//确认该消息已被消费,发删除消息给RabbitMQ，把消息队列中的消息删除\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;channel.BasicAck(ea.DeliveryTag, false);\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //消费消息失败，拒绝此消息，重回队列，让它可以继续发送到其他消费者\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//channel.BasicReject(ea.DeliveryTag, true);\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //消费消息失败，拒绝多条消息，重回队列，让它们可以继续发送到其他消费者\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//channel.BasicNack(ea.DeliveryTag, true, true);\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; };\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //手动确认消息，把autoAck设成false\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;channel.BasicConsume(queue: \\"Mark_Queue\\",\\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;autoAck: false,\\n&nbsp; &nbsp; &nbsp; &nbsp;这里值得注意的是，消息处理完成后，一定要把处理完成的消息发送到RabbitMQ（channel.BasicAck(ea.DeliveryTag, false)），不然RabbitMQ会一直等待，从而造成内存泄露。若处理消息过程中发生异常，可以使用channel.BasicReject(ea.DeliveryTag, true)来拒绝此消息，让它重回队列。若RabbitMQ收不到消费者任何确认消息的信号（包括确认信号，拒绝信号灯），直到此消费者断开连接，消息才能重回队列，继续发送到其他消费者。\\n&nbsp; &nbsp; &nbsp; &nbsp;提醒一下，假如消费者消费消息的方法不支持并发（取决于需求），可以限制消费者每次只接收一条消息。\\nchannel.BasicQos(0, 1, false);</p>","autoDesc":true}`);export{k as comp,M as data};