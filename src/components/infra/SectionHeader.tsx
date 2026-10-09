import clsx from "clsx";

export function SectionHeader({
    title,
    mono,
    right,
    className,
    as: Heading = "h2",
}: {
    title: string;
    /** Use "h1" when this header is the page's main heading. */
    as?: "h1" | "h2";
    mono?: string;
    right?: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={clsx("flex items-end justify-between gap-3 mb-4", className)}>
            <div className="infra-section-rule flex-1 min-w-0">
                <span className="mono text-xs opacity-50">## </span>
                <Heading className="m-0 text-base font-medium truncate">{title}</Heading>
                {mono && <span className="mono text-[0.7rem] opacity-50 truncate">{mono}</span>}
            </div>
            {right && <div className="shrink-0 flex items-center gap-2">{right}</div>}
        </div>
    );
}
