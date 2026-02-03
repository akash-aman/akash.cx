import React from "react";
import {
	CoursePageQuery,
	CoursePageDocument,
	CoursePageQueryVariables,
} from "generated/graphql";
import { gqlAPI } from "@/config/constant";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { wretch } from "@/utils/fetchapi";
import { generatePageMetadata } from "@/utils/metadata";

type MetaProps = {
	params: Promise<{ course: string }>;
};

export async function generateMetadata(
	props: MetaProps,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const params = await props.params;

	const { course } = await wretch<CoursePageQuery, CoursePageQueryVariables>(
		gqlAPI,
		CoursePageDocument,
		{ slug: params.course },
		{ tags: [params.course, "courses"] },
	);

	return generatePageMetadata({
		title: course?.title,
		description: course?.excerpt,
		slug: course?.slug,
		image: {
			url: course?.featuredImage?.node?.mediaItemUrl,
			width: course?.featuredImage?.node?.mediaDetails?.width,
			height: course?.featuredImage?.node?.mediaDetails?.height,
			alt: course?.featuredImage?.node?.caption,
		},
		pathPrefix: "/courses",
	});
}

type Props = {
	params: Promise<{ course: string }>;
};

const Course = async (props: Props) => {
	const params = await props.params;
	const { course } = await wretch<CoursePageQuery, CoursePageQueryVariables>(
		gqlAPI,
		CoursePageDocument,
		{ slug: params.course },
		{ tags: [params.course, "courses"] },
	);

	if (!course) {
		notFound();
	}

	return <pre>{JSON.stringify(course, null, 2)}</pre>;
};

export default Course;

export const dynamic = "force-static";
