import clsx from "clsx";
import React from "react";

const Layout = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div
            className={clsx("md:shadow-(--content-area-fade) grid min-h-full px-6 py-12 sm:px-12 sm:py-14 md:px-12 lg:px-16 md:py-20", className)}
        >
            {children}
        </div>
    )
};

export default Layout;
