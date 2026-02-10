import Portfolio from "@/assets/images/akash.cx.png";
import dynamixLayout from "@/assets/images/dynamix-layout.jpg";
import ragProject from "@/assets/images/rag-project.png";
import microservices from "@/assets/images/microservice.png";
import Pattern from "@/assets/images/Github_Pattern.png";
import {
	Adobe,
	CSS3,
	DigitalOcean,
	Docker,

	Figma,
	Gatsby,
	GitHub,
	GoLang,
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
} from "@/assets/icons/icon";

import {
	GitHub as GitHubIcon,
	Twitter,
	Youtube,
	LinkedIn,
	Gmail,
} from "@/assets/icons/social";

export const timeLine = [
	{
		title: "Senior Software Engineer",
		description: "Leading architectural excellence at rtCamp 🚀. Building high-scale web apps and mentoring the next cohort of engineers.",
		year: "2024 - Current",
	},
	{
		title: "Software Engineer",
		description: "Mastering the stack at rtCamp. Shipping enterprise features and contributing to the open-source ecosystem.",
		year: "2023",
	},
	{
		title: "The Professional Debut",
		description: "Began as an Intern at rtCamp 👦. Turning complex logic into production-ready code used by millions.",
		year: "2022",
	},
	{
		title: "Engineering Graduate",
		description: "B.Tech in Electronics & Communications 🎓. The foundation of my technical problem-solving mindset.",
		year: "2022",
	},
	{
		title: "Schooling Days",
		description: "Completed High School at Sacred Heart School 🏫. Where my curiosity for science and tech began.",
		year: "2017",
	},
	{
		title: "The Dial-up Era",
		description: "First step into the digital world 🌐. Learning patience at 56kbps—the screech of the modem was my intro to tech.",
		year: "2008",
	},
	{
		title: "Pixels & Play",
		description: "My first experience with video games 🎮. Discovering that a screen could be an interactive playground.",
		year: "2005",
	},
	{
		title: "Hello World",
		description: "Born 👶 in a small town in Bihar, India. The start of the journey.",
		year: "2000",
	},
	{
		title: "The Legacy PC",
		description: "Our family's first computer 🖥️. It arrived before I did—waiting for me to hit the power button.",
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
		title: "Dynamix Layout",
		description: "An open-source library for building complex, multi-panel user interfaces with JavaScript.",
		year: "2025",
		link: "https://github.com/akash-aman/dynamix-layout",
		image: dynamixLayout, // Ensure you have this import
		techstack: [JS, TS], // Based on your core tech interests
	},
	{
		title: "RAG Engine",
		description: "A Retrieval-Augmented Generation implementation designed for efficient data querying and AI context.",
		year: "2025",
		link: "https://github.com/akash-aman/RAG",
		image: ragProject,
		techstack: [Python],
	},
	{
		title: "Microservices Architecture",
		description: "A robust backend system demonstrating concurrency patterns and scalable service communication.",
		year: "2024",
		link: "https://github.com/akash-aman/microservice",
		image: microservices,
		techstack: [GoLang, Docker],
	},
	{
		title: "Portfolio",
		description: "A high-performance personal site built with NextJS and Tailwind to showcase my engineering journey.",
		year: "2024, 2026",
		link: "https://github.com/akash-aman/akash.cx",
		image: Portfolio,
		techstack: [NextJS, Tailwind, TS],
	},
	{
		title: "GitHub TimeLine Pattern Generator",
		description:
			"Build script to generate GitHub TimeLine Pattern using GitHub API & NodeJS",
		year: "2022",
		link: "https://github.com/akash-aman?tab=overview&from=2019-12-01&to=2019-12-31",
		image: Pattern,
		techstack: [NodeJS, JS],

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
	{ path: "/" },
	{ path: "/about" },
	{ path: "/projects" },
	{ path: "/blogs" },
	{ path: "/courses" },
	{ path: "/timeline" }
];

import project from "@/assets/svgs/project.svg";
import about from "@/assets/svgs/about.svg";
import timelineIcon from "@/assets/svgs/timeline.svg";
import blogIcon from "@/assets/svgs/blog.svg";
import courseIcon from "@/assets/svgs/course.svg";

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
		icon: about,
		link: "/",
		name: "Home",
		title: "Home",
		description: "Home",
	},
	{
		icon: courseIcon,
		link: "/courses",
		name: "Courses",
		title: "Courses",
		description: "Courses",
	},
	{
		icon: blogIcon,
		link: "/blogs",
		name: "Blogs",
		title: "Blogs",
		description: "Blogs",
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