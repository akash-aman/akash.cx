"use client";
import useTheme from "hooks/useTheme";
import useAnimate from "hooks/useAnimate";

const Theme = () => {
	const [theme, themeState] = useTheme(true);
	const [animate] = useAnimate<HTMLButtonElement>(themeState);

	return (
		<button
			type="button"
			aria-label="Toggle dark mode"
			{...theme}
			{...animate}
			className="
			w-full
			h-full
			md:h-auto
			md:py-3
			md:absolute
			justify-center
			content-center
			grid
			md:left-0
			md:top-4
			md:w-full
			z-50
			cursor-pointer
        "
		>
			<div className="block dark:hidden text-3xl" suppressHydrationWarning>🌤️</div>
			<div className="dark:block hidden text-3xl" suppressHydrationWarning>🌙</div>
		</button>
	);
};

export default Theme;
