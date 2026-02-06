import { ParsedUrlQuery } from "querystring";
import {
	CourseRoutesQuery,
	CourseRoutesQueryVariables,
	CourseRoutesDocument,
	ChapterPageQuery,
	ChapterPageDocument,
	ChapterPageQueryVariables,
} from "generated/graphql";

import { gqlAPI } from "@/config/constant";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { wretch } from "@/utils/fetchapi";
import { generatePageMetadata } from "@/utils/metadata";
import ChapterStyles from "app/courses/[course]/(chapters)/[chapter]/ChapterStyles";
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
	params: Promise<{ chapter: string; course: string }>;
};

/**
 * This function generates the metadata for the page.
 *
 * @param param0 params - params of the page
 * @param param1 searchParams - searchParams of the page
 * @param parent parent - parent metadata
 * @returns
 */
export async function generateMetadata(
	props: MetaProps,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const params = await props.params;

	const { chapter } = await wretch<ChapterPageQuery, ChapterPageQueryVariables>(
		gqlAPI,
		ChapterPageDocument,
		{ slug: params.chapter },
		{ tags: [params.chapter, params.course, "chapters"] },
	);

	return generatePageMetadata({
		title: chapter?.title,
		description: chapter?.excerpt,
		slug: chapter?.slug,
		image: {
			url: chapter?.featuredImage?.node?.mediaItemUrl,
			width: chapter?.featuredImage?.node?.mediaDetails?.width,
			height: chapter?.featuredImage?.node?.mediaDetails?.height,
			alt: chapter?.featuredImage?.node?.caption,
		},
		pathPrefix: `/courses/${params.course}`,
	});
}

interface Params extends ParsedUrlQuery {
	course: string;
	chapter: string;
}

type Props = {
	params: Promise<Params>;
};

/**
 * This function generates the page.
 *
 * @param param0 params - params of the page
 * @returns
 */
const Chapter = async (props: Props) => {
	const params = await props.params;
	const { chapter } = await wretch<ChapterPageQuery, ChapterPageQueryVariables>(
		gqlAPI,
		ChapterPageDocument,
		{ slug: params.chapter },
		{ tags: [params.chapter, params.course, "chapters"] },
	);

	if (!chapter) {
		notFound();
	}



	const formattedDate = chapter?.date
		? new Date(chapter.date).toLocaleDateString(undefined, {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		})
		: "";

	return (

		<>
			<ChapterStyles params={params} />
			<header className="w-full mb-10 sm:animate-page-enter h-full">
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
						className="tk-attribute-mono"
					>
						{params.course}
					</Link>
					<Image src={arrow} className="w-5 inline-block" alt="arrow" />
					<Link
						href={`/courses/${params.course}/${params.chapter}`}
						className="tk-attribute-mono text-black! dark:text-white!"
					>
						{chapter?.title}
					</Link>
				</nav>
				<p className="text-center para-lg pb-8">{formattedDate}</p>
				<h1 className="text-5xl md:text-6xl text-center">{chapter?.title}</h1>
				<ul className="leading-tight text-center m-auto max-w-lg mt-4 flex flex-wrap justify-center p-0">
					{(chapter?.tags?.nodes || []).map(({ name, slug, featuredImage }) => (
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
				{chapter?.author?.node?.user?.profilePic?.mediaItemUrl && (
					<div className="flex justify-around my-10">
						<div aria-label="Author" className="flex gap-2">
							<span>
								<ImageComponent
									className="w-9 object-cover rounded-full"
									src={chapter?.author?.node?.user?.profilePic?.mediaItemUrl ?? ""}
									alt={
										"Profile Pic of " +
										chapter?.author?.node?.firstName +
										" " +
										chapter?.author?.node?.lastName
									}
									sizes={chapter?.author?.node?.user?.profilePic?.sizes ?? undefined}
									width={1920}
									height={952}
									card={true}
								/>
							</span>
							<span aria-label="Author Name" className="align-middle grid items-center para-md font-thin italic">
								{chapter?.author?.node?.firstName} {chapter?.author?.node?.lastName}
							</span>
						</div>
						<div className="grid items-center" aria-label="Updated Date">
							{/* modified date  */}
							<p className="text-center m-0 text-lg font-thin italic">
								Updated:{" "}
								{chapter.modified
									? new Date(chapter.modified).toLocaleDateString(undefined, {
										year: "numeric",
										month: "long",
									})
									: ""}
							</p>
						</div>
					</div>
				)}

				{chapter?.featuredImage?.node?.mediaItemUrl && (
					<ImageComponent
						className="w-full object-cover"
						src={chapter?.featuredImage?.node?.mediaItemUrl ?? ""}
						alt={chapter?.featuredImage?.node?.caption ?? ""}
						sizes={chapter?.featuredImage?.node?.sizes ?? undefined}
						width={1920}
						height={952}
						card={true}
					/>
				)}
				<div aria-label="Social Share" className="sm:hidden grid grid-flow-col align-middle justify-center my-10 gap-4">
					<a
						href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://akash.cx/courses/${params.course}/${params.chapter}`)}&text=${encodeURIComponent(chapter?.title ?? "")}`}
						target="_blank"
						rel="noopener noreferrer"
						title="Share on Twitter"
						className="social-icon"
					>
						<Image className="w-8" src={twitter} alt="Twitter" />
					</a>
					<a
						href={`https://www.reddit.com/submit?url=${encodeURIComponent(`https://akash.cx/courses/${params.course}/${params.chapter}`)}&title=${encodeURIComponent(chapter?.title ?? "")}`}
						target="_blank"
						rel="noopener noreferrer"
						title="Share on Reddit"
						className="social-icon"
					>
						<Image className="w-8" src={reddit} alt="Reddit" />
					</a>
					<a
						href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://akash.cx/courses/${params.course}/${params.chapter}`)}`}
						target="_blank"
						rel="noopener noreferrer"
						title="Share on Facebook"
						className="social-icon"
					>
						<Image className="w-8" src={facebook} alt="Facebook" />
					</a>
					<a
						href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://akash.cx/courses/${params.course}/${params.chapter}`)}&title=${encodeURIComponent(chapter?.title ?? "")}`}
						target="_blank"
						rel="noopener noreferrer"
						title="Share on LinkedIn"
						className="social-icon"
					>
						<Image className="w-8" src={linkedin} alt="LinkedIn" />
					</a>
					<a
						href={`mailto:?subject=${encodeURIComponent(chapter?.title ?? "")}&body=${encodeURIComponent(`https://akash.cx/courses/${params.course}/${params.chapter}`)}`}
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
			<div className="grid h-fit 2xl:col-span-1 2xl:col-start-2 animate-page-enter">


				<MDBlog markdown={chapter?.contentFiltered ?? undefined} />
				<Footer />

			</div>
			<div className="2xl:col-span-1 2xl:col-start-3 row-span-3 row-start-1 hidden sm:block pl-0 2xl:pl-4">
				<div className="w-10 grid gap-8 sticky top-[40%]">
					<a
						href={`https://twitter.com/intent/tweet?url=https://akash.cx/courses/${params.course}/${params.chapter}&text=${chapter.title}`}
						target="_blank"
						rel="noopener noreferrer"
						title="Share on Twitter"
						className="social-icon"
					>
						<Image src={twitter} alt="Twitter" />
					</a>
					<a
						href={`https://www.reddit.com/submit?url=https://akash.cx/courses/${params.course}/${params.chapter}&title=${chapter.title}`}
						target="_blank"
						rel="noopener noreferrer"
						title="Share on Reddit"
						className="social-icon"
					>
						<Image src={reddit} alt="Reddit" />
					</a>
					<a
						href={`https://www.facebook.com/sharer/sharer.php?u=https://akash.cx/courses/${params.course}/${params.chapter}`}
						target="_blank"
						rel="noopener noreferrer"
						title="Share on Facebook"
						className="social-icon"
					>
						<Image src={facebook} alt="Facebook" />
					</a>
					<a
						href={`https://www.linkedin.com/shareArticle?mini=true&url=https://akash.cx/courses/${params.course}/${params.chapter}&title=${chapter.title}`}
						target="_blank"
						rel="noopener noreferrer"
						title="Share on LinkedIn"
						className="social-icon"
					>
						<Image src={linkedin} alt="LinkedIn" />
					</a>
					<a
						href={`mailto:?subject=${chapter.title}&body=https://akash.cx/courses/${params.course}/${params.chapter}`}
						target="_blank"
						title="Share by Email"
						rel="noopener noreferrer"
						className="social-icon"
					>
						<Image src={email} alt="Email" />
					</a>
				</div>
			</div>
		</>
	);
};

export default Chapter;

/**
 * This function generates the static paths for the page.
 *
 * @returns array of paths.
 */
export async function generateStaticParams() {
	const { courses } = await wretch<
		CourseRoutesQuery,
		CourseRoutesQueryVariables
	>(gqlAPI, CourseRoutesDocument, { first: 1000 }, { tags: ["course-routes"] });

	if (!courses?.nodes || !Array.isArray(courses.nodes)) {
		return [];
	}

	return courses.nodes.reduce<{ course: string; chapter: string }[]>(
		(acc, course) => {
			if (
				!course?.slug ||
				!course?.chapters?.chapters ||
				!Array.isArray(course.chapters.chapters)
			) {
				return acc;
			}

			const chapterParams = course.chapters.chapters
				.filter((chapter) => chapter?.slug)
				.map((chapter) => ({
					course: course.slug!,
					chapter: chapter!.slug!,
				}));

			return [...acc, ...chapterParams];
		},
		[],
	);
}

export const dynamic = "force-static";
