import { Metadata } from "next";
import { baseURL } from "@/config/constant";

interface MetadataParams {
    title?: string | null;
    description?: string | null;
    slug?: string | null;
    image?: {
        url?: string | null;
        width?: number | null;
        height?: number | null;
        alt?: string | null;
    } | null;
    type?: "website" | "article";
    pathPrefix: string;
}

export function generatePageMetadata({
    title,
    description,
    slug,
    image,
    type = "website",
    pathPrefix,
}: MetadataParams): Metadata {
    const url = `${baseURL}${pathPrefix}/${slug}`;

    return {
        title: title || undefined,
        description: description || undefined,
        openGraph: {
            title: title || undefined,
            description: description || undefined,
            images: image?.url
                ? [
                    {
                        url: image.url,
                        width: image.width || undefined,
                        height: image.height || undefined,
                        alt: image.alt || undefined,
                    },
                ]
                : [],
            type: type,
            url: url,
            countryName: "India",
        },
        twitter: {
            title: title || undefined,
            description: description || undefined,
            images: image?.url
                ? [
                    {
                        url: image.url,
                        width: image.width || undefined,
                        height: image.height || undefined,
                        alt: image.alt || undefined,
                    },
                ]
                : [],
            site: url,
        },
    };
}
