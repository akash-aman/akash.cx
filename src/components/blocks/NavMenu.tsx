import useAnimate from "hooks/useAnimationWithoutState";
import Image from "next/image";
import project from "assets/icons/project3.svg";
import techstack from "assets/icons/fullstack.svg";
import about from "assets/icons/about.svg";
import timeline from "assets/icons/timeline2.svg";
import blog from "assets/icons/blog.svg";
import course from "assets/icons/course.svg";
import more from "assets/icons/more.svg";
import vibrate from "hooks/vibrate";
import Theme from "./Theme";
import Link from "next/link";
import clsx from "clsx";
import { navMenu, navModelMenu } from "@/config/constant"
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Key } from "react";
import { UrlObject } from "url";
import { Tooltip } from "../elements/Tooltip";

const NavMenu = ({ className }: { className?: string }) => {



  return (
    <header>
      <nav className={clsx("bg-(--bg-primary)", className)}>
        <ul className="hidden md:flex flex-row items-center justify-center md:flex-col md:h-full md:w-24 md:p-2 z-10">
          <li className="p-5 w-18 h-18  grid justify-center content-center rounded-full">
            <Theme />
          </li>
          {
            navMenu.map((item) => (
              <li key={item.title} className="p-5 w-18 h-18  grid justify-center content-center rounded-full">
                <Link href={item.link}>
                  <Tooltip area="right" content={item.title}>
                    <Image className="" src={item.icon} alt={item.title} />
                  </Tooltip>
                </Link>
              </li>
            ))
          }
        </ul>
        <ul className="md:hidden flex flex-row items-center justify-center md:flex-col md:h-full md:w-24 md:p-2 z-10">
          <li className="p-5 w-18 h-18  grid justify-center content-center rounded-full">
            <Theme />
          </li>
          {
            navModelMenu.map((item) => (
              <li key={item.title} className="p-5 w-18 h-18  grid justify-center content-center rounded-full">
                <Link href={item.link}>
                  <Image className="" src={item.icon} alt={item.title!} />
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </header>
  )
}

export default NavMenu