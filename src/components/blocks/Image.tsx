import Image from "next/image";
import clsx from "clsx";

interface ImageComponentProps {
	src: string;
	alt?: string;
	sizes?: string;
	height?: number | `${number}`;
	width?: number | `${number}`;
	card?: boolean;
	padding?: boolean;
	[key: string]: any;
}

const ImageComponent = async ({
	src,
	alt,
	sizes,
	height,
	width,
	card = false,
	padding = true,
	...fields
}: ImageComponentProps) => {
	if (!src) return <span></span>;

	if (src?.endsWith(".svg")) {
		// fetch the svg xml code.
		try {
			const res = await fetch(src);
			const Svg = await res.text();
			return (
				<span
					className={clsx("w-4.5 h-4.5", padding && "p-2 md:p-5 mb-6")}
					dangerouslySetInnerHTML={{ __html: Svg }}
				/>
			);
		} catch (error) {
			console.error(`Error fetching SVG: ${src}`, error);
			return null;
		}
	}

	const imageProps = fields.fill ? { ...fields } : { width: width || "900", height: height || "700", ...fields };

	if (card) {
		return (
			<Image
				sizes={
					sizes || "(min-width: 1200px) 45vw, (min-width: 900px) 60vw, 100vw"
				}
				src={src}
				alt={alt || "Image"}
				{...imageProps}
			/>
		);
	}

	return (
		<span className={clsx("grid justify-center bg-(--card-bg) dark:bg-opacity-5 bg-opacity-5 mb-6 rounded-lg", padding && "p-2 md:p-5")}>
			<Image
				sizes={
					sizes || "(min-width: 1200px) 45vw, (min-width: 900px) 60vw, 100vw"
				}
				src={src}
				alt={alt || "Image"}
				{...imageProps}
			/>
		</span>
	);
};

export default ImageComponent;
