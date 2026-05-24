import { NextResponse } from "next/server";
import { resolveServices } from "@/utils/infra/services";

export const revalidate = 60;

export async function GET() {
    const data = await resolveServices();
    return NextResponse.json(data, {
        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" },
    });
}
