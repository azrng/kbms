import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as a,d as e}from"./app-S-drW72G.js";const i={},l=e(`<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2><p>临时方法</p><h2 id="表情区域" tabindex="-1"><a class="header-anchor" href="#表情区域"><span>表情区域</span></a></h2><p>地址：https://theme-hope.vuejs.press/zh/cookbook/markdown/emoji/</p><p>👈 👍 👉</p><p>😄 😊</p><h2 id="临时代码" tabindex="-1"><a class="header-anchor" href="#临时代码"><span>临时代码</span></a></h2><p>有花堪折直须折，莫待无花空折枝</p><p>httpclient使用aot失败，可以在roots.xml中间中加入该内容</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>&lt;linker&gt;</span></span>
<span class="line"><span> &lt;assembly fullname=&quot;System.Net.Http&quot; preserve=&quot;All&quot; /&gt;</span></span>
<span class="line"><span>&lt;/linker&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>datagrid：https://www.nequalsonelifestyle.com/2019/06/13/avalonia-datagrid-getting-started/</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>5.一些控件:https://github.com/Splitwirez/Mechanism-for-Avalonia</span></span>
<span class="line"><span></span></span>
<span class="line"><span>6. ribbon:https://github.com/amazerol/AvaloniaRibbon</span></span>
<span class="line"><span></span></span>
<span class="line"><span>              https://github.com/Splitwirez/AvaloniaRibbon</span></span>
<span class="line"><span></span></span>
<span class="line"><span>7.主题编辑器：https://github.com/wieslawsoltes/ThemeEditor</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>9.样式资源使用：https://habr.com/en/post/471342/</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>看这个：https://avaloniaui.net/docs/styles  以及https://avaloniaui.net/docs/quickstart/assets 注意区分。</span></span>
<span class="line"><span>Styles节点后面的路径。</span></span>
<span class="line"><span>avares是引用资源的方法，另外还有resm。 resm需要作为清单嵌入的方式，由编译器完成。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Source=&quot;avares://Avalonia.Themes.Default/DefaultTheme.xaml&quot;表明以avares查找程序集Avalonia.Themes.Default.dll中名称为DefaultTheme.xaml的样式集文件。如果程序集中有路径，则可能是这样的：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Source=&quot;avares://Avalonia.Themes.Default/Styles/DefaultTheme.xaml&quot;,说明放在Styles目录里面。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>resm的方式是放在程序集集资源清单中的资源，例如:&lt;Image Source=&quot;resm:MyApp.Assets.icon.png&quot;/&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>public async void SelectFolderAsync()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    var dialog = new OpenFolderDialog()</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        Title = &quot;Select Folder...&quot;,</span></span>
<span class="line"><span>        InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile)</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    var result = await dialog.ShowAsync(Application.Current.MainWindow);</span></span>
<span class="line"><span>    if (result == null)</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        ClickStatusUpdate = &quot;User canceled request&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        ClickStatusUpdate = $&quot;User Selected: {result}&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>avalonia无线滚动：https://www.nequalsonelifestyle.com/2019/11/06/avalonia-infinite-scroll-tutorial/</p><p>如果进界面的时候想先选择配置，那么可以参考这里的弹框：https://www.cnblogs.com/raok/p/17566752.html</p><p>删除无效镜像</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>sudo docker rmi -f $(sudo docker images -f &quot;dangling=true&quot; -q)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>https://www.cnblogs.com/CoderLinkf/p/12408589.html</p><p>日文的ci配置</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>#构建步骤，先执行build，然后执行deploy</span></span>
<span class="line"><span>stages:  </span></span>
<span class="line"><span>  - build</span></span>
<span class="line"><span>  - deploy</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#设置全局的环境变量，所有的stage中都可以引用这里面的变量</span></span>
<span class="line"><span>variables:</span></span>
<span class="line"><span>  #docker 镜像地址，由Docker镜像仓库地址(CI_REGISTRY_REPOSITORY)+项目地址(CI_PROJECT_PATH_SLUG)+项目分支(CI_COMMIT_REF_SLUG):镜像版本号(CI_PIPELINE_IID)</span></span>
<span class="line"><span>  CI_APPLICATION_REPOSITORY: &quot;$CI_REGISTRY_REPOSITORY/$CI_PROJECT_PATH_SLUG-$CI_COMMIT_REF_SLUG:$CI_PIPELINE_IID&quot;</span></span>
<span class="line"><span>  #docker容器名称,项目地址+版本号</span></span>
<span class="line"><span>  CI_CONTAINER_NAME: &quot;$CI_PROJECT_PATH_SLUG-$CI_COMMIT_REF_SLUG&quot;</span></span>
<span class="line"><span>  #k8s命名空间 项目地址+项目id</span></span>
<span class="line"><span>  CI_NAMESPACE: &quot;$CI_PROJECT_PATH_SLUG-$CI_PROJECT_ID&quot;</span></span>
<span class="line"><span>  # ingress访问地址 项目地址+分支+项目id+你的二级域名(我这里写死了&quot;mynetcore.com&quot;，可以配置到ci环境变量中)</span></span>
<span class="line"><span>  CI_HOST: &quot;$CI_PROJECT_PATH_SLUG-$CI_COMMIT_REF_SLUG-$CI_PROJECT_ID.mynetcore.com&quot;</span></span>
<span class="line"><span>  # k8s镜像拉取密钥,用于访问你的私人镜像仓库</span></span>
<span class="line"><span>  secret_name: &quot;gitlab-secret&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#构建镜像，并上传至镜像仓库</span></span>
<span class="line"><span>build-job:       </span></span>
<span class="line"><span> #表示用最在最新的docker容器中运行服务</span></span>
<span class="line"><span>  image: docker:latest </span></span>
<span class="line"><span>  #对应上面Stages中的build步骤</span></span>
<span class="line"><span>  stage: build   </span></span>
<span class="line"><span>  services:</span></span>
<span class="line"><span>   #在容器中再起一个docker:dind容器，后面的script命令会在该容器内运行</span></span>
<span class="line"><span>    - docker:dind  </span></span>
<span class="line"><span>  before_script:</span></span>
<span class="line"><span>     #登录我们自己的镜像服务</span></span>
<span class="line"><span>    - docker login -u &quot;$CI_REGISTRY_USER&quot; -p &quot;$CI_REGISTRY_PASSWORD&quot; $CI_REGISTRY</span></span>
<span class="line"><span>  script:</span></span>
<span class="line"><span>    - |</span></span>
<span class="line"><span>    #打印所有的环境变量，用于调试</span></span>
<span class="line"><span>    - env</span></span>
<span class="line"><span>    # 构建镜像</span></span>
<span class="line"><span>    - docker build --pull -t &quot;$CI_APPLICATION_REPOSITORY&quot; .</span></span>
<span class="line"><span>    # 推送镜像至仓库</span></span>
<span class="line"><span>    - docker push $CI_APPLICATION_REPOSITORY</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>#部署项目到k8s集群</span></span>
<span class="line"><span>deploy-job:      </span></span>
<span class="line"><span>  stage: deploy</span></span>
<span class="line"><span>  environment: production</span></span>
<span class="line"><span>  image: docker:stable</span></span>
<span class="line"><span>  script:</span></span>
<span class="line"><span>    - env</span></span>
<span class="line"><span>    - install_dependence</span></span>
<span class="line"><span>    - install_kubectl</span></span>
<span class="line"><span>    - kubectl_publish</span></span>
<span class="line"><span>    - publish_finish</span></span>
<span class="line"><span>  tags:</span></span>
<span class="line"><span>  #这个就表示用我们自己的gitlab-runner执行了，&quot;deploy&quot;就是在注册gitlabrunner中填写的tag值。上面的build步骤没有写tag，他会用官方提供的一个默认runner执行(有使用时长限制)</span></span>
<span class="line"><span>    - deploy</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>.function: &amp;function |</span></span>
<span class="line"><span>  #这一步初始化一下容器的环境，更新apk包，安装基础的一些软件</span></span>
<span class="line"><span>  function install_dependence() {</span></span>
<span class="line"><span>    echo -e &#39;https://mirrors.aliyun.com/alpine/v3.6/main/\\nhttps://mirrors.aliyun.com/alpine/v3.6/community/&#39; &gt; /etc/apk/repositories</span></span>
<span class="line"><span>    apk update</span></span>
<span class="line"><span>    apk add -U openssl curl tar gzip bash ca-certificates git gettext</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  #安装kubectl命令工具</span></span>
<span class="line"><span>  function install_kubectl() {</span></span>
<span class="line"><span>    #下载kubectl</span></span>
<span class="line"><span>    curl -LO &quot;https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl&quot;</span></span>
<span class="line"><span>    #给kubectl赋执行权限</span></span>
<span class="line"><span>    chmod +x ./kubectl &amp;&amp; mv ./kubectl /usr/local/bin/kubectl</span></span>
<span class="line"><span>    #创建kubectl 的执行密钥文件夹，然后将kubectl的config配置文件下载到~/.kube/config。$CI_KUBE_CONFIG_URL 这个是我开了一个内网服务用于下载kubeconfig</span></span>
<span class="line"><span>    mkdir ~/.kube &amp;&amp; curl -o ~/.kube/config $CI_KUBE_CONFIG_URL</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # 部署yaml</span></span>
<span class="line"><span>  function kubectl_publish(){</span></span>
<span class="line"><span>   #首先创建命名空间（检测命名空间是否存在，不存在则创建）</span></span>
<span class="line"><span>    kubectl describe namespace &quot;$CI_NAMESPACE&quot; || kubectl create namespace &quot;$CI_NAMESPACE&quot;</span></span>
<span class="line"><span>    # 创建 docker镜像的访问密钥，( 检测密钥是否存在，不存在则创建&quot;kubectl create secret....&quot;。最后后将密钥更新到当前项目的命名空间&quot;kubectl apply ...&quot;)</span></span>
<span class="line"><span>    kubectl describe secret $secret_name || kubectl create secret -n &quot;$CI_NAMESPACE&quot;  docker-registry $secret_name --docker-server=$CI_REGISTRY --docker-username=$CI_REGISTRY_USER --docker-password=$CI_REGISTRY_PASSWORD  -o yaml --dry-run=client  | kubectl apply -n $CI_NAMESPACE -f -</span></span>
<span class="line"><span>    # 将环境变量写入到yaml文件中，然后删除掉yaml中上次部署的资源</span></span>
<span class="line"><span>    envsubst &lt; kube.yaml | kubectl delete -n $CI_NAMESPACE -f - || echo &quot;don&#39;t need delete&quot;</span></span>
<span class="line"><span>    # 将环境变量写入到yaml文件中，然后部署</span></span>
<span class="line"><span>    envsubst &lt; kube.yaml | kubectl apply -n $CI_NAMESPACE -f -</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  #部署完成，输出一下</span></span>
<span class="line"><span>  function publish_finish(){</span></span>
<span class="line"><span>    echo &quot;visit url is http://$CI_HOST&quot;</span></span>
<span class="line"><span>    echo &quot;Application successfully deployed.&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>#这个是整个ci最先执行的语句，里面可以预定义函数和变量等</span></span>
<span class="line"><span>before_script:</span></span>
<span class="line"><span> #执行上面的 .function: &amp;function</span></span>
<span class="line"><span>  - *function</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>kube.yaml</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>apiVersion: apps/v1</span></span>
<span class="line"><span>kind: Deployment</span></span>
<span class="line"><span>metadata:</span></span>
<span class="line"><span>  name: $CI_CONTAINER_NAME</span></span>
<span class="line"><span>spec:</span></span>
<span class="line"><span>  replicas: 1</span></span>
<span class="line"><span>  selector:</span></span>
<span class="line"><span>    matchLabels:</span></span>
<span class="line"><span>      app: $CI_CONTAINER_NAME</span></span>
<span class="line"><span>  template:</span></span>
<span class="line"><span>    metadata:</span></span>
<span class="line"><span>      labels:</span></span>
<span class="line"><span>        app: $CI_CONTAINER_NAME</span></span>
<span class="line"><span>    spec:</span></span>
<span class="line"><span>      containers:</span></span>
<span class="line"><span>        - name: $CI_CONTAINER_NAME</span></span>
<span class="line"><span>          image: $CI_APPLICATION_REPOSITORY</span></span>
<span class="line"><span>          ports:</span></span>
<span class="line"><span>            - containerPort: 5000</span></span>
<span class="line"><span>      imagePullSecrets:</span></span>
<span class="line"><span>        - name: $secret_name</span></span>
<span class="line"><span>---</span></span>
<span class="line"><span>apiVersion: v1</span></span>
<span class="line"><span>kind: Service</span></span>
<span class="line"><span>metadata:</span></span>
<span class="line"><span> name: $CI_CONTAINER_NAME</span></span>
<span class="line"><span>spec:</span></span>
<span class="line"><span>  type: NodePort</span></span>
<span class="line"><span>  ports:</span></span>
<span class="line"><span>    - port: 5000</span></span>
<span class="line"><span>      targetPort: 5000</span></span>
<span class="line"><span>  selector:</span></span>
<span class="line"><span>    app: $CI_CONTAINER_NAME</span></span>
<span class="line"><span>---</span></span>
<span class="line"><span>apiVersion: networking.k8s.io/v1</span></span>
<span class="line"><span>kind: Ingress</span></span>
<span class="line"><span>metadata:</span></span>
<span class="line"><span>  name: ingress-$CI_CONTAINER_NAME</span></span>
<span class="line"><span>spec:</span></span>
<span class="line"><span>  rules:</span></span>
<span class="line"><span>  - host: $CI_HOST</span></span>
<span class="line"><span>    http:</span></span>
<span class="line"><span>      paths:</span></span>
<span class="line"><span>      - pathType: Prefix</span></span>
<span class="line"><span>        path: /</span></span>
<span class="line"><span>        backend:</span></span>
<span class="line"><span>          service:</span></span>
<span class="line"><span>            name: $CI_CONTAINER_NAME </span></span>
<span class="line"><span>            port:</span></span>
<span class="line"><span>              number: 5000</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="通用" tabindex="-1"><a class="header-anchor" href="#通用"><span>通用</span></a></h2><p>使用 dotnet-monitor + prometheus + grafana 进行诊断：https://dev.to/rafaelpadovezi/diagnosticos-usando-dotnet-monitor-prometheus-grafana-3n7o</p><p>.Net Task揭秘：https://www.cnblogs.com/eventhorizon/p/15912383.html 需要看完</p><p>ThreadPool：https://dev.to/theramoliya/understanding-threadpool-in-c-203n</p><p>线程池实现：https://www.cnblogs.com/eventhorizon/p/15316955.html</p><p>深入了解垃圾回收：https://mp.weixin.qq.com/s/qlfbDk6lFqLRJKs0hOXvOQ</p><p>rx中文版：https://github.com/MarsonShine/Books/blob/master/RxNet/docs/gettting-started.md</p><p>https://github.com/Cysharp/R3</p><p>读书笔记：https://marsonshine.github.io/Books/ 看到编写高性能.Net代码</p><p>读书笔记仓库地址：https://github.com/MarsonShine/Books</p><p>软考刷题：软考通</p><p>https://gitee.com/zaonai/projects：备考资料</p><p>https://mp.weixin.qq.com/s/W3IiIYfVizMP23rft90_qA：软件License授权原理</p><p>YuebonCore：一款基于.NET8的权限管理及快速开发框架（前后端分离）：https://mp.weixin.qq.com/s/6qMBBE-v4rD3_WZGkSVvRQ</p><p>错误、异常全收集,地表最强追踪平台：https://mp.weixin.qq.com/s/NlXROYuuxUf1pJy7WCbxGw</p><p>简化ASP.NET Core API神器：用Gridify轻松实现过滤、排序和分页：https://mp.weixin.qq.com/s/Qpk-AESj95ZLVTfpLSwvfw</p><p>使用 Alba 对 AspnetCore项目进行测试：https://mp.weixin.qq.com/s/wAWvV6tfw29lCEoX2j6tdg</p><p>易魔声：配音https://www.123pan.com/s/GaNFjv-WvKSv.html 提取码:52pj</p><p>Ironpython不如pythonnet，对</p><p>C# 中如何计算一个实例占用多少内存？代码事例+解决办法：https://mp.weixin.qq.com/s/acg-gQpfbhh4B1-aIYA8KQ</p><p>使用C#爬取快手作者主页，并下载视频/图集(附源码及软件下载链接)https://www.cnblogs.com/hupo376787/p/18378511文章介绍了作者通过自写工具爬取快手数据的全过程，包括如何获取作者UID和Cookie，如何使用Postman拦截请求并生成C#代码，以及使用WPF编写界面和下载逻辑。</p><p>https://mp.weixin.qq.com/s/HSjmw-vXZ-EUEKHhzOFsHg：增加一个或者系统信息的方法</p><p>Scriban：高效、强大的.NET开源模板引擎，可用于邮件、文档生成！：https://mp.weixin.qq.com/s/EFffjFQx8B6Pv2WzCzIt8g</p><p>https://mp.weixin.qq.com/s/48lRcpI95lXTfn_Ec0sKZw：.NET微服务下认证授权框架的探讨</p><p>.NET9让指标更纯正：https://mp.weixin.qq.com/s/fw9rWMMraFp0Fcg4_PboFQ</p><p>.NET 8 + Vue 3 极简 RABC 权限管理系统https://www.cnblogs.com/1312mn/p/18363061这篇文章介绍了基于 .NET 8 和 Vue 3 的极简 RABC 权限管理系统。后端采用改良的 ABP 框架和 SqlSugar，提高效率，前端使用 vue-pure-admin 和 vxe-table，提升用户体验。系统包含15种核心功能，适合初学者和需要快速搭建后台管理系统的开发者。文章详细描述了项目结构、设计思路和项目地址</p><p>有微软账户的话，免费的 Visual Studio Essential 是包含永久的 Azure DevOps Services 的</p><h2 id="微服务" tabindex="-1"><a class="header-anchor" href="#微服务"><span>微服务</span></a></h2><h3 id="docker" tabindex="-1"><a class="header-anchor" href="#docker"><span>docker</span></a></h3><p>dockerfile的多阶段生成：https://learn.microsoft.com/zh-cn/dotnet/architecture/microservices/docker-application-development-process/docker-app-development-workflow#multi-stage-builds-in-dockerfile</p><h3 id="k8s" tabindex="-1"><a class="header-anchor" href="#k8s"><span>k8s</span></a></h3><p>概念内容文档：https://learn.microsoft.com/zh-cn/dotnet/architecture/microservices/docker-application-development-process/docker-app-development-workflow#multi-stage-builds-in-dockerfile</p><h2 id="maui" tabindex="-1"><a class="header-anchor" href="#maui"><span>Maui</span></a></h2><p>多平台流媒体播放：https://www.bilibili.com/video/BV1Pz421Q7uU/?vd_source=0a3cc07b87a63e3c53d4132b6ce1a83c</p><h2 id="面试题" tabindex="-1"><a class="header-anchor" href="#面试题"><span>面试题</span></a></h2><p>金三银四面试：C#.NET中高级面试题汇总：https://mp.weixin.qq.com/s/Dd5UBECyGav4Iks_dO2fmA</p><p>.NET工程师20K简历长啥样？：https://mp.weixin.qq.com/s/nhwVrV9iF2dlE3NcLeJrhw</p><p>https://mp.weixin.qq.com/s/yWLgpwKb9R_HhJKpYeDjGw | 金三银四面试：万字C#.NET笔试题高级进阶汇总篇</p><h2 id="知识库" tabindex="-1"><a class="header-anchor" href="#知识库"><span>知识库</span></a></h2><p>https://chat.token-ai.cn/chat/share-chat?id=af4da349d3a449709278e0bab4a5a2ec Avalonia 知识库</p><p>https://chat.token-ai.cn/chat/share-chat?id=939b3ad2f853422db0d781bcb19a8bf1 Masa知识库</p><h2 id="医保" tabindex="-1"><a class="header-anchor" href="#医保"><span>医保</span></a></h2><p>医保报销是什么？门诊那些只是用医保里面自己的钱</p><h2 id="github" tabindex="-1"><a class="header-anchor" href="#github"><span>Github</span></a></h2><p>使用github 流水线编译：https://www.bilibili.com/video/BV11e411i7Xx/?vd_source=0a3cc07b87a63e3c53d4132b6ce1a83c</p><h2 id="工具箱" tabindex="-1"><a class="header-anchor" href="#工具箱"><span>工具箱</span></a></h2><p>https://github.com/QiBowen2008/SuperTextToolBox</p><h2 id="硬件结合" tabindex="-1"><a class="header-anchor" href="#硬件结合"><span>硬件结合</span></a></h2><p>https://mp.weixin.qq.com/s/tbf6XP6QXwlPjnjpYvX-Gw | Homekit.Net 1.0.0发布：.NET原生SDK，助力打造私人智能家居新体验</p><h2 id="爬图" tabindex="-1"><a class="header-anchor" href="#爬图"><span>爬图</span></a></h2><p>https://mp.weixin.qq.com/s/gTPlq6WnS85ZUiHkTEO5wA | c#爬虫-1688官网自动以图搜图</p><h2 id="大模型" tabindex="-1"><a class="header-anchor" href="#大模型"><span>大模型</span></a></h2><p>最全中文sk教程：https://mp.weixin.qq.com/s/OSlwebdJX0yq_c8-jTMQpg?poc_token=HDEKEGajkeySY97I3lZVBhvETHtwJzqnHbRISX20</p><p>https://mp.weixin.qq.com/s/OSlwebdJX0yq_c8-jTMQpg | 这可能是目前最全的中文Semantic Kernel入门教程，呕心沥血，万字长文！！</p><p>清华 ChatGLM-6B 中文对话模型部署简易教程:https://blog.csdn.net/qq_43475750/article/details/129665389</p><p>PandoraNext</p><p>离线AI聊天清华大模型(ChatGLM3)本地搭建：https://mp.weixin.qq.com/s/UrJZCzuaxDyHwRrbPgnpdg</p><p>无需GPU，一键搭建本地大语言模型(LLM)服务，提供 OpenAI 接口 | 附 C#/Python 代码：https://mp.weixin.qq.com/s/X0ch-47lkTV1KFb7wMLs2w</p><p>chatgpt平替：claude</p><p>LLamaSharp：https://mp.weixin.qq.com/s/f6hHwEQ-wDWe1qlDTiR3aQ</p><p>仓库地址：https://github.com/SciSharp/LLamaSharp</p><p>.NET 8 开源项目 智能AI知识库：https://mp.weixin.qq.com/s/Jec7SKRJxJCsnTKiFQBeig</p><h2 id="机器学习" tabindex="-1"><a class="header-anchor" href="#机器学习"><span>机器学习</span></a></h2><p>https://mp.weixin.qq.com/s/6_JxN6sFt2GMuAw4LYRHUQ：C# 也能做机器学习？</p><p>ETL.NET 助力海量数据轻松处理：https://mp.weixin.qq.com/s/bNvnSqCjkkyjUEAW80o7qQ</p><h2 id="生产系统" tabindex="-1"><a class="header-anchor" href="#生产系统"><span>生产系统</span></a></h2><p>访客系统：https://mp.weixin.qq.com/s/D15GTs09J8cHUEWTgQksIw</p><h2 id="未知分类" tabindex="-1"><a class="header-anchor" href="#未知分类"><span>未知分类</span></a></h2><p>https://mp.weixin.qq.com/s/fk8YFa7C_31B_BY2ogkAyg | 实现简单的自动部署</p><p>https://mp.weixin.qq.com/s/gC_FZGSQ1wcDpX2x9ARYZA | 一款开源跨平台的图形化路由追踪工具 OpenTrace</p><p>https://mp.weixin.qq.com/s/Op_PeDAoiwYxZsnBItujUQ | 如何使用Chrome浏览器做前端页面性能分析</p><p>Apache Arrow 是一个用于内存分析的开发平台。它包含一个 使大数据系统能够处理和移动数据的一组技术快。</p><p>https://arrow.apache.org/docs/format/ADBC.html | ADBC： Arrow Database Connectivity — Apache Arrow v13.0.0</p><p>Nix 是一个功能强大的开源软件包管理器和操作系统部署工具，主要用于构建、配置和管理软件环境</p><p>https://nixos.org/ | Nix &amp; NixOS |可重现的构建和部署 声明式生成和部署</p><h2 id="免责声明" tabindex="-1"><a class="header-anchor" href="#免责声明"><span>免责声明</span></a></h2><p>免责声明</p><ol><li>网站内容</li></ol><p>本博客网站所提供的所有信息，包括但不限于文本、图片、视频、音频、软件、代码、文档等，均为一般信息目的而提供。我们尽最大努力确保信息的准确性，但并不保证其完整性、正确性、及时性或适用性。读者在使用此类信息时应自行判断其准确性和可靠性，并承担因此产生的全部责任。</p><ol start="2"><li>第三方链接</li></ol><p>本网站可能包含指向第三方网站的链接。这些链接仅供方便起见，我们并未对这些网站进行审核，也不对其内容负责。使用这些链接及其内容的风险由用户自行承担。</p><ol start="3"><li>版权与许可</li></ol><p>本网站上的所有原创内容均受版权法的保护。未经明确许可，禁止复制、转载、分发、修改或以任何方式使用本网站上的内容。如需使用，请联系我们获取许可。</p><ol start="4"><li>法律责任</li></ol><p>在任何情况下，本网站及其所有者、运营者、编辑、作者、代理人和任何相关方均不对任何直接、间接、附带、特殊、偶然或惩罚性损失承担责任，包括但不限于利润损失、业务中断、数据丢失或其他经济损失，无论这些损失是否由于使用或无法使用本网站的信息所致，或因违反合同、疏忽或其他行为所致。</p><ol start="5"><li>修改</li></ol><p>我们保留随时修改或更新本免责声明的权利，且无需另行通知。因此，用户应定期检查本页面以获取最新的免责声明。继续使用本网站即表示接受这些修改。</p><ol start="6"><li>法律适用与管辖</li></ol><p>本免责声明及其解释和执行均受适用的法律法规管辖。如果本免责声明中的任何条款被裁定为无效或不可执行，该条款应被视为可分离的，且其无效或不可执行不影响其他条款的有效性和可执行性。</p><p>通过访问和使用本博客网站，你表示已阅读、理解并同意遵守上述免责声明的所有条款。</p>`,112),p=[l];function t(c,d){return a(),n("div",null,p)}const v=s(i,[["render",t],["__file","index.html.vue"]]),u=JSON.parse('{"path":"/temp/","title":"说明","lang":"zh-CN","frontmatter":{"title":"说明","lang":"zh-CN","date":"2023-09-02T00:00:00.000Z","publish":true,"author":"azrng","isOriginal":true,"tag":["temp"],"description":"概述 临时方法 表情区域 地址：https://theme-hope.vuejs.press/zh/cookbook/markdown/emoji/ 👈 👍 👉 😄 😊 临时代码 有花堪折直须折，莫待无花空折枝 httpclient使用aot失败，可以在roots.xml中间中加入该内容 datagrid：https://www.nequal...","head":[["meta",{"property":"og:url","content":"https://azrng.gitee.io/kbms/kbms/temp/"}],["meta",{"property":"og:site_name","content":"知识库"}],["meta",{"property":"og:title","content":"说明"}],["meta",{"property":"og:description","content":"概述 临时方法 表情区域 地址：https://theme-hope.vuejs.press/zh/cookbook/markdown/emoji/ 👈 👍 👉 😄 😊 临时代码 有花堪折直须折，莫待无花空折枝 httpclient使用aot失败，可以在roots.xml中间中加入该内容 datagrid：https://www.nequal..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-09-08T15:49:37.000Z"}],["meta",{"property":"article:author","content":"azrng"}],["meta",{"property":"article:tag","content":"temp"}],["meta",{"property":"article:published_time","content":"2023-09-02T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-09-08T15:49:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"说明\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-09-02T00:00:00.000Z\\",\\"dateModified\\":\\"2024-09-08T15:49:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"azrng\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"表情区域","slug":"表情区域","link":"#表情区域","children":[]},{"level":2,"title":"临时代码","slug":"临时代码","link":"#临时代码","children":[]},{"level":2,"title":"通用","slug":"通用","link":"#通用","children":[]},{"level":2,"title":"微服务","slug":"微服务","link":"#微服务","children":[{"level":3,"title":"docker","slug":"docker","link":"#docker","children":[]},{"level":3,"title":"k8s","slug":"k8s","link":"#k8s","children":[]}]},{"level":2,"title":"Maui","slug":"maui","link":"#maui","children":[]},{"level":2,"title":"面试题","slug":"面试题","link":"#面试题","children":[]},{"level":2,"title":"知识库","slug":"知识库","link":"#知识库","children":[]},{"level":2,"title":"医保","slug":"医保","link":"#医保","children":[]},{"level":2,"title":"Github","slug":"github","link":"#github","children":[]},{"level":2,"title":"工具箱","slug":"工具箱","link":"#工具箱","children":[]},{"level":2,"title":"硬件结合","slug":"硬件结合","link":"#硬件结合","children":[]},{"level":2,"title":"爬图","slug":"爬图","link":"#爬图","children":[]},{"level":2,"title":"大模型","slug":"大模型","link":"#大模型","children":[]},{"level":2,"title":"机器学习","slug":"机器学习","link":"#机器学习","children":[]},{"level":2,"title":"生产系统","slug":"生产系统","link":"#生产系统","children":[]},{"level":2,"title":"未知分类","slug":"未知分类","link":"#未知分类","children":[]},{"level":2,"title":"免责声明","slug":"免责声明","link":"#免责声明","children":[]}],"git":{"createdTime":1698997010000,"updatedTime":1725810577000,"contributors":[{"name":"azrng","email":"itzhangyunpeng@163.com","commits":134},{"name":"zhangyunpeng","email":"zhang.yunpeng@synyi.com","commits":127}]},"readingTime":{"minutes":9.54,"words":2861},"filePathRelative":"temp/readme.md","localizedDate":"2023年9月2日","excerpt":"<h2>概述</h2>\\n<p>临时方法</p>\\n<h2>表情区域</h2>\\n<p>地址：https://theme-hope.vuejs.press/zh/cookbook/markdown/emoji/</p>\\n<p>👈    👍    👉</p>\\n<p>😄 😊</p>\\n<h2>临时代码</h2>\\n<p>有花堪折直须折，莫待无花空折枝</p>\\n<p>httpclient使用aot失败，可以在roots.xml中间中加入该内容</p>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>&lt;linker&gt;</span></span>\\n<span class=\\"line\\"><span> &lt;assembly fullname=\\"System.Net.Http\\" preserve=\\"All\\" /&gt;</span></span>\\n<span class=\\"line\\"><span>&lt;/linker&gt;</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{v as comp,u as data};