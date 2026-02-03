"use client";
import useAnimate from "../../hooks/useAnimationWithoutState";
import Image from "next/image";
import { navMenu, navModelMenu } from "../../config/constant";
import Theme from "./Theme";
import Link from "next/link";

import vibrate from "../../hooks/vibrate";
import clsx from "clsx";

type NavigationProps = {
	nav?: string;
	children?: React.ReactElement[];
};

const Navigation = ({ nav }: NavigationProps) => {
	//const [animationProps] = useAnimate(isOpen, ['slide','slide-down'], isOpen);
	const [animationProps, buttonProps, hide] = useAnimate([
		"slide",
		"slide-down",
		"hide",
	]);




	type Nav = {
		icon: string;
		index: number;
		onClick?: any;
	};

	const getNav = ({ index, icon, onClick }: Nav) => {
		return (
			<div
				key={index}
				onClick={onClick}
				className="
        grid
        h-16
        w-16
        justify-center
        content-center
        bg-[var(--bg-overlay-light)]
        dark:bg-[var(--bg-overlay-dark)]
        hover:bg-[var(--bg-overlay-light-hover)]
        hover:dark:bg-[var(--bg-overlay-dark-hover)]  
        rounded-full"
			>
				<Image
					className="
          h-10 
          w-10"
					src={icon}
					alt="project"
				/>
			</div>
		);
	};

	return (
		<>
			<nav
				className="
      shadow-[0px_90px_10px_95px_var(--dev-bg-colour)]
      sm:shadow-none
      sm:dark:shadow-none
      bg-[var(--light-theme-400)]
      dark:bg-[var(--dark-theme-200)]
      sm:bg-[var(--light-theme-500)]
      sm:dark:bg-[var(--dark-theme-100)]
      grid
      sm:grid
      sm:grid-rows-[repeat(auto-fit,5rem)]
      content-center
      justify-center
      sm:h-full
      sm:w-24
      sm:p-2
      grid-cols-[repeat(auto-fit,5rem)]
      grid-flow-col
      w-full
      h-24
      bottom-0
      z-[60]
      fixed
      nav
      "
			>
				{navMenu.map(({ icon, link, title }, index) => {
					// Check if this is the "Menu" item (link is "#")
					const isMenu = link === "#";
					const onClick = isMenu ? buttonProps.onClick : undefined;

					return (
						<div
							key={link}
							onClick={() => {
								vibrate();
								if (!isMenu) hide();
							}}
							className={clsx(
								"place-items-center content-center justify-center"
							)}
						>
							{isMenu ? (
								getNav({ index, icon, onClick })
							) : (
								<Link title={title} href={link}>
									{" "}
									{getNav({ index, icon })}
								</Link>
							)}
						</div>
					);
				})}
				<Theme />
			</nav>
			<div
				{...animationProps}
				className={clsx(
					"md-h:sm:hidden fixed pb-[6rem] h-[calc(100dvh-0rem)] top-0 right-0 sm:w-[calc(100%-6rem)] sm:h-[100dvh] w-full z-50 hidden bg-[var(--light-theme-400)] dark:bg-[var(--dark-theme-200)] overflow-y-auto",
				)}
			>
				<div className="grid h-full pb-6 content-between">
					<div className="grid p-5 py-10 gap-5 ">
						<h1>Quick Links</h1>
						{navModelMenu.map((tech, index) => (
							<Link key={index} href={tech.link}>
								<div className=" bg-[var(--light-theme-600)] dark:bg-[var(--dark-theme-300)] hover:shadow-md rounded-lg p-4 flex gap-5">
									<div className="p-3 w-16 h-16 grid items-center bg-slate-300  bg-opacity-20 rounded-md">
										<Image
											src={tech.icon}
											alt={tech.name}
											className="w-full"
											width={40}
											height={40}
										/>
									</div>
									<div className="grid place-content-center">
										<p className="font-semibold text-xl h-fit dark:text-neutral-300 text-[var(--dev-text-color3)] m-0 p-0">
											{tech.name}
										</p>
									</div>
								</div>
							</Link>
						))}
					</div>
					<section
						className="
				text-center 
				text-lg 
				copyright
				mt-3"
					>
						<p className="text-center text-lg copyright">
							Copyright © 2026 Akash Aman{" "}
							<i className="md:inline copyright hidden">|</i>{" "}
							<br className="block md:hidden" />
							<Link href="/terms">Terms & Conditions </Link>
							{" | "}
							<Link href="/privacy">Privay Policy</Link>
						</p>
					</section>
				</div>
			</div>
		</>
	);
};

export default Navigation;
