//-----------------------------------------------------
// PREFIX IS ADDDED IN OPTIONS TO AVOID VULNERABILITY :
//  <I>   'user-content-'
//-----------------------------------------------------

import { Root } from "mdast";
import { toc } from "mdast-util-toc";

type Options = {
    prefix?: string;
    heading?: string;
};

/**
 * Plugin to generate a Table of Contents (TOC).
 *
 * @type {import('unified').Plugin<[Options?]|void[], Root>}
 */
export default function remarkToc(
    options: Options = { prefix: "user-content-" },
) {
    return (node: Root) => {
        const result = toc(
            node,
            Object.assign({}, options, {
                heading: options.heading || "toc|table[ -]of[ -]contents?",
            }),
        );

        if (
            result.endIndex === null ||
            result.index === null ||
            result.index === -1 ||
            !result.map
        ) {
            node.children = [];
            return;
        }

        // Wrap the TOC with a div element
        // const tocWrapper = {
        //     type: "element",
        //     tagName: "div",
        //     properties: { className: ["toc"], id: "toc" },
        //     children: [
        // 		...node.children.slice(result.index-1, result.index), // Heading element of TOC
        // 		result.map,	// TOC
        // 	],
        // };

        node.children = [
            //...node.children.slice(0, result.index-1),
            //tocWrapper,
            //...node.children.slice(result.endIndex)
            // -----------
            //...node.children.slice(result.index-1, result.index), // Heading element of TOC
            result.map,
        ];
    };
}
