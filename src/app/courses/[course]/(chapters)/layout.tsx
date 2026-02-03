
import Sidebar from "./Sidebar";
import {
	CourseSidebarQuery,
	CourseSidebarDocument,
	CourseSidebarQueryVariables,
} from "generated/graphql";
import { gqlAPI } from "@/config/constant";
import { notFound } from "next/navigation";
import { wretch } from "@/utils/fetchapi";
/**
 * This function will get all the sections of the course.
 *
 * @param 	{string} slug Slug of the course.
 * @returns {Array}	 	  All the sections of the course.
 */

/**
 * This layout will contain the sidebar of all the chapters.
 * All the chapters heading.
 *
 * @returns
 */
export default async function Layout(props: { children: React.ReactNode; params: Promise<any> }) {
	const params = await props.params;
	const { children } = props;
	const course = await wretch<CourseSidebarQuery, CourseSidebarQueryVariables>(
		gqlAPI,
		CourseSidebarDocument,
		{ slug: params.course },
		{ tags: [params.course, "courses"] },
	);

	if (!course) {
		notFound();
	}

	return (
		<Sidebar course={course} params={params}>
			{children}
		</Sidebar>
	);
}

/**
 * This function will generate all the static params for the course.
 *
 * @returns {Array} - Array of all the courses slug.
 */

/**
 * This is the dynamic route for the course.
 *
 * https://beta.nextjs.org/docs/api-reference/segment-config#dynamic
 */
export const dynamic = "force-static";
