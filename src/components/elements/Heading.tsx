import React from "react";

interface HeadingProps {
	id?: string;
	className?: string;
	children: React.ReactNode;
}

export const H1 = (props: HeadingProps) => {
	return (
		<h1 id={props.id} className={`h1 ${props.className}`}>
			{props.children}
		</h1>
	);
};

export const H2 = (props: HeadingProps) => {
	return (
		<h2 id={props.id} className={`h2 ${props.className}`}>
			{props.children}
		</h2>
	);
};

export const H3 = (props: HeadingProps) => {
	return (
		<h3 id={props.id} className={`h3 ${props.className}`}>
			{props.children}
		</h3>
	);
};

export const H4 = (props: HeadingProps) => {
	return (
		<h4 id={props.id} className={`h4 ${props.className}`}>
			{props.children}
		</h4>
	);
};

export const H5 = (props: HeadingProps) => {
	return (
		<h5 id={props.id} className={`h5 ${props.className}`}>
			{props.children}
		</h5>
	);
};

export const H6 = (props: HeadingProps) => {
	return (
		<h6 id={props.id} className={`h6 ${props.className}`}>
			{props.children}
		</h6>
	);
};
