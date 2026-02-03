import {
	BlogRoutesQuery,
	BlogRoutesQueryVariables,
	BlogRoutesDocument,
	BlogPageQuery,
	BlogPageDocument,
	BlogPageQueryVariables,
} from "generated/graphql";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { wretch } from "@/utils/fetchapi";
import { gqlAPI } from "@/config/constant";
import { generatePageMetadata } from "@/utils/metadata";

type MetaProps = {
	params: Promise<{ blog: string }>;
};

export async function generateMetadata(
	props: MetaProps,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const params = await props.params;

	const { blog } = await wretch<BlogPageQuery, BlogPageQueryVariables>(
		gqlAPI,
		BlogPageDocument,
		{ slug: params.blog },
		{ tags: [params.blog, "blogs"] },
	);

	return generatePageMetadata({
		title: blog?.title,
		description: blog?.excerpt,
		slug: blog?.slug,
		image: {
			url: blog?.featuredImage?.node?.mediaItemUrl,
			width: blog?.featuredImage?.node?.mediaDetails?.width,
			height: blog?.featuredImage?.node?.mediaDetails?.height,
			alt: blog?.featuredImage?.node?.caption,
		},
		pathPrefix: "/blogs",
	});
}

type Props = {
	params: Promise<{ blog: string }>;
};

const Blog = async (props: Props) => {
	const params = await props.params;
	const { blog } = await wretch<BlogPageQuery, BlogPageQueryVariables>(
		gqlAPI,
		BlogPageDocument,
		{ slug: params.blog },
		{ tags: [params.blog, "blogs"] },
	);

	if (!blog) {
		notFound();
	}

	return <pre>{JSON.stringify(blog, null, 2)}</pre>;
};

export default Blog;

export async function generateStaticParams() {
	const { routes } = await wretch<BlogRoutesQuery, BlogRoutesQueryVariables>(
		gqlAPI,
		BlogRoutesDocument,
		{ first: 100 },
		{ tags: ["blog-routes"] },
	);

	return routes?.nodes
		?.filter((node) => node?.slug)
		.map((node) => ({
			blog: node.slug as string,
		})) || [];
}

export const dynamic = "force-static";
