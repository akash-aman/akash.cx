/**
 * GitHub Actions wrapper.
 *
 * Returns the last N runs across the configured pipeline repos.
 * Falls back to a curated synthetic stream when GH_PAT_INFRA is missing,
 * the API errors, or rate-limits.
 */

import { PIPELINE_REPOS } from "@/config/infrastructure";

export type RunStatus = "success" | "failure" | "in_progress" | "cancelled" | "queued";

export interface PipelineRun {
    id: string;
    repo: string;
    tag: string;
    workflow: string;
    branch: string;
    commitSha: string;
    commitMsg: string;
    actor: string;
    status: RunStatus;
    conclusion: string | null;
    startedAt: string;
    durationSeconds: number | null;
    htmlUrl: string;
    jobs: { name: string; status: RunStatus }[];
}

interface GhRun {
    id: number;
    name: string | null;
    head_branch: string;
    head_sha: string;
    display_title: string;
    status: string;
    conclusion: string | null;
    run_started_at: string;
    updated_at: string;
    html_url: string;
    actor: { login: string };
}

const HEADERS = (token: string) => ({
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
});

async function fetchRepoRuns(
    owner: string,
    name: string,
    tag: string,
    token: string,
    perRepo: number,
): Promise<PipelineRun[]> {
    try {
        const res = await fetch(
            `https://api.github.com/repos/${owner}/${name}/actions/runs?per_page=${perRepo}`,
            {
                cache: "no-store",
                headers: HEADERS(token),
                signal: AbortSignal.timeout(4000),
            },
        );
        if (!res.ok) return [];
        const data = await res.json() as { workflow_runs: GhRun[] };
        return data.workflow_runs.map((r) => mapRun(r, owner, name, tag));
    } catch {
        return [];
    }
}

function mapRun(r: GhRun, owner: string, name: string, tag: string): PipelineRun {
    const status = (r.status === "completed" ? r.conclusion : r.status) as RunStatus;
    const started = new Date(r.run_started_at).getTime();
    const updated = new Date(r.updated_at).getTime();
    return {
        id: String(r.id),
        repo: `${owner}/${name}`,
        tag,
        workflow: r.name ?? "workflow",
        branch: r.head_branch,
        commitSha: r.head_sha.slice(0, 7),
        commitMsg: r.display_title,
        actor: r.actor.login,
        status,
        conclusion: r.conclusion,
        startedAt: r.run_started_at,
        durationSeconds: status === "in_progress" ? null : Math.max(0, Math.round((updated - started) / 1000)),
        htmlUrl: r.html_url,
        jobs: synthJobs(status),
    };
}

// We don't fetch jobs individually (rate limit cost); show a believable summary.
function synthJobs(s: RunStatus): { name: string; status: RunStatus }[] {
    if (s === "in_progress") return [
        { name: "lint", status: "success" },
        { name: "build", status: "success" },
        { name: "test", status: "in_progress" },
        { name: "deploy", status: "queued" },
    ];
    if (s === "failure") return [
        { name: "lint", status: "success" },
        { name: "build", status: "success" },
        { name: "test", status: "failure" },
        { name: "deploy", status: "cancelled" },
    ];
    return [
        { name: "lint", status: "success" },
        { name: "build", status: "success" },
        { name: "test", status: "success" },
        { name: "deploy", status: s },
    ];
}

export async function getPipelineRuns(perRepo = 5): Promise<{
    source: "live" | "demo";
    runs: PipelineRun[];
}> {
    const token = process.env.GH_PAT_INFRA;
    if (!token) return { source: "demo", runs: syntheticRuns() };

    const all = await Promise.all(
        PIPELINE_REPOS.map((r) => fetchRepoRuns(r.owner, r.name, r.tag, token, perRepo)),
    );
    const flat = all.flat().sort((a, b) => +new Date(b.startedAt) - +new Date(a.startedAt));
    if (flat.length === 0) return { source: "demo", runs: syntheticRuns() };
    return { source: "live", runs: flat.slice(0, 20) };
}

/* ── Synthetic fallback ── */
function syntheticRuns(): PipelineRun[] {
    const now = Date.now();
    const min = 60_000;

    const base: Array<Omit<PipelineRun, "jobs">> = [
        { id: "s1", repo: "akash-aman/akash.cx", tag: "portfolio", workflow: "Build & Deploy", branch: "main", commitSha: "a92f1b3", commitMsg: "feat(infrastructure): add live ops dashboard", actor: "akash-aman", status: "success", conclusion: "success", startedAt: new Date(now - 4 * min).toISOString(), durationSeconds: 142, htmlUrl: "#" },
        { id: "s2", repo: "akash-aman/network", tag: "infra", workflow: "Apply NPM config", branch: "main", commitSha: "0c4d1ee", commitMsg: "chore(npm): wildcard cert renewal for *.auth", actor: "akash-aman", status: "success", conclusion: "success", startedAt: new Date(now - 12 * min).toISOString(), durationSeconds: 38, htmlUrl: "#" },
        { id: "s3", repo: "akash-aman/watchparty.xcode.cx", tag: "watchparty", workflow: "CI", branch: "feat/grpc", commitSha: "bb71c0a", commitMsg: "wip: gRPC stream multiplexing", actor: "akash-aman", status: "in_progress", conclusion: null, startedAt: new Date(now - 2 * min).toISOString(), durationSeconds: null, htmlUrl: "#" },
        { id: "s4", repo: "akash-aman/wpx", tag: "tooling", workflow: "Release", branch: "main", commitSha: "f1d4221", commitMsg: "release: 0.4.2 — site_apply parallelism", actor: "akash-aman", status: "success", conclusion: "success", startedAt: new Date(now - 60 * min).toISOString(), durationSeconds: 211, htmlUrl: "#" },
        { id: "s5", repo: "akash-aman/infra.xcode.cx", tag: "infra", workflow: "Compose deploy", branch: "main", commitSha: "32a0980", commitMsg: "obs: bump grafana 11.4.0 → 11.5.1", actor: "akash-aman", status: "success", conclusion: "success", startedAt: new Date(now - 3 * 60 * min).toISOString(), durationSeconds: 76, htmlUrl: "#" },
        { id: "s6", repo: "akash-aman/akash.cx", tag: "portfolio", workflow: "Lighthouse", branch: "main", commitSha: "a92f1b3", commitMsg: "perf: lazy-load architecture canvas", actor: "akash-aman", status: "success", conclusion: "success", startedAt: new Date(now - 5 * 60 * min).toISOString(), durationSeconds: 53, htmlUrl: "#" },
        { id: "s7", repo: "akash-aman/network", tag: "infra", workflow: "Lint config", branch: "main", commitSha: "0c4d1ee", commitMsg: "ci: validate JSON schemas", actor: "akash-aman", status: "failure", conclusion: "failure", startedAt: new Date(now - 7 * 60 * min).toISOString(), durationSeconds: 21, htmlUrl: "#" },
        { id: "s8", repo: "akash-aman/watchparty.xcode.cx", tag: "watchparty", workflow: "CI", branch: "main", commitSha: "5e2c019", commitMsg: "fix: socket reconnect storm", actor: "akash-aman", status: "success", conclusion: "success", startedAt: new Date(now - 9 * 60 * min).toISOString(), durationSeconds: 188, htmlUrl: "#" },
    ];

    return base.map((r) => ({ ...r, jobs: synthJobs(r.status) }));
}
