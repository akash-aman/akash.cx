"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { projects } from "@/config/constant";

import "@/styles/timeline.scss";
import Footer from "@/components/blocks/Footer";

/**
 * This function generates the page.
 *
 * @returns
 */
const Page = () => {
  const projectRef = useRef<(HTMLDivElement | null)[]>([]);

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
    projectRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
  }, []);

  return (
    <article className="max-w-6xl mx-auto">
      <header>
        <h1 className="heading-1 py-8 border-b border-(--dark-theme-300)">Projects</h1>
      </header>
      <div className="projects my-12 mx-3 grid grid-cols-2 grid-flow-row-dense">
        {projects.map(({ title, description, year, image, techstack, link }, index) => {
          const row = index % 2 === 0 ? "even-row" : "odd-row";
          return (
            <React.Fragment key={index}>
              <div
                ref={(el) => {
                  projectRef.current[2 * index] = el;
                }}
                className={`${row} t-${index} relative timeline-detail`}
              >
                <a href={link} target="_blank">  <div className="max-w-xl w-lg grid items-start">
                  <div className="rounded-lg p-4 lg:p-7 bg-(--card-bg) hover:shadow-lg">
                    <h2 className="opacity-90 font-thin heading-4 mb-4">
                      {title}
                    </h2>
                    <p className="opacity-70 m-0 p-0">{description}</p>
                    <div className="pt-4 flex justify-items-start gap-1">
                      {techstack?.map((Tech, index) => {
                        return (
                          <div key={index} className="">
                            <Tech className="w-6 h-6" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div></a>
              </div>
              <div
                ref={(el) => {
                  projectRef.current[2 * index + 1] = el;
                }}
                className={`${row} t-${index} relative timeline-year`}
              >
                <div className="">
                  <h1 className="opacity-50 m-0 heading-2">
                    {year}
                  </h1>
                </div>
                <figure className="pt-10 max-w-lg w-lg">
                  <Image
                    src={image}
                    alt={title}
                    width={900}
                    height={900}
                    className="rounded-lg w-full h-auto mt-4"
                  />
                </figure>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <Footer />
    </article>
  );
};

export default Page;
