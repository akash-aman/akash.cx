/**
 * Pure-SVG sparkline. Generates a deterministic series from a seed value
 * so cards animate the same on every render.
 */

interface SparklineProps {
    seed?: number;        // 0..1 — drives the average baseline
    color?: string;       // CSS color
    className?: string;
    height?: number;
    width?: number;
    points?: number;
    tone?: "good" | "bad" | "warn";
}

function series(seed: number, points: number, tone: "good" | "bad" | "warn"): number[] {
    const arr: number[] = [];
    const base = tone === "bad" ? 0.25 : tone === "warn" ? 0.65 : 0.92;
    for (let i = 0; i < points; i++) {
        const n = Math.sin(i * 1.3 + seed * 71) * 0.05 + Math.cos(i * 0.7 + seed * 13) * 0.03;
        arr.push(Math.max(0, Math.min(1, base + n + (seed - 0.5) * 0.02)));
    }
    return arr;
}

export function Sparkline({
    seed = 0.95,
    color,
    className,
    height = 28,
    width = 120,
    points = 30,
    tone,
}: SparklineProps) {
    const t: "good" | "bad" | "warn" = tone ?? (seed < 0.4 ? "bad" : seed < 0.92 ? "warn" : "good");
    const data = series(seed, points, t);
    const stepX = width / (points - 1);
    const path = data.map((v, i) => `${i === 0 ? "M" : "L"}${(i * stepX).toFixed(1)},${(height - v * height).toFixed(1)}`).join(" ");
    const areaPath = `${path} L${width},${height} L0,${height} Z`;
    const stroke = color ?? (t === "bad" ? "var(--infra-red)" : t === "warn" ? "var(--infra-amber)" : "var(--infra-accent)");
    return (
        <svg className={className} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden>
            <defs>
                <linearGradient id={`sg-${seed}-${t}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={stroke} stopOpacity="0.32" />
                    <stop offset="100%" stopColor={stroke} stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={areaPath} fill={`url(#sg-${seed}-${t})`} />
            <path d={path} fill="none" stroke={stroke} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
