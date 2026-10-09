import {
	CoursesPageQuery,
	CoursesPageQueryVariables,
	CoursesPageDocument,
} from "generated/graphql";
import { gqlAPI } from "@/config/constant";
import { Metadata } from "next";
import { generatePageMetadata } from "@/utils/metadata";
import { wretch } from "@/utils/fetchapi";
import Card from "@/components/blocks/Card";
import Footer from "@/components/blocks/Footer";

export const metadata: Metadata = generatePageMetadata({
	title: "Courses",
	description:
		"Free, hands-on programming courses by Akash Aman: Mastering Go, data structures & algorithms, design patterns and microservices — explained with runnable examples.",
	path: "/courses",
});

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
		<article className='max-w-5xl mx-auto'>
			<header>
				<h1 className="heading-1 py-8 border-b border-(--dark-theme-300)">Courses </h1>
			</header>
			<article className='py-8 space-y-10 grid w-full grid-cols-[repeat(auto-fill,minmax(230px,320px))] justify-center gap-8'>
				{courses?.nodes?.map((course) => (
					<Card type='course' key={course?.slug} fields={course} />
				))}
			</article>
			<Footer />
		</article>
	);
};

export default Page;
