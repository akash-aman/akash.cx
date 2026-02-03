import React from "react";
import Image from "next/image";

const ImageElement = ({ node, ...props }: { node: any; src: string }) => {
	return (
		<Image
			src={props.src}
			alt="Picture of the author"
			width={1000}
			height={1000}
			placeholder="blur"
			blurDataURL={props.src}
		/>
	);
};

export default ImageElement;
