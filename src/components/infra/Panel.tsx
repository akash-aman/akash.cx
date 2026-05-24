import clsx from "clsx";
import { ReactNode } from "react";

interface PanelProps {
    children: ReactNode;
    className?: string;
    header?: ReactNode;
    eyebrow?: string;
    mono?: string;
    right?: ReactNode;
    accent?: boolean;
}

export function Panel({ children, className, header, eyebrow, mono, right, accent }: PanelProps) {
    return (
        <section className={clsx("infra-panel", accent && "infra-panel--accent", className)}>
            {(header || eyebrow || mono || right) && (
                <header className="flex items-end justify-between gap-3 px-4 pt-3 pb-2 border-b border-(--infra-border)">
                    <div className="flex items-baseline gap-3 min-w-0">
                        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
                        {header && <h3 className="m-0 text-sm font-medium truncate">{header}</h3>}
                        {mono && <span className="mono text-[0.7rem] opacity-60 truncate">{mono}</span>}
                    </div>
                    {right && <div className="flex items-center gap-2 shrink-0">{right}</div>}
                </header>
            )}
            <div className="px-4 py-3">{children}</div>
        </section>
    );
}
