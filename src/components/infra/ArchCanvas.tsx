"use client";

import { useEffect, useRef, useState } from "react";
import { DOCKER_STACKS, STACK_EDGES } from "@/config/infrastructure";

const CARD_W = 260;
const PILL_H = 22;
const PILL_ROW_GAP = 4;
const PAD = 14;
const GAP_X = 60;
const GAP_Y = 20;
const COL = CARD_W + GAP_X; // x-step between tree depths

const KIND_TONE: Record<string, string> = {
    proxy: "blue",
    app: "green",
    db: "amber",
    worker: "purple",
};

function cardHeight(components: { label: string }[]): number {
    const maxW = CARD_W - PAD * 2;
    let rowW = 0;
    let rows = 1;
    for (const c of components) {
        const pw = c.label.length * 8 + 24;
        if (rowW + pw + 6 > maxW) { rows++; rowW = pw; }
        else { rowW += pw + (rowW > 0 ? 6 : 0); }
    }
    return PAD * 2 + 24 + rows * (PILL_H + PILL_ROW_GAP);
}

type Pos = { x: number; y: number; w: number; h: number };

function buildLayout(svcMap: Map<string, { components: { label: string }[] }>): Map<string, Pos> {
    const m = new Map<string, Pos>();
    const h = (id: string) => cardHeight(svcMap.get(id)?.components || []);

    // ── Col 2 & 3: NPM children in 2 sub-columns
    const npmKids = ["zitadel", "watchparty", "backend", "mail", "n8n", "observability", "postiz"];
    const numRows = Math.ceil(npmKids.length / 2);
    const rowH: number[] = [];
    for (let r = 0; r < numRows; r++) {
        const a = r * 2 < npmKids.length ? h(npmKids[r * 2]) : 0;
        const b = r * 2 + 1 < npmKids.length ? h(npmKids[r * 2 + 1]) : 0;
        rowH.push(Math.max(a, b));
    }
    let childrenEndY = 0;
    for (let i = 0; i < npmKids.length; i++) {
        const col = i % 2;
        const row = Math.floor(i / 2);
        let ky = 0;
        for (let r = 0; r < row; r++) ky += rowH[r] + GAP_Y;
        const kidH = h(npmKids[i]);
        m.set(npmKids[i], { x: (2 + col) * COL, y: ky, w: CARD_W, h: kidH });
        childrenEndY = Math.max(childrenEndY, ky + kidH);
    }

    // ── Col 1: NPM centered over its children; wpx & blackbox directly below NPM
    const npmH = h("network");
    const npmY = childrenEndY / 2 - npmH / 2;
    m.set("network", { x: COL, y: npmY, w: CARD_W, h: npmH });

    const wpxH = h("wpx");
    const bbH  = h("blackbox");
    const lyH  = h("layout");
    const wpxY = npmY + npmH + GAP_Y;
    m.set("wpx",     { x: COL, y: wpxY,                          w: CARD_W, h: wpxH });
    m.set("blackbox",{ x: COL, y: wpxY + wpxH + GAP_Y,           w: CARD_W, h: bbH });
    m.set("layout",  { x: COL, y: wpxY + wpxH + GAP_Y + bbH + GAP_Y, w: CARD_W, h: lyH });

    // ── Col 0: Cloudflare centered over full col-1 span
    const cfH = h("cloudflare");
    const col1Bottom = wpxY + wpxH + GAP_Y + bbH + GAP_Y + lyH;
    m.set("cloudflare", { x: 0, y: (npmY + col1Bottom) / 2 - cfH / 2, w: CARD_W, h: cfH });

    return m;
}

export function ArchCanvas({ activeTag }: { activeTag?: string | null }) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const [view, setView] = useState({ x: 0, y: 0, k: 1 });
    const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);

    const svcMap = new Map(DOCKER_STACKS.map((s) => [s.id, s]));
    const layout = buildLayout(svcMap);

    const activeIds = activeTag
        ? new Set(DOCKER_STACKS.filter((s) => s.tags?.includes(activeTag)).map((s) => s.id))
        : null;

    useEffect(() => {
        if (!wrapRef.current) return;
        const w = wrapRef.current.clientWidth;
        const wh = wrapRef.current.clientHeight;
        const xs: number[] = [];
        const ys: number[] = [];
        layout.forEach((n) => { xs.push(n.x, n.x + CARD_W); ys.push(n.y, n.y + n.h); });
        const minX = Math.min(...xs) - 80;
        const maxX = Math.max(...xs) + 80;
        const minY = Math.min(...ys) - 60;
        const maxY = Math.max(...ys) + 60;
        const k = Math.min(w / (maxX - minX), wh / (maxY - minY), 0.9);
        setView({ x: -minX * k + 30, y: -minY * k + 30, k });
    }, []);

    const onMouseDown = (e: React.MouseEvent) => setDrag({ x: e.clientX - view.x, y: e.clientY - view.y });
    const onMouseMove = (e: React.MouseEvent) => {
        if (!drag) return;
        setView((v) => ({ ...v, x: e.clientX - drag.x, y: e.clientY - drag.y }));
    };
    const onMouseUp = () => setDrag(null);
    const onWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const rect = wrapRef.current?.getBoundingClientRect();
        if (!rect) return;
        setView((v) => {
            const nk = Math.max(0.3, Math.min(2, v.k * Math.exp(-e.deltaY * 0.0015)));
            const r = nk / v.k;
            return { k: nk, x: e.clientX - rect.left - (e.clientX - rect.left - v.x) * r, y: e.clientY - rect.top - (e.clientY - rect.top - v.y) * r };
        });
    };

    return (
        <div className="infra-panel relative overflow-hidden" style={{ height: "min(720px, 70vh)" }}>
            <div ref={wrapRef} className="absolute inset-0 cursor-grab active:cursor-grabbing"
                style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)", backgroundSize: "22px 22px" }}>
                <svg className="w-full h-full block select-none"
                    onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp} onWheel={onWheel}>
                    <g transform={`translate(${view.x},${view.y}) scale(${view.k})`}>
                        {STACK_EDGES.map((edge, ei) => {
                            const sa = layout.get(edge.source);
                            const ta = layout.get(edge.target);
                            if (!sa || !ta) return null;
                            const x1 = sa.x + CARD_W, y1 = sa.y + sa.h / 2;
                            const x2 = ta.x, y2 = ta.y + ta.h / 2;
                            const mx = (x1 + x2) / 2;
                            const d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
                            const stroke = edge.kind === "data" ? "var(--infra-amber)"
                                : edge.kind === "service" ? "var(--infra-accent)" : "var(--infra-blue)";
                            const lit = !activeIds || activeIds.has(edge.source) || activeIds.has(edge.target);
                            return <g key={ei} opacity={lit ? 0.35 : 0.05} style={{ transition: "opacity 250ms" }}>
                                <path d={d} stroke={stroke} strokeWidth={1} fill="none" opacity={0.3} />
                                <path d={d} stroke={stroke} strokeWidth={1.2} strokeDasharray="4 7" fill="none" className="infra-edge-flow" style={{ stroke }} />
                            </g>;
                        })}
                        {Array.from(layout.entries()).map(([id, pos]) => {
                            const s = svcMap.get(id);
                            const muted = activeIds !== null && !activeIds.has(id);
                            return s ? <StackNode key={id} stack={s} x={pos.x} y={pos.y} h={pos.h} muted={muted} /> : null;
                        })}
                    </g>
                </svg>
            </div>
        </div>
    );
}

function StackNode({ stack, x, y, h, muted }: { stack: { label: string; components: { label: string; kind: string; tone?: string }[] }; x: number; y: number; h: number; muted?: boolean }) {
    const maxW = CARD_W - PAD * 2;
    const rows: typeof stack.components[] = [];
    let row: typeof stack.components = [];
    let rowW = 0;
    for (const c of stack.components) {
        const pw = c.label.length * 8 + 24;
        if (rowW + pw + 6 > maxW && row.length > 0) { rows.push(row); row = [c]; rowW = pw; }
        else { row.push(c); rowW += pw + (row.length > 1 ? 6 : 0); }
    }
    if (row.length) rows.push(row);

    return (
        <g opacity={muted ? 0.12 : 1} style={{ transition: "opacity 250ms" }}>
            <rect x={x} y={y} width={CARD_W} height={h} rx={10}
                fill="rgba(255,255,255,0.03)" stroke="var(--infra-border)" strokeWidth={1} />
            <circle cx={x + 12} cy={y + 18} r={5} fill="var(--infra-green)" />
            <circle cx={x + 12} cy={y + 18} r={5} fill="none" stroke="var(--infra-green)" strokeWidth={1.5} opacity={0.4}>
                <animate attributeName="r" from={5} to={9} dur="1.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" from={0.4} to={0} dur="1.6s" repeatCount="indefinite" />
            </circle>
            <text x={x + 26} y={y + 22} fill="var(--infra-fg)" fontSize="13" fontWeight="600">
                {stack.label.length > 26 ? stack.label.slice(0, 25) + "…" : stack.label}
            </text>
            {rows.map((r, ri) => r.map((c, ci) => {
                const tone = c.tone ?? KIND_TONE[c.kind] ?? "green";
                const pw = c.label.length * 8 + 24;
                let px = PAD;
                for (let i = 0; i < ci; i++) px += r[i].label.length * 8 + 24 + 6;
                const py = y + 32 + ri * (PILL_H + PILL_ROW_GAP);
                return <g key={`${ri}-${c.label}`}>
                    <rect x={x + px} y={py} width={pw} height={PILL_H} rx={11} fill={`var(--infra-${tone}-dim)`} />
                    <text x={x + px + pw / 2} y={py + 15} fill={`var(--infra-${tone})`} fontSize="11" fontFamily="var(--infra-mono)" textAnchor="middle">{c.label}</text>
                </g>;
            }))}
        </g>
    );
}
