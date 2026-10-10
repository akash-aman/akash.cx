import { gqlAPI } from "@/config/constant";
import {
    BlogRoutesQuery,
    BlogRoutesQueryVariables,
    BlogRoutesDocument,
    BlogPageQuery,
    BlogPageQueryVariables,
    BlogPageDocument,
    CourseRoutesQuery,
    CourseRoutesQueryVariables,
    CourseRoutesDocument,
    CoursePageQuery,
    CoursePageQueryVariables,
    CoursePageDocument,
} from "@/generated/graphql";
import { wretch } from "@/utils/fetchapi";
import { cleanExcerpt } from "@/utils/metadata";

const byNewest = (a: { date?: string | null }, b: { date?: string | null }) =>
    new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime();

/**
 * Every published blog post with its dates and plain-text excerpt, newest first.
 * Reuses the per-post query (and cache tags) of the blog pages.
 */
export async function getAllBlogs() {
    const { routes } = await wretch<BlogRoutesQuery, BlogRoutesQueryVariables>(
        gqlAPI,
        BlogRoutesDocument,
        { first: 100 },
        { tags: ["blogs-archive"] },
    );

    const blogs = await Promise.all(
        (routes?.nodes ?? []).map(async ({ slug }) => {
            if (!slug) return null;
            const { blog } = await wretch<BlogPageQuery, BlogPageQueryVariables>(
                gqlAPI,
                BlogPageDocument,
                { slug },
                { tags: [slug, "blogs"] },
            );
            if (!blog) return null;
            return {
                slug,
                title: blog.title ?? slug,
                description: cleanExcerpt(blog.excerpt),
                date: blog.date,
                modified: blog.modified,
                tags: (blog.tags?.nodes ?? []).flatMap((tag) => (tag?.name ? [tag.name] : [])),
            };
        }),
    );

    return blogs.filter((blog) => blog !== null).sort(byNewest);
}

/**
 * Every course with its chapters in order. Reuses the per-course query of the course pages.
 */
export async function getAllCourses() {
    const { courses } = await wretch<CourseRoutesQuery, CourseRoutesQueryVariables>(
        gqlAPI,
        CourseRoutesDocument,
        { first: 1000 },
        { tags: ["course-routes"] },
    );

    const all = await Promise.all(
        (courses?.nodes ?? []).map(async ({ slug }) => {
            if (!slug) return null;
            const { course } = await wretch<CoursePageQuery, CoursePageQueryVariables>(
                gqlAPI,
                CoursePageDocument,
                { slug },
                { tags: [slug, "courses"] },
            );
            if (!course) return null;
            return {
                slug,
                title: course.title ?? slug,
                description: cleanExcerpt(course.excerpt),
                chapters: (course.chapters?.chapters ?? []).flatMap((chapter) =>
                    chapter?.slug
                        ? [{
                            slug: chapter.slug,
                            title: chapter.title ?? chapter.slug,
                            description: cleanExcerpt(chapter.excerpt),
                        }]
                        : [],
                ),
            };
        }),
    );

    return all.filter((course) => course !== null);
}
