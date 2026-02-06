import remarkGfm from "remark-gfm";
import remarkToc from "@/plugins/remarkToc";
import remarkTocRM from "@/plugins/remarkTocRM";
import remarkMath from "remark-math"; //'../plugins/remarkMath'
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex"; //'../plugins/rehypeKatex'
import rehypeSanitize from "@/plugins/rehypeSanitize";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { elements } from "components/blocks/Components";
import Toc from "@/components/elements/Toc";
// import rehypePrism from "rehype-prism-plus";
// import Mermaid from "components/blocks/Mermaid";

type BlogProps = {
	markdown?: string;
	className?: string;
};

const MDBlog: FC<BlogProps> = ({ markdown, ...attributes }: BlogProps) => {

	const isExist = markdown?.includes("## Table of Contents") as boolean;
	//const isMermaid = markdown?.includes("mermaid") as boolean;

	return (
		<>
			<div className="toc">
				<Toc isExist={isExist}>
					<ReactMarkdown
						{...attributes}
						// eslint-disable-next-line react/no-children-prop
						components={elements}
						children={markdown}
						remarkPlugins={[remarkToc]}
					/>
				</Toc>
			</div>
			<ReactMarkdown
				{...attributes}
				// eslint-disable-next-line react/no-children-prop
				components={elements}
				children={markdown}
				remarkPlugins={[remarkTocRM, remarkMath, remarkGfm]}
				rehypePlugins={[
					rehypeKatex,
					// rehypePrism,
					rehypeSlug,
					rehypeRaw,
					rehypeSanitize,

				]}
			/>
			{/* {
				<Mermaid isMermaid={isMermaid} />
			} */}
		</>
	);
};

export default MDBlog;
