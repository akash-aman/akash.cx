import Theme from "components/blocks/Theme";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { navMenu, navModelMenu } from "@/config/constant"
import { Tooltip } from "components/elements/Tooltip";

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
        <ul className="md:hidden flex flex-row items-center justify-center md:flex-col md:h-full md:w-24 md:p-2 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
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