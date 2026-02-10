"use client";
import clsx from "clsx";
import Link from "next/link";
import useKeyboard from "hooks/useKeyboard";
import { CourseSidebarQuery } from "@/generated/graphql";
import { notFound } from "next/navigation";
import React from "react";
type SidebarProps = {
	children: React.ReactNode;
	course: CourseSidebarQuery;
	params: any;
};

/**
 * This component is the sidebar for the course page.
 *
 * @param param0 children - children of the component
 * @param param1 section - section of the component
 * @param param2 params - params of the component
 * @returns jsx element.
 */
const Sidebar = ({ children, course, params }: SidebarProps): React.JSX.Element | null => {
	if (params == null) {
		return null;
	}
	if (!course) {
		notFound();
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [show, setShow, props] = useKeyboard(true, "KeyB");

	const toggle = () => {
		localStorage.setItem("key", `${!show}`);
		setShow(!show);
	};

	const formatISODuration = (isoDuration: string) => {
		const match = isoDuration.match(/PT(\d+M)?(\d+S)?/);
		if (!match) {
			return "00:00";
		}
		const minutes = match[1] ? parseInt(match[1].replace("M", "")) : 0;
		const seconds = match[2] ? parseInt(match[2].replace("S", "")) : 0;
		return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""
			}${seconds}`;
	};

	return (
		<section
			className={clsx(
				"grid grid-flow-row grid-cols-1 sm:grid-cols-[1fr_3rem] xl:grid-cols-[960px_3rem] xl:gap-y-0 gap-x-8 justify-center",
				{
					"2xl:grid-cols-[360px_930px_3rem] 2xl:gap-4 xl:gap-8":
						show,
					"2xl:grid-cols-[45px_960px_3rem] 2xl:gap-2 xl:gap-4":
						!show,
				},
			)}
		>
			<aside
				className={clsx("row-start-2 2xl:row-start-1 2xl:row-span-2", {
					"xl:pr-6": show,
				})}
			>
				<button {...props} />
				<section
					className={clsx(
						"py-5 bg-opacity-90 sticky h-[85vh] top-20 scrollbar overflow-x-hidden overflow-y-auto pr-4",
						{ "xl:pr-6": show },
					)}
				>
					{course.course?.chapters?.chapters?.map((chapter, index) => {
						const { title, slug, readTime, section, emogi } = chapter || {};

						return (
							chapter && (
								<div key={slug}>
									{section?.section && (
										<>
											<li className="flex gap-2 p-1 pt-4">
												<span
													className="max-w-fit emogi hover:cursor-pointer text-lg"
													onClick={toggle}
												>
													{emogi?.emogi}
												</span>
												<h5
													className={clsx(
														"mt-1 italic font-extrabold uppercase text-lg",
														{
															hidden: !show,
														},
													)}
												>
													{section?.section}
												</h5>
											</li>
											<div className="mx-auto w-full my-2 h-1 bg-linear-to-r from-orange-300 to-orange-200 dark:from-orange-300 dark:to-orange-500 rounded-full"></div>
										</>
									)}
									<div
										className={clsx(
											`p-[6px] flex justify-between div-${slug}`,
											{
												"hidden xz": !show,
											},
										)}
									>
										<Link
											className={clsx(`text-base sidebar-subheading ${slug}`)}
											href={`/courses/${course?.course?.slug}/${slug}`}
										>
											{title}
										</Link>

										{/* Readtime */}
										<div className="text-xs dark:text-gray-500 text-gray-400 items-end flex">
											{formatISODuration(readTime || "")}
										</div>
										<span className="text-base text-white items-end hidden">
											🔥
										</span>
									</div>
								</div>
							)
						);
					})}
				</section>
			</aside>
			
			{children}
		</section>
	);
};

export default Sidebar;
