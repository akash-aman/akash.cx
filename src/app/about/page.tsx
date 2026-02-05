import { U } from '@/components/elements/Html'

import {
    GitHub,
} from "@/assets/icons/social";

import golang from "@/assets/svgs/go.svg";
import react from "@/assets/svgs/react.svg";
import sass from "@/assets/svgs/sass.svg";
import javascript from "@/assets/svgs/javascript.svg";
import typescript from "@/assets/svgs/typescript.svg";
import nextjs from "@/assets/svgs/next.svg";
import redux from "@/assets/svgs/redux.svg";
import tailwindcss from "@/assets/svgs/tailwindcss.svg";
import graphql from "@/assets/svgs/graphql.svg";
import nestjs from "@/assets/svgs/nest.svg";
import csharp from "@/assets/svgs/csharp.svg";
import nodejs from "@/assets/svgs/nodejs.svg";
import python from "@/assets/svgs/python.svg";
import docker from "@/assets/svgs/docker.svg";
import nginx from "@/assets/svgs/nginx.svg";
import kubernetes from "@/assets/svgs/kubernetes.svg";
import mysql from "@/assets/svgs/mysql.svg";
import html from "@/assets/svgs/html.svg";
import css from "@/assets/svgs/css.svg";
import figma from "@/assets/svgs/figma.svg";
import aws from "@/assets/svgs/aws.svg";
import gcp from "@/assets/svgs/gcp.svg";
import azure from "@/assets/svgs/azure.svg";
import Image from "next/image";
import { Tooltip } from "@/components/elements/Tooltip";
import Footer from '@/components/blocks/Footer';



const Page = () => {
    return (
        <article className='max-w-4xl mx-auto'>
            <header>
                <h1 className="heading-1 py-8 border-b border-(--dark-theme-300)">About </h1>
            </header>
            <section className='py-8 space-y-10'>
                <p className='para-lg'>
                    I'm a <U className="gradient-green">Senior Software Engineer</U> 👨‍💻 at{" "}
                    <i className="not-italic animate-gradient font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600">
                        rtCamp
                    </i>,
                    where I build <U className="gradient-red">scalable, high-performance systems</U> that solve real-world friction. I don't just write code; I design experiences that actually make an impact.
                </p>

                <p className='para-lg'>
                    For me, tech is a playground. I'm usually deep in a documentation rabbit hole, mastering <U className="orange">emerging stacks</U> 🚀 or refining architectural patterns to see how far I can push the modern web.
                </p>

                <h2 className="heading-2 pt-4">Beyond the Day Job 🎻</h2>

                <p className='para-lg'>
                    When I'm offline, I'm an active contributor to the <U className="yellow">open-source community</U> 🤝. Whether it's shipping experimental "e-hacks" or maintaining libraries on GitHub, I believe the best way to learn is to build in public.
                </p>

                <p className='para-lg'>
                    My curiosity doesn't stop at the keyboard. I'm a dedicated <U className="pink">gadget enthusiast</U> 📸—often found behind a Sony Alpha lens—and I have a genuine love for <U className="blue">teaching</U> 👨‍🏫. Breaking down complex concepts is how I solidify my own understanding.
                </p>

                <p className='para-lg'>
                    To reset, I <U className="sky">travel</U> ✈️. Exploring new cultures and navigating unfamiliar cities gives me the fresh perspective I need to tackle the next big technical challenge. The <U className="purple">thrill of discovery</U> is what keeps me moving.
                </p>

                <h2 className="heading-2 pt-4">Technical Arsenal 🛠️</h2>
                <ul aria-label="Technical Skills" className="flex flex-wrap gap-4 items-center list-none p-0 m-0">
                    <li>
                        <Tooltip content="Golang">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={golang} alt="Golang" width="30" height="30" />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="React">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={react} alt="React" width="30" height="30" />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="SASS">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={sass} alt="SASS" width="30" height="30" />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="JavaScript">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={javascript} alt="JavaScript" width="30" height="30" />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="TypeScript">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={typescript} alt="TypeScript" width="30" height="30" />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="Next.js">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={nextjs} alt="Next.js" width="30" height="30" />
                        </Tooltip>
                    </li>
                    {/* <li>
                        <Tooltip content="Gatsby">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={gatsby} alt="Gatsby" width="30" height="30" />
                        </Tooltip>
                    </li> */}
                    <li>
                        <Tooltip content="Redux">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={redux} alt="Redux" width="30" height="30" />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="Tailwind CSS">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={tailwindcss} alt="Tailwind CSS" width="30" height="30" />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="GraphQL">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={graphql} alt="GraphQL" width="30" height="30" />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="NestJS">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={nestjs} alt="NestJS" width="30" height="30" />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="C#">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={csharp} alt="C#" width="30" height="30" />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="Node.js">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={nodejs} alt="Node.js" width="30" height="30" />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="Python">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={python} alt="Python" width="30" height="30" />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="NGINX">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={nginx} alt="NGINX" width="30" height="30" />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="GitHub">
                            <GitHub className="w-[30px] h-[30px] hover:scale-110 transition-transform cursor-pointer" />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="MySQL">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={mysql} alt="MySQL" width="30" height="30" />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="HTML5">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={html} alt="HTML5" width="30" height="30" />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="CSS3">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={css} alt="CSS3" width="30" height="30" />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="Figma">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={figma} alt="Figma" width="30" height="30" />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="AWS">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={aws} alt="AWS" width="30" height="30" />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="GCP">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={gcp} alt="GCP" width="30" height="30" />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="Azure">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={azure} alt="Azure" width="30" height="30" />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="Docker">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={docker} alt="Docker" width="30" height="30" />
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip content="Kubernetes">
                            <Image className="hover:scale-110 transition-transform cursor-pointer" src={kubernetes} alt="Kubernetes" width="30" height="30" />
                        </Tooltip>
                    </li>
                </ul>
            </section>
            <Footer nav='home' />
        </article>
    )
}

export default Page