import React from "react";
import { Components } from "react-markdown";
import RehypeCode from "../elements/RehypeCode";
import MultiCode from "../elements/MultiCode";
import Blockquote from "../elements/Blockquote";
import P from "../elements/P";
import Pre from "../elements/Pre";
import { Ul, Ol, Li } from "../elements/List";
import { H1, H2, H3, H4, H5, H6 } from "../elements/Heading";
import { Span } from "../elements/Span";
import { U } from "../elements/Html";
import ImageElement from "../elements/Image";
import A from "../elements/A";

export const elements: { [key: string]: React.ElementType | Components } = {
	h1: H1,
	h2: H2,
	h3: H3,
	h4: H4,
	h5: H5,
	h6: H6,
	p: P,
	ul: Ul,
	ol: Ol,
	li: Li,
	pre: Pre,
	u: U,
	span: Span,
	img: ImageElement,
	code: RehypeCode,
	multicode: MultiCode,
	blockquote: Blockquote,
	a: A,
};
