
// ai

export const aiSidebar = [
    "readme.md",
    "aiModel.md",
    {
        text: "提示词库",
        prefix: "/ai/prompts/",
        collapsible: true,
        children: [
            "readme.md",
            {
                text: "文本提示词",
                prefix: "text/",
                collapsible: true,
                children: [
                    "prompt-writing.md",
                    "coding-experts.md",
                    "content-creation.md",
                    "project-docs.md",
                    "lifestyle.md",
                    "fun.md",
                ]
            },
            {
                text: "图片提示词",
                prefix: "images/",
                collapsible: true,
                children: [
                    "id-photos.md",
                    "art-photos.md",
                    "posters.md",
                    "doraemon.md",
                ]
            },
        ]
    },
    "modeTools.md",
    "skills.md",
    "useMcp.md",
    "dotNetCall.md",
    "pythonCall.md",
    "aiProject.md",
    "sse-streaming-spec.md",
    {
        text: "Microsoft Agent Framework",
        prefix: "/ai/microsoftAgentFramework/",
        collapsible: true,
        children: [
            "readme.md",
            "gettingStarted.md",
            "coreConcepts.md",
            "agentProviders.md",
            "conversations.md",
            "functionTools.md",
            "workflows.md",
            "middleware.md",
            "memoryAndRag.md",
            "hosting.md",
            "advancedFeatures.md",
            "projectIntegration.md",
        ]
    },
];
