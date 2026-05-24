import Link from "next/link";
import clsx from "clsx";
import type { DockerStack } from "@/config/infrastructure";
import { StatusDot } from "./StatusDot";

interface StackCardProps {
    stack: DockerStack;
}

const KIND_TONE: Record<string, string> = {
    proxy: "blue",
    app: "green",
    db: "amber",
    worker: "purple",
};

export function StackCard({ stack }: StackCardProps) {
    return (
        <div className="infra-panel px-4 py-3.5 grid gap-2.5">
            <div className="flex items-center gap-2">
                <StatusDot tone="green" pulse />
                <span className="text-sm font-medium truncate">{stack.label}</span>
                {stack.domain && (
                    <Link
                        href={`https://${stack.domain}`}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-auto mono text-[0.65rem] opacity-40 hover:opacity-70 truncate max-w-[160px]"
                    >
                        {stack.domain}
                    </Link>
                )}
            </div>
            <div className="flex flex-wrap gap-1">
                {stack.components.map((c) => {
                    const tone = c.tone ?? KIND_TONE[c.kind] ?? "green";
                    return (
                        <span
                            key={c.label}
                            className={clsx("infra-pill text-[0.7rem]", `infra-pill--${tone}`)}
                        >
                            {c.label}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
