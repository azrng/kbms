
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
            "lifePrompt.md",
            "workPrompt.md",
        ]
    },
    "modeTools.md",
    "skills.md",
    "useMcp.md",
    "dotNetCall.md",
    "pythonCall.md",
    "aiProject.md",
    "sse-streaming-spec.md",
    "harness-engineering.md",
    "sddSpecDrivenDevelopment.md",
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
            "evaluationAndObservability.md",
            "realWorldCases.md",
            "projectIntegration.md",
        ]
    },
];
