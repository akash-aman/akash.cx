//-----------------------------------------------------
// PREFIX IS ADDDED IN OPTIONS TO AVOID VULNERABILITY :
//  <I>   'user-content-'
//-----------------------------------------------------

import { toc } from "mdast-util-toc";
import { Nodes, Parent } from "mdast";

type Options = {
    prefix?: string;
    heading?: string;
};

/**
 * Plugin to generate a Table of Contents (TOC).
 *
 * @type {import('unified').Plugin<[Options?]|void[], Root>}
 */
export default function remarkTocRM(
    options: Options = { prefix: "user-content-" },
) {
    return (node: Nodes) => {
        const result = toc(
            node,
            Object.assign({}, options, {
                heading: options.heading || "toc|table[ -]of[ -]contents?",
            }),
        );

        if (
            result.endIndex === null ||
            typeof result.endIndex === "undefined" ||
            result.index === null ||
            typeof result.index === "undefined" ||
            result.index === -1 ||
            !result.map
        ) {
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

        // Ensure we don't access undefined indices
        if (result.endIndex - 1 < 0 || result.index - 1 < 0) {
            return;
        }

        const parent = node as Parent;
        if (!parent.children) {
            return;
        }

        if (
            parent.children[result.endIndex - 1] &&
            (parent.children[result.endIndex - 1] as any).type == "html"
        ) {
            parent.children = [
                ...parent.children.slice(0, result.index - 1),
                // tocWrapper,
                ...parent.children.slice(result.endIndex - 1),
            ];
        } else {
            parent.children = [
                ...parent.children.slice(0, result.index - 1),
                // tocWrapper,
                ...parent.children.slice(result.endIndex),
            ];
        }
    };
}
