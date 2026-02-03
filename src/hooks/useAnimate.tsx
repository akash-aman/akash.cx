import { useEffect, useRef } from "react";

/**
 *
 * @param {string} spinnerClass : css class to be added to the spinner for fade out animation
 * @param {string} blockClass : css class to be added to the content for fade in animation
 * @returns {array} : [fadeOutProps, fadeInProps]
 */
const useAnimate = <T extends HTMLElement>(dependency?: unknown, blockClass?: string | undefined) => {
    const block = useRef<T>(null);

    useEffect(() => {
        const blockRef = block.current;
        // Trigger reflow to restart animation
        void blockRef?.offsetHeight;
        blockRef?.classList.add(blockClass ?? "slide");

        return () => {
            blockRef?.classList.remove(blockClass ?? "slide");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dependency]);

    const animationProps = {
        onAnimationEnd: () => block.current?.classList.remove(blockClass ?? "slide"),
        ref: block,
    };

    return [animationProps];
};

export default useAnimate;