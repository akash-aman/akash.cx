"use client";

import { useEffect, useState } from "react";
import { PROXY_STACKS } from "@/config/infrastructure";
import { KpiCard } from "./KpiCard";

const PRIMARY_HOSTS = PROXY_STACKS
    .map((s) => s.hosts[0]?.domain)
    .filter((d): d is string => Boolean(d));

async function ping(domain: string): Promise<boolean> {
    try {
        await fetch(`https://${domain}`, {
            method: "GET",
            mode: "no-cors",
            cache: "no-store",
            signal: AbortSignal.timeout(5000),
        });
        return true;
    } catch {
        return false;
    }
}

export function HealthKpi() {
    const [healthy, setHealthy] = useState<number | null>(null);
    const total = PRIMARY_HOSTS.length;

    useEffect(() => {
        Promise.all(PRIMARY_HOSTS.map(ping)).then((results) =>
            setHealthy(results.filter(Boolean).length)
        );
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
