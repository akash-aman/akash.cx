"use client";
import { CourseSidebarQuery } from "generated/graphql";
import { notFound } from "next/navigation";
import React from "react";
type SidebarProps = {
	children: React.ReactNode;
	course: CourseSidebarQuery;
	params: any;
};

/**
 * This component is the sidebar for the course page.
 *
 * @param param0 children - children of the component
 * @param param1 section - section of the component
 * @param param2 params - params of the component
 * @returns jsx element.
 */
const Sidebar = ({ children, course, params }: SidebarProps): React.ReactElement | null => {
	if (params == null) {
		return null;
	}

	if (!course) {
		notFound();
	}

	return (
		<section>
			<aside>
				<pre>{JSON.stringify(course, null, 2)}</pre>
			</aside>
			{children}
		</section>
	);
};

export default Sidebar;
