import { Metadata } from "next";
import { generatePageMetadata } from "@/utils/metadata";
import { ServiceGrid } from "@/components/infra/ServiceGrid";
import { CertHeatmap } from "@/components/infra/CertHeatmap";
import { SectionHeader } from "@/components/infra/SectionHeader";
import { resolveServices } from "@/utils/infra/services";

export const metadata: Metadata = generatePageMetadata({
    absoluteTitle: "Services · Infrastructure | Akash Aman",
    description:
        "Live status, uptime and TLS certificate expiry for every service Akash Aman self-hosts, refreshed every minute.",
    path: "/infrastructure/services",
});

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
                as="h1"
                mono={`${items.length} surfaces · ${source}`}
            />
            <ServiceGrid services={items} />
            <CertHeatmap certs={certs} />
        </div>
    );
}
