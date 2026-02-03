interface UProps {
	className?: string;
	children: React.ReactNode;
}

export const U = (props: UProps) => {
	if (
		props.className === "red-gradient" ||
		props.className === "gradient-red"
	) {
		return (
			<u className="u no-underline bg-linear-to-r from-purple-400 to-pink-600 bg-size-[100%_2px] bg-no-repeat bg-bottom">
				{props.children}
			</u>
		);
	}

	if (
		props.className === "green-gradient" ||
		props.className === "gradient-green" ||
		props.className === "gradient"
	) {
		return (
			<u className="u no-underline bg-linear-to-r from-green-300 via-blue-500 to-purple-600 bg-size-[100%_2px] bg-no-repeat bg-bottom">
				{props.children}
			</u>
		);
	}

	if (props.className === "sky") {
		return (
			<u className="u underline decoration-sky-500 decoration-2 underline-offset-4">
				{props.children}
			</u>
		);
	} else if (props.className === "pink") {
		return (
			<u className="u underline decoration-pink-500 decoration-2 underline-offset-4">
				{props.children}
			</u>
		);
	} else if (props.className === "purple") {
		return (
			<u className="u underline decoration-purple-500 decoration-2 underline-offset-4">
				{props.children}
			</u>
		);
	} else if (props.className === "green") {
		return (
			<u className="u underline decoration-green-500 decoration-2 underline-offset-4">
				{props.children}
			</u>
		);
	} else if (props.className === "blue") {
		return (
			<u className="u underline decoration-blue-500 decoration-2 underline-offset-4">
				{props.children}
			</u>
		);
	} else if (props.className === "yellow") {
		return (
			<u className="u underline decoration-yellow-500 decoration-2 underline-offset-4">
				{props.children}
			</u>
		);
	} else if (props.className === "red") {
		return (
			<u className="u underline decoration-red-500 decoration-2 underline-offset-4">
				{props.children}
			</u>
		);
	} else if (props.className === "gray") {
		return (
			<u className="u underline decoration-gray-500 decoration-2 underline-offset-4">
				{props.children}
			</u>
		);
	} else if (props.className === "orange") {
		return (
			<u className="u underline decoration-orange-500 decoration-2 underline-offset-4">
				{props.children}
			</u>
		);
	}

	return (
		<u className="u underline decoration-sky-500 decoration-2 underline-offset-4">
			{props.children}
		</u>
	);
};
