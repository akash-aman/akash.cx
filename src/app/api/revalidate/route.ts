import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
type Secret = string;

/**
 * This is the webhook handler for On Demand ISR.
 *
 * @param req NextRequest - Request Object
 * @returns res - response object
 */
export async function POST(req: NextRequest) {
    const body = JSON.parse(await rawBody(req.body)) as Body;

    if (!body) {
        return NextResponse.json({ message: "No body" }, { status: 404 });
    }

    const secret: Secret = process.env.GITHUB_WEBHOOK_SECRET || "";

    const signature: string = req.headers.get("x-hub-signature-256") || "";

    if (signature !== secret) {
        return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
    }

    for (const path of body.paths) {
        try {
            await revalidatePath(path);
        } catch (error) {
            console.error(error);
            return NextResponse.json(
                { message: "Error Revalidating", error: error },
                { status: 500 },
            );
        }
    }

    for (const tag of body.tags) {
        try {
            await revalidateTag(tag, "max");
        } catch (error) {
            console.error(error);
            return NextResponse.json(
                { message: "Error Revalidating", error: error },
                { status: 500 },
            );
        }
    }

    return NextResponse.json({ message: "Revalidated" }, { status: 200 });
}

/**
 * This is the webhook handler for On Demand ISR.
 *
 * @param req NextRequest - Request Object
 * @returns res - response object
 */
export async function GET(req: NextRequest) {
    return NextResponse.json(`Not Allowed 😈`, { status: 404 });
}

/*
 * Body
 */
type Body = {
    paths: string[];
    tags: string[];
};

/**
 * This function is used to get the raw body of the request.
 *
 * @param req NextApiRequest - request object
 * @returns Promise<string> - raw body
 */
async function rawBody(responseBody: ReadableStream<Uint8Array> | null): Promise<string> {
    if (!responseBody) {
        return "";
    }
    const reader = responseBody.getReader();
    const chunks: Uint8Array[] = [];

    while (true) {
        const { done, value } = await reader.read();

        if (done) {
            break;
        }

        if (value) {
            chunks.push(value);
        }
    }

    const concatenatedChunks = new Uint8Array(
        chunks.reduce((acc, chunk) => acc + chunk.length, 0),
    );
    let offset = 0;

    for (const chunk of chunks) {
        concatenatedChunks.set(chunk, offset);
        offset += chunk.length;
    }

    return new TextDecoder().decode(concatenatedChunks);
}
