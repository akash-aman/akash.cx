import { PipelineList } from "@/components/infra/PipelineList";
import { SectionHeader } from "@/components/infra/SectionHeader";
import { getPipelineRuns } from "@/utils/infra/github";

export const revalidate = 120;

export default async function PipelinesPage() {
    const { runs, source } = await getPipelineRuns(5);

    return (
        <div className="grid gap-6">
            <SectionHeader
                title="pipelines"
                mono={`github actions · ${source}`}
            />
            <PipelineList runs={runs} source={source} />
        </div>
    );
}
