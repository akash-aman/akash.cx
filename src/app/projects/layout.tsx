import { Metadata } from "next";
import { generatePageMetadata } from "@/utils/metadata";
import React from "react";

export const metadata: Metadata = generatePageMetadata({
	title: "Projects",
	description:
		"Projects built by Akash Aman — layout engines, RAG systems, microservices, CMS-driven sites and developer tools, with the stack and source behind each one.",
	path: "/projects",
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
