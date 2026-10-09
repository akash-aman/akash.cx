import { Metadata } from "next";
import { generatePageMetadata } from "@/utils/metadata";
import { ArchView } from "@/components/infra/ArchView";
import { SectionHeader } from "@/components/infra/SectionHeader";
import { DOCKER_STACKS } from "@/config/infrastructure";

export const metadata: Metadata = generatePageMetadata({
    absoluteTitle: "Architecture · Infrastructure | Akash Aman",
    description:
        "Architecture of Akash Aman's self-hosted VPS — every Docker Compose stack, its components and how traffic flows between them.",
    path: "/infrastructure/architecture",
});

const NON_VPS = new Set(["cloudflare"]);

export default function ArchitecturePage() {
    const vpsStacks = DOCKER_STACKS.filter((s) => !NON_VPS.has(s.id));
    const total = vpsStacks.reduce((s, x) => s + x.components.length, 0);

    return (
        <div className="grid gap-6">
            <SectionHeader
                title="docker compose stacks"
                as="h1"
                mono={`${vpsStacks.length} stacks · ${total} components`}
            />
            <ArchView />
        </div>
    );
}
