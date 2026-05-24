import clsx from "clsx";

interface MetricBarProps {
    label?: string;
    value: number;        // 0..100
    suffix?: string;
    tone?: "default" | "amber" | "red";
    className?: string;
}

export function MetricBar({ label, value, suffix = "%", tone = "default", className }: MetricBarProps) {
    const v = Math.max(0, Math.min(100, value));
    const fillTone =
        tone === "red" ? "infra-bar-fill--red"
            : tone === "amber" ? "infra-bar-fill--amber"
                : "";
    return (
        <div className={clsx("flex flex-col gap-1.5", className)}>
            {(label || true) && (
                <div className="flex items-baseline justify-between gap-2">
                    <span className="eyebrow">{label}</span>
                    <span className="mono text-[0.78rem]">
                        {v.toFixed(v < 10 ? 1 : 0)}
                        <span className="opacity-50 ml-0.5">{suffix}</span>
                    </span>
                </div>
            )}
            <div className="infra-bar-track">
                <div className={clsx("infra-bar-fill", fillTone)} style={{ width: `${v}%` }} />
            </div>
        </div>
    );
}
