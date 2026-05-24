import clsx from "clsx";
import { Panel } from "./Panel";
import { Mono } from "./Mono";

interface Cert {
    id: string;
    alias: string;
    domain: string;
    issuer: string;
    daysToExpiry: number;
    expiresAt?: string;
}

const DAYS = 90;

function level(daysFromNow: number, dueOnDay: Cert[]): 0 | 1 | 2 | 3 | 4 {
    if (dueOnDay.length === 0) return 0;
    if (daysFromNow < 7) return 4;
    if (daysFromNow < 21) return 3;
    if (daysFromNow < 45) return 2;
    return 1;
}

export function CertHeatmap({ certs }: { certs: Cert[] }) {
    // Bucket certs by day-from-today (clamped 0..DAYS-1)
    const byDay = new Map<number, Cert[]>();
    for (const c of certs) {
        if (c.daysToExpiry < 0 || c.daysToExpiry >= DAYS) continue;
        if (!byDay.has(c.daysToExpiry)) byDay.set(c.daysToExpiry, []);
        byDay.get(c.daysToExpiry)!.push(c);
    }

    const cells = Array.from({ length: DAYS }, (_, i) => {
        const dueOnDay = byDay.get(i) ?? [];
        return { day: i, lvl: level(i, dueOnDay), certs: dueOnDay };
    });

    const total = certs.length;
    const due30 = certs.filter((c) => c.daysToExpiry < 30).length;
    const due7 = certs.filter((c) => c.daysToExpiry < 7).length;

    return (
        <Panel
            header="Certificate Expiry"
            eyebrow={`next ${DAYS}d`}
            right={
                <div className="flex items-center gap-2">
                    <Mono className="text-[0.65rem] opacity-60">{total} certs</Mono>
                    {due7 > 0 && <span className="infra-pill infra-pill--red text-[0.6rem]">{due7} ≤ 7d</span>}
                    {due30 > 0 && <span className="infra-pill infra-pill--amber text-[0.6rem]">{due30} ≤ 30d</span>}
                </div>
            }
        >
            <div className="grid grid-cols-30 gap-1">
                {cells.map((c) => (
                    <div
                        key={c.day}
                        title={
                            c.certs.length
                                ? `+${c.day}d  ·  ${c.certs.length} cert${c.certs.length > 1 ? "s" : ""}\n${c.certs.map((x) => x.domain).join("\n")}`
                                : `+${c.day}d`
                        }
                        className={clsx("infra-heat-cell", c.lvl > 0 && `infra-heat-cell--l${c.lvl}`)}
                    />
                ))}
            </div>
            <div className="flex items-center justify-between pt-3">
                <Mono className="text-[0.6rem] opacity-50">today</Mono>
                <div className="flex items-center gap-1">
                    <Mono className="text-[0.6rem] opacity-50 mr-1">density</Mono>
                    {[1, 2, 3, 4].map((l) => (
                        <div key={l} className={clsx("infra-heat-cell", `infra-heat-cell--l${l}`)} style={{ width: 10, height: 10 }} />
                    ))}
                </div>
                <Mono className="text-[0.6rem] opacity-50">+{DAYS}d</Mono>
            </div>
        </Panel>
    );
}
