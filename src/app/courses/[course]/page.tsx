import React from "react";
import {
	CoursePageQuery,
	CoursePageDocument,
	CoursePageQueryVariables,
} from "generated/graphql";
import { gqlAPI } from "@/config/constant";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { wretch } from "@/utils/fetchapi";
import { generatePageMetadata } from "@/utils/metadata";
import Link from "next/link";
import Image from "next/image";
import facebook from "@/assets/icons/facebook.svg";
import twitter from "@/assets/icons/twitter.svg";
import reddit from "@/assets/icons/redit.svg";
import linkedin from "@/assets/icons/linkedin.svg";
import email from "@/assets/icons/mail.svg";
import arrow from "@/assets/icons/right-arrow.svg";
import Home from "@/assets/icons/home2.svg";
import ImageComponent from "@/components/blocks/Image";
import Footer from "@/components/blocks/Footer";
import MDBlog from "@/components/blocks/Blog";

type MetaProps = {
	params: Promise<{ course: string }>;
};

export async function generateMetadata(
	props: MetaProps,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const params = await props.params;

	const { course } = await wretch<CoursePageQuery, CoursePageQueryVariables>(
		gqlAPI,
		CoursePageDocument,
		{ slug: params.course },
		{ tags: [params.course, "courses"] },
	);

	return generatePageMetadata({
		title: course?.title,
		description: course?.excerpt,
		slug: course?.slug,
		image: {
			url: course?.featuredImage?.node?.mediaItemUrl,
			width: course?.featuredImage?.node?.mediaDetails?.width,
			height: course?.featuredImage?.node?.mediaDetails?.height,
			alt: course?.featuredImage?.node?.caption,
		},
		pathPrefix: "/courses",
	});
}

type Props = {
	params: Promise<{ course: string }>;
};

const Course = async (props: Props) => {
	const params = await props.params;
	const { course } = await wretch<CoursePageQuery, CoursePageQueryVariables>(
		gqlAPI,
		CoursePageDocument,
		{ slug: params.course },
		{ tags: [params.course, "courses"] },
	);

	if (!course) {
		notFound();
	}


	const formattedDate = course?.date
		? new Date(course.date).toLocaleDateString(undefined, {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		})
		: "";

	return (
		<article className="max-w-6xl mx-auto ">
			<div className="sm:grid-cols-[1fr_3rem] grid-cols-1 grid gap-8">
				<div className="col-start-2 row-span-2 hidden sm:block">
					<aside aria-label="Social Share" className="w-10 grid gap-8 sticky top-1/3">
						<a
							href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://akash.cx/blogs/${params.course}`)}&text=${encodeURIComponent(course?.title ?? "")}`}
							target="_blank"
							rel="noopener noreferrer"
							title="Share on Twitter"
							className="social-icon"
						>
							<Image src={twitter} alt="Twitter" />
						</a>
						<a
							href={`https://www.reddit.com/submit?url=${encodeURIComponent(`https://akash.cx/blogs/${params.course}`)}&title=${encodeURIComponent(course?.title ?? "")}`}
							target="_blank"
							rel="noopener noreferrer"
							title="Share on Reddit"
							className="social-icon"
						>
							<Image src={reddit} alt="Reddit" />
						</a>
						<a
							href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://akash.cx/blogs/${params.course}`)}`}
							target="_blank"
							rel="noopener noreferrer"
							title="Share on Facebook"
							className="social-icon"
						>
							<Image src={facebook} alt="Facebook" />
						</a>
						<a
							href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://akash.cx/blogs/${params.course}`)}&title=${encodeURIComponent(course?.title ?? "")}`}
							target="_blank"
							rel="noopener noreferrer"
							title="Share on LinkedIn"
							className="social-icon"
						>
							<Image src={linkedin} alt="LinkedIn" />
						</a>
						<a
							href={`mailto:?subject=${encodeURIComponent(course?.title ?? "")}&body=${encodeURIComponent(`https://akash.cx/blogs/${params.course}`)}`}
							target="_blank"
							title="Share by Email"
							rel="noopener noreferrer"
							className="social-icon"
						>
							<Image src={email} alt="Email" />
						</a>
					</aside>
				</div>
				<div className="grid h-fit relative row-start-1">
					<header className="w-full mb-10">
						<nav aria-label="Breadcrumb" className="grid grid-flow-col gap-2 justify-start items-center text-sm tk-attribute-mono mb-8">
							<Link href="/" className="tk-attribute-mono mb-1">
								<Image src={Home} className="w-5 inline-block" alt="home" />
							</Link>
							<Image src={arrow} className="w-5 inline-block" alt="arrow" />
							<Link href="/courses" className="tk-attribute-mono">
								Courses
							</Link>
							<Image src={arrow} className="w-5 inline-block" alt="arrow" />
							<Link
								href={`/courses/${params.course}`}
								className="tk-attribute-mono text-black! dark:text-white!"
							>
								{course.title}
							</Link>
						</nav>
						<p className="text-center para-lg pb-8">{formattedDate}</p>
						<h1 className="text-5xl md:text-6xl text-center">{course?.title}</h1>
						<ul className="leading-tight text-center m-auto max-w-lg mt-4 flex flex-wrap justify-center p-0">
							{(course?.tags?.nodes || []).map(({ name, slug, featuredImage }) => (
								<li key={slug} className="inline-block list-none">
									<i className="leading-tight grid items-center bg-(--card-bg) grid-flow-col gap-1 rounded-md not-italic m-1 py-0.5 px-1">
										<ImageComponent
											className="w-full object-cover"
											src={featuredImage?.featuredImage?.mediaItemUrl ?? ""}
											alt={featuredImage?.featuredImage?.caption ?? ""}
											sizes={featuredImage?.featuredImage?.sizes ?? undefined}
											width={32}
											height={32}
											card={true}
											padding={false}
										/>
										<span className="text-sm">
											{name}
										</span>
									</i>
								</li>
							))}
						</ul>
						{course?.author?.node?.user?.profilePic?.mediaItemUrl && (
							<div className="flex justify-around my-10">
								<div aria-label="Author" className="flex gap-2">
									<span>
										<ImageComponent
											className="w-9 object-cover rounded-full"
											src={course?.author?.node?.user?.profilePic?.mediaItemUrl ?? ""}
											alt={
												"Profile Pic of " +
												course?.author?.node?.firstName +
												" " +
												course?.author?.node?.lastName
											}
											sizes={course?.author?.node?.user?.profilePic?.sizes ?? undefined}
											width={1920}
											height={952}
											card={true}
										/>
									</span>
									<span aria-label="Author Name" className="align-middle grid items-center para-md font-thin italic">
										{course?.author?.node?.firstName} {course?.author?.node?.lastName}
									</span>
								</div>
								<div className="grid items-center" aria-label="Updated Date">
									{/* modified date  */}
									<p className="text-center m-0 text-lg font-thin italic">
										Updated:{" "}
										{course.modified
											? new Date(course.modified).toLocaleDateString(undefined, {
												year: "numeric",
												month: "long",
											})
											: ""}
									</p>
								</div>
							</div>
						)}

						{course?.featuredImage?.node?.mediaItemUrl && (
							<ImageComponent
								className="w-full object-cover"
								src={course?.featuredImage?.node?.mediaItemUrl ?? ""}
								alt={course?.featuredImage?.node?.caption ?? ""}
								sizes={course?.featuredImage?.node?.sizes ?? undefined}
								width={1920}
								height={952}
								card={true}
							/>
						)}
						<div aria-label="Social Share" className="sm:hidden grid grid-flow-col align-middle justify-center my-10 gap-4">
							<a
								href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://akash.cx/blogs/${params.course}`)}&text=${encodeURIComponent(course?.title ?? "")}`}
								target="_blank"
								rel="noopener noreferrer"
								title="Share on Twitter"
								className="social-icon"
							>
								<Image className="w-8" src={twitter} alt="Twitter" />
							</a>
							<a
								href={`https://www.reddit.com/submit?url=${encodeURIComponent(`https://akash.cx/blogs/${params.course}`)}&title=${encodeURIComponent(course?.title ?? "")}`}
								target="_blank"
								rel="noopener noreferrer"
								title="Share on Reddit"
								className="social-icon"
							>
								<Image className="w-8" src={reddit} alt="Reddit" />
							</a>
							<a
								href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://akash.cx/blogs/${params.course}`)}`}
								target="_blank"
								rel="noopener noreferrer"
								title="Share on Facebook"
								className="social-icon"
							>
								<Image className="w-8" src={facebook} alt="Facebook" />
							</a>
							<a
								href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://akash.cx/blogs/${params.course}`)}&title=${encodeURIComponent(course?.title ?? "")}`}
								target="_blank"
								rel="noopener noreferrer"
								title="Share on LinkedIn"
								className="social-icon"
							>
								<Image className="w-8" src={linkedin} alt="LinkedIn" />
							</a>
							<a
								href={`mailto:?subject=${encodeURIComponent(course?.title ?? "")}&body=${encodeURIComponent(`https://akash.cx/blogs/${params.course}`)}`}
								target="_blank"
								title="Share by Email"
								rel="noopener noreferrer"
								className="social-icon"
							>
								<Image className="w-8" src={email} alt="Email" />
							</a>
						</div>
						<div className="mx-auto w-48 h-1 mt-12 bg-linear-to-r from-cyan-200 to-cyan-100 dark:from-cyan-400 dark:to-cyan-600 rounded-full"></div>
					</header>
					<MDBlog markdown={course?.contentFiltered ?? undefined} />
					<ul className="col-start-1 grid w-full gap-4 mt-8" aria-label="Course Chapters">
						{course?.chapters?.chapters?.map(
							(chapter) =>
								chapter &&
								chapter.slug && (
									<li key={chapter.slug}>
										<Link
											href={`/courses/${params.course}/${chapter.slug}`}
											className="group relative flex items-center gap-4 rounded-2xl bg-(--card-bg) p-3 pr-5 transition-all duration-300 hover:bg-(--bg-secondary) hover:shadow-lg hover:-translate-y-0.5 border border-transparent hover:border-(--border-color)"
										>
											<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-(--bg-secondary) font-bold text-xl group-hover:bg-(--card-bg) transition-colors text-(--text-main)">
												{(chapter.title?.[0] || "#").toUpperCase()}
											</div>

											<div className="flex flex-1 flex-col justify-center min-w-0">
												<h3 className="text-lg font-semibold  pr-4 text-(--text-muted)! group-hover:text-(--text-main)! transition-colors">
													{chapter.title}
												</h3>
												{chapter.modified && (
													<p className="text-xs text-(--text-muted) mt-0.5 flex items-center gap-1">
														<span>Updated</span>
														<span className="w-0.5 h-0.5 rounded-full bg-current opacity-50"></span>
														<span>
															{new Date(chapter.modified).toLocaleDateString(
																undefined,
																{
																	year: "numeric",
																	month: "short",
																	day: "numeric",
																},
															)}
														</span>
													</p>
												)}
											</div>

											<div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-(--bg-secondary) group-hover:bg-(--card-bg) transition-colors duration-300">
												<Image
													src={arrow}
													alt="Go to chapter"
													className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 dark:invert group-hover:invert-0  dark:group-hover:invert group-hover:brightness-0"
												/>
											</div>
										</Link>
									</li>
								),
						)}
					</ul>
					<Footer />
				</div>
			</div>

		</article>
	);
};

export default Course;

export const dynamic = "force-static";
