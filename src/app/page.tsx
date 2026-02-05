import { baseURL, gqlAPI } from "@/config/constant";
import { wretch } from "@/utils/fetchapi";
import profilePicture from "assets/images/AI1.jpg";
import {
	HomePageQuery,
	HomePageQueryVariables,
	HomePageDocument,
	CoursesPageQuery,
	CoursesPageQueryVariables,
	CoursesPageDocument,
} from "generated/graphql";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Dev, Gmail, GitHub, LinkedIn, Twitter, Youtube, BuyMeCoffee } from "@/assets/icons/social";
/**
 * This is the metadata for the page.
 */
export const metadata: Metadata = {
	title: {
		absolute: "Akash Aman | Full Stack Dev",
	},
	description:
		"Welcome to the captivating realm of Akash Aman. Witness the fusion of art and technology in this Full Stack Developer's portfolio. Immerse yourself in a symphony of elegant full stack sorcery, and transformative web experiences.",
	keywords: [
		"Akash Aman",
		"SDE",
		"Full Stack Developer",
		"Responsive design",
		"portfolio",
		"projects",
		"coding",
		"Web development",
		"Web design",
		"User Experience",
		"Html",
		"Css",
		"Javascript",
	],
	applicationName: "Dev.",
	authors: [
		{
			name: "Akash Aman",
			url: baseURL,
		},
	],
	creator: "Akash Aman",
	publisher: "Akash Aman",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		title: "Akash Aman | Full Stack Dev",
		description:
			"Welcome to the captivating realm of Akash Aman. Witness the fusion of art and technology through full stack dev & transformative web experiences.",
		url: baseURL,
		images: [
			{
				url: "/akash.cx.png",
				width: 1920,
				height: 952,
				alt: "Akash Aman | Full Stack Dev",
			},
		],
		type: "website",
		siteName: "Akash Aman | Full Stack Dev",
		countryName: "India",
	},
	robots: {
		index: true,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},

	twitter: {
		creatorId: "@sirakashaman",
		creator: "Akash Aman",
		site: baseURL,
		images: [
			{
				url: "/akash.cx.png",
				width: 1920,
				height: 952,
				alt: "Akash Aman | Full Stack Dev",
			},
		],
		title: "Akash Aman | Full Stack Dev",
		description:
			"Welcome to the captivating realm of Akash Aman. Witness the fusion of art and technology through full stack dev & transformative web experiences.",
	},
	appLinks: {
		web: {
			url: baseURL,
			should_fallback: true,
		},
	},
	archives: [
		baseURL,
		baseURL + "/blogs",
		baseURL + "/courses",
		baseURL + "/projects",
	],
};

/**
 * This function generates the page.
 *
 * @returns
 */
const Page = async () => {

	return (
		<>
			<div className="place-content-center justify-items-center items-start h-full grid gap-10 sm:grid-flow-col relative overflow-hidden">
				<div className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-[conic-gradient(from_0deg,transparent_0deg,var(--gradient-glow-1)_100deg,transparent_180deg,var(--gradient-glow-2)_280deg,transparent_360deg)] opacity-35 sm:opacity-10 blur-[80px] animate-[spin_10s_linear_infinite] rounded-full dark:mix-blend-screen z-0 pointer-events-none" />
				<Image
					title="Mid Journey Profile Picture of Akash Aman 👀"
					src={profilePicture}
					className=" rounded-full h-32 w-32 md:h-52 md:w-52"
					alt="Profile pic"
				/>

				<div className="grid content-center justify-start md:pt-14 sm:pt-8">
					<h1 className="heading-1 opacity-90 m-0 text-left">Hey!👋🏻, I`m Akash</h1>
					<span>
						<h1 className="hidden heading-1 sm:inline opacity-50 m-0 text-left"> Full Stack Developer</h1>
						<h1 className="heading-1 inline sm:hidden opacity-50 m-0 text-left"> Full Stack Dev</h1>
						<Dev className="md:w-15 md:h-15 w-12 h-12 inline" />
					</span>
					<div className="flex flex-wrap items-center gap-6 mt-8 justify-start">
						<Link href="/about" className="flex items-center gap-2 px-4 py-2 rounded-lg border text-gray-200 text-sm font-medium hover:border-gray-500 transition-all">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
								<circle cx="12" cy="7" r="4" />
							</svg>
							About Me
						</Link>

						<div className="h-6 w-px bg-gray-700 hidden sm:block"></div>

						<div className="flex items-center gap-5">
							<Link href="mailto:sir.akashaman@gmail.com" className="text-gray-400 hover:text-white transition-colors">
								<Gmail className="w-5 h-5 md:w-6 md:h-6" />
							</Link>
							<Link href="https://github.com/akash-aman/" target="_blank" className="text-gray-400 hover:text-white transition-colors">
								<GitHub className="w-5 h-5 md:w-6 md:h-6" />
							</Link>
							<Link href="https://www.linkedin.com/in/aman-akash/" target="_blank" className="text-gray-400 hover:text-white transition-colors">
								<LinkedIn className="w-5 h-5 md:w-6 md:h-6" />
							</Link>
							<Link href="https://twitter.com/sirakashaman" target="_blank" className="text-gray-400 hover:text-white transition-colors">
								<Twitter className="w-5 h-5 md:w-6 md:h-6" />
							</Link>
							<Link href="https://www.youtube.com/@xcode-io" target="_blank" className="text-gray-400 hover:text-white transition-colors">
								<Youtube className="w-5 h-5 md:w-6 md:h-6" />
							</Link>
							<Link href="https://buymeacoffee.com/akashaman" target="_blank" className="text-gray-400 hover:text-white transition-colors">
								<BuyMeCoffee className="w-5 h-5 md:w-6 md:h-6" />
							</Link>
						</div>
					</div>
					<div className="mt-8">
						<p className="text-gray-400 text-sm">© 2026 Akash Aman | All rights reserved</p>
					</div>
				</div>

			</div>
		</>
	);
};

export default Page;
