import { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { baseURL } from "config/constant";

// Note: Fonts are defined here but were not being utilized in the layout previously.
// Keeping them here for future use if needed, preserving the original intent.
export const webFont = Poppins({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-content",
    preload: true,
});

export const headFont = Poppins({
    subsets: ["latin"],
    weight: "900",
    variable: "--font-heading",
    preload: true,
});

export const svgFont = Poppins({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-svg",
    preload: false,
});

export const codeFont = Poppins({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-code",
    preload: false,
});

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
        "Welcome to the captivating realm of Akash Aman. Witness the fusion of art and technology in this Full Stack Developer's portfolio. Immerse yourself in a symphony of elegant full stack sorcery, and transformative web experiences.",
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
            "Welcome to the captivating realm of Akash Aman. Witness the fusion of art and technology through full stack dev & transformative web experiences.",
        url: baseURL,
        images: [
            {
                url: "/Portfolio.png",
                width: 1920,
                height: 952,
                alt: "Akash Aman | Full Stack Dev",
            },
        ],
        type: "website",
        siteName: "Akash Aman | Full Stack Dev",
        countryName: "India",
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    twitter: {
        creatorId: "@sirakashaman",
        creator: "Akash Aman",
        site: baseURL,
        images: [
            {
                url: "/Portfolio.png",
                width: 1920,
                height: 952,
                alt: "Akash Aman | Full Stack Dev",
            },
        ],
        title: "Akash Aman | Full Stack Dev",
        description:
            "Welcome to the captivating realm of Akash Aman. Witness the fusion of art and technology through full stack dev & transformative web experiences.",
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
    // colorScheme: "light dark",
    // themeColor: "#000000",
};
