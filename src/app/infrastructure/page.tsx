import { KpiCard } from "@/components/infra/KpiCard";
import { HealthKpi } from "@/components/infra/HealthKpi";
import { ProxyBadges } from "@/components/infra/ProxyBadges";
import { SectionHeader } from "@/components/infra/SectionHeader";
import { PROXY_STACKS, DOCKER_STACKS, SERVICES } from "@/config/infrastructure";

export default function OverviewPage() {
    const totalComponents = PROXY_STACKS.reduce((s, stack) => {
        const ds = DOCKER_STACKS.find((d) => d.id === stack.stack || d.domain === stack.hosts[0]?.domain);
        return s + (ds?.components.length ?? 0);
    }, 0);
    const totalHosts = PROXY_STACKS.reduce((s, x) => s + x.hosts.length, 0);

    return (
        <div className="grid gap-8">
            {/* KPI row */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <KpiCard label="services" value={SERVICES.length} suffix="surfaces" />
                <HealthKpi />
                <KpiCard label="stacks" value={PROXY_STACKS.length} suffix="running" hint={`${totalComponents} components`} />
                <KpiCard label="domains" value={totalHosts} suffix="routed" hint={`${PROXY_STACKS.length} stacks`} />
            </section>

            {/* Proxy surfaces */}
            <section>
                <SectionHeader
                    title="proxy surfaces"
                    mono={`${PROXY_STACKS.length} stacks · ${totalHosts} hosts`}
                />
                <ProxyBadges stacks={PROXY_STACKS} />
            </section>
        </div>
    );
}
