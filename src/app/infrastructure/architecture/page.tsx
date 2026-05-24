import { ArchView } from "@/components/infra/ArchView";
import { SectionHeader } from "@/components/infra/SectionHeader";
import { resolveServices } from "@/utils/infra/services";
import { DOCKER_STACKS, type ServiceStatus } from "@/config/infrastructure";

export const revalidate = 60;

export default async function ArchitecturePage() {
    const NON_VPS = new Set(["cloudflare", "layout"]);
    const vpsStacks = DOCKER_STACKS.filter((s) => !NON_VPS.has(s.id));
    const total = vpsStacks.reduce((s, x) => s + x.components.length, 0);
    const { items } = await resolveServices();
    const statusByDomain: Record<string, ServiceStatus> = Object.fromEntries(
        items
            .filter((s) => s.publicDomain)
            .map((s) => [s.publicDomain!.replace(/^\*\./, ""), s.status])
    );

    return (
        <div className="grid gap-6">
            <SectionHeader
                title="docker compose stacks"
                mono={`${vpsStacks.length} stacks · ${total} components`}
            />
            <ArchView statusByDomain={statusByDomain} />
        </div>
    );
}
