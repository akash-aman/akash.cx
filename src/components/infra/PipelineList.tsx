import clsx from "clsx";
import { Panel } from "./Panel";
import { Mono } from "./Mono";
import { StatusDot } from "./StatusDot";
import type { PipelineRun, RunStatus } from "@/utils/infra/github";

const STATUS_TONE: Record<RunStatus, "green" | "amber" | "red" | "blue" | "gray"> = {
    success: "green",
    failure: "red",
    in_progress: "amber",
    cancelled: "gray",
    queued: "blue",
};

const STATUS_LABEL: Record<RunStatus, string> = {
    success: "passed",
    failure: "failed",
    in_progress: "running",
    cancelled: "cancelled",
    queued: "queued",
};

function fmtDur(s: number | null): string {
    if (s == null) return "—";
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}m ${r}s`;
}

function fmtRel(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60_000);
    if (m < 1) return "just now";
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
}

function PipelineRow({ run }: { run: PipelineRun }) {
    return (
        <li className="flex flex-wrap lg:flex-nowrap items-center gap-3 py-2.5 border-b border-(--infra-border) last:border-b-0">
            <StatusDot tone={STATUS_TONE[run.status]} pulse={run.status === "in_progress"} />

            <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-sm font-medium truncate">{run.workflow}</span>
                    <span className="infra-pill text-[0.6rem]">{run.tag}</span>
                    <Mono className="text-[0.65rem] opacity-50 truncate">
                        {run.repo}
                    </Mono>
                </div>
                <Mono className="text-[0.65rem] opacity-60 truncate block mt-0.5">
                    {run.commitSha} · {run.branch} · {run.commitMsg}
                </Mono>
            </div>

            {/* Stage strip */}
            <div className="flex gap-0.5 shrink-0">
                {run.jobs.map((j) => (
                    <div
                        key={j.name}
                        title={`${j.name}: ${STATUS_LABEL[j.status]}`}
                        className={clsx(
                            "w-7 h-1.5 rounded-sm",
                            j.status === "success" && "bg-(--infra-green)",
                            j.status === "failure" && "bg-(--infra-red)",
                            j.status === "in_progress" && "bg-(--infra-amber) animate-pulse",
                            j.status === "queued" && "bg-(--infra-fg-faint)",
                            j.status === "cancelled" && "bg-(--infra-fg-faint) opacity-50",
                        )}
                    />
                ))}
            </div>

            <div className="flex items-center gap-3 shrink-0">
                <Mono className="text-[0.65rem] opacity-60">{fmtDur(run.durationSeconds)}</Mono>
                <Mono className="text-[0.65rem] opacity-50 w-16 text-right">{fmtRel(run.startedAt)}</Mono>
                <a
                    href={run.htmlUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="infra-pill text-[0.6rem]"
                >
                    gh ↗
                </a>
            </div>
        </li>
    );
}

export function PipelineList({ runs, source }: { runs: PipelineRun[]; source: "live" | "demo" }) {
    const successCount = runs.filter((r) => r.status === "success").length;
    const successRate = runs.length ? Math.round((successCount / runs.length) * 100) : 0;
    const inProgress = runs.filter((r) => r.status === "in_progress").length;
    const failed = runs.filter((r) => r.status === "failure").length;

    return (
        <div className="grid gap-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <MiniStat label="last 20" value={`${runs.length}`} hint="runs" />
                <MiniStat label="success rate" value={`${successRate}%`} tone="good" />
                <MiniStat label="running" value={`${inProgress}`} tone={inProgress ? "warn" : "default"} />
                <MiniStat label="failed" value={`${failed}`} tone={failed ? "bad" : "default"} />
            </div>

            <Panel
                header="Recent Workflow Runs"
                eyebrow={`source · ${source}`}
                right={<Mono className="text-[0.65rem] opacity-50">{runs.length} runs</Mono>}
            >
                <ul className="m-0 p-0 list-none">
                    {runs.map((r) => <PipelineRow key={r.id} run={r} />)}
                    {runs.length === 0 && (
                        <li className="text-center opacity-50 mono text-xs py-8">no runs in window</li>
                    )}
                </ul>
            </Panel>
        </div>
    );
}

function MiniStat({
    label, value, hint, tone = "default",
}: {
    label: string; value: string; hint?: string; tone?: "default" | "good" | "bad" | "warn";
}) {
    return (
        <div className="infra-panel px-4 py-3">
            <Mono className="eyebrow">{label}</Mono>
            <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className={clsx(
                    "text-2xl font-semibold tracking-tight",
                    tone === "good" && "text-(--infra-green)",
                    tone === "bad" && "text-(--infra-red)",
                    tone === "warn" && "text-(--infra-amber)",
                )}>{value}</span>
                {hint && <Mono className="text-xs opacity-50">{hint}</Mono>}
            </div>
        </div>
    );
}
