import { Metadata } from "next";
import React from "react";

/**
 * This is the metadata for the page.
 */
export const metadata: Metadata = {
	title: "Projects",
	description:
		"Explore the diverse projects of Akash Aman.  Visit the Projects page to view Akash`s portfolio and witness their creativity and passion for software development.",
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
			"Explore the diverse projects of Akash Aman.  Visit the Projects page to view Akash`s portfolio and witness their creativity and passion for software development.",
		url: "https://akash.cx",
		images: [
			{
				url: "/portfolio.png",
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
				url: "/portfolio.png",
				width: 1920,
				height: 952,
				alt: "Akash Aman | Full Stack Dev",
			},
		],
		title: "Projects | Akash | Full Stack Dev",
		description:
			"Explore the diverse projects of Akash Aman.  Visit the Projects page to view Akash`s portfolio and witness their creativity and passion for software development.",
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
