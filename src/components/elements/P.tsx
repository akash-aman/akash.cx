import React from "react";

interface PProps {
	children: React.ReactNode;
}

const P = ({ children }: PProps) => {
	return <p className="p para-lg pb-5">{children}</p>;
};

export default P;
