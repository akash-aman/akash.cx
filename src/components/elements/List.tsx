import React from "react";

interface ListProps {
	children: React.ReactNode;
}

export const Ul = (props: ListProps) => {
	return <ul className="ul list-disc para-lg pb-6">{props.children}</ul>;
};

export const Ol = (props: ListProps) => {
	return <ol className="ol list-decimal para-lg">{props.children}</ol>;
};

export const Li = (props: ListProps) => {
	return <li className="li list-outside ml-10 pl-3 pb-1 para-lg">{props.children}</li>;
};
