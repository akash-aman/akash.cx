import clsx from "clsx";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import CopyButton from "./CopyButton";
// scss is written in main
// import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
interface CodeProps {
	node: any;
	inline: boolean;
	className: string;
	children: any;
	[key: string]: any;
}

const ReactCode: React.FC<CodeProps> = ({
	node,
	inline,
	className,
	code,
	children,
	...props
}) => {
	const match = /language-(\w+)/.exec(className || "");
	//const language = className.replace(/language-/, "")

	return !inline && match ? (
		<>
			<div
				className="single-tab rounded-t-xl mt-8 py-1 px-4   bg-(--card-header) flex max-w-min"
				title={`${match[1]} code`}
			>
				{match[1]}
			</div>
			<div className="relative group w-full overflow-auto scrollbar bg-(--card-bg) p-4">
				<CopyButton text={String(children).replace(/\n$/, "")} />
				<SyntaxHighlighter
					language={match[1]}
					key={match[1]}
					useInlineStyles={false}
					{...props}
					style={{}}
					className="rounded-b-md max-h-[70vh] rounded-tr-md p-4 mb-6"
				>
					{String(children).replace(/\n$/, "")}
				</SyntaxHighlighter>
			</div>
		</>
	) : (
		<code
			className={clsx(
				className,
				"para-md rounded-md px-2 py-1 bg-(--card-bg)",
			)}
			{...props}
		>
			{children}
		</code>
	);
};

export default ReactCode;
