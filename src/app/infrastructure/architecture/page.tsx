import { ArchView } from "@/components/infra/ArchView";
import { SectionHeader } from "@/components/infra/SectionHeader";
import { resolveServices } from "@/utils/infra/services";
import { DOCKER_STACKS } from "@/config/infrastructure";

export const revalidate = 60;

export default async function ArchitecturePage() {
    const total = DOCKER_STACKS.reduce((s, x) => s + x.components.length, 0);
    const { items } = await resolveServices();
    const statusByDomain: Record<string, string> = Object.fromEntries(
        items
            .filter((s) => s.publicDomain)
            .map((s) => [s.publicDomain!.replace(/^\*\./, ""), s.status])
    );

    return (
        <div className="grid gap-6">
            <SectionHeader
                title="docker compose stacks"
                mono={`${DOCKER_STACKS.length} stacks · ${total} components`}
            />
            <ArchView statusByDomain={statusByDomain} />
        </div>
    );
}
