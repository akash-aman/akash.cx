"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ProxyStack, ServiceStatus } from "@/config/infrastructure";
import { StatusDot } from "./StatusDot";
import { Mono } from "./Mono";

type StatusMap = Record<string, ServiceStatus>;

async function pingDomain(domain: string): Promise<ServiceStatus> {
    try {
        await fetch(`https://${domain}`, {
            method: "HEAD",
            mode: "no-cors",
            cache: "no-store",
            signal: AbortSignal.timeout(5000),
        });
        return "healthy";
    } catch {
        return "down";
    }
}

function stackDot(stack: ProxyStack, statusMap: StatusMap) {
    const statuses = stack.hosts.map((h) => statusMap[h.domain]);
    if (statuses.some((s) => s === "down")) return { tone: "red" as const, pulse: false };
    if (statuses.some((s) => s === "degraded")) return { tone: "amber" as const, pulse: true };
    if (statuses.some((s) => s === "healthy")) return { tone: "green" as const, pulse: true };
    return { tone: "gray" as const, pulse: false };
}

interface ProxyBadgesProps {
    stacks: ProxyStack[];
    statusByDomain?: StatusMap;
}

export function ProxyBadges({ stacks, statusByDomain = {} }: ProxyBadgesProps) {
    const [clientMap, setClientMap] = useState<StatusMap>({});

    useEffect(() => {
        const uncovered = stacks
            .flatMap((s) => s.hosts.map((h) => h.domain))
            .filter((d, i, arr) => arr.indexOf(d) === i && !(d in statusByDomain));

        if (uncovered.length === 0) return;

        Promise.all(uncovered.map(async (domain) => [domain, await pingDomain(domain)] as const))
            .then((entries) => setClientMap(Object.fromEntries(entries)));
    }, []);

    const merged: StatusMap = { ...statusByDomain, ...clientMap };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {stacks.map((stack) => {
                const dot = stackDot(stack, merged);
                return (
                    <div key={stack.stack} className="infra-panel px-3 py-2.5 grid gap-1.5">
                        <div className="flex items-center gap-2">
                            <StatusDot tone={dot.tone} pulse={dot.pulse} />
                            <Mono className="text-[0.7rem] opacity-60 uppercase tracking-wider">
                                {stack.label}
                            </Mono>
                            <span className="ml-auto mono text-[0.6rem] opacity-40 tabular-nums">
                                {stack.hosts.length} host{stack.hosts.length !== 1 ? "s" : ""}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {stack.hosts.map((h) => (
                                <Link
                                    key={h.domain}
                                    href={`https://${h.domain}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="infra-pill text-[0.7rem] hover:border-(--infra-accent-soft) transition-colors"
                                >
                                    {h.domain}
                                </Link>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
