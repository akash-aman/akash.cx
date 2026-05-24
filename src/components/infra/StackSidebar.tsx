"use client";

import { useEffect, useState } from "react";
import { DOCKER_STACKS } from "@/config/infrastructure";
import type { ServiceStatus } from "@/config/infrastructure";

type Tone = "green" | "amber" | "red" | "gray";

const DOT_TONE: Record<ServiceStatus, Tone> = {
    healthy: "green",
    degraded: "amber",
    down: "red",
    unknown: "gray",
};

const DOT_CLASS: Record<Tone, string> = {
    green: "infra-dot--green infra-dot--pulse",
    amber: "infra-dot--amber infra-dot--pulse",
    red: "infra-dot--red",
    gray: "infra-dot--gray",
};

async function pingDomain(domain: string): Promise<ServiceStatus> {
    try {
        await fetch(`https://${domain}`, {
            method: "GET",
            mode: "no-cors",
            cache: "no-store",
            signal: AbortSignal.timeout(5000),
        });
        return "healthy";
    } catch {
        return "down";
    }
}

export function StackSidebar({
    activeTag,
    statusByDomain = {},
}: {
    activeTag?: string | null;
    statusByDomain?: Record<string, string>;
}) {
    const visible = DOCKER_STACKS
        .filter((s) => s.id !== "cloudflare")
        .filter((s) => !activeTag || s.tags?.includes(activeTag));

    const [clientMap, setClientMap] = useState<Record<string, ServiceStatus>>({});

    useEffect(() => {
        // Only ping domains not already covered by server-side data
        const uncovered = visible
            .filter((s) => s.domain && !(s.domain in statusByDomain))
            .map((s) => s.domain!);

        if (uncovered.length === 0) return;

        Promise.all(uncovered.map(async (d) => [d, await pingDomain(d)] as const))
            .then((entries) => setClientMap(Object.fromEntries(entries)));
    }, [activeTag]);

    const merged: Record<string, string> = { ...clientMap, ...statusByDomain };

    return (
        <div className="infra-panel flex flex-col overflow-y-auto infra-stack-sidebar w-full">
            <div className="px-3 pt-3 pb-2 border-b" style={{ borderColor: "var(--infra-border)" }}>
                <p className="eyebrow" style={{ fontSize: "0.72rem" }}>stacks</p>
            </div>

            <ul className="flex flex-col py-1 flex-1">
                {visible.map((stack) => {
                    const status = (stack.domain ? merged[stack.domain] : undefined) as ServiceStatus | undefined;
                    const tone: Tone = DOT_TONE[status ?? "unknown"];
                    const dotCls = DOT_CLASS[tone];
                    const href = stack.domain ? `https://${stack.domain}` : undefined;

                    return (
                        <li key={stack.id}>
                            <a
                                href={href}
                                target={href ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                className="flex items-center gap-2.5 px-3 py-2 rounded transition-colors group"
                                style={{ cursor: href ? "pointer" : "default" }}
                                onClick={href ? undefined : (e) => e.preventDefault()}
                            >
                                <span className={`infra-dot ${dotCls} flex-shrink-0`} />
                                <span className="flex-1 min-w-0">
                                    <span className="block truncate" style={{ fontFamily: "var(--infra-mono)", fontSize: "0.78rem", color: "var(--infra-fg)" }}>
                                        {stack.label}
                                    </span>
                                    {stack.domain && (
                                        <span className="block truncate" style={{ fontFamily: "var(--infra-mono)", fontSize: "0.68rem", color: "var(--infra-fg-muted)" }}>
                                            {stack.domain}
                                        </span>
                                    )}
                                </span>
                                {href && (
                                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
                                        className="flex-shrink-0 opacity-0 group-hover:opacity-50 transition-opacity"
                                        style={{ color: "var(--infra-fg-muted)" }}>
                                        <path d="M10 2L2 10M5 2h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </a>
                        </li>
                    );
                })}
            </ul>

            <div className="px-3 py-2 border-t flex gap-3"
                style={{ borderColor: "var(--infra-border)", fontFamily: "var(--infra-mono)", fontSize: "0.68rem" }}>
                {(["healthy", "degraded", "down"] as const).map((s) => {
                    const count = visible.filter((x) => x.domain && merged[x.domain] === s).length;
                    if (!count) return null;
                    const tone = DOT_TONE[s];
                    return (
                        <span key={s} style={{ color: `var(--infra-${tone})` }}>
                            {count} {s}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
