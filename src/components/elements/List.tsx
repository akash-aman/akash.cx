import React from "react";

interface ListProps {
	children: React.ReactNode;
}

export const Ul = (props: ListProps) => {
	return <ul className="ul">{props.children}</ul>;
};

export const Ol = (props: ListProps) => {
	return <ol className="ol">{props.children}</ol>;
};

export const Li = (props: ListProps) => {
	return <li className="li list-outside ml-6">{props.children}</li>;
};
