import clsx from "clsx";
import { ReactNode, HTMLAttributes } from "react";

export function Mono({
    children,
    className,
    ...rest
}: { children: ReactNode } & HTMLAttributes<HTMLSpanElement>) {
    return (
        <span className={clsx("mono", className)} {...rest}>
            {children}
        </span>
    );
}
