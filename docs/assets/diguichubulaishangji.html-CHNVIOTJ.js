import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as a,d as h}from"./app-CF6xeyXt.js";const k="/kbms/common/1614056556772-22cdd083-5810-4c43-b754-ea0487203a18.png",n={},t=h(`<p>场景描述：现在是做一个左边的树形菜单，根据用户角色找出来可以访问的模块页面，但是因为最外层那个地方添加角色授权的不能勾选，导致查询的时候出不来。 初识的查询思路是：首先根据用户找出来他的角色ID，然后根据授权表和模块表去查询用户可以访问的页面，然后根据查出来的东西进行递归成一个树形菜单。</p><div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" data-title="sql" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">SELECT</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_Id</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_ParentId</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">PltSystemId</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_EnCode</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_SortCode</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_FullName</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_Icon</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_UrlAddress</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_Target</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_IsMenu</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,F_AllowEdit,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_AllowDelete</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_EnabledMark</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_Description</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">c</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_ObjectId</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">  </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> plt_roleauthorize c LEFT </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> sys_module a </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">on</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> c</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_ItemId</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_Id</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">WHERE</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_DeleteMark</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> and</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_EnabledMark</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> and</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> c</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_ObjectId</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;{roleid}&#39;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>问题就是那个查询可以访问的页面这点，因为用户都没有这个授权，所以想查询用户可以访问的页面中肯定没有上次的菜单项，下面就肯定出不来了。但是正常的逻辑是有下层，那么肯定得让出来上层，所以现在的解决办法是在模块表中加入了一个新的字段F_RootPath <img src="`+k+`" alt="image.png" loading="lazy"> 这个字段存储的是这一个数据的id和他所有上级的id，通过，号隔开 我们可以通过下面的语句去修改</p><div class="language-sql line-numbers-mode" data-highlighter="shiki" data-ext="sql" data-title="sql" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">//</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">修改最外层的</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">UPDATE</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> sys_module </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">set</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> F_RootPath</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">F_Id </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> F_ParentId</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;0&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">//</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">修改其他层的，需要多运行几次，直到没有行改变为止</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">UPDATE</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> sys_module a</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> sys_module b</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">ON</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_ParentId</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">b</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_Id</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> and</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">  a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_RootPath</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> is</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> null</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">  and</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> b</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_RootPath</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> is not null</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">SET</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_RootPath</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">concat</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">( </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">b</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_RootPath</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;,&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> , </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_Id</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">查询语句也修改为：</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">SELECT</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_Id</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_ParentId</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">PltSystemId</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_EnCode</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_SortCode</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_FullName</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_Icon</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_UrlAddress</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_Target</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_IsMenu</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_AllowEdit</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_AllowDelete</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_EnabledMark</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_Description</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;2c7a384b-5c5c-4e37-bf7b-275c9204d475&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> F_ObjectId  </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> sys_module a</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">where</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> EXISTS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">SELECT</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> ia</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_RootPath</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> sys_roleauthorize c</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">INNER JOIN</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> sys_module ia </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">on</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> c</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_ItemId</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">ia</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_Id</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">WHERE</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">  ia</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_DeleteMark</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> and</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> ia</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_EnabledMark</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> and</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> c</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_ObjectId</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;2c7a384b-5c5c-4e37-bf7b-275c9204d475&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">and</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> FIND_IN_SET(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_Id</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">ia</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">F_RootPath</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">order by</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> F_SortCode </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">asc</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p></p>`,5),l=[t];function p(e,d){return a(),i("div",null,l)}const g=s(n,[["render",p],["__file","diguichubulaishangji.html.vue"]]),y=JSON.parse(`{"path":"/dataBase/mysql/yudaodewenti/diguichubulaishangji.html","title":"递归出不来上级","lang":"zh-CN","frontmatter":{"title":"递归出不来上级","lang":"zh-CN","date":"2023-09-03T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"category":["dataBase"],"tag":["无"],"filename":"diguichubulaishangji","slug":"rg9mbv","docsId":"31805030","description":"场景描述：现在是做一个左边的树形菜单，根据用户角色找出来可以访问的模块页面，但是因为最外层那个地方添加角色授权的不能勾选，导致查询的时候出不来。 初识的查询思路是：首先根据用户找出来他的角色ID，然后根据授权表和模块表去查询用户可以访问的页面，然后根据查出来的东西进行递归成一个树形菜单。 问题就是那个查询可以访问的页面这点，因为用户都没有这个授权，所以...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/dataBase/mysql/yudaodewenti/diguichubulaishangji.html"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"递归出不来上级"}],["meta",{"property":"og:description","content":"场景描述：现在是做一个左边的树形菜单，根据用户角色找出来可以访问的模块页面，但是因为最外层那个地方添加角色授权的不能勾选，导致查询的时候出不来。 初识的查询思路是：首先根据用户找出来他的角色ID，然后根据授权表和模块表去查询用户可以访问的页面，然后根据查出来的东西进行递归成一个树形菜单。 问题就是那个查询可以访问的页面这点，因为用户都没有这个授权，所以..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://azrng.gitee.io/kbms/kbms/common/1614056556772-22cdd083-5810-4c43-b754-ea0487203a18.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-23T15:53:24.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"无"}],["meta",{"property":"article:published_time","content":"2023-09-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-23T15:53:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"递归出不来上级\\",\\"image\\":[\\"https://azrng.gitee.io/kbms/kbms/common/1614056556772-22cdd083-5810-4c43-b754-ea0487203a18.png\\"],\\"datePublished\\":\\"2023-09-03T00:00:00.000Z\\",\\"dateModified\\":\\"2023-09-23T15:53:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[],"git":{"createdTime":1695484404000,"updatedTime":1695484404000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":1}]},"readingTime":{"minutes":1.62,"words":486},"filePathRelative":"dataBase/mysql/yudaodewenti/diguichubulaishangji.md","localizedDate":"2023年9月3日","excerpt":"<p>场景描述：现在是做一个左边的树形菜单，根据用户角色找出来可以访问的模块页面，但是因为最外层那个地方添加角色授权的不能勾选，导致查询的时候出不来。\\n初识的查询思路是：首先根据用户找出来他的角色ID，然后根据授权表和模块表去查询用户可以访问的页面，然后根据查出来的东西进行递归成一个树形菜单。</p>\\n<div class=\\"language-sql line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"sql\\" data-title=\\"sql\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">SELECT</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\"> a</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">F_Id</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">,</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">a</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">F_ParentId</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">,</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">a</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">PltSystemId</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">,</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">a</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">F_EnCode</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">,</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">a</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">F_SortCode</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">,</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">a</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">F_FullName</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">,</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">a</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">F_Icon</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">,</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">a</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">F_UrlAddress</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">,</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">a</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">F_Target</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">,</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">a</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">F_IsMenu</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">,F_AllowEdit,</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">a</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">F_AllowDelete</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">,</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">a</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">F_EnabledMark</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">,</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">a</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">F_Description</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">,</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">c</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">F_ObjectId</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">  </span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">from</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> plt_roleauthorize c LEFT </span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">JOIN</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> sys_module a </span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">on</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\"> c</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">F_ItemId</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">=</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">a</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">F_Id</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> </span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">WHERE</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\"> a</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">F_DeleteMark</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">=</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">0</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> and</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\"> a</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">F_EnabledMark</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">=</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">1</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> and</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\"> c</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">.</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\">F_ObjectId</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#56B6C2\\">=</span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">'{roleid}'</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{g as comp,y as data};