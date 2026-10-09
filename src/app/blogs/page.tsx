import {
	BlogsPageQuery,
	BlogsPageQueryVariables,
	BlogsPageDocument,
} from "generated/graphql";
import { Metadata } from "next";
import { generatePageMetadata } from "@/utils/metadata";
import { gqlAPI } from "@/config/constant";
import { wretch } from "@/utils/fetchapi";
import Footer from "@/components/blocks/Footer";
import Card from "@/components/blocks/Card";

export const metadata: Metadata = generatePageMetadata({
	title: "Blogs",
	description:
		"Engineering write-ups by Akash Aman on web performance, React, WordPress, Go and system design — real problems, real benchmarks, and the code behind them.",
	path: "/blogs",
});

/**
 * This function generates the page.
 *
 * @returns
 */
const Page = async () => {
	const { blogs } = await wretch<BlogsPageQuery, BlogsPageQueryVariables>(
		gqlAPI,
		BlogsPageDocument,
		{ first: 5 },
		{ tags: ["blogs-archive"] },
	);

	return (
		<article className='max-w-5xl mx-auto'>
			<header>
				<h1 className="heading-1 py-8 border-b border-(--dark-theme-300)">Blogs </h1>
			</header>
			<article className='py-8 space-y-10 grid w-full grid-cols-[repeat(auto-fill,minmax(230px,320px))] justify-center gap-8'>
				{blogs?.nodes?.map((blog) => (
					<Card type='blog' key={blog?.slug} fields={blog} />
				))}
			</article>
			<Footer />
		</article>
	);
};

export default Page;
