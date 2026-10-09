import { Metadata, Viewport } from "next";
import { baseURL } from "config/constant";

/**
 * This is the metadata for the page.
 */
export const metadata: Metadata = {
    title: {
        template: "%s | Akash Aman",
        default: "Akash Aman | Full Stack Dev",
    },
    metadataBase: new URL(baseURL),
    description:
        "Akash Aman is a Senior Software Engineer at rtCamp building fast, scalable web apps with React, Next.js, Go and WordPress. Projects, blogs and free courses.",
    keywords: [
        "Akash Aman",
        "SDE",
        "Full Stack Developer",
        "Responsive design",
        "portfolio",
        "projects",
        "coding",
        "Web development",
        "Web design",
        "User Experience",
        "Html",
        "Css",
        "Javascript",
    ],
    applicationName: "Dev.",
    authors: [
        {
            name: "Akash Aman",
            url: baseURL,
        },
    ],
    creator: "Akash Aman",
    publisher: "Akash Aman",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "Akash Aman | Full Stack Dev",
        description:
            "Akash Aman is a Senior Software Engineer at rtCamp building fast, scalable web apps with React, Next.js, Go and WordPress. Projects, blogs and free courses.",
        url: baseURL,
        images: [
            {
                url: "/portfolio.png",
                width: 1920,
                height: 952,
                alt: "Akash Aman | Full Stack Dev",
            },
        ],
        type: "website",
        siteName: "Akash Aman",
        locale: "en_US",
        countryName: "India",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    twitter: {
        card: "summary_large_image",
        creator: "@sirakashaman",
        site: "@sirakashaman",
        images: [
            {
                url: "/portfolio.png",
                width: 1920,
                height: 952,
                alt: "Akash Aman | Full Stack Dev",
            },
        ],
        title: "Akash Aman | Full Stack Dev",
        description:
            "Akash Aman is a Senior Software Engineer at rtCamp building fast, scalable web apps with React, Next.js, Go and WordPress. Projects, blogs and free courses.",
    },
    manifest: "/manifest.json",
    category: "technology",
    appLinks: {
        web: {
            url: baseURL,
            should_fallback: true,
        },
    },
    archives: [
        baseURL,
        baseURL + "/blogs",
        baseURL + "/courses",
        baseURL + "/projects",
    ],
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    userScalable: true,
    colorScheme: "light dark",
    themeColor: "#000000",
};
