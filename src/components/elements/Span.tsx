interface SpanProps {
	className?: string;
	children: React.ReactNode;
}

export const Span = (props: SpanProps) => {
	if (
		props.className === "gradient" ||
		props.className === "gradient-red" ||
		props.className === "red-gradient"
	) {
		return (
			<span
				{...props}
				className="span not-italic animate-gradient font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
			>
				{props.children}
			</span>
		);
	}

	if (
		props.className === "gradient-green" ||
		props.className === "green-gradient"
	) {
		return (
			<span
				{...props}
				className="span not-italic animate-gradient font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
			>
				{props.children}
			</span>
		);
	}

	if (props.className === "sky") {
		return (
			<span {...props} className="span font-bold text-sky-500">
				{props.children}
			</span>
		);
	}

	if (props.className === "pink") {
		return (
			<span {...props} className="span font-bold text-pink-500">
				{props.children}
			</span>
		);
	}

	if (props.className === "purple") {
		return (
			<span {...props} className="span font-bold text-purple-500">
				{props.children}
			</span>
		);
	}

	if (props.className === "green") {
		return (
			<span {...props} className="span font-bold text-green-500">
				{props.children}
			</span>
		);
	}

	if (props.className === "blue") {
		return (
			<span {...props} className="span font-bold text-blue-500">
				{props.children}
			</span>
		);
	}

	if (props.className === "yellow") {
		return (
			<span {...props} className="span font-bold text-yellow-500">
				{props.children}
			</span>
		);
	}

	if (props.className === "red") {
		return (
			<span {...props} className="span font-bold text-red-500">
				{props.children}
			</span>
		);
	}

	if (props.className === "orange") {
		return (
			<span {...props} className="span font-bold text-orange-500">
				{props.children}
			</span>
		);
	}

	if (props.className === "gray") {
		return (
			<span {...props} className="span font-bold text-gray-500">
				{props.children}
			</span>
		);
	}

	return (
		<span className="span para-lg" {...props}>
			{props.children}
		</span>
	);
};
