/**
 * Merges seed services with live status.
 *
 * Priority:
 *   1. NPM API  — full status + cert data (requires NPM_HOST/EMAIL/PASSWORD env vars)
 *   2. Ping     — HEAD each publicDomain; 2xx/3xx = healthy, else down
 *   3. Seed     — statusSeed from config
 */

import { SERVICES, InfraService, ServiceStatus, DistributionChannel, ServiceCategory } from "@/config/infrastructure";
import { getNpmHostMap } from "./npm";

export interface ResolvedService {
    id: string;
    alias: string;
    publicDomain?: string;
    internalRef?: string;
    upstreamPort?: number;
    group: InfraService["group"];
    kind: InfraService["kind"];
    category?: ServiceCategory;
    role: string;
    repo?: string;
    status: ServiceStatus;
    uptime: number;
    cert?: { issuer: string; daysToExpiry: number; expiresAt?: string };
    mcpTools?: number;
    tags?: string[];
    distributedAs?: DistributionChannel;
    source: "live" | "ping" | "seed";
}

export async function pingDomains(domains: string[]): Promise<Map<string, ServiceStatus>> {
    const results = await Promise.all(
        domains.map(async (domain): Promise<[string, ServiceStatus]> => {
            try {
                const res = await fetch(`https://${domain}`, {
                    method: "HEAD",
                    redirect: "follow",
                    cache: "no-store",
                    signal: AbortSignal.timeout(4000),
                });
                return [domain, res.status < 500 ? "healthy" : "down"];
            } catch {
                return [domain, "down"];
            }
        }),
    );
    return new Map(results);
}

export async function resolveServices(): Promise<{
    source: "live" | "ping" | "seed";
    items: ResolvedService[];
}> {
    const live = await getNpmHostMap();

    const publicDomains = SERVICES
        .filter((s) => s.publicDomain)
        .map((s) => s.publicDomain!.replace(/^\*\./, ""));

    const pingMap = live ? null : await pingDomains(publicDomains);

    const items: ResolvedService[] = SERVICES.map((s) => {
        const domain = s.publicDomain?.replace(/^\*\./, "");
        const liveHit = domain && live ? live[domain] : undefined;
        const pingStatus = domain && pingMap ? pingMap.get(domain) : undefined;

        const status: ServiceStatus = liveHit
            ? (liveHit.online ? "healthy" : liveHit.enabled ? "degraded" : "down")
            : pingStatus ?? s.statusSeed ?? "unknown";

        const source = liveHit ? "live" : pingStatus !== undefined ? "ping" : "seed";

        return {
            id: s.id,
            alias: s.alias,
            publicDomain: s.publicDomain,
            internalRef: liveHit?.upstreamAlias ?? s.internalRef,
            upstreamPort: liveHit?.upstreamPort ?? s.upstreamPort,
            group: s.group,
            kind: s.kind,
            category: s.category,
            role: s.role,
            repo: s.repo,
            status,
            uptime: s.uptimeSeed ?? 0,
            cert: liveHit?.cert
                ? { issuer: liveHit.cert.issuer, daysToExpiry: liveHit.cert.daysToExpiry, expiresAt: liveHit.cert.expiresAt }
                : s.sslSeed
                    ? { issuer: s.sslSeed.issuer, daysToExpiry: s.sslSeed.daysToExpiry }
                    : undefined,
            mcpTools: s.mcpTools,
            tags: s.tags,
            distributedAs: s.distributedAs,
            source,
        };
    });

    const overallSource = live ? "live" : pingMap ? "ping" : "seed";
    return { source: overallSource, items };
}
