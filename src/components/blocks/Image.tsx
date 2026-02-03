import React, { use } from "react";
import Image from "next/image";

interface ImageComponentProps {
	src: string;
	alt?: string;
	sizes?: string;
	height?: number | `${number}`;
	width?: number | `${number}`;
	card?: boolean;
	[key: string]: any;
}

const ImageComponent = ({
	src,
	alt,
	sizes,
	height,
	width,
	card = false,
	...fields
}: ImageComponentProps) => {
	if (!src) return <span></span>;

	if (src?.endsWith(".svg")) {
		// fetch the svg xml code.
		let Svg = use(fetch(src).then((res) => res.text()));

		return (
			<span
				className="w-[1.125rem] h-[1.125rem]"
				dangerouslySetInnerHTML={{ __html: Svg }}
			/>
		);
	}

	if (card) {
		return (
			<Image
				sizes={
					sizes || "(min-width: 1200px) 45vw, (min-width: 900px) 60vw, 100vw"
				}
				src={src}
				alt={alt || "Image"}
				width={width || "900"}
				height={height || "700"}
				{...fields}
			/>
		);
	}

	return (
		<span className="grid justify-center bg-slate-700 dark:bg-slate-300 dark:bg-opacity-5 bg-opacity-5 rounded-lg p-2 md:p-5">
			<Image
				sizes={
					sizes || "(min-width: 1200px) 45vw, (min-width: 900px) 60vw, 100vw"
				}
				src={src}
				alt={alt || "Image"}
				width={width || "900"}
				height={height || "700"}
				{...fields}
			/>
		</span>
	);
};

export default ImageComponent;
