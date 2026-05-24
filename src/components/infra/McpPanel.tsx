import { Panel } from "./Panel";
import { Mono } from "./Mono";
import { StatusDot } from "./StatusDot";

interface McpEntry {
    id: string;
    name: string;
    transport: "stdio" | "http" | "sse";
    tools: number;
    purpose: string;
    clients: number;
    repo?: string;
}

const ENTRIES: McpEntry[] = [
    { id: "network", name: "network", transport: "stdio", tools: 6, purpose: "Declarative NPM config — list, diff, apply via JSON", clients: 2, repo: "akash-aman/network" },
    { id: "wpx", name: "wpx", transport: "stdio", tools: 22, purpose: "Native WordPress devenv — sites, plugins, db, logs", clients: 1, repo: "akash-aman/wpx" },
    { id: "postman", name: "postman", transport: "http", tools: 8, purpose: "Workspace + collection orchestration over Postman API", clients: 1 },
    { id: "github", name: "github", transport: "http", tools: 14, purpose: "PR review, issue triage, release notes generation", clients: 3 },
];

const TRANSPORT_TONE = {
    stdio: "infra-pill--purple",
    http: "infra-pill--blue",
    sse: "infra-pill--magenta",
} as const;

export function McpPanel() {
    return (
        <Panel
            header="MCP Servers"
            eyebrow="agent fleet"
            right={<span className="mono text-[0.7rem] opacity-50">{ENTRIES.length} active · {ENTRIES.reduce((a, b) => a + b.tools, 0)} tools</span>}
        >
            <ul className="grid gap-2.5">
                {ENTRIES.map((e) => (
                    <li key={e.id} className="flex items-start gap-3 group">
                        <StatusDot tone="purple" pulse className="mt-1.5" />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2 flex-wrap">
                                <span className="text-sm font-medium">mcp · {e.name}</span>
                                <span className={`infra-pill ${TRANSPORT_TONE[e.transport]} text-[0.6rem]`}>
                                    {e.transport}
                                </span>
                                <Mono className="text-[0.65rem] opacity-60">{e.tools} tools</Mono>
                                <Mono className="text-[0.65rem] opacity-50 ml-auto">
                                    {e.clients} {e.clients === 1 ? "client" : "clients"}
                                </Mono>
                            </div>
                            <p className="m-0 text-xs opacity-60 line-clamp-2 mt-0.5">{e.purpose}</p>
                            {e.repo && (
                                <a
                                    href={`https://github.com/${e.repo}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mono text-[0.65rem] opacity-40 hover:opacity-90 transition-opacity"
                                >
                                    gh:{e.repo}
                                </a>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </Panel>
    );
}
