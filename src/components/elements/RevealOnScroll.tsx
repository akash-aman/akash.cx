"use client";
import { useEffect } from "react";

/**
 * Toggles the `animate` class on elements matching `selector` as they scroll into view.
 * Lets the page itself stay a server component.
 *
 * @param {string} selector : css selector of the elements to observe
 */
const RevealOnScroll = ({ selector }: { selector: string }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { isIntersecting } = entry;
          entry.target.classList.toggle("animate", isIntersecting);
        });
      },
      { threshold: 0.1, rootMargin: "40% 0px -45% 0px" },
    );
    document.querySelectorAll(selector).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector]);

  return null;
};

export default RevealOnScroll;
