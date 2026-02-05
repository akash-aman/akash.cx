"use client";
import { FC, ReactNode, useRef, useState } from "react";
import { Copy, Tick } from "assets/icons/icon";

interface CodeProps {
	children: ReactNode;
	className: string;
	inline: boolean;
}

const RehypeCode: FC<CodeProps> = ({ children, className, inline }) => {
	const match = /language-(\w+)/.exec(className || "");
	const codeRef = useRef<HTMLPreElement>(null);
	const [copied, setCopied] = useState(false);

	if (inline) {
		return <code className={`${className?.split(" ")[0]}`}>{children}</code>;
	}

	const copyToClipboard = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (codeRef.current) {
			navigator.clipboard.writeText(codeRef.current.innerText);
			setCopied(true);

			const timeOut = setTimeout(() => {
				setCopied(false);
				clearTimeout(timeOut);
			}, 3000);
		}
	};

	if (match === null) {
		return <code>{children}</code>;
	}

	return (
		<>
			<div className="single-tab rounded-t-xl py-1 px-4  bg-(--light-theme-500) dark:bg-(--code-bg-dark-80) flex max-w-min">
				{match[1]}
			</div>
			<pre className="code overflow-x-auto relative">
				<div className="prismjs rounded-b-md max-h-[70vh] rounded-tr-md bg-(--light-theme-500) dark:bg-(--code-bg-dark-30) scrollbar overflow-x-auto p-4">
					<button
						title="Copy to clipboard"
						onClick={copyToClipboard}
						className="p-2 m-4 rounded-lg ctc absolute right-0 top-0 bg-[white] dark:bg-(--code-bg-dark-base)"
					>
						{copied ? (
							<Tick className="h-4 w-4" />
						) : (
							<Copy className="h-4 w-4" />
						)}
					</button>
					<code ref={codeRef} className={match[0]}>
						{children}
					</code>
				</div>
			</pre>
		</>
	);
};

export default RehypeCode;
