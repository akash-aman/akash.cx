"use client";

import { useState } from "react";
import clsx from "clsx";
import { DOCKER_STACKS } from "@/config/infrastructure";
import { ArchCanvas } from "./ArchCanvas";
import { StackSidebar } from "./StackSidebar";

const TAG_ORDER = ["edge", "identity", "apps", "automation", "observability", "oss"];

const TAG_COLOR: Record<string, string> = {
    edge:          "infra-pill--blue",
    identity:      "infra-pill--purple",
    apps:          "infra-pill--green",
    automation:    "infra-pill--amber",
    observability: "infra-pill--blue",
    oss:           "infra-pill--purple",
};

const TAGS = TAG_ORDER.filter((t) =>
    DOCKER_STACKS.some((s) => s.tags?.includes(t))
);

export function ArchView({ statusByDomain = {} }: { statusByDomain?: Record<string, string> }) {
    const [activeTag, setActiveTag] = useState<string | null>(null);

    const toggle = (tag: string) =>
        setActiveTag((prev) => (prev === tag ? null : tag));

    return (
        <div className="grid gap-3">
            {/* Tag filter bar */}
            <div className="flex gap-2 flex-wrap">
                {TAGS.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => toggle(tag)}
                        className={clsx(
                            "infra-pill text-[0.75rem] cursor-pointer transition-all",
                            activeTag === tag
                                ? TAG_COLOR[tag]
                                : "hover:border-(--infra-border-strong)",
                        )}
                    >
                        {tag}
                        <span
                            className="ml-1 opacity-50"
                            style={{ fontSize: "0.65rem" }}
                        >
                            {DOCKER_STACKS.filter((s) => s.tags?.includes(tag)).length}
                        </span>
                    </button>
                ))}
                {activeTag && (
                    <button
                        onClick={() => setActiveTag(null)}
                        className="infra-pill text-[0.75rem] cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
                    >
                        ✕ clear
                    </button>
                )}
            </div>

            {/* Canvas + Sidebar */}
            <div className="flex flex-col md:flex-row gap-3 md:items-start">
                <div className="hidden md:block md:flex-1 md:min-w-0">
                    <ArchCanvas activeTag={activeTag} />
                </div>
                <StackSidebar activeTag={activeTag} statusByDomain={statusByDomain} />
            </div>
        </div>
    );
}
