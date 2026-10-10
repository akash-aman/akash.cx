import { baseURL } from "@/config/constant";
import { getAllBlogs } from "@/utils/content";
import { siteName } from "@/utils/metadata";

export const revalidate = 3600;

const escape = (text = "") =>
    text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * /feed.xml — RSS 2.0 feed of blog posts.
 */
export async function GET() {
    const blogs = await getAllBlogs();
    const updated = blogs.map((blog) => blog.modified ?? blog.date).filter(Boolean).sort().pop();

    const items = blogs
        .map((blog) => {
            const url = `${baseURL}/blogs/${blog.slug}`;
            return [
                "    <item>",
                `      <title>${escape(blog.title)}</title>`,
                `      <link>${url}</link>`,
                `      <guid isPermaLink="true">${url}</guid>`,
                blog.date ? `      <pubDate>${new Date(blog.date).toUTCString()}</pubDate>` : "",
                blog.description ? `      <description>${escape(blog.description)}</description>` : "",
                ...blog.tags.map((tag) => `      <category>${escape(tag)}</category>`),
                `      <dc:creator>${siteName}</dc:creator>`,
                "    </item>",
            ]
                .filter(Boolean)
                .join("\n");
        })
        .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${siteName} — Blog</title>
    <link>${baseURL}/blogs</link>
    <description>Engineering write-ups by Akash Aman on web performance, React, WordPress, Go and system design.</description>
    <language>en</language>
    <atom:link href="${baseURL}/feed.xml" rel="self" type="application/rss+xml" />
${updated ? `    <lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
    });
}
