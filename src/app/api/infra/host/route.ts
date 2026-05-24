import { NextResponse } from "next/server";
import { getHostSnapshot } from "@/utils/infra/host";

export const revalidate = 30;

export async function GET() {
    const snap = await getHostSnapshot();
    return NextResponse.json(snap, {
        headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" },
    });
}
