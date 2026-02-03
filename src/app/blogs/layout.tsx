import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: {
		template: "%s | Blogs",
		default: "Blogs",
	},
};

export default async function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
