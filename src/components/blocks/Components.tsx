import React from "react";
import { Components } from "react-markdown";
import MultiCode from "components/elements/MultiCode";
import Blockquote from "components/elements/Blockquote";
import P from "components/elements/P";
import Pre from "components/elements/Pre";
import { Ul, Ol, Li } from "components/elements/List";
import { H1, H2, H3, H4, H5, H6 } from "components/elements/Heading";
import { Span } from "components/elements/Span";
import { U } from "components/elements/Html";
import A from "components/elements/A";
import ImageComponent from "components/blocks/Image";
import ReactCode from "components/elements/ReactCode";
import { Table, Tbody, Td, Th, Thead, Tr } from "components/elements/Table";

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
	img: ImageComponent,
	code: ReactCode,
	multicode: MultiCode,
	blockquote: Blockquote,
	a: A,
	table: Table,
	thead: Thead,
	tbody: Tbody,
	tr: Tr,
	th: Th,
	td: Td,
};
