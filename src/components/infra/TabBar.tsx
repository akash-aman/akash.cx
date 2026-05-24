"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const TABS = [
    { href: "/infrastructure", label: "overview" },
    { href: "/infrastructure/architecture", label: "architecture" },
];

export function TabBar() {
    const path = usePathname();
    return (
        <nav
            aria-label="Infrastructure sections"
        >
            <ul className="max-w-350 mx-auto flex gap-6 px-4 sm:px-6 lg:px-8">
                {TABS.map((t) => {
                    const active = t.href === "/infrastructure"
                        ? path === "/infrastructure"
                        : path?.startsWith(t.href);
                    return (
                        <li key={t.href}>
                            <Link
                                href={t.href}
                                className={clsx("infra-tab inline-block", active && "infra-tab--active")}
                            >
                                {t.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
