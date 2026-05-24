import { Panel } from "./Panel";
import { Mono } from "./Mono";
import { StatusDot } from "./StatusDot";

interface Item {
    icon: "deploy" | "cert" | "config" | "alert";
    when: string;       // ISO
    title: string;
    mono?: string;
}

function fmtRelative(iso: string, nowMs: number): string {
    const diff = nowMs - new Date(iso).getTime();
    const m = Math.floor(diff / 60_000);
    if (m < 1) return "just now";
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
}

const TONE: Record<Item["icon"], "green" | "blue" | "purple" | "amber"> = {
    deploy: "green",
    cert: "blue",
    config: "purple",
    alert: "amber",
};

export function RecentActivity({ nowMs }: { nowMs: number }) {
    const items: Item[] = [
        { icon: "deploy", when: new Date(nowMs - 4 * 60_000).toISOString(), title: "Deployed akash.cx · main", mono: "a92f1b3" },
        { icon: "config", when: new Date(nowMs - 12 * 60_000).toISOString(), title: "NPM config applied · network", mono: "0c4d1ee → 18 hosts" },
        { icon: "deploy", when: new Date(nowMs - 28 * 60_000).toISOString(), title: "Restarted obs-prom", mono: "image=v2.55.1" },
        { icon: "cert", when: new Date(nowMs - 4 * 3600_000).toISOString(), title: "Renewed *.auth.xcode.cx", mono: "+90d  Let's Encrypt" },
        { icon: "alert", when: new Date(nowMs - 7 * 3600_000).toISOString(), title: "Cleared: postiz rate-limit warn", mono: "duration=12s" },
    ];

    return (
        <Panel header="Recent Activity" eyebrow="feed">
            <ul className="grid gap-2.5">
                {items.map((it, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <StatusDot tone={TONE[it.icon]} className="mt-1.5" />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2">
                                <span className="text-sm truncate">{it.title}</span>
                                <Mono className="ml-auto text-[0.65rem] opacity-50 shrink-0">{fmtRelative(it.when, nowMs)}</Mono>
                            </div>
                            {it.mono && <Mono className="text-[0.65rem] opacity-50 truncate block">{it.mono}</Mono>}
                        </div>
                    </li>
                ))}
            </ul>
        </Panel>
    );
}
