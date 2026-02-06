"use client";
import useTheme from "hooks/useTheme";
import useAnimate from "hooks/useAnimate";

const Theme = () => {
	const [theme, themeState] = useTheme(true);
	const [animate] = useAnimate<HTMLDivElement>(themeState);

	return (
		<div
			{...theme}
			{...animate}
			className="
			md:absolute
			justify-center
			content-center
			grid
			md:left-0
			md:top-4
			md:w-full
			z-50
        "
		>
			<div className="block dark:hidden text-3xl" suppressHydrationWarning>🌤️</div>
			<div className="dark:block hidden text-3xl" suppressHydrationWarning>🌙</div>
		</div>
	);
};

export default Theme;
