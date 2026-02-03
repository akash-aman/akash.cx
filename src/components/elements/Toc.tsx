"use client";
import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

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

	const animationProps = useSpring({
		from: { height: 0, opacity: 0 },
		to: { height: isOpen ? "max-content" : 0, opacity: isOpen ? 1 : 0 },
		config: { duration: 300 },
	});

	return (
		<>
			{isExist && (
				<>
					<nav className="toc-details mb-0">
						<div
							className="toc-heading my-4 flex justify-between"
							onClick={toggleToc}
						>
							<h2 className="inline-block">Table of Contents</h2>
							<span className="text-4xl text-orange-300">
								{isOpen ? "▲" : "▼"}
							</span>
						</div>
						<animated.div
							style={animationProps}
							className="toc-content scrollbar max-h-80 mr overflow-y-auto xl:mr-6"
						>
							{children}
						</animated.div>
					</nav>
				</>
			)}
		</>
	);
};

export default Toc;
