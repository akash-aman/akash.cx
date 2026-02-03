import clsx from "clsx";
import React from "react";

const Layout = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div
            className={clsx("md:shadow-(--content-area-fade) min-h-max px-10 py-12 sm:px-12 sm:py-14 md:px-14 md:py-16", className)}
        >
            {children}
        </div>
    )
};

export default Layout;
