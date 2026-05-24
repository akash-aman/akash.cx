"use client";

import { useEffect, useState } from "react";
import { PROXY_STACKS } from "@/config/infrastructure";
import { KpiCard } from "./KpiCard";

const PRIMARY_HOSTS = PROXY_STACKS
    .map((s) => s.hosts[0]?.domain)
    .filter((d): d is string => Boolean(d));

export function HealthKpi() {
    const [healthy, setHealthy] = useState<number | null>(null);
    const total = PRIMARY_HOSTS.length;

    useEffect(() => {
        fetch(`/api/infra/ping?domains=${PRIMARY_HOSTS.join(",")}`)
            .then((r) => r.json())
            .then((map: Record<string, string>) => {
                const count = PRIMARY_HOSTS.filter((d) => map[d] === "healthy").length;
                setHealthy(count);
            })
            .catch(() => setHealthy(0));
    }, []);

    const pct = healthy !== null ? Math.round((healthy / total) * 100) : null;

    return (
        <KpiCard
            label="healthy"
            value={pct !== null ? `${pct}` : "—"}
            suffix="%"
            trend={
                healthy !== null
                    ? { delta: `${healthy}/${total}`, tone: pct === 100 ? "good" : "bad" }
                    : undefined
            }
        />
    );
}
