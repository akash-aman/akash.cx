import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
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
				className="single-tab rounded-t-xl mt-8 py-1 px-4  bg-[var(--light-theme-500)] dark:bg-[var(--code-bg-dark-80)] flex max-w-min"
				title={`${match[1]} code`}
			>
				{match[1]}
			</div>
			<SyntaxHighlighter
				language={match[1]}
				className="rounded-b-md rounded-tr-md bg-[var(--light-theme-500)] dark:bg-[var(--code-bg-dark-30)] scrollbar overflow-x-auto p-4"
				PreTag="div"
				key={match[1]}
				style={undefined}
				useInlineStyles={false}
				{...props}
			>
				{String(children).replace(/\n$/, "")}
			</SyntaxHighlighter>
		</>
	) : (
		<code className={className} {...props}>
			{children}
		</code>
	);
};

export default ReactCode;
