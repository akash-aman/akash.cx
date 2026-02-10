import { MetadataRoute } from "next";
import { gqlAPI, paths, baseURL } from "@/config/constant";
import {
    BlogRoutesQuery,
    BlogRoutesDocument,
    BlogRoutesQueryVariables,
    CourseRoutesQuery,
    CourseRoutesDocument,
    CourseRoutesQueryVariables,
} from "@/generated/graphql";
import { wretch } from "@/utils/fetchapi";

const formatDate = (date: string | null | undefined): string | undefined => {
    if (!date) return undefined;
    const d = new Date(date);
    return isNaN(d.getTime()) ? undefined : d.toISOString();
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const defaultPaths = paths.map((path) => ({
        url: `${baseURL}${path.path}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: path.path === '/' ? 1.0 : 0.8,
    }));

    const { routes } = await wretch<BlogRoutesQuery, BlogRoutesQueryVariables>(
        gqlAPI,
        BlogRoutesDocument,
        { first: 100 }
    );

    const blogs = routes?.nodes.map(({ slug, modified }) => ({
        url: `${baseURL}/blogs/${slug}`,
        lastModified: formatDate(modified),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    })) ?? [];

    const { courses } = await wretch<CourseRoutesQuery, CourseRoutesQueryVariables>(
        gqlAPI,
        CourseRoutesDocument,
        { first: 1000 },
        { tags: ["course-routes"] }
    );

    if (!courses?.nodes || !Array.isArray(courses.nodes)) {
        return [...defaultPaths, ...blogs];
    }

    const coursesRoutes = courses.nodes
        .filter((course) => course?.slug)
        .map((course) => ({
            url: `${baseURL}/courses/${course.slug}`,
            lastModified: formatDate(course.modified),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }));

    const coursesChaptersRoutes = courses.nodes.reduce<MetadataRoute.Sitemap>(
        (acc, course) => {
            const chapters = course?.chapters?.chapters;
            
            if (!chapters || !Array.isArray(chapters)) {
                return acc;
            }

            const chapterUrls = chapters
                .filter((chapter) => chapter?.slug)
                .map((chapter) => ({
                    url: `${baseURL}/courses/${course.slug}/${chapter?.slug}`,
                    lastModified: formatDate(chapter?.modified),
                    changeFrequency: 'weekly' as const,
                    priority: 0.8,
                }));

            return [...acc, ...chapterUrls];
        },
        []
    );

    return [...defaultPaths, ...blogs, ...coursesRoutes, ...coursesChaptersRoutes];
}