/**
 * Live status from Nginx Proxy Manager.
 *
 * Returns a map of { publicDomain → { online, certIssuer, certExpiresAt } }.
 * If NPM env vars are missing or NPM is unreachable, returns null and
 * callers fall back to seed data.
 */

import { anonymizeHost } from "./anonymize";

interface NpmHost {
    id: number;
    domain_names: string[];
    enabled: boolean;
    forward_host: string;
    forward_port: number;
    meta?: { nginx_online?: boolean };
    certificate?: {
        provider?: string;
        expires_on?: string;
        nice_name?: string;
    };
}

export interface NpmServiceLive {
    online: boolean;
    enabled: boolean;
    upstreamAlias: string;
    upstreamPort: number;
    cert?: { issuer: string; expiresAt: string; daysToExpiry: number };
}

let cachedToken: { token: string; exp: number } | null = null;

async function login(host: string, email: string, password: string): Promise<string | null> {
    if (cachedToken && cachedToken.exp > Date.now() + 60_000) return cachedToken.token;
    try {
        const res = await fetch(`${host}/api/tokens`, {
            method: "POST",
            cache: "no-store",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ identity: email, secret: password }),
            signal: AbortSignal.timeout(3000),
        });
        if (!res.ok) return null;
        const data = await res.json();
        cachedToken = {
            token: data.token,
            exp: new Date(data.expires).getTime(),
        };
        return cachedToken.token;
    } catch {
        return null;
    }
}

export async function getNpmHostMap(): Promise<Record<string, NpmServiceLive> | null> {
    const host = process.env.NPM_HOST;
    const email = process.env.NPM_EMAIL;
    const password = process.env.NPM_PASSWORD;
    if (!host || !email || !password) return null;

    const token = await login(host, email, password);
    if (!token) return null;

    try {
        const res = await fetch(`${host}/api/nginx/proxy-hosts?expand=certificate`, {
            cache: "no-store",
            headers: { Authorization: `Bearer ${token}` },
            signal: AbortSignal.timeout(4000),
        });
        if (!res.ok) return null;
        const list: NpmHost[] = await res.json();
        const out: Record<string, NpmServiceLive> = {};
        const now = Date.now();
        for (const h of list) {
            const cert = h.certificate?.expires_on
                ? {
                    issuer: prettyIssuer(h.certificate.provider),
                    expiresAt: h.certificate.expires_on,
                    daysToExpiry: Math.max(
                        0,
                        Math.round(
                            (new Date(h.certificate.expires_on).getTime() - now) / 86_400_000,
                        ),
                    ),
                }
                : undefined;
            const value: NpmServiceLive = {
                online: !!h.meta?.nginx_online && h.enabled,
                enabled: h.enabled,
                upstreamAlias: anonymizeHost(h.forward_host),
                upstreamPort: h.forward_port,
                cert,
            };
            for (const domain of h.domain_names) {
                out[domain] = value;
            }
        }
        return out;
    } catch {
        return null;
    }
}

function prettyIssuer(provider?: string): string {
    if (!provider) return "Unknown";
    if (provider === "letsencrypt") return "Let's Encrypt";
    return provider;
}
