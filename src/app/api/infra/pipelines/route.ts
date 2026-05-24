import { NextResponse } from "next/server";
import { getPipelineRuns } from "@/utils/infra/github";

export const revalidate = 120;

export async function GET() {
    const data = await getPipelineRuns(5);
    return NextResponse.json(data, {
        headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300" },
    });
}
