
// ai

export const aiSidebar = [
    "readme.md",
    {
        text: "模型与部署",
        prefix: "/ai/llm/",
        collapsible: true,
        children: [
            "readme.md",
            "modelGuide.md",
            "deploy.md",
        ]
    },
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
    {
        text: "编码智能体",
        prefix: "/ai/codingAgents/",
        collapsible: true,
        children: [
            "readme.md",
            "claudeCode.md",
            "codex.md",
            "terminalAgents.md",
        ]
    },
    {
        text: "生态（Skills 与 MCP）",
        prefix: "/ai/ecosystem/",
        collapsible: true,
        children: [
            "readme.md",
            "skills.md",
            "mcp.md",
        ]
    },
    {
        text: "应用工具",
        prefix: "/ai/apps/",
        collapsible: true,
        children: [
            "ragKbApps.md",
            "designTools.md",
            "promptTools.md",
        ]
    },
    "projects.md",
    "dotNetCall.md",
    "pythonCall.md",
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
