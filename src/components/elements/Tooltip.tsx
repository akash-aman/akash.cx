import clsx from 'clsx';
import { ReactNode } from 'react';

interface TooltipProps {
    children: ReactNode;
    content: string;
    area?: "top" | "bottom" | "left" | "right";
}

export const Tooltip = ({ children, content, area = "top" }: TooltipProps) => {
    const positionClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-1 group-hover:mb-2 origin-bottom",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-1 group-hover:mt-2 origin-top",
        left: "right-full top-1/2 -translate-y-1/2 mr-1 group-hover:mr-2 origin-right",
        right: "left-full top-1/2 -translate-y-1/2 ml-1 group-hover:ml-2 origin-left",
    };

    return (
        <div className="relative group flex items-center justify-center">
            {children}
            <div className={clsx(
                "absolute opacity-0 group-hover:opacity-100 transition-all! duration-200! ease-out! transform scale-95 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto px-2.5 py-1 bg-(--card-bg) text-(--text-main) text-xs font-medium rounded-md whitespace-nowrap z-50 shadow-lg border border-(--border-color)",
                positionClasses[area]
            )}>
                {content}
            </div>
        </div>
    );
};
