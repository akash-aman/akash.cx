import { NextResponse } from "next/server";
import { resolveServices } from "@/utils/infra/services";

export const revalidate = 3600;

export async function GET() {
    const { items, source } = await resolveServices();
    const certs = items
        .filter((s) => s.cert && s.publicDomain)
        .map((s) => ({
            id: s.id,
            alias: s.alias,
            domain: s.publicDomain!,
            issuer: s.cert!.issuer,
            daysToExpiry: s.cert!.daysToExpiry,
            expiresAt: s.cert!.expiresAt,
        }))
        .sort((a, b) => a.daysToExpiry - b.daysToExpiry);
    return NextResponse.json({ source, items: certs }, {
        headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
    });
}
