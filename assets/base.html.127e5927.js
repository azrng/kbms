import{_ as e,W as n,X as a,a0 as t}from"./framework.35562d63.js";const i={},r=t('<blockquote><p>最后编辑时间：2021年1月22日</p></blockquote><p>Jenkins 是一款流行的开源持续集成（CI）与持续部署（CD）工具，用于自动化各种任务，包括构建、测试和部署软件。</p><h2 id="构建任务" tabindex="-1"><a class="header-anchor" href="#构建任务" aria-hidden="true">#</a> 构建任务</h2><h3 id="流水线pipeline" tabindex="-1"><a class="header-anchor" href="#流水线pipeline" aria-hidden="true">#</a> 流水线Pipeline</h3><p>一套运行于Jenkins上的工作流框架，将原本独立运行于单个或者多个节点的任务连接起来，实现单个任务难以完成的<strong>复杂流程编排与可视化</strong>。</p><ul><li><em><strong>Stage</strong></em>: 阶段，一个Pipeline可以划分为若干个Stage，每个Stage代表一组操作。注意，Stage是一个逻辑分组的概念，可以跨多个Node。如上图所示，Build，Test和Deploy就是Stage，代表了三个不同的阶段：编译、测试和部署。</li><li><em><strong>Node</strong></em>: 节点，一个Node就是一个Jenkins节点，或者是Master，或者是Slave，是执行Step的具体运行期环境。</li><li><em><strong>Step</strong></em>: 步骤，Step是最基本的操作单元，小到创建一个目录，大到构建一个Docker镜像，由各类Jenkins Plugin提供。</li></ul><h2 id="部署服务" tabindex="-1"><a class="header-anchor" href="#部署服务" aria-hidden="true">#</a> 部署服务</h2><p>在Linux下，SSH服务默认会安装，而在Windows Server下，需要单独安装，可以借助FreeSSHD这个免费工具来实现。由于我的物理机都是Windows Server，物理机上的VM是Linux（Docker运行环境），所以需要给物理机配置FreeSSHD，用来实现从CI服务器发布Release到物理服务器中的VM。</p>',8),s=[r];function o(l,d){return n(),a("div",null,s)}const h=e(i,[["render",o],["__file","base.html.vue"]]);export{h as default};