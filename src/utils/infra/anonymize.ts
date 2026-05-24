/**
 * Anonymizer: maps real container hostnames (from NPM API) → display aliases.
 * Everything that goes from the backend to the browser passes through this.
 */

const MAP: Record<string, string> = {
    "indentify-provider-proxy-1": "auth-idp",
    "monitoring-ops-proxy-1": "obs-edge",
    "global-nginx-proxy": "wp-edge",
    "nginxproxymanager": "npm-core",
    "wp-app": "watchparty-api",
    "n8n-app": "n8n-app",
    "postiz": "postiz",
};

export function anonymizeHost(hostname: string | undefined | null): string {
    if (!hostname) return "—";
    return MAP[hostname] ?? hostname;
}
