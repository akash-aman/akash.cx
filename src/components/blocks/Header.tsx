"use client";
import React from "react";
import { useHeader } from "../../contexts/headercontext";
import useAnimate from "../../hooks/useAnimate";
import Image from "next/image";
import profilePicture from "assets/images/AI1.jpg";
import { Dev } from "assets/icons/social";

type HeaderProps = {
	header?: string;
	children?: React.ReactElement[];
};

const Header = ({ header }: HeaderProps) => {
	const [headerState] = useHeader();

	const [animationProps] = useAnimate(headerState, "slide");

	const getHeader = () => {
		return <>
		</>
	};

	return getHeader();
};

export default Header;
