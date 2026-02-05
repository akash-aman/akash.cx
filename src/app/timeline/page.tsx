"use client";
import { useEffect, useRef } from "react";
import { timeLine } from "@/config/constant";
import "@/styles/timeline.scss";
import Footer from "@/components/blocks/Footer";
import React from "react";

const Page = () => {
  const timelineRef = useRef<(HTMLDivElement | null)[]>([]);

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
    timelineRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
  }, []);

  return (
    <article className="max-w-4xl mx-auto">
      <header className="pb-4 sm:pb-0">
        <h1 className="heading-1 py-8 border-b border-(--dark-theme-300)">Timeline</h1>
      </header>
      <section className="timeline my-12 mx-3 grid grid-cols-2 grid-flow-row-dense">

        {timeLine.map(({ title, description, year }, index) => {
          const row = index % 2 === 0 ? "even-row" : "odd-row";
          return (
            <React.Fragment key={index}>
              <div
                ref={(el) => {
                  timelineRef.current[2 * index] = el;
                }}
                className={`${row} t-${index} relative timeline-detail`}
              >
                <div className="max-w-sm w-sm  rounded-lg p-4 lg:p-10 bg-(--card-bg) hover:shadow-lg ">
                  <h2 className="opacity-90 font-thin heading-4 mb-4">
                    {title}
                  </h2>
                  <p className="opacity-70 m-0 p-0">{description}</p>
                </div>
              </div>
              <div
                ref={(el) => {
                  timelineRef.current[2 * index + 1] = el;
                }}
                className={`${row} t-${index} relative timeline-year`}
              >
                <div className="">
                  <h1 className="opacity-50 m-0 heading-2">
                    {year}
                  </h1>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </section>
      <Footer />
    </article>
  );
};

export default Page;
