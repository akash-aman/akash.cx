"use client";
import { useSetHeader } from "../../contexts/headercontext";

const HeaderAnimate = ({ data }: { data: any }) => {
	useSetHeader(data);
	return null;
};

export default HeaderAnimate;
