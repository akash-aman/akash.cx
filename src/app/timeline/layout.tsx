import { Metadata } from "next";
import { generatePageMetadata } from "@/utils/metadata";
import React from "react";

export const metadata: Metadata = generatePageMetadata({
	title: "Timeline",
	description:
		"The career timeline of Akash Aman — from first dial-up connection to Senior Software Engineer at rtCamp, with the milestones in between.",
	path: "/timeline",
});

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
