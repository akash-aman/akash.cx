import clsx from "clsx";
import { StatusDot } from "./StatusDot";
import { Mono } from "./Mono";
import { ResolvedService } from "@/utils/infra/services";
import { STATUS_TONE } from "@/config/infrastructure";

interface ServiceCardProps {
    svc: ResolvedService;
    dense?: boolean;
}

export function ServiceCard({ svc, dense }: ServiceCardProps) {
    const tone = STATUS_TONE[svc.status];
    const domainHref = svc.publicDomain
        ? `https://${svc.publicDomain.replace(/^\*\./, "")}`
        : undefined;

    const CardBody = domainHref ? "a" : "div";

    return (
        <div className="infra-panel overflow-hidden group transition-all">
            <CardBody
                {...(domainHref ? { href: domainHref, target: "_blank", rel: "noopener noreferrer" } : {})}
                className={clsx("block px-3 py-2.5 grid gap-1.5", domainHref && "hover:-translate-y-px transition-transform cursor-pointer")}
            >
                <div className="flex items-center gap-2 min-w-0">
                    <StatusDot tone={tone} pulse={svc.status === "down" || svc.status === "degraded"} />
                    <span className="text-sm font-medium truncate">{svc.alias}</span>
                    <div className="ml-auto flex items-center gap-1.5 shrink-0">
                        {svc.distributedAs && (
                            <a
                                href={svc.distributedAs.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className={clsx(
                                    "infra-pill text-[0.6rem]",
                                    svc.distributedAs.kind === "npm" && "infra-pill--red",
                                    svc.distributedAs.kind === "vscode" && "infra-pill--blue",
                                    svc.distributedAs.kind === "docker" && "infra-pill--blue",
                                    svc.distributedAs.kind === "github" && "infra-pill--purple",
                                    svc.distributedAs.kind === "chrome" && "infra-pill--green",
                                )}
                            >
                                {svc.distributedAs.label ?? svc.distributedAs.kind}
                            </a>
                        )}
                        {svc.source === "live" && (
                            <span className="infra-pill infra-pill--green text-[0.6rem]">live</span>
                        )}
                    </div>
                </div>
                {svc.publicDomain && (
                    <Mono className="text-[0.7rem] opacity-70 truncate">{svc.publicDomain}</Mono>
                )}
                {svc.tags && svc.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                        {svc.tags.map((t) => (
                            <span key={t} className="infra-pill text-[0.6rem]">{t}</span>
                        ))}
                    </div>
                )}
                {!dense && (
                    <>
                        <p className="m-0 text-xs opacity-60 line-clamp-2">{svc.role}</p>
                        {svc.cert && (
                            <div className="flex items-center justify-end pt-1">
                                <span
                                    className={clsx(
                                        "infra-pill text-[0.6rem]",
                                        svc.cert.daysToExpiry < 14 ? "infra-pill--red"
                                            : svc.cert.daysToExpiry < 30 ? "infra-pill--amber"
                                                : "infra-pill--green",
                                    )}
                                >
                                    TLS {svc.cert.daysToExpiry}d
                                </span>
                            </div>
                        )}
                    </>
                )}
            </CardBody>
            {svc.repo && !dense && (
                <a
                    href={`https://github.com/${svc.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 pb-2 -mt-1 mono text-[0.65rem] opacity-40 hover:opacity-70 transition-opacity"
                >
                    gh:{svc.repo}
                </a>
            )}
        </div>
    );
}
