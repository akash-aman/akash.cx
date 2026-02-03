import { Metadata } from "next";
import React from "react";

/**
 * This is the metadata for the page.
 */
export const metadata: Metadata = {
	title: {
		template: "%s | Courses",
		default: "Courses",
	},
};

/**
 * This is the layout for the page.
 *
 * @param param0 children - children of the component
 * @returns jsx element.
 */
export default async function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
