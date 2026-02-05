import { Metadata } from "next";
import React from "react";

/**
 * This is the metadata for the page.
 */
export const metadata: Metadata = {
	title: "Timeline",
	description:
		"Explore the journey and milestones of Akash Aman. Timeline showcases the progression of their career, highlighting significant achievements and experiences. Visit the Timeline page to gain insights into Akash's growth, expertise in software development.",
	keywords: [
		"Techstack",
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
	openGraph: {
		title: "Projects | Akash | Full Stack Dev",
		description:
			"Explore the journey and milestones of Akash Aman. Timeline showcases the progression of their career, highlighting significant achievements and experiences. Visit the Timeline page to gain insights into Akash's growth, expertise in software development.",
		url: "https://akash.cx",
		images: [
			{
				url: "/akash.cx.png",
				width: 1920,
				height: 952,
				alt: "Akash Aman | Full Stack Dev",
			},
		],
		type: "website",
		siteName: "Akash Aman | Full Stack Dev",
		countryName: "India",
	},
	twitter: {
		creatorId: "@sirakashaman",
		creator: "Akash Aman",
		site: "https://akash.cx",
		images: [
			{
				url: "/akash.cx.png",
				width: 1920,
				height: 952,
				alt: "Akash Aman | Full Stack Dev",
			},
		],
		title: "Projects | Akash | Full Stack Dev",
		description:
			"Explore the journey and milestones of Akash Aman. Timeline showcases the progression of their career, highlighting significant achievements and experiences. Visit the Timeline page to gain insights into Akash's growth, expertise in software development.",
	},
};

/**
 * This is the layout for the page.
 *
 * @param param0 children - children of the component
 * @returns jsx element.
 */
export default function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
