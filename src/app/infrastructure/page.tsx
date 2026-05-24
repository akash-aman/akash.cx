import { KpiCard } from "@/components/infra/KpiCard";
import { ProxyBadges } from "@/components/infra/ProxyBadges";
import { SectionHeader } from "@/components/infra/SectionHeader";
import { resolveServices } from "@/utils/infra/services";
import { PROXY_STACKS, DOCKER_STACKS } from "@/config/infrastructure";

export const revalidate = 60;

export default async function OverviewPage() {
    const { items } = await resolveServices();
    const total = items.length;
    const down = items.filter((s) => s.status === "down").length;
    const degraded = items.filter((s) => s.status === "degraded").length;
    const totalComponents = PROXY_STACKS.reduce((s, stack) => {
        const ds = DOCKER_STACKS.find((d) => d.id === stack.stack || d.domain === stack.hosts[0]?.domain);
        return s + (ds?.components.length ?? 0);
    }, 0);

    // Serializable Record (Map isn't passable to client components)
    const statusByDomain: Record<string, string> = Object.fromEntries(
        items
            .filter((s) => s.publicDomain)
            .map((s) => [s.publicDomain!.replace(/^\*\./, ""), s.status])
    );

    // Health % based only on public-facing services (NPM-checkable endpoints)
    const public_ = items.filter((s) => s.publicDomain);
    const healthyPublic = public_.filter((s) => s.status === "healthy").length;
    const healthPct = public_.length ? Math.round((healthyPublic / public_.length) * 100) : 100;

    const totalHosts = PROXY_STACKS.reduce((s, x) => s + x.hosts.length, 0);

    return (
        <div className="grid gap-8">
            {/* KPI row */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <KpiCard label="services" value={total} suffix="surfaces" hint={`${down} down · ${degraded} degraded`} />
                <KpiCard label="healthy" value={`${healthPct}`} suffix="%" trend={{ delta: `${healthyPublic}/${public_.length}`, tone: healthPct === 100 ? "good" : "bad" }} />
                <KpiCard label="stacks" value={PROXY_STACKS.length} suffix="running" hint={`${totalComponents} components`} />
                <KpiCard label="domains" value={totalHosts} suffix="routed" hint={`${PROXY_STACKS.length} stacks`} />
            </section>

            {/* Proxy surfaces */}
            <section>
                <SectionHeader
                    title="proxy surfaces"
                    mono={`${PROXY_STACKS.length} stacks · ${PROXY_STACKS.reduce((s, x) => s + x.hosts.length, 0)} hosts`}
                />
                <ProxyBadges stacks={PROXY_STACKS} statusByDomain={statusByDomain} />
            </section>

        </div>
    );
}
