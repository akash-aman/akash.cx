import type { BlogsPageQuery, CoursesPageQuery } from 'generated/graphql'
import Link from 'next/link';
import ImageComponent from '@/components/blocks/Image';

const Card = ({ type, fields }: {
    type: 'blog' | 'course';
    fields: NonNullable<BlogsPageQuery['blogs']>['nodes'][number]
    | NonNullable<CoursesPageQuery['courses']>['nodes'][number]
}) => {
    const title = fields?.title || 'Untitled';
    const slug = fields?.slug || '#';
    const excerpt = fields?.excerpt;

    // Normalize Image URL
    // @ts-ignore - Union type complexity optimization
    const image = fields?.featuredImage?.node?.mediaItemUrl || fields?.featuredImage?.node?.sourceUrl;
    // Normalize Author
    // @ts-ignore
    const authorFirstName = fields?.author?.node?.firstName;
    // @ts-ignore
    const authorLastName = fields?.author?.node?.lastName;
    // @ts-ignore
    const authorName = fields?.author?.node?.name || (authorFirstName ? `${authorFirstName} ${authorLastName}` : null);

    // Normalize Tags
    // @ts-ignore
    const tags = fields?.tags?.nodes || [];
    const href = type === 'blog' ? `/blogs/${slug}` : `/courses/${slug}`;

    return (
        <section className="group h-full flex flex-col bg-(--card-bg) rounded-xl overflow-hidden transition-transform! duration-100! ease-in-out hover:scale-102!">
            <Link href={href} className="flex flex-col h-full">
                <div className="relative w-full aspect-video overflow-hidden">
                    {image ? (
                        <ImageComponent
                            src={image}
                            alt={title}
                            fill
                            padding={false}
                            className="object-cover transition-transform! duration-500! group-hover:scale-105! ease-in-out!"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-xs">
                            No image available
                        </div>
                    )}
                </div>
                <div className="flex flex-col flex-1 p-5 space-y-4">
                    <header>
                        <h2 title={title} className="heading-5 line-clamp-2 transition-colors">
                            {title}
                        </h2>
                    </header>

                    <div className="flex-1">
                        <p className="text-sm line-clamp-3 leading-relaxed">
                            {excerpt}
                        </p>
                    </div>

                    <footer className="flex flex-wrap gap-2 pt-2 mt-auto">
                        {tags.length > 0 ? (
                            tags.map((tag: any) => {
                                const tagImage = tag?.featuredImage?.featuredImage?.mediaItemUrl;
                                return (
                                    <div key={tag?.slug || tag?.name} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-(--bg-secondary)/90">
                                        {tagImage && (
                                            <div className="relative w-4 h-4 shrink-0">
                                                <ImageComponent
                                                    src={tagImage}
                                                    alt={tag?.name}
                                                    padding={false}
                                                    className="object-contain"
                                                />
                                            </div>
                                        )}
                                        <span className="text-xs font-medium whitespace-nowrap">{tag?.name}</span>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-(--bg-secondary)/90">
                                <div className="w-4 h-4 rounded-full flex items-center justify-center text-xs">
                                    {(authorName?.[0] || 'A').toUpperCase()}
                                </div>
                                <span className="text-xs font-medium">
                                    {authorName || 'Personal'}
                                </span>
                            </div>
                        )}
                    </footer>
                </div>
            </Link>
        </section>
    )
}

export default Card