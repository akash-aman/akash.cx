import "styles/infra.scss";
import { Metadata } from "next";
import { generatePageMetadata } from "@/utils/metadata";
import { HostStrip } from "@/components/infra/HostStrip";
import { TabBar } from "@/components/infra/TabBar";
import { HOST } from "@/config/infrastructure";

export const metadata: Metadata = generatePageMetadata({
    title: "Infrastructure",
    description:
        "Live ops console for everything Akash self-hosts on a single VPS — reverse proxy, observability stack, MCP servers and CI/CD pipelines, with real status.",
    path: "/infrastructure",
});

export const revalidate = 30;

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div data-section="infra" className="-mx-6 sm:-mx-12 md:-mx-12 lg:-mx-16 -my-12 sm:-my-14 md:-my-20 min-h-screen">
            <div className="sticky top-0 z-20 bg-(--bg-secondary) border-b border-(--infra-border)">
                <HostStrip meta={HOST} />
                <TabBar />
            </div>
            <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-350 mx-auto">
                {children}
            </div>
        </div>
    );
}
