import Link from "next/link";
import React from "react";
import ImageComponent from "./Image";
import MDBlog from "./Blog";

const Card = ({ type, slug, fields }: { type: string; slug: string; fields: any }) => {
	const { title, modified, excerpt, tags, featuredImage, author } = fields;

	return (
		<>
			<Link key={slug} href={`/${type}/${slug}`}>
				<div className="bg-(--light-theme-500) dark:bg-(--bg-glass-dark) rounded-t-lg rounded-b-lg p-5">
					<div className="w-full mb-4 rounded-t-md rounded-b-md aspect-video overflow-hidden place-content-center grid h-auto">
						<ImageComponent
							className="w-full h-[inherit] object-cover"
							src={featuredImage?.node?.mediaItemUrl}
							alt={featuredImage?.node?.caption}
							sizes={featuredImage?.node?.sizes}
							width={300}
							height={200}
							card={true}
						/>
					</div>
					<p className="font-bold my-6 headFont capitalize">{title}</p>
					<p className="text-sm mb-8">{excerpt}</p>
					<div className="m-0 p-0 leading-3 mt-4">
						{tags.nodes.map(({ name, slug, featuredImage }: { name: string; slug: string; featuredImage: any }) => (
							<div key={slug} className="inline-block">
								<i className="leading-2 grid items-center bg-(--bg-glass-light)  dark:bg-slate-300 dark:bg-opacity-5 grid-flow-col gap-1 rounded-md not-italic m-[2px] py-[2px] p-1">
									<ImageComponent
										className="w-full h-[inherit] object-cover"
										src={featuredImage?.featuredImage?.mediaItemUrl}
										alt={featuredImage?.featuredImage?.caption}
										sizes={featuredImage?.featuredImage?.sizes}
										width={18}
										height={18}
										card={true}
									/>
									<span className="font-light text-xs text-(--text-glass-light) dark:text-(--text-glass-dark)">
										{name}
									</span>
								</i>
							</div>
						))}
					</div>
				</div>
			</Link>
		</>
	);
};

export default Card;

export const CardMini = ({ type, slug, fields }: { type: string; slug: string; fields: any }) => {
	const { title, modified, excerpt, tags, featuredImage, author } = fields;

	return (
		<>
			<Link key={slug} href={`/${type}/${slug}`}>
				<div className="bg-(--light-theme-500) dark:bg-[rgba(255,255,255,0.05)] rounded-t-lg rounded-b-lg p-5">
					<p className="font-bold my-3 headFont leading-8 uppercase">{title}</p>
					<p className="text-sm mb-3">{excerpt}</p>
					{tags.length && (
						<div className="m-0 mt-9 p-0 leading-3">
							{tags.nodes.map(({ name, slug, featuredImage }: { name: string; slug: string; featuredImage: any }) => (
								<div key={slug} className="inline-block">
									<i className="leading-2 grid items-center bg-[rgba(255,255,255,0.6)]  dark:bg-slate-300 dark:bg-opacity-5 grid-flow-col gap-1 rounded-md not-italic m-[2px] py-[2px] p-1">
										<ImageComponent
											className="w-full h-[inherit] object-cover"
											src={featuredImage?.featuredImage?.mediaItemUrl}
											alt={featuredImage?.featuredImage?.caption}
											sizes={featuredImage?.featuredImage?.sizes}
											width={18}
											height={18}
											card={true}
										/>
										<span className="font-light text-xs text-[rgba(0,0,0,0.55)] dark:text-[rgba(255,255,255,0.4)]">
											{name}
										</span>
									</i>
								</div>
							))}
						</div>
					)}
				</div>
			</Link>
		</>
	);
};
