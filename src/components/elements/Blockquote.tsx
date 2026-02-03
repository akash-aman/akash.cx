import React from "react";
import BQ from "../../assets/icons/bq";
import { Think, Note, Warning, Thought } from "assets/icons/icon";

interface BlockquoteProps {
	children: React.ReactNode;
	className?: string;
}

const Blockquote = ({ children, className }: BlockquoteProps) => {
	if (className == "think") {
		return (
			<div className="blockquote bg-neutral-100 dark:bg-neutral-800 p-10 sm:p-10 rounded-lg">
				<Think className="w-16 inline align-bottom mr-4" />
				<div className="inline Swing-King">{children}</div>
			</div>
		);
	} else if (className == "note") {
		return (
			<div className="blockquote bg-neutral-100 dark:bg-neutral-800 p-10 sm:p-10 rounded-lg">
				<Note className="w-16 inline align-bottom mr-4" />
				<div className="inline Swing-King">{children}</div>
			</div>
		);
	} else if (className == "warning") {
		return (
			<div className="blockquote bg-neutral-100 dark:bg-neutral-800 p-10 sm:p-10 rounded-lg">
				<Warning className="w-16 inline align-bottom mr-4" />
				<div className="inline Swing-King">{children}</div>
			</div>
		);
	} else if (className == "thought") {
		return (
			<div className="blockquote bg-neutral-100 dark:bg-neutral-800 p-10 sm:p-10 rounded-lg">
				<Thought className="w-16 fill-sky-200 inline align-bottom mr-4" />
				<div className="inline Swing-King">{children}</div>
			</div>
		);
	}

	return (
		<div className="blockquote text-[var(--content-bold-font-color)] bg-neutral-100 dark:bg-neutral-800 p-10 sm:p-10 rounded-lg">
			<BQ className="w-16 inline align-bottom mr-4" />
			<div className="inline Swing-King">
				{(children as any)?.[1]?.props?.children?.[0]}
			</div>
		</div>
	);
};

export default Blockquote;
