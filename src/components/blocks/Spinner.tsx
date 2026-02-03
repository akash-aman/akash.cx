import React, { useRef, useEffect, useState } from "react";

const Spinner = () => {
	const spinner = useRef<HTMLDivElement>(null);
	const [firstload, setFirstload] = useState(true);
	useEffect(() => {
		if (firstload && spinner.current) {
			spinner.current.classList.add("spinner");
			setFirstload(false);
		}
	}, [firstload]);

	return (
		<div
			ref={spinner}
			onAnimationEnd={() => spinner.current?.classList.add("hidden")}
			className="fixed bg-transparent top-[50%] left-[50%]"
		></div>
	);
};

export default Spinner;
