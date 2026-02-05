"use client";
import React, { useState } from "react";

interface TocProps {
	isExist: boolean;
	children: React.ReactNode;
}

const Toc = (props: TocProps) => {
	const { isExist, children } = props;
	const [isOpen, setIsOpen] = useState(false);

	const toggleToc = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			{isExist && (
				<>
					<nav className="toc-details mb-0 select-none">
						<div
							className="toc-heading my-4 flex justify-between"
							onClick={toggleToc}
						>
							<h2 className="inline-block heading-2">Table of Contents</h2>
							<span className="text-4xl text-orange-300">
								{isOpen ? "▲" : "▼"}
							</span>
						</div>
						{
							isOpen && <div
								className="toc-content scrollbar max-h-80 mr animate-page-enter overflow-y-auto xl:mr-6"
							>
								{children}
							</div>
						}
					</nav>
				</>
			)}
		</>
	);
};

export default Toc;
