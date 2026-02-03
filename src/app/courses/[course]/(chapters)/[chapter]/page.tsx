
import { ParsedUrlQuery } from "querystring";
import {
	CourseRoutesQuery,
	CourseRoutesQueryVariables,
	CourseRoutesDocument,
	ChapterPageQuery,
	ChapterPageDocument,
	ChapterPageQueryVariables,
} from "generated/graphql";

import { gqlAPI } from "@/config/constant";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { wretch } from "@/utils/fetchapi";
import { generatePageMetadata } from "@/utils/metadata";

type MetaProps = {
	params: Promise<{ chapter: string; course: string }>;
};

/**
 * This function generates the metadata for the page.
 *
 * @param param0 params - params of the page
 * @param param1 searchParams - searchParams of the page
 * @param parent parent - parent metadata
 * @returns
 */
export async function generateMetadata(
	props: MetaProps,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const params = await props.params;

	const { chapter } = await wretch<ChapterPageQuery, ChapterPageQueryVariables>(
		gqlAPI,
		ChapterPageDocument,
		{ slug: params.chapter },
		{ tags: [params.chapter, params.course, "chapters"] },
	);

	return generatePageMetadata({
		title: chapter?.title,
		description: chapter?.excerpt,
		slug: chapter?.slug,
		image: {
			url: chapter?.featuredImage?.node?.mediaItemUrl,
			width: chapter?.featuredImage?.node?.mediaDetails?.width,
			height: chapter?.featuredImage?.node?.mediaDetails?.height,
			alt: chapter?.featuredImage?.node?.caption,
		},
		pathPrefix: `/courses/${params.course}`,
	});
}

interface Params extends ParsedUrlQuery {
	course: string;
	chapter: string;
}

type Props = {
	params: Promise<Params>;
};

/**
 * This function generates the page.
 *
 * @param param0 params - params of the page
 * @returns
 */
const Chapter = async (props: Props) => {
	const params = await props.params;
	const { chapter } = await wretch<ChapterPageQuery, ChapterPageQueryVariables>(
		gqlAPI,
		ChapterPageDocument,
		{ slug: params.chapter },
		{ tags: [params.chapter, params.course, "chapters"] },
	);

	if (!chapter) {
		notFound();
	}

	return <pre>{JSON.stringify(chapter, null, 2)}</pre>;
};

export default Chapter;

/**
 * This function generates the static paths for the page.
 *
 * @returns array of paths.
 */
export async function generateStaticParams() {
	const { courses } = await wretch<
		CourseRoutesQuery,
		CourseRoutesQueryVariables
	>(gqlAPI, CourseRoutesDocument, { first: 1000 }, { tags: ["course-routes"] });

	if (!courses?.nodes || !Array.isArray(courses.nodes)) {
		return [];
	}

	return courses.nodes.reduce<{ course: string; chapter: string }[]>(
		(acc, course) => {
			if (
				!course?.slug ||
				!course?.chapters?.chapters ||
				!Array.isArray(course.chapters.chapters)
			) {
				return acc;
			}

			const chapterParams = course.chapters.chapters
				.filter((chapter) => chapter?.slug)
				.map((chapter) => ({
					course: course.slug!,
					chapter: chapter!.slug!,
				}));

			return [...acc, ...chapterParams];
		},
		[],
	);
}

export const dynamic = "force-static";
