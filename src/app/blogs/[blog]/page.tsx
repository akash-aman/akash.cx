import {
	BlogRoutesQuery,
	BlogRoutesQueryVariables,
	BlogRoutesDocument,
	BlogPageQuery,
	BlogPageDocument,
	BlogPageQueryVariables,
} from "generated/graphql";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { wretch } from "@/utils/fetchapi";
import { gqlAPI } from "@/config/constant";
import { generatePageMetadata } from "@/utils/metadata";
import facebook from "@/assets/icons/facebook.svg";
import twitter from "@/assets/icons/twitter.svg";
import reddit from "@/assets/icons/redit.svg";
import linkedin from "@/assets/icons/linkedin.svg";
import email from "@/assets/icons/mail.svg";
import Home from "@/assets/icons/home2.svg";
import arrow from "@/assets/icons/right-arrow.svg";
import Link from "next/link";
import Image from "next/image";
import MDBlog from "@/components/blocks/Blog";
import ImageComponent from "@/components/blocks/Image";
import Footer from "@/components/blocks/Footer";

type MetaProps = {
	params: Promise<{ blog: string }>;
};

export async function generateMetadata(
	props: MetaProps,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const params = await props.params;

	const { blog } = await wretch<BlogPageQuery, BlogPageQueryVariables>(
		gqlAPI,
		BlogPageDocument,
		{ slug: params.blog },
		{ tags: [params.blog, "blogs"] },
	);

	return generatePageMetadata({
		title: blog?.title,
		description: blog?.excerpt,
		slug: blog?.slug,
		image: {
			url: blog?.featuredImage?.node?.mediaItemUrl,
			width: blog?.featuredImage?.node?.mediaDetails?.width,
			height: blog?.featuredImage?.node?.mediaDetails?.height,
			alt: blog?.featuredImage?.node?.caption,
		},
		pathPrefix: "/blogs",
	});
}

type Props = {
	params: Promise<{ blog: string }>;
};

const Blog = async (props: Props) => {
	const params = await props.params;
	const { blog } = await wretch<BlogPageQuery, BlogPageQueryVariables>(
		gqlAPI,
		BlogPageDocument,
		{ slug: params.blog },
		{ tags: [params.blog, "blogs"] },
	);

	if (!blog) {
		notFound();
	}

	const formattedDate = blog?.date
		? new Date(blog.date).toLocaleDateString(undefined, {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		})
		: "";

	return (
		<article className="max-w-(--container-45xl) mx-auto ">
			<div className="sm:grid-cols-[1fr_3rem] grid-cols-1 grid gap-8">
				<div className="col-start-2 row-span-2 hidden sm:block">
					<aside aria-label="Social Share" className="w-10 grid gap-8 sticky top-1/3">
						<a
							href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://akash.cx/blogs/${params.blog}`)}&text=${encodeURIComponent(blog?.title ?? "")}`}
							target="_blank"
							rel="noopener noreferrer"
							title="Share on Twitter"
							className="social-icon"
						>
							<Image src={twitter} alt="Twitter" />
						</a>
						<a
							href={`https://www.reddit.com/submit?url=${encodeURIComponent(`https://akash.cx/blogs/${params.blog}`)}&title=${encodeURIComponent(blog?.title ?? "")}`}
							target="_blank"
							rel="noopener noreferrer"
							title="Share on Reddit"
							className="social-icon"
						>
							<Image src={reddit} alt="Reddit" />
						</a>
						<a
							href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://akash.cx/blogs/${params.blog}`)}`}
							target="_blank"
							rel="noopener noreferrer"
							title="Share on Facebook"
							className="social-icon"
						>
							<Image src={facebook} alt="Facebook" />
						</a>
						<a
							href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://akash.cx/blogs/${params.blog}`)}&title=${encodeURIComponent(blog?.title ?? "")}`}
							target="_blank"
							rel="noopener noreferrer"
							title="Share on LinkedIn"
							className="social-icon"
						>
							<Image src={linkedin} alt="LinkedIn" />
						</a>
						<a
							href={`mailto:?subject=${encodeURIComponent(blog?.title ?? "")}&body=${encodeURIComponent(`https://akash.cx/blogs/${params.blog}`)}`}
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
							<Link href="/blogs" className="tk-attribute-mono">
								Blogs
							</Link>
							<Image src={arrow} className="w-5 inline-block" alt="arrow" />
							<Link
								href={`/blogs/${params.blog}`}
								className="tk-attribute-mono text-black dark:text-white "
							>
								{blog.title}
							</Link>
						</nav>
						<p className="text-center para-lg pb-8">{formattedDate}</p>
						<h1 className="text-5xl md:text-6xl text-center">{blog?.title}</h1>
						<ul className="leading-tight text-center m-auto max-w-lg mt-4 flex flex-wrap justify-center p-0">
							{(blog?.tags?.nodes || []).map(({ name, slug, featuredImage }) => (
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
										/>
										<span className="text-sm">
											{name}
										</span>
									</i>
								</li>
							))}
						</ul>
						{blog?.author?.node?.user?.profilePic?.mediaItemUrl && (
							<div className="flex justify-around my-10">
								<div aria-label="Author" className="flex gap-2">
									<span>
										<ImageComponent
											className="w-9 object-cover rounded-full"
											src={blog?.author?.node?.user?.profilePic?.mediaItemUrl ?? ""}
											alt={
												"Profile Pic of " +
												blog?.author?.node?.firstName +
												" " +
												blog?.author?.node?.lastName
											}
											sizes={blog?.author?.node?.user?.profilePic?.sizes ?? undefined}
											width={1920}
											height={952}
											card={true}
										/>
									</span>
									<span aria-label="Author Name" className="align-middle grid items-center para-md font-thin italic">
										{blog?.author?.node?.firstName} {blog?.author?.node?.lastName}
									</span>
								</div>
								<div className="grid items-center" aria-label="Updated Date">
									{/* modified date  */}
									<p className="text-center m-0 text-lg font-thin italic">
										Updated:{" "}
										{blog.modified
											? new Date(blog.modified).toLocaleDateString(undefined, {
												year: "numeric",
												month: "long",
											})
											: ""}
									</p>
								</div>
							</div>
						)}

						{blog?.featuredImage?.node?.mediaItemUrl && (
							<ImageComponent
								className="w-full object-cover"
								src={blog?.featuredImage?.node?.mediaItemUrl ?? ""}
								alt={blog?.featuredImage?.node?.caption ?? ""}
								sizes={blog?.featuredImage?.node?.sizes ?? undefined}
								width={1920}
								height={952}
								card={true}
							/>
						)}
						<div aria-label="Social Share" className="sm:hidden grid grid-flow-col align-middle justify-center my-10 gap-4">
							<a
								href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://akash.cx/blogs/${params.blog}`)}&text=${encodeURIComponent(blog?.title ?? "")}`}
								target="_blank"
								rel="noopener noreferrer"
								title="Share on Twitter"
								className="social-icon"
							>
								<Image className="w-8" src={twitter} alt="Twitter" />
							</a>
							<a
								href={`https://www.reddit.com/submit?url=${encodeURIComponent(`https://akash.cx/blogs/${params.blog}`)}&title=${encodeURIComponent(blog?.title ?? "")}`}
								target="_blank"
								rel="noopener noreferrer"
								title="Share on Reddit"
								className="social-icon"
							>
								<Image className="w-8" src={reddit} alt="Reddit" />
							</a>
							<a
								href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://akash.cx/blogs/${params.blog}`)}`}
								target="_blank"
								rel="noopener noreferrer"
								title="Share on Facebook"
								className="social-icon"
							>
								<Image className="w-8" src={facebook} alt="Facebook" />
							</a>
							<a
								href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://akash.cx/blogs/${params.blog}`)}&title=${encodeURIComponent(blog?.title ?? "")}`}
								target="_blank"
								rel="noopener noreferrer"
								title="Share on LinkedIn"
								className="social-icon"
							>
								<Image className="w-8" src={linkedin} alt="LinkedIn" />
							</a>
							<a
								href={`mailto:?subject=${encodeURIComponent(blog?.title ?? "")}&body=${encodeURIComponent(`https://akash.cx/blogs/${params.blog}`)}`}
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
					<MDBlog markdown={blog?.contentFiltered ?? undefined} />
					<Footer />
				</div>
			</div>

		</article>
	);
};

export default Blog;

export async function generateStaticParams() {
	const { routes } = await wretch<BlogRoutesQuery, BlogRoutesQueryVariables>(
		gqlAPI,
		BlogRoutesDocument,
		{ first: 100 },
		{ tags: ["blog-routes"] },
	);

	return routes?.nodes
		?.filter((node) => node?.slug)
		.map((node) => ({
			blog: node.slug as string,
		})) || [];
}

export const dynamic = "force-static";
