/**
 * Infrastructure showcase — typed seed data.
 *
 * Container hostnames from NPM are aliased here for privacy (no infra
 * fingerprinting). Public domains are kept as-is. This module is the
 * single source of truth for the /infrastructure section UI; live data
 * fetched from /api/infra/* is merged on top of this seed.
 */

import {
    Docker,
    Nginx,
    NodeJS,
    NextJS,
    GoLang,
    Python,
    MySQL,
    GraphQL,
    GitHub,
    TS,
} from "@/assets/icons/icon";

export type ServiceStatus = "healthy" | "degraded" | "down" | "unknown";

export type ServiceGroup =
    | "edge"
    | "identity"
    | "watchparty"
    | "automation"
    | "observability"
    | "wp"
    | "portfolio"
    | "oss"
    | "mcp"
    | "data";

export type NodeKind =
    | "edge"
    | "proxy"
    | "app"
    | "data"
    | "monitor"
    | "mcp"
    | "worker";

export interface DistributionChannel {
    kind: "npm" | "vscode" | "github" | "docker" | "chrome";
    url: string;
    label?: string;          // optional override for the pill text
}

export type ServiceCategory = "applications" | "opensource";

export interface InfraService {
    id: string;                  // stable slug (used in URLs, edges)
    alias: string;               // display name (anonymized)
    publicDomain?: string;       // user-facing URL
    internalRef?: string;        // anonymized container name (mono display)
    upstreamPort?: number;
    group: ServiceGroup;
    kind: NodeKind;
    category?: ServiceCategory;  // top-level filter: production app vs published OSS
    role: string;                // short description
    tech: React.ComponentType<{ className?: string }>[];
    tags?: string[];             // free-form descriptive labels (rendered as small pills)
    repo?: string;               // gh owner/name for pipeline link
    statusSeed?: ServiceStatus;  // fallback when no live data
    uptimeSeed?: number;         // 0..1 seed for sparkline
    sslSeed?: { issuer: string; daysToExpiry: number };
    pos?: { x: number; y: number }; // optional manual coords; dagre will compute when omitted
    notes?: string;
    mcpTools?: number;           // for MCP-kind nodes
    distributedAs?: DistributionChannel; // package / extension / image distribution
}

export interface InfraEdge {
    id: string;
    source: string;
    target: string;
    weight?: number; // 0..1 — drives stroke thickness / dot density
    kind?: "ingress" | "service" | "data" | "metric" | "log";
}

export interface HostMeta {
    provider: string;
    plan: string;
    region: string;
    cores: number;
    memGb: number;
    diskGb: number;
    uptimeSinceIso: string;
    kernel: string;
    publicIpMasked: string;
}

export const HOST: HostMeta = {
    provider: "Hostinger",
    plan: "KVM 8",
    region: "Kuala Lumpur · ap-southeast",
    cores: 8,
    memGb: 32,
    diskGb: 400,
    uptimeSinceIso: "2026-04-12T06:33:00.000Z",
    kernel: "Linux 6.5 · Ubuntu 24.04 LTS",
    publicIpMasked: "72.62.xxx.xxx",
};

/* ─────────────────────────────────────────────────────────
   Services (16 NPM hosts → curated, aliased presentation)
   pos.x / pos.y are React Flow coords. Layout is layered:
   col 0 ≈ -640 (edge),  col 1 ≈ -320 (proxy/edge nodes),
   col 2 ≈    0 (apps),  col 3 ≈  340 (observability/data)
   ───────────────────────────────────────────────────────── */
export const SERVICES: InfraService[] = [
    /* ── External Edge ──────────────────────────────────── */
    {
        id: "cloudflare",
        alias: "Cloudflare DNS + Edge",
        group: "edge",
        kind: "edge",
        role: "DNS · DDoS · TLS termination at the edge",
        tech: [],
        statusSeed: "healthy",
        uptimeSeed: 0.999,
    },

    /* ── Public Ingress (network repo) ──────────────────── */
    {
        id: "npm-core",
        alias: "NPMplus",
        publicDomain: "proxy.xcode.cx",
        internalRef: "npmplus",
        upstreamPort: 81,
        group: "edge",
        kind: "proxy",
        category: "applications",
        role: "ZoeyVid/NPMplus · HTTP/3 · ACME · CrowdSec · GoAccess · SQLite",
        tech: [Nginx, Docker],
        statusSeed: "healthy",
        uptimeSeed: 0.997,
        sslSeed: { issuer: "Let's Encrypt", daysToExpiry: 48 },
    },
    {
        id: "npmplus-crowdsec",
        alias: "CrowdSec",
        internalRef: "npmplus-crowdsec",
        group: "edge",
        kind: "worker",
        category: "applications",
        role: "Behavioral IDS · feeds NPMplus ban-list in real time",
        tech: [Docker, GoLang],
        statusSeed: "healthy",
        uptimeSeed: 0.999,
    },

    /* ── WordPress (EasyEngine) ─────────────────────────── */
    {
        id: "akash-cx-be",
        alias: "Portfolio API",
        publicDomain: "backend.akash.cx",
        internalRef: "easyengine",
        upstreamPort: 80,
        group: "portfolio",
        kind: "app",
        category: "applications",
        role: "Headless WordPress + GraphQL · drives akash.cx via on-demand ISR",
        tech: [Docker, GraphQL],
        tags: ["wp", "easyengine"],
        statusSeed: "healthy",
        uptimeSeed: 0.998,
        sslSeed: { issuer: "Let's Encrypt", daysToExpiry: 48 },
    },

    /* ── Identity (auth.xcode.cx · ZITADEL stack) ───────── */
    {
        id: "zitadel-traefik",
        alias: "Zitadel Traefik",
        internalRef: "proxy",
        upstreamPort: 80,
        group: "identity",
        kind: "proxy",
        category: "applications",
        role: "Internal reverse proxy · routes /api, /ui/v2/login, host fan-out",
        tech: [Docker, GoLang],
        statusSeed: "healthy",
        uptimeSeed: 0.998,
    },
    {
        id: "zitadel-api",
        alias: "Zitadel API",
        publicDomain: "auth.xcode.cx",
        internalRef: "zitadel-api",
        upstreamPort: 8080,
        group: "identity",
        kind: "app",
        category: "applications",
        role: "ZITADEL OIDC + SAML provider · multi-tenant auth via HostRegexp",
        tech: [Docker, GoLang],
        statusSeed: "healthy",
        uptimeSeed: 0.996,
        sslSeed: { issuer: "Let's Encrypt", daysToExpiry: 71 },
    },
    {
        id: "zitadel-login",
        alias: "Zitadel Login UI",
        internalRef: "zitadel-login",
        upstreamPort: 3000,
        group: "identity",
        kind: "app",
        category: "applications",
        role: "Next.js login UI · served at /ui/v2/login",
        tech: [Docker, NextJS, NodeJS],
        statusSeed: "healthy",
        uptimeSeed: 0.996,
    },
    {
        id: "zitadel-postgres",
        alias: "Zitadel Postgres",
        internalRef: "postgres",
        upstreamPort: 5432,
        group: "data",
        kind: "data",
        category: "applications",
        role: "Postgres 17 · event store for ZITADEL",
        tech: [Docker],
        statusSeed: "healthy",
        uptimeSeed: 0.999,
    },
    {
        id: "zitadel-redis",
        alias: "Zitadel Redis",
        internalRef: "zitadel-redis",
        upstreamPort: 6379,
        group: "data",
        kind: "data",
        category: "applications",
        role: "Redis 7 · session cache for ZITADEL",
        tech: [Docker],
        statusSeed: "healthy",
        uptimeSeed: 0.999,
    },

    /* ── WatchParty Backend (watchparty.xcode.cx) ───────── */
    {
        id: "wp-api",
        alias: "WatchParty API",
        publicDomain: "api.watchparty.xcode.cx",
        internalRef: "wp-app",
        upstreamPort: 8080,
        group: "watchparty",
        kind: "app",
        category: "applications",
        role: "Go monorepo · REST · room/session orchestration",
        tech: [Docker, GoLang],
        statusSeed: "healthy",
        uptimeSeed: 0.99,
        sslSeed: { issuer: "Let's Encrypt", daysToExpiry: 75 },
    },
    {
        id: "wp-wss",
        alias: "WatchParty Realtime",
        internalRef: "wp-app",
        upstreamPort: 8083,
        group: "watchparty",
        kind: "app",
        category: "applications",
        role: "WebSocket sync · cross-client play state (same Go binary as API)",
        tech: [Docker, GoLang],
        statusSeed: "healthy",
        uptimeSeed: 0.992,
        sslSeed: { issuer: "Let's Encrypt", daysToExpiry: 75 },
    },
    {
        id: "wp-postgres",
        alias: "WatchParty Postgres",
        internalRef: "wp-postgres",
        upstreamPort: 5432,
        group: "data",
        kind: "data",
        category: "applications",
        role: "Postgres 16 · owned by WatchParty stack",
        tech: [Docker],
        statusSeed: "healthy",
        uptimeSeed: 0.999,
    },
    {
        id: "wp-redis",
        alias: "WatchParty Redis",
        internalRef: "wp-redis",
        upstreamPort: 6379,
        group: "data",
        kind: "data",
        category: "applications",
        role: "Redis 7 · session store + pub/sub for realtime",
        tech: [Docker],
        statusSeed: "healthy",
        uptimeSeed: 0.999,
    },

    /* ── Automation ─────────────────────────────────────── */
    {
        id: "n8n",
        alias: "n8n",
        publicDomain: "n8n.xcode.cx",
        internalRef: "n8n-app",
        upstreamPort: 5678,
        group: "automation",
        kind: "app",
        category: "applications",
        role: "Workflow automation · 14 active flows",
        tech: [Docker, NodeJS],
        statusSeed: "healthy",
        uptimeSeed: 0.97,
        sslSeed: { issuer: "Let's Encrypt", daysToExpiry: 49 },
    },
    {
        id: "n8n-postgres",
        alias: "n8n Postgres",
        internalRef: "n8n-postgres",
        upstreamPort: 5432,
        group: "data",
        kind: "data",
        category: "applications",
        role: "Postgres 16 · dedicated to n8n",
        tech: [Docker],
        statusSeed: "healthy",
        uptimeSeed: 0.999,
    },
    {
        id: "postiz",
        alias: "Postiz",
        publicDomain: "postiz.xcode.cx",
        internalRef: "postiz",
        upstreamPort: 5000,
        group: "automation",
        kind: "app",
        category: "applications",
        role: "Social scheduler · cross-platform publishing",
        tech: [Docker, NodeJS, NextJS],
        statusSeed: "degraded",
        uptimeSeed: 0.88,
        sslSeed: { issuer: "Let's Encrypt", daysToExpiry: 58 },
    },
    {
        id: "postiz-postgres",
        alias: "Postiz Postgres",
        internalRef: "postiz-postgres",
        upstreamPort: 5432,
        group: "data",
        kind: "data",
        category: "applications",
        role: "Postgres 17 · owned by Postiz",
        tech: [Docker],
        statusSeed: "healthy",
        uptimeSeed: 0.999,
    },
    {
        id: "postiz-redis",
        alias: "Postiz Redis",
        internalRef: "postiz-redis",
        upstreamPort: 6379,
        group: "data",
        kind: "data",
        category: "applications",
        role: "Redis 7 · queue + cache",
        tech: [Docker],
        statusSeed: "healthy",
        uptimeSeed: 0.999,
    },
    {
        id: "postiz-spotlight",
        alias: "Spotlight",
        internalRef: "spotlight",
        upstreamPort: 8969,
        group: "automation",
        kind: "monitor",
        category: "applications",
        role: "Sentry-style debug UI for Postiz",
        tech: [Docker],
        tags: ["debug"],
        statusSeed: "healthy",
        uptimeSeed: 0.99,
    },
    {
        id: "temporal",
        alias: "Temporal",
        internalRef: "temporal",
        upstreamPort: 7233,
        group: "automation",
        kind: "worker",
        category: "applications",
        role: "Workflow engine · drives Postiz scheduling",
        tech: [Docker, GoLang],
        tags: ["workflow"],
        statusSeed: "healthy",
        uptimeSeed: 0.99,
    },
    {
        id: "temporal-postgres",
        alias: "Temporal Postgres",
        internalRef: "temporal-postgresql",
        upstreamPort: 5432,
        group: "data",
        kind: "data",
        category: "applications",
        role: "Postgres 16 · Temporal cluster state",
        tech: [Docker],
        statusSeed: "healthy",
        uptimeSeed: 0.999,
    },
    {
        id: "temporal-es",
        alias: "Temporal ES",
        internalRef: "temporal-elasticsearch",
        upstreamPort: 9200,
        group: "data",
        kind: "data",
        category: "applications",
        role: "Elasticsearch 7 · Temporal visibility store",
        tech: [Docker],
        statusSeed: "healthy",
        uptimeSeed: 0.998,
    },
    {
        id: "temporal-ui",
        alias: "Temporal UI",
        internalRef: "temporal-ui",
        upstreamPort: 8080,
        group: "automation",
        kind: "monitor",
        category: "applications",
        role: "Temporal web UI · workflow inspection",
        tech: [Docker],
        statusSeed: "healthy",
        uptimeSeed: 0.99,
    },


    /* ── Portfolio (Vercel) ─────────────────────────────── */
    {
        id: "akash-cx",
        alias: "akash.cx",
        publicDomain: "akash.cx",
        internalRef: "vercel",
        group: "portfolio",
        kind: "app",
        category: "applications",
        role: "This site · Next.js · ISR + on-demand revalidation",
        tech: [NextJS, GitHub],
        tags: ["nextjs", "portfolio"],
        repo: "akash-aman/akash.cx",
        statusSeed: "healthy",
        uptimeSeed: 0.999,
    },

    /* ── OSS Projects (Vercel + package distribution) ───── */
    {
        id: "layout-xcode",
        alias: "Dynamix Layout",
        publicDomain: "layout.xcode.cx",
        internalRef: "vercel",
        group: "oss",
        kind: "app",
        category: "opensource",
        role: "Dockable, resizable layout engine · Solid + React + Core packages",
        tech: [TS],
        tags: ["oss", "npm pkg"],
        repo: "akash-aman/dynamix-layout",
        statusSeed: "healthy",
        uptimeSeed: 0.999,
        distributedAs: {
            kind: "npm",
            url: "https://www.npmjs.com/package/@dynamix-layout/core",
            label: "npm",
        },
    },
    {
        id: "blackbox-xcode",
        alias: "Blackbox",
        publicDomain: "blackbox.xcode.cx",
        internalRef: "vercel",
        group: "oss",
        kind: "app",
        category: "opensource",
        role: "AI-driven debugger via MCP · breakpoints, sessions, variables · works in any DAP language",
        tech: [TS],
        tags: ["oss", "vscode pkg", "mcp"],
        repo: "akash-aman/blackbox",
        statusSeed: "healthy",
        uptimeSeed: 0.999,
        distributedAs: {
            kind: "vscode",
            url: "https://marketplace.visualstudio.com/items?itemName=akash-cx.blackbox-debug",
            label: "vscode marketplace",
        },
    },
    {
        id: "wpx",
        alias: "wpx",
        publicDomain: "wpx.xcode.cx",
        group: "oss",
        kind: "app",
        category: "opensource",
        role: "Native WordPress devenv · zero docker · ~12s site spinup",
        tech: [GoLang],
        tags: ["oss", "cli"],
        repo: "akash-aman/wpx",
        statusSeed: "healthy",
        uptimeSeed: 1.0,
        distributedAs: {
            kind: "github",
            url: "https://github.com/akash-aman/wpx",
            label: "curl install",
        },
    },
    {
        id: "watch-party-ext",
        alias: "WatchParty Extension",
        group: "oss",
        kind: "app",
        category: "opensource",
        role: "Chrome extension · syncs OTT players across clients",
        tech: [TS],
        tags: ["chrome ext"],
        statusSeed: "healthy",
        uptimeSeed: 1.0,
        distributedAs: {
            kind: "chrome",
            url: "https://chromewebstore.google.com/detail/watch-party/lkekjaeggdhmafjecobohoiajfjeeplh",
            label: "chrome web store",
        },
    },

    /* ── MCP Servers (capability) ───────────────────────── */
    {
        id: "mcp-network",
        alias: "MCP · network",
        internalRef: "mcp-network",
        group: "mcp",
        kind: "mcp",
        category: "opensource",
        role: "Manages NPM via JSON config · 6 tools",
        tech: [NodeJS],
        statusSeed: "healthy",
        uptimeSeed: 0.99,
        mcpTools: 6,
    },
    // {
    //     id: "mcp-wpx",
    //     alias: "MCP · wpx",
    //     internalRef: "mcp-wpx",
    //     group: "mcp",
    //     kind: "mcp",
    //     category: "opensource",
    //     role: "Native WP devenv control · 22 tools",
    //     tech: [NodeJS, Python],
    //     repo: "akash-aman/wpx",
    //     statusSeed: "healthy",
    //     uptimeSeed: 0.97,
    //     mcpTools: 22,
    // },
    // {
    //     id: "mcp-blackbox",
    //     alias: "MCP · Blackbox",
    //     internalRef: "mcp-blackbox",
    //     group: "mcp",
    //     kind: "mcp",
    //     category: "opensource",
    //     role: "DAP-bridged debugging across PHP, Node, Python, Go · 12 tools",
    //     tech: [NodeJS, TS],
    //     repo: "akash-aman/blackbox",
    //     statusSeed: "healthy",
    //     uptimeSeed: 0.99,
    //     mcpTools: 12,
    // },
];

/* ─────────────────────────────────────────────────────────
   Edges — the dataflow story
   ───────────────────────────────────────────────────────── */
export const EDGES: InfraEdge[] = [
    /* ── Cloudflare → ingress ─────────────────────────── */
    { id: "e-cf-npm", source: "cloudflare", target: "npm-core", kind: "ingress", weight: 1 },
    { id: "e-cf-akash", source: "cloudflare", target: "akash-cx", kind: "ingress", weight: 0.6 },
    { id: "e-cf-layout", source: "cloudflare", target: "layout-xcode", kind: "ingress", weight: 0.3 },
    { id: "e-cf-blackbox", source: "cloudflare", target: "blackbox-xcode", kind: "ingress", weight: 0.3 },
    { id: "e-cf-idp", source: "cloudflare", target: "idp-config", kind: "ingress", weight: 0.2 },
    { id: "e-mcp-wpx-cli", source: "mcp-wpx", target: "wpx", kind: "ingress", weight: 0.5 },

    /* ── NPM internals ────────────────────────────────── */
    { id: "e-npm-db", source: "npm-core", target: "npm-db", kind: "data", weight: 0.4 },

    /* ── NPM → EasyEngine WP fan-out ──────────────────── */
    { id: "e-npm-ee", source: "npm-core", target: "easyengine", kind: "service", weight: 0.7 },
    { id: "e-ee-akashbe", source: "easyengine", target: "akash-cx-be", kind: "service", weight: 0.7 },
    { id: "e-ee-wpdemo", source: "easyengine", target: "wp-demo", kind: "service", weight: 0.4 },

    /* ── NPM → Zitadel stack ──────────────────────────── */
    { id: "e-npm-ztrf", source: "npm-core", target: "zitadel-traefik", kind: "service", weight: 0.8 },
    { id: "e-ztrf-api", source: "zitadel-traefik", target: "zitadel-api", kind: "service", weight: 0.7 },
    { id: "e-ztrf-login", source: "zitadel-traefik", target: "zitadel-login", kind: "service", weight: 0.5 },
    { id: "e-zapi-pg", source: "zitadel-api", target: "zitadel-postgres", kind: "data", weight: 0.7 },
    { id: "e-zlogin-api", source: "zitadel-login", target: "zitadel-api", kind: "service", weight: 0.4 },
    { id: "e-zapi-otel", source: "zitadel-api", target: "zitadel-otel", kind: "metric", weight: 0.3 },
    { id: "e-zotel-jaeg", source: "zitadel-otel", target: "obs-jaeger", kind: "metric", weight: 0.3 },

    /* ── NPM → WatchParty endpoints (3 NPM hosts → 1 Go binary) ── */
    { id: "e-npm-wpapi", source: "npm-core", target: "wp-api", kind: "service", weight: 0.9 },
    { id: "e-npm-wpwss", source: "npm-core", target: "wp-wss", kind: "service", weight: 0.85 },
    { id: "e-npm-wpgrpc", source: "npm-core", target: "wp-grpc", kind: "service", weight: 0.05 },

    /* ── WatchParty data plane ────────────────────────── */
    { id: "e-wpapi-pg", source: "wp-api", target: "wp-postgres", kind: "data", weight: 0.8 },
    { id: "e-wpapi-redis", source: "wp-api", target: "wp-redis", kind: "data", weight: 0.6 },
    { id: "e-wpwss-redis", source: "wp-wss", target: "wp-redis", kind: "data", weight: 0.9 },
    { id: "e-wppg-pgweb", source: "wp-postgres", target: "wp-pgweb", kind: "data", weight: 0.2 },
    { id: "e-wpredis-cmd", source: "wp-redis", target: "wp-redis-cmd", kind: "data", weight: 0.2 },

    /* ── WatchParty admin tools served by ops-proxy ───── */
    { id: "e-ops-pgweb", source: "ops-proxy", target: "wp-pgweb", kind: "service", weight: 0.2 },
    { id: "e-ops-rcmd", source: "ops-proxy", target: "wp-redis-cmd", kind: "service", weight: 0.2 },

    /* ── NPM → automation ─────────────────────────────── */
    { id: "e-npm-n8n", source: "npm-core", target: "n8n", kind: "service", weight: 0.5 },
    { id: "e-n8n-pg", source: "n8n", target: "n8n-postgres", kind: "data", weight: 0.6 },

    { id: "e-npm-postiz", source: "npm-core", target: "postiz", kind: "service", weight: 0.4 },
    { id: "e-postiz-pg", source: "postiz", target: "postiz-postgres", kind: "data", weight: 0.6 },
    { id: "e-postiz-redis", source: "postiz", target: "postiz-redis", kind: "data", weight: 0.5 },
    { id: "e-postiz-spot", source: "postiz", target: "postiz-spotlight", kind: "log", weight: 0.2 },
    { id: "e-postiz-temp", source: "postiz", target: "temporal", kind: "service", weight: 0.6 },
    { id: "e-temp-pg", source: "temporal", target: "temporal-postgres", kind: "data", weight: 0.6 },
    { id: "e-temp-es", source: "temporal", target: "temporal-es", kind: "data", weight: 0.5 },
    { id: "e-temp-ui", source: "temporal-ui", target: "temporal", kind: "service", weight: 0.2 },

    /* ── NPM → Observability gateway ──────────────────── */
    { id: "e-npm-ops", source: "npm-core", target: "ops-proxy", kind: "service", weight: 0.6 },
    { id: "e-ops-oauth", source: "ops-proxy", target: "ops-oauth2", kind: "service", weight: 0.9 },
    { id: "e-ops-graf", source: "ops-proxy", target: "obs-grafana", kind: "service", weight: 0.7 },
    { id: "e-ops-prom", source: "ops-proxy", target: "obs-prom", kind: "service", weight: 0.6 },
    { id: "e-ops-jaeg", source: "ops-proxy", target: "obs-jaeger", kind: "service", weight: 0.4 },
    { id: "e-ops-trae", source: "ops-proxy", target: "ops-traefik-dash", kind: "service", weight: 0.3 },

    /* ── OAuth2-proxy verifies sessions against Zitadel ─ */
    { id: "e-oauth-zit", source: "ops-oauth2", target: "zitadel-api", kind: "service", weight: 0.5 },

    /* ── Telemetry: apps → OTel Collector → backends ──── */
    { id: "e-wpapi-otel", source: "wp-api", target: "obs-otel", kind: "metric", weight: 0.3 },
    { id: "e-akash-otel", source: "akash-cx-be", target: "obs-otel", kind: "metric", weight: 0.2 },
    { id: "e-postiz-otel", source: "postiz", target: "obs-otel", kind: "metric", weight: 0.2 },
    { id: "e-otel-prom", source: "obs-otel", target: "obs-prom", kind: "metric", weight: 0.7 },
    { id: "e-otel-jaeg", source: "obs-otel", target: "obs-jaeger", kind: "metric", weight: 0.6 },
    { id: "e-otel-loki", source: "obs-otel", target: "obs-loki", kind: "log", weight: 0.5 },
    { id: "e-graf-prom", source: "obs-grafana", target: "obs-prom", kind: "metric", weight: 0.7 },
    { id: "e-graf-loki", source: "obs-grafana", target: "obs-loki", kind: "metric", weight: 0.4 },

    /* ── MCP control surfaces ─────────────────────────── */
    { id: "e-mcp-net-npm", source: "mcp-network", target: "npm-core", kind: "service", weight: 0.5 },
    { id: "e-mcp-wpx-cli", source: "mcp-wpx", target: "wpx", kind: "ingress", weight: 0.5 },
    //{ id: "e-mcp-bb-ext", source: "mcp-blackbox", target: "blackbox-xcode", kind: "service", weight: 0.4 },
];

/* ─────────────────────────────────────────────────────────
   Group metadata
   ───────────────────────────────────────────────────────── */
export const GROUP_META: Record<ServiceGroup, { label: string; tone: string }> = {
    edge: { label: "Edge / Ingress", tone: "blue" },
    identity: { label: "Identity", tone: "purple" },
    watchparty: { label: "WatchParty", tone: "magenta" },
    automation: { label: "Automation", tone: "amber" },
    observability: { label: "Observability", tone: "blue" },
    wp: { label: "WordPress", tone: "magenta" },
    portfolio: { label: "Portfolio", tone: "green" },
    oss: { label: "OSS Projects", tone: "green" },
    mcp: { label: "MCP Servers", tone: "purple" },
    data: { label: "Data Plane", tone: "amber" },
};

/* ─────────────────────────────────────────────────────────
   Selected GitHub repos for the pipelines tab
   ───────────────────────────────────────────────────────── */
export const PIPELINE_REPOS: Array<{ owner: string; name: string; tag: string }> = [
    { owner: "akash-aman", name: "akash.cx", tag: "portfolio" },
    { owner: "akash-aman", name: "network", tag: "infra" },
    { owner: "akash-aman", name: "watchparty.xcode.cx", tag: "watchparty" },
    { owner: "akash-aman", name: "wpx", tag: "tooling" },
    { owner: "akash-aman", name: "infra.xcode.cx", tag: "infra" },
];

/* ─────────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────────── */
export const STATUS_TONE: Record<ServiceStatus, "green" | "amber" | "red" | "gray"> = {
    healthy: "green",
    degraded: "amber",
    down: "red",
    unknown: "gray",
};

export function serviceById(id: string): InfraService | undefined {
    return SERVICES.find((s) => s.id === id);
}

/* ─────────────────────────────────────────────────────────
   Nginx Proxy Manager proxy hosts grouped by docker compose stack.
   Only public-facing domains behind the proxy — no internal routing details.
   ───────────────────────────────────────────────────────── */
export interface ProxyHost {
    domain: string;
}

export interface ProxyStack {
    stack: string;
    label: string;
    hosts: ProxyHost[];
}

export const PROXY_STACKS: ProxyStack[] = [
    {
        stack: "network",
        label: "Nginx Proxy Manager",
        hosts: [{ domain: "proxy.xcode.cx" }],
    },
    {
        stack: "auth.xcode.cx",
        label: "ZITADEL",
        hosts: [
            { domain: "auth.xcode.cx" },
            { domain: "saas.auth.xcode.cx" },
        ],
    },
    {
        stack: "watchparty.xcode.cx",
        label: "WatchParty",
        hosts: [
            { domain: "api.watchparty.xcode.cx" },
            { domain: "wss.watchparty.xcode.cx" },
        ],
    },
    {
        stack: "backend",
        label: "Portfolio Backend",
        hosts: [{ domain: "backend.akash.cx" }],
    },
    {
        stack: "mail",
        label: "Mail Server",
        hosts: [{ domain: "mail.xcode.cx" }],
    },
    {
        stack: "n8n",
        label: "n8n",
        hosts: [{ domain: "n8n.xcode.cx" }],
    },
    {
        stack: "infra",
        label: "Observability",
        hosts: [{ domain: "obs.xcode.cx" }],
    },
    {
        stack: "postiz",
        label: "Postiz",
        hosts: [{ domain: "postiz.xcode.cx" }],
    },
    {
        stack: "wpx",
        label: "wpx",
        hosts: [{ domain: "wpx.xcode.cx" }],
    },
    {
        stack: "blackbox",
        label: "Blackbox",
        hosts: [{ domain: "blackbox.xcode.cx" }],
    },
];

/* ─────────────────────────────────────────────────────────
   Docker compose stacks — rectangles with component badges
   used on the architecture canvas page
   ───────────────────────────────────────────────────────── */
export interface StackComponent {
    label: string;
    kind: string;
    tone?: string;
}

export interface DockerStack {
    id: string;
    label: string;
    domain?: string;
    status?: ServiceStatus;
    tags?: string[];
    components: StackComponent[];
}

export interface StackEdge {
    source: string;
    target: string;
    kind?: "proxy" | "service" | "data";
}

export const DOCKER_STACKS: DockerStack[] = [
    {
        id: "cloudflare",
        label: "Cloudflare",
        domain: "cloudflare.com",
        status: "healthy",
        tags: ["edge"],
        components: [
            { label: "dns", kind: "proxy", tone: "blue" },
            { label: "ddos", kind: "proxy", tone: "blue" },
            { label: "tls", kind: "proxy", tone: "blue" },
        ],
    },
    {
        id: "network",
        label: "Nginx Proxy Manager",
        domain: "proxy.xcode.cx",
        status: "healthy",
        tags: ["edge"],
        components: [
            { label: "npm", kind: "proxy" },
            { label: "mariadb", kind: "db" },
        ],
    },
    {
        id: "zitadel",
        label: "ZITADEL",
        domain: "auth.xcode.cx",
        status: "healthy",
        tags: ["identity"],
        components: [
            { label: "traefik", kind: "proxy" },
            { label: "api", kind: "app", tone: "green" },
            { label: "login-ui", kind: "app" },
            { label: "postgres", kind: "db" },
            { label: "otel", kind: "worker" },
        ],
    },
    {
        id: "watchparty",
        label: "WatchParty",
        domain: "api.watchparty.xcode.cx",
        status: "healthy",
        tags: ["apps"],
        components: [
            { label: "api", kind: "app", tone: "green" },
            { label: "websocket", kind: "app" },
            { label: "postgres", kind: "db" },
            { label: "redis", kind: "db" },
        ],
    },
    {
        id: "backend",
        label: "Portfolio Backend",
        domain: "backend.akash.cx",
        status: "healthy",
        tags: ["apps"],
        components: [
            { label: "easyengine", kind: "proxy" },
            { label: "wordpress", kind: "app" },
            { label: "graphql", kind: "app" },
            { label: "mariadb", kind: "db" },
            { label: "redis", kind: "db" },
        ],
    },
    {
        id: "mail",
        label: "Mail Server",
        domain: "mail.xcode.cx",
        status: "healthy",
        tags: ["apps"],
        components: [
            { label: "postfix", kind: "app" },
            { label: "dovecot", kind: "app" },
        ],
    },
    {
        id: "n8n",
        label: "n8n",
        domain: "n8n.xcode.cx",
        status: "healthy",
        tags: ["automation"],
        components: [
            { label: "app", kind: "app", tone: "green" },
            { label: "postgres", kind: "db" },
        ],
    },
    {
        id: "observability",
        label: "Observability",
        domain: "obs.xcode.cx",
        status: "healthy",
        tags: ["observability"],
        components: [
            { label: "traefik", kind: "proxy" },
            { label: "oauth2", kind: "proxy" },
            { label: "grafana", kind: "app", tone: "green" },
            { label: "prometheus", kind: "app" },
            { label: "jaeger", kind: "app" },
            { label: "loki", kind: "app" },
            { label: "otel", kind: "worker" },
        ],
    },
    {
        id: "postiz",
        label: "Postiz",
        domain: "postiz.xcode.cx",
        status: "degraded",
        tags: ["automation"],
        components: [
            { label: "app", kind: "app", tone: "green" },
            { label: "postgres", kind: "db" },
            { label: "redis", kind: "db" },
            { label: "temporal", kind: "worker" },
            { label: "temporal-pg", kind: "db" },
            { label: "elasticsearch", kind: "db" },
        ],
    },
    {
        id: "wpx",
        label: "wpx",
        domain: "wpx.xcode.cx",
        status: "healthy",
        tags: ["oss"],
        components: [
            { label: "site", kind: "app", tone: "green" },
        ],
    },
    {
        id: "blackbox",
        label: "Blackbox",
        domain: "blackbox.xcode.cx",
        status: "healthy",
        tags: ["oss"],
        components: [
            { label: "site", kind: "app", tone: "green" },
        ],
    },
    {
        id: "layout",
        label: "Dynamix Layout",
        domain: "layout.xcode.cx",
        status: "healthy",
        tags: ["oss"],
        components: [
            { label: "site", kind: "app", tone: "green" },
            { label: "npm", kind: "proxy", tone: "blue" },
        ],
    },
];

/* ── Stack-to-stack wiring edges ─────────────────────── */
export const STACK_EDGES: StackEdge[] = [
    { source: "cloudflare", target: "network", kind: "proxy" },
    { source: "cloudflare", target: "wpx", kind: "proxy" },
    { source: "cloudflare", target: "blackbox", kind: "proxy" },
    { source: "cloudflare", target: "layout", kind: "proxy" },
    { source: "network", target: "zitadel", kind: "proxy" },
    { source: "network", target: "watchparty", kind: "proxy" },
    { source: "network", target: "backend", kind: "proxy" },
    { source: "network", target: "mail", kind: "proxy" },
    { source: "network", target: "n8n", kind: "proxy" },
    { source: "network", target: "observability", kind: "proxy" },
    { source: "network", target: "postiz", kind: "proxy" },
    { source: "observability", target: "zitadel", kind: "service" },
];
