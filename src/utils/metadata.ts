import { Metadata } from "next";
import { baseURL } from "@/config/constant";

export const siteName = "Akash Aman";
export const twitterHandle = "@sirakashaman";

const defaultImage = {
    url: "/portfolio.png",
    width: 1920,
    height: 952,
    alt: "Akash Aman | Full Stack Dev",
};

const entities: Record<string, string> = {
    "&amp;": "&",
    "&quot;": '"',
    "&#039;": "'",
    "&#8217;": "’",
    "&#8216;": "‘",
    "&#8220;": "“",
    "&#8221;": "”",
    "&#8211;": "–",
    "&#8212;": "—",
    "&nbsp;": " ",
    "&hellip;": "…",
    "&#8230;": "…",
};

/**
 * Turns a WordPress excerpt into a plain-text description: strips tags,
 * decodes common entities and drops the trailing "[…]" auto-excerpt marker.
 */
export function cleanExcerpt(excerpt?: string | null): string | undefined {
    if (!excerpt) return undefined;
    const text = excerpt
        .replace(/<[^>]*>/g, "")
        .replace(/&[#\w]+;/g, (e) => entities[e] ?? e)
        .replace(/\s*\[…\]\s*$/, "…")
        .replace(/\s+/g, " ")
        .trim();
    return text || undefined;
}

interface MetadataParams {
    title?: string | null;
    /** Overrides the "%s | Akash Aman" title template when set. */
    absoluteTitle?: string;
    description?: string | null;
    /** Site-relative path of the page, e.g. "/blogs/my-post". Resolved against metadataBase. */
    path: string;
    image?: {
        url?: string | null;
        width?: number | null;
        height?: number | null;
        alt?: string | null;
    } | null;
    type?: "website" | "article";
    publishedTime?: string | null;
    modifiedTime?: string | null;
    keywords?: string[];
}

/**
 * Builds page metadata with a canonical URL, Open Graph and Twitter cards.
 *
 * Next.js replaces (not merges) `openGraph` and `twitter` from parent segments,
 * so every page needs the full set of fields, which this helper provides.
 */
export function generatePageMetadata({
    title,
    absoluteTitle,
    description,
    path,
    image,
    type = "website",
    publishedTime,
    modifiedTime,
    keywords,
}: MetadataParams): Metadata {
    description = cleanExcerpt(description);
    const socialTitle = absoluteTitle ?? (title ? `${title} | ${siteName}` : siteName);
    const images = [
        image?.url
            ? {
                url: image.url,
                width: image.width || undefined,
                height: image.height || undefined,
                alt: image.alt || title || undefined,
            }
            : defaultImage,
    ];

    return {
        title: absoluteTitle ? { absolute: absoluteTitle } : title || undefined,
        description: description || undefined,
        keywords,
        alternates: {
            canonical: path,
        },
        openGraph: {
            title: socialTitle,
            description: description || undefined,
            url: path,
            siteName,
            locale: "en_US",
            images,
            ...(type === "article"
                ? {
                    type: "article",
                    publishedTime: publishedTime || undefined,
                    modifiedTime: modifiedTime || undefined,
                    authors: [siteName],
                }
                : { type: "website" }),
        },
        twitter: {
            card: "summary_large_image",
            title: socialTitle,
            description: description || undefined,
            images,
            site: twitterHandle,
            creator: twitterHandle,
        },
    };
}


interface JsonLdParams {
    type: "BlogPosting" | "TechArticle" | "Course";
    title?: string | null;
    description?: string | null;
    path: string;
    image?: string | null;
    datePublished?: string | null;
    dateModified?: string | null;
}

/**
 * Builds schema.org structured data for blog posts, course chapters and courses.
 */
export function contentJsonLd({
    type,
    title,
    description,
    path,
    image,
    datePublished,
    dateModified,
}: JsonLdParams) {
    description = cleanExcerpt(description);
    const url = `${baseURL}${path}`;
    const author = { "@type": "Person", name: siteName, url: baseURL };

    if (type === "Course") {
        return {
            "@context": "https://schema.org",
            "@type": "Course",
            name: title,
            description,
            url,
            image: image || undefined,
            provider: author,
            isAccessibleForFree: true,
            inLanguage: "en",
        };
    }

    return {
        "@context": "https://schema.org",
        "@type": type,
        headline: title,
        description,
        url,
        mainEntityOfPage: url,
        image: image || `${baseURL}${defaultImage.url}`,
        datePublished: datePublished || undefined,
        dateModified: dateModified || datePublished || undefined,
        author,
        publisher: author,
        inLanguage: "en",
    };
}
