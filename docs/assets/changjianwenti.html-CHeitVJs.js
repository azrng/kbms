import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as i,b as r}from"./app-HmxoaDfj.js";const a={},n=r("p",null,"1、如何防止消息重复消费 在生产方根据业务特点生成消息ID，例如：给用户添加因为下单而赠送积分的消息ID，就可以根据userid_orderid积分数量来生成唯一的消息ID。 通过该消息ID，消费端就可以把已经消费的消息ID存储到本地或者存储到redis中，如果消费端是多个消费者在并行进行消费，在判断重复消息的时候你会需要锁来保证同样数据的顺序化。",-1),o=[n];function d(c,p){return i(),t("div",null,o)}const s=e(a,[["render",d],["__file","changjianwenti.html.vue"]]),g=JSON.parse('{"path":"/middleware/xiaoxiduilie/changjianwenti.html","title":"常见问题","lang":"zh-CN","frontmatter":{"title":"常见问题","lang":"zh-CN","date":"2021-05-14T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["middleware"],"tag":["无"],"filename":"changjianwenti","slug":"lnx4uo","docsId":"44443756","description":"1、如何防止消息重复消费 在生产方根据业务特点生成消息ID，例如：给用户添加因为下单而赠送积分的消息ID，就可以根据userid_orderid积分数量来生成唯一的消息ID。 通过该消息ID，消费端就可以把已经消费的消息ID存储到本地或者存储到redis中，如果消费端是多个消费者在并行进行消费，在判断重复消息的时候你会需要锁来保证同样数据的顺序化。","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/middleware/xiaoxiduilie/changjianwenti.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"常见问题"}],["meta",{"property":"og:description","content":"1、如何防止消息重复消费 在生产方根据业务特点生成消息ID，例如：给用户添加因为下单而赠送积分的消息ID，就可以根据userid_orderid积分数量来生成唯一的消息ID。 通过该消息ID，消费端就可以把已经消费的消息ID存储到本地或者存储到redis中，如果消费端是多个消费者在并行进行消费，在判断重复消息的时候你会需要锁来保证同样数据的顺序化。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-19T14:00:28.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2021-05-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-19T14:00:28.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"常见问题\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-05-14T00:00:00.000Z\\",\\"dateModified\\":\\"2023-10-19T14:00:28.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[],"git":{"createdTime":1697724028000,"updatedTime":1697724028000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":0.57,"words":170},"filePathRelative":"middleware/xiaoxiduilie/changjianwenti.md","localizedDate":"2021年5月14日","excerpt":"<p>1、如何防止消息重复消费\\n在生产方根据业务特点生成消息ID，例如：给用户添加因为下单而赠送积分的消息ID，就可以根据userid_orderid积分数量来生成唯一的消息ID。\\n通过该消息ID，消费端就可以把已经消费的消息ID存储到本地或者存储到redis中，如果消费端是多个消费者在并行进行消费，在判断重复消息的时候你会需要锁来保证同样数据的顺序化。</p>\\n","autoDesc":true}');export{s as comp,g as data};