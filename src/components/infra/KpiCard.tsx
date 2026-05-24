import clsx from "clsx";
import { Mono } from "./Mono";

interface KpiProps {
    label: string;
    value: string | number;
    suffix?: string;
    trend?: { delta: string; tone: "good" | "bad" | "neutral" };
    hint?: string;
    className?: string;
}

export function KpiCard({ label, value, suffix, trend, hint, className }: KpiProps) {
    return (
        <div className={clsx("infra-panel px-4 py-3 grid gap-1", className)}>
            <span className="eyebrow">{label}</span>
            <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-semibold tracking-tight">{value}</span>
                {suffix && <Mono className="text-xs opacity-50">{suffix}</Mono>}
                {trend && (
                    <span
                        className={clsx(
                            "mono text-[0.7rem] ml-auto",
                            trend.tone === "good" && "text-(--infra-green)",
                            trend.tone === "bad" && "text-(--infra-red)",
                            trend.tone === "neutral" && "opacity-60",
                        )}
                    >
                        {trend.delta}
                    </span>
                )}
            </div>
            {hint && <Mono className="text-[0.65rem] opacity-50">{hint}</Mono>}
        </div>
    );
}
