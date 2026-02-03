"use client";
import React, { useState } from "react";

const MultiCode = ({ children }: { children: any[] }) => {
	const [blockNo, setBlockNo] = useState(1);

	if (children === undefined) {
		return undefined;
	}

	return (
		<>
			<div className="tab-switcher max-w-min flex" title="tab switcher">
				{children.map((child, i) => {
					const language = child[0]?.props?.className
						.replace(/language-/, "")
						.split(" ")[0];

					if (blockNo === i && language !== undefined) {
						return (
							<button
								title={`${language}`}
								className=" py-1 px-4 rounded-xl bg-[var(--light-theme-500)] dark:bg-[var(--code-bg-dark-base)]"
								onClick={(e) => {
									return setBlockNo(i);
								}}
								key={i}
							>
								{language}
							</button>
						);
					} else if (language !== undefined) {
						return (
							<button
								title={`${language}`}
								className=" py-1 px-4 bg-[var(--code-bg-light-20)] dark:bg-[var(--code-bg-dark-30)]"
								onClick={(e) => {
									return setBlockNo(i);
								}}
								key={i}
							>
								{language}
							</button>
						);
					}
				})}
			</div>

			{children.map((child, i) => {
				const className = child[0]?.props?.className;
				/**
				 * Without this check, the code block will be rendered twice.
				 */
				return blockNo == i && className !== undefined ? child[0] : null;
			})}
		</>
	);
};

export default MultiCode;
