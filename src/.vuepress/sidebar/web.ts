
// 前端

export const webSidebar =
    [{
        text: "Web 基础",
        prefix: "/web/basics/",
        collapsible: true,
        children: [
            "http.md",
            "htmlgeshi.md",
            {
                text: "单个代码解析",
                prefix: "/web/basics/changedaimajiexi/",
                collapsible: true,
                children:
                    [
                        "url.md",
                        "liulanqiqingqiutou.md",
                        "sousuoyinqingjiqiao.md"
                    ]
            },
            "webscoket.md",
            "borwserduixiang.md",
            "freeApi.md",
            "spa.md",
            "sucaishouji.md",
            "release.md"
        ]
    },
    {
        text: "JavaScript",
        prefix: "/web/javascript/",
        collapsible: true,
        children: ["readme.md"]
    },
    {
        text: "jQuery",
        prefix: "/web/jquery/",
        collapsible: true,
        children: [
            "ajaxyibutongbu.md"
        ]
    },
    {
        text: "Layui",
        prefix: "/web/layui/",
        collapsible: true,
        children: ["shuiming.md"]
    },
    {
        text: "Vue",
        prefix: "/web/vue/",
        collapsible: true,
        children: [
            "shuiming.md",
            "changyongcaozuo.md"
        ]
    },
    {
        text: "Blazor",
        prefix: "/web/blazor/",
        collapsible: true,
        children: [
            "readme.md",
            {
                text: "基础操作",
                prefix: "/web/blazor/baseOperator/",
                collapsible: true,
                children: [
                    "getStarted.md",
                    "dataBind.md",
                    "navigaton.md",
                    "layout.md",
                    "form.md",
                    "chuancan.md",
                    "event.md",
                    "yuchengxian.md",
                    "configuration.md",
                    "jsOperator.md",
                    "lifeCycle.md",
                    "component.md",
                    "loginSample.md"
                ]
            },
            {
                text: "Nuget包",
                prefix: "/web/blazor/nugets/",
                collapsible: true,
                children: [
                    "openSourceComponent.md",
                    "markdig.md"
                ]
            },
            {
                text: "Ant Design Blazor",
                prefix: "/web/blazor/antDesignBlazor/",
                collapsible: true,
                children:
                    [
                        "readme.md",
                    ]
            },
            {
                text: "BootstrapBlazor",
                prefix: "/web/blazor/bootstrapBlazor/",
                collapsible: true,
                children:
                    [
                        "readme.md",
                    ]
            },
            {
                text: "MASABlazor",
                prefix: "/web/blazor/masablazor/",
                collapsible: true,
                children:
                    [
                        "readme.md",
                        "commonOperator.md",
                        {
                            text: "示例",
                            prefix: "/web/blazor/masablazor/sample/",
                            collapsible: true,
                            children: [
                                "layout.md"
                            ]
                        }]
            },
            "blazorise.md",
            "blazorspark.md",
            {
                text: "示例",
                prefix: "/web/blazor/sample/",
                collapsible: true,
                children:
                    [
                        "openSourceSample.md",
                        "browserExtension.md"
                    ]
            },
            {
                text: "部署",
                prefix: "/web/blazor/deploy/",
                collapsible: true,
                children:
                    [
                        "readme.md",
                        "issue.md"
                    ]
            }]
    },
    {
        text: "开发工具",
        prefix: "/web/tools/",
        collapsible: true,
        children: [
            {
                text: "NPM",
                prefix: "/web/tools/npm/",
                collapsible: true,
                children: [
                    "readme.md",
                    "pnpm.md",
                    {
                        text: "构建",
                        prefix: "/web/tools/npm/build/",
                        collapsible: true,
                        children: [
                            "script.md"
                        ]
                    }]
            },
            {
                text: "Node.js",
                prefix: "/web/tools/nodejs/",
                collapsible: true,
                children: [
                    "install.md"
                ]
            }
        ]
    }
];
