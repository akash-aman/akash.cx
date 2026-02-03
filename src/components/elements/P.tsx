import React from "react";

interface PProps {
	children: React.ReactNode;
}

const P = ({ children }: PProps) => {
	return <p className="p">{children}</p>;
};

export default P;
