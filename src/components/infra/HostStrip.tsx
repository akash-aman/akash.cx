import { Mono } from "./Mono";
import { StatusDot } from "./StatusDot";

interface Meta {
    provider: string;
    plan: string;
    region: string;
    cores: number;
    memGb: number;
    diskGb: number;
    uptimeSinceIso: string;
}

function fmtUptime(iso: string): string {
    const secs = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
    const d = Math.floor(secs / 86400);
    const h = Math.floor((secs % 86400) / 3600);
    const m = Math.floor((secs % 3600) / 60);
    if (d > 0) return `${d}d ${h}h`;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
}

export function HostStrip({ meta }: { meta: Meta }) {
    return (
        <div className="border-b border-(--infra-border)">
            <div className="max-w-350 mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 py-3">
                {/* Identity */}
                <div className="flex items-center gap-3 min-w-0">
                    <StatusDot tone="green" pulse />
                    <div className="min-w-0">
                        <div className="flex items-baseline gap-2">
                            <span className="text-sm font-semibold tracking-tight">akash · vps-01</span>
                            <span className="infra-pill infra-pill--green">online</span>
                        </div>
                        <Mono className="text-[0.7rem] opacity-60 truncate block">
                            {meta.provider} {meta.plan} · {meta.cores}c / {meta.memGb}GB / {meta.diskGb}GB · {meta.region}
                        </Mono>
                    </div>
                </div>

                {/* Uptime */}
                <Mono className="text-[0.7rem] opacity-50 shrink-0">
                    up {fmtUptime(meta.uptimeSinceIso)}
                </Mono>
            </div>
        </div>
    );
}
