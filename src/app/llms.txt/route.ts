import { baseURL, projects } from "@/config/constant";
import { getAllBlogs, getAllCourses } from "@/utils/content";
import { personLd } from "@/utils/metadata";

export const revalidate = 3600;

const line = (title: string, url: string, description?: string) =>
    `- [${title}](${url})${description ? `: ${description}` : ""}`;

/**
 * /llms.txt — a plain-Markdown index of the site for AI assistants and answer
 * engines (https://llmstxt.org): who the author is and where the content lives.
 */
export async function GET() {
    const [blogs, courses] = await Promise.all([getAllBlogs(), getAllCourses()]);

    const body = [
        "# Akash Aman",
        "",
        `> ${personLd.description}`,
        "",
        `This is the personal site of Akash Aman (${baseURL}). It has an engineering blog, free programming courses, open-source projects and a live view of his self-hosted infrastructure. All content is written by Akash Aman and free to read.`,
        "",
        "## About",
        "",
        line("About Akash Aman", `${baseURL}/about`, "Background, interests and tech stack"),
        line("Career timeline", `${baseURL}/timeline`, "Roles and milestones, up to Senior Software Engineer at rtCamp"),
        line("GitHub", "https://github.com/akash-aman"),
        line("LinkedIn", "https://www.linkedin.com/in/aman-akash/"),
        "",
        "## Blog posts",
        "",
        ...blogs.map((blog) => line(blog.title, `${baseURL}/blogs/${blog.slug}`, blog.description)),
        "",
        ...courses.flatMap((course) => [
            `## Course: ${course.title}`,
            "",
            line(`${course.title} (overview)`, `${baseURL}/courses/${course.slug}`, course.description),
            ...course.chapters.map((chapter) =>
                line(chapter.title, `${baseURL}/courses/${course.slug}/${chapter.slug}`),
            ),
            "",
        ]),
        "## Projects",
        "",
        ...projects.map((project) => line(project.title, project.link, project.description)),
        "",
        "## Optional",
        "",
        line("Self-hosted infrastructure", `${baseURL}/infrastructure`, "Live status of the services Akash runs on a single VPS"),
        line("RSS feed", `${baseURL}/feed.xml`, "New blog posts"),
        line("Sitemap", `${baseURL}/sitemap.xml`),
        "",
    ].join("\n");

    return new Response(body, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
    });
}
