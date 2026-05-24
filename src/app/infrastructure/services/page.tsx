import { ServiceGrid } from "@/components/infra/ServiceGrid";
import { CertHeatmap } from "@/components/infra/CertHeatmap";
import { SectionHeader } from "@/components/infra/SectionHeader";
import { resolveServices } from "@/utils/infra/services";

export const revalidate = 60;

export default async function ServicesPage() {
    const { items, source } = await resolveServices();
    const certs = items
        .filter((s) => s.cert && s.publicDomain)
        .map((s) => ({
            id: s.id,
            alias: s.alias,
            domain: s.publicDomain!,
            issuer: s.cert!.issuer,
            daysToExpiry: s.cert!.daysToExpiry,
        }));

    return (
        <div className="grid gap-8">
            <SectionHeader
                title="services"
                mono={`${items.length} surfaces · ${source}`}
            />
            <ServiceGrid services={items} />
            <CertHeatmap certs={certs} />
        </div>
    );
}
