"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { ResolvedService } from "@/utils/infra/services";
import { GROUP_META, ServiceCategory, ServiceGroup } from "@/config/infrastructure";
import { ServiceCard } from "./ServiceCard";
import { Mono } from "./Mono";

const STATUSES = ["all", "healthy", "degraded", "down"] as const;
type StatusFilter = typeof STATUSES[number];

const CATEGORIES: { value: "all" | ServiceCategory; label: string }[] = [
    { value: "all",          label: "all" },
    { value: "applications", label: "production" },
    { value: "opensource",   label: "oss" },
];

export function ServiceGrid({ services }: { services: ResolvedService[] }) {
    const [q, setQ]           = useState("");
    const [status, setStatus] = useState<StatusFilter>("all");
    const [cat, setCat]       = useState<"all" | ServiceCategory>("all");

    const groups = useMemo(() => {
        const filtered = services.filter((s) => {
            if (cat !== "all" && s.category !== cat) return false;
            if (status !== "all" && s.status !== status) return false;
            if (q) {
                const needle = q.toLowerCase();
                return (
                    s.alias.toLowerCase().includes(needle) ||
                    s.publicDomain?.toLowerCase().includes(needle) ||
                    s.role.toLowerCase().includes(needle) ||
                    s.internalRef?.toLowerCase().includes(needle)
                );
            }
            return true;
        });
        const grouped = new Map<ServiceGroup, ResolvedService[]>();
        for (const s of filtered) {
            if (!grouped.has(s.group)) grouped.set(s.group, []);
            grouped.get(s.group)!.push(s);
        }
        return grouped;
    }, [services, q, status, cat]);

    const total = Array.from(groups.values()).reduce((a, b) => a + b.length, 0);

    return (
        <div className="grid gap-6">
            {/* filter bar */}
            <div className="flex flex-wrap items-center gap-3">
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="search · alias · domain · upstream"
                    className="mono text-sm bg-(--bg-overlay-dark) border border-(--infra-border) rounded-md px-3 py-1.5 min-w-65 focus:border-(--infra-accent) focus:outline-none"
                />

                {/* category tabs */}
                <div className="flex gap-1.5 border border-(--infra-border) rounded-md p-0.5">
                    {CATEGORIES.map(({ value, label }) => (
                        <button
                            key={value}
                            onClick={() => setCat(value)}
                            className={clsx(
                                "infra-pill text-[0.7rem] cursor-pointer border-0",
                                cat === value
                                    ? value === "opensource" ? "infra-pill--purple" : "infra-pill--blue"
                                    : "bg-transparent",
                            )}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* status filters */}
                <div className="flex gap-1.5">
                    {STATUSES.map((s) => (
                        <button
                            key={s}
                            onClick={() => setStatus(s)}
                            className={clsx(
                                "infra-pill text-[0.7rem] cursor-pointer",
                                status === s && (
                                    s === "down"     ? "infra-pill--red" :
                                    s === "degraded" ? "infra-pill--amber" :
                                    s === "healthy"  ? "infra-pill--green" :
                                                       "infra-pill--blue"
                                ),
                            )}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                <Mono className="text-xs opacity-50 ml-auto">
                    {total} of {services.length}
                </Mono>
            </div>

            {/* grouped cards */}
            {Array.from(groups.entries()).map(([g, list]) => (
                <section key={g}>
                    <div className="flex items-center gap-3 mb-2 sticky top-27.5 z-5 py-2 backdrop-blur-md bg-(--bg-secondary)/95">
                        <Mono className="eyebrow">{GROUP_META[g].label.toLowerCase()}</Mono>
                        <span className="text-[0.65rem] opacity-50 mono">{list.length}</span>
                        <div className="flex-1 h-px bg-(--infra-border)" />
                    </div>
                    <div className="grid gap-2.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {list.map((s) => <ServiceCard key={s.id} svc={s} />)}
                    </div>
                </section>
            ))}

            {total === 0 && (
                <p className="mono text-sm opacity-40 text-center py-12">no services match</p>
            )}
        </div>
    );
}
