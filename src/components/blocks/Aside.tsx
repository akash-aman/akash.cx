import React, { JSX } from "react";

type AsideProps = {
	aside?: string;
	children?: JSX.Element[];
};

const Aside = ({ aside }: AsideProps) => {
	return <div>aside</div>;
};

export default Aside;
