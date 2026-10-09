import { Metadata } from "next";
import { generatePageMetadata } from "@/utils/metadata";
import { PipelineList } from "@/components/infra/PipelineList";
import { SectionHeader } from "@/components/infra/SectionHeader";
import { getPipelineRuns } from "@/utils/infra/github";

export const metadata: Metadata = generatePageMetadata({
    absoluteTitle: "Pipelines · Infrastructure | Akash Aman",
    description:
        "Recent GitHub Actions CI/CD pipeline runs that build and deploy Akash Aman's self-hosted infrastructure.",
    path: "/infrastructure/pipelines",
});

export const revalidate = 120;

export default async function PipelinesPage() {
    const { runs, source } = await getPipelineRuns(5);

    return (
        <div className="grid gap-6">
            <SectionHeader
                title="pipelines"
                as="h1"
                mono={`github actions · ${source}`}
            />
            <PipelineList runs={runs} source={source} />
        </div>
    );
}
