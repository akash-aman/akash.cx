import Portfolio from "@/assets/images/Portfolio.png";
import Pattern from "@/assets/images/Github_Pattern.png";
import markdownPreviewer from "@/assets/images/markdown_previewer.png";
import cgpaCalculator from "@/assets/images/cgpa-calculator.png";
import frontendSearch from "@/assets/images/frontend_search.png";
import cms from "@/assets/images/cms.png";
import {
	Adobe,
	CSS3,
	DigitalOcean,
	Docker,
	Figma,
	Gatsby,
	GitHub,
	GraphQL,
	HTML5,
	JS,
	MySQL,
	NestJS,
	NextJS,
	NodeJS,
	Nginx,
	Python,
	ReactJS,
	Redux,
	SASS,
	Tailwind,
	TS,
	Firebase,
} from "@/assets/icons/icon";

import {
	GitHub as GitHubIcon,
	Twitter,
	Youtube,
	LinkedIn,
	Gmail,
	NextJS as NextJSIcon,
	Sass,
	Tailwind as TailwindIcon,
	MDX,
	Dev,
} from "@/assets/icons/social";

export const timeLine = [
	{
		title: "Software Engineer",
		description: "Software Engineer 🎉 at rtCamp India 💖",
		year: "Current",
	},
	{
		title: "Intern",
		description: "Intern 👦 at rtCamp India",
		year: "2022",
	},
	{
		title: "Graduate",
		description: "B.Tech in Electronics & Communications and Engineering 👨‍🎓",
		year: "2022",
	},
	{
		title: "High School",
		description: "High School 🏫 from Sacred Heart School 🚸",
		year: "2017",
	},
	{
		title: "First Interaction with Internet",
		description:
			"My initial exposure to the internet 🌐 occurred when I was 8 years old, During that time, we used dial-up 📞 networking. ☎️",
		year: "2008",
	},
	{
		title: "First Interaction with Computer Games",
		description:
			"At the age of 5, I had my initial experience with computer 🎮 games.",
		year: "2005",
	},
	{
		title: "Born",
		description: "Born 👶 in a small town of Bihar, India",
		year: "2000",
	},
	{
		title: "The Earliest Home Computer",
		description: "The first computer 🖥️, purchased before my birth.",
		year: "1997",
	},
];

export const techstack = [
	{
		name: "React JS",
		description: "Web Development",
		url: "https://reactjs.org/",
		Logo: ReactJS,
	},
	{
		name: "Next.js",
		description: "Web Development",
		url: "https://nextjs.org/",
		Logo: NextJS,
	},
	{
		name: "Gatsby JS",
		description: "Web Development",
		url: "https://www.gatsbyjs.com/",
		Logo: Gatsby,
	},
	{
		name: "Redux",
		description: "State Management",
		url: "https://redux.js.org/",
		Logo: Redux,
	},
	{
		name: "TypeScript",
		description: "Web Development",
		url: "https://www.typescriptlang.org/",
		Logo: TS,
	},
	{
		name: "JavaScript",
		description: "Web Development",
		url: "https://www.javascript.com/",
		Logo: JS,
	},
	{
		name: "Tailwind CSS",
		description: "Web Design",
		url: "https://tailwindcss.com/",
		Logo: Tailwind,
	},
	{
		name: "GraphQL",
		description: "API Development",
		url: "https://graphql.org/",
		Logo: GraphQL,
	},
	{
		name: "NestJS",
		description: "Backend Development",
		url: "https://nestjs.com/",
		Logo: NestJS,
	},
	{
		name: "Node JS",
		description: "Backend Development",
		url: "https://nodejs.org/en/",
		Logo: NodeJS,
	},
	{
		name: "Docker",
		description: "DevOps",
		url: "https://www.docker.com/",
		Logo: Docker,
	},
	{
		name: "Docker Compose",
		description: "DevOps",
		url: "https://docs.docker.com/compose/",
		Logo: Docker,
	},
	{
		name: "nginx",
		description: "DevOps",
		url: "https://www.nginx.com/",
		Logo: Nginx,
	},
	{
		name: "GitHub",
		description: "Version Control & CI/CD",
		url: "https://www.github.com/",
		Logo: GitHub,
	},
	{
		name: "MySQL",
		description: "Database",
		url: "https://www.mysql.com/",
		Logo: MySQL,
	},
	{
		name: "Python",
		description: "Scripting, Automation & Web Scraping",
		url: "https://www.python.org/",
		Logo: Python,
	},
	{
		name: "HTML5",
		description: "Web Layout",
		url: "https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5",
		Logo: HTML5,
	},
	{
		name: "CSS3",
		description: "Web Design",
		url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
		Logo: CSS3,
	},
	{
		name: "SASS",
		description: "Web Design",
		url: "https://sass-lang.com/",
		Logo: SASS,
	},
	{
		name: "Adobe XD",
		description: "Web Design",
		url: "https://www.adobe.com/products/xd.html",
		Logo: Adobe,
	},
	{
		name: "Figma",
		description: "Web Design",
		url: "https://www.figma.com/",
		Logo: Figma,
	},
	{
		name: "Digital Ocean",
		description: "Cloud Hosting",
		url: "https://www.digitalocean.com/",
		Logo: DigitalOcean,
	},
];

export const projects = [
	{
		title: "Portfolio",
		description: "My Portfolio built using NextJS, & TailwindCSS",
		year: "2023",
		link: "",
		image: Portfolio,
		techstack: [NextJS, Tailwind, TS, SASS, Firebase],
	},
	{
		title: "GitHub TimeLine Pattern Generator",
		description:
			"Build script to generate GitHub TimeLine Pattern using GitHub API & NodeJS",
		year: "2022",
		link: "",
		image: Pattern,
		techstack: [NodeJS, JS],
	},
	{
		title: "Next JS CMS",
		description:
			" A CMS built using NextJS, firebase & Node JS with a dashboard to manage the content of the website",
		year: "2022",
		link: "",
		image: cms,
		techstack: [NextJS, JS, SASS, NodeJS, Firebase, GraphQL],
	},
	{
		title: "Markdown Previewer",
		description: "A simple markdown previewer built using ReactJS",
		year: "2022",
		link: "",
		image: markdownPreviewer,
		techstack: [NextJS, JS, SASS, Docker],
	},
	{
		title: "Dynamic CGPA Calculator",
		description:
			"A dynamic CGPA calculator which calculates CGPA a/c to number of subjects and their credits & and also no of semester semesters",
		year: "2022",
		link: "",
		image: cgpaCalculator,
		techstack: [NextJS, JS, Tailwind, Redux, Docker],
	},
	{
		title: "Client Docs Search",
		description: "A reverse engineered MDN Docs Search Implementation.",
		year: "2022",
		link: "",
		image: frontendSearch,
		techstack: [NextJS, JS, Redux],
	},
];

export const social = [
	{
		Icon: Youtube,
		link: "https://www.youtube.com/@thedev684/featured",
		title: "YouTube",
	},
	{
		Icon: GitHubIcon,
		link: "https://github.com/akash-aman/",
		title: "GitHub",
	},
	{
		Icon: Twitter,
		link: "https://twitter.com/sirakashaman",
		title: "Twitter",
	},
	{
		Icon: LinkedIn,
		link: "https://www.linkedin.com/in/aman-akash/",
		title: "LinkedIn",
	},
	{
		Icon: Gmail,
		link: "mailto:sir.akashaman@gmail.com",
		title: "Gmail",
	},
];

export const serverURL = "https://backend.akash.cx";
export const gqlAPI = serverURL + "/graphql";
export const baseURL = "https://www.akash.cx";

export const paths = [
	{ path: "/projects" },
	{ path: "/blogs" },
	{ path: "/courses" },
	{ path: "/privacy" },
	{ path: "/terms" },
	{ path: "/timeline" },
	{ path: "/techstack" },
];

import project from "@/assets/svgs/project.svg";
import techstackIcon from "@/assets/svgs/fullstack.svg";
import about from "@/assets/svgs/about.svg";
import timelineIcon from "@/assets/svgs/timeline.svg";
import blogIcon from "@/assets/svgs/blog.svg";
import courseIcon from "@/assets/svgs/course.svg";
import more from "@/assets/svgs/more.svg";

export const navMenu = [
	{
		icon: about,
		link: "/",
		title: "Home",
	},
	{
		icon: courseIcon,
		link: "/courses",
		title: "Courses",
	},
	{
		icon: blogIcon,
		link: "/blogs",
		title: "Blogs",
	},
	{
		icon: project,
		link: "/projects",
		title: "Projects",
	},
	{
		icon: timelineIcon,
		link: "/timeline",
		title: "TimeLine",
	}
	// {
	// 	icon: more,
	// 	link: "#",
	// 	title: "Menu",
	// },
];

export const navModelMenu = [
	{
		icon: courseIcon,
		link: "/courses",
		name: "Courses",
		title: "Courses",
		description: "Courses",
	},
	{
		icon: project,
		link: "/projects",
		name: "Projects",
		title: "Projects",
		description: "Projects",
	},
	{
		icon: timelineIcon,
		link: "/timeline",
		name: "TimeLine",
		title: "TimeLine",
		description: "TimeLine",
	}
];