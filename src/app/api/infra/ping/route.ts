import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
    const raw = req.nextUrl.searchParams.get("domains") ?? "";
    const domains = raw.split(",").map((d) => d.trim()).filter(Boolean);

    const results = await Promise.all(
        domains.map(async (domain): Promise<[string, "healthy" | "down"]> => {
            try {
                const res = await fetch(`https://${domain}`, {
                    method: "HEAD",
                    redirect: "follow",
                    signal: AbortSignal.timeout(5000),
                });
                return [domain, res.status < 500 ? "healthy" : "down"];
            } catch {
                return [domain, "down"];
            }
        })
    );

    return NextResponse.json(Object.fromEntries(results), {
        headers: { "Cache-Control": "no-store" },
    });
}
