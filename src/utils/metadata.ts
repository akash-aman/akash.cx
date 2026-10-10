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
            types: { "application/rss+xml": [{ url: "/feed.xml", title: `${siteName} — Blog` }] },
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


export const personId = `${baseURL}/#person`;
export const websiteId = `${baseURL}/#website`;

/** Short reference to the site owner; resolves to the full Person node on the home and about pages. */
export const personRef = { "@type": "Person", "@id": personId, name: siteName, url: baseURL };

/**
 * The full Person entity. Search and answer engines use it to tie every page,
 * article and course on the site to one identity (and to the sameAs profiles).
 */
export const personLd = {
    "@type": "Person",
    "@id": personId,
    name: siteName,
    url: baseURL,
    image: `${baseURL}/portfolio.png`,
    description:
        "Akash Aman is a Senior Software Engineer at rtCamp who builds fast, scalable web apps with React, Next.js, Go and WordPress, contributes to open source and teaches programming through free courses.",
    jobTitle: "Senior Software Engineer",
    worksFor: { "@type": "Organization", name: "rtCamp", url: "https://rtcamp.com" },
    knowsAbout: [
        "Web performance",
        "React",
        "Next.js",
        "Go",
        "TypeScript",
        "JavaScript",
        "WordPress",
        "GraphQL",
        "Node.js",
        "Docker",
        "Kubernetes",
        "System design",
    ],
    sameAs: [
        "https://github.com/akash-aman",
        "https://www.linkedin.com/in/aman-akash/",
        "https://twitter.com/sirakashaman",
        "https://www.youtube.com/@xcode-io",
    ],
};

export const websiteLd = {
    "@type": "WebSite",
    "@id": websiteId,
    name: siteName,
    url: baseURL,
    description: "Portfolio, engineering blog and free programming courses by Akash Aman.",
    inLanguage: "en",
    publisher: { "@id": personId },
};

/** Wraps nodes in a single schema.org graph. */
export const graph = (...nodes: (object | null | undefined | false)[]) => ({
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
});

/**
 * BreadcrumbList for a page. Pass the trail after "Home", e.g.
 * [{ name: "Blogs", path: "/blogs" }, { name: post.title, path: `/blogs/${slug}` }].
 */
export function breadcrumbLd(trail: { name?: string | null; path: string }[]) {
    return {
        "@type": "BreadcrumbList",
        itemListElement: [{ name: "Home", path: "/" }, ...trail].map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name || siteName,
            item: `${baseURL}${item.path === "/" ? "" : item.path}`,
        })),
    };
}

/** WebPage-style node (WebPage, CollectionPage, ProfilePage, AboutPage) tied to the site and its owner. */
export function pageLd({
    type = "WebPage",
    name,
    description,
    path,
    ...rest
}: {
    type?: "WebPage" | "CollectionPage" | "ProfilePage";
    name: string;
    description?: string;
    path: string;
    [key: string]: unknown;
}) {
    return {
        "@type": type,
        "@id": `${baseURL}${path}#webpage`,
        name,
        description,
        url: `${baseURL}${path}`,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        ...rest,
    };
}

/** ItemList of linked entries, in the order given. */
export function itemListLd(items: object[]) {
    return {
        "@type": "ItemList",
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item,
        })),
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
    /** Topic tags, emitted as keywords. */
    keywords?: (string | null | undefined)[];
    /** Markdown/HTML body, used only to compute wordCount. */
    content?: string | null;
    /** The course a chapter belongs to. */
    partOf?: { name?: string | null; path: string };
    /** A course's chapters, in order. */
    parts?: { name?: string | null; path: string }[];
}

/**
 * Builds the schema.org node for a blog post, course chapter or course.
 */
export function contentJsonLd({
    type,
    title,
    description,
    path,
    image,
    datePublished,
    dateModified,
    keywords,
    content,
    partOf,
    parts,
}: JsonLdParams) {
    description = cleanExcerpt(description);
    const url = `${baseURL}${path}`;
    const tags = keywords?.filter(Boolean) as string[] | undefined;

    if (type === "Course") {
        return {
            "@type": "Course",
            "@id": `${url}#course`,
            name: title,
            description,
            url,
            image: image || undefined,
            provider: personRef,
            author: personRef,
            isAccessibleForFree: true,
            offers: { "@type": "Offer", price: 0, priceCurrency: "USD", category: "Free" },
            inLanguage: "en",
            keywords: tags?.length ? tags.join(", ") : undefined,
            dateModified: dateModified || undefined,
            hasPart: parts?.length
                ? parts.map((part) => ({
                    "@type": "LearningResource",
                    name: part.name,
                    url: `${baseURL}${part.path}`,
                }))
                : undefined,
        };
    }

    const wordCount = content
        ? content.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length
        : undefined;

    return {
        "@type": type,
        "@id": `${url}#article`,
        headline: title,
        description,
        url,
        mainEntityOfPage: url,
        image: image || `${baseURL}${defaultImage.url}`,
        datePublished: datePublished || undefined,
        dateModified: dateModified || datePublished || undefined,
        author: personRef,
        publisher: personRef,
        inLanguage: "en",
        keywords: tags?.length ? tags.join(", ") : undefined,
        wordCount: wordCount || undefined,
        isAccessibleForFree: true,
        isPartOf: partOf
            ? { "@type": "Course", name: partOf.name, url: `${baseURL}${partOf.path}` }
            : { "@id": websiteId },
    };
}
