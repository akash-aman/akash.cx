import {
	CoursesPageQuery,
	CoursesPageQueryVariables,
	CoursesPageDocument,
} from "generated/graphql";
import { gqlAPI } from "@/config/constant";
import { Metadata } from "next";
import { wretch } from "@/utils/fetchapi";

/**
 * This is the metadata for the page.
 */
export const metadata: Metadata = {
	title: {
		absolute: "Courses",
	},
	description:
		"Explore insightful and informative courses in various topics. akash.cx offers a collection of educational & insightful articles that cover diverse topics related to software & technology. Visit the Courses  page to access valuable resources.",
	keywords: [
		"Courses",
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
	openGraph: {
		title: "Courses",
		description:
			"Explore insightful and informative courses in various topics. akash.cx offers a collection of educational & insightful articles that cover diverse topics related to software & technology. Visit the Courses  page to access valuable resources.",
		url: "https://akash.cx",
		images: [
			{
				url: "/Portfolio.png",
				width: 1920,
				height: 952,
				alt: "Courses",
			},
		],
		type: "website",
		siteName: "Courses",
		countryName: "India",
	},
	twitter: {
		creatorId: "@sirakashaman",
		creator: "Akash Aman",
		site: "https://akash.cx",
		images: [
			{
				url: "/Portfolio.png",
				width: 1920,
				height: 952,
				alt: "Courses",
			},
		],
		title: "Courses",
		description:
			"Explore insightful and informative courses in various topics. Akash.cx offers a collection of educational & insightful articles that cover diverse topics related to software & technology. Visit the Courses page to access valuable resources.",
	},
};

/**
 * This function generates the page.
 *
 * @returns jsx element.
 */
const Page = async () => {
	const { courses } = await wretch<CoursesPageQuery, CoursesPageQueryVariables>(
		gqlAPI,
		CoursesPageDocument,
		{ first: 10 },
		{ tags: ["courses-archive"] },
	);

	return (
		<div className="grid w-full grid-cols-[repeat(auto-fill,minmax(230px,350px))] justify-center gap-8 h-fit">
			<pre>{JSON.stringify(courses, null, 2)}</pre>
		</div>
	);
};

export default Page;
