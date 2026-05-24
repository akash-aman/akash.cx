import { ArchView } from "@/components/infra/ArchView";
import { SectionHeader } from "@/components/infra/SectionHeader";
import { DOCKER_STACKS } from "@/config/infrastructure";

const NON_VPS = new Set(["cloudflare", "layout"]);

export default function ArchitecturePage() {
    const vpsStacks = DOCKER_STACKS.filter((s) => !NON_VPS.has(s.id));
    const total = vpsStacks.reduce((s, x) => s + x.components.length, 0);

    return (
        <div className="grid gap-6">
            <SectionHeader
                title="docker compose stacks"
                mono={`${vpsStacks.length} stacks · ${total} components`}
            />
            <ArchView />
        </div>
    );
}
