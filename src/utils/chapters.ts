/**
 * A course's `chapters` ACF relationship is a connection of any content node
 * (wpgraphql-acf 3.x), so generated types are `Chapter | {}` per node. Keep
 * only chapters; queries select `__typename` on these nodes for this check.
 */
export const chapterNodes = <T extends { __typename?: string }>(
    nodes?: readonly (T | null | undefined)[] | null,
): Extract<T, { __typename?: "Chapter" }>[] =>
    (nodes ?? []).filter(
        (node): node is Extract<T, { __typename?: "Chapter" }> => node?.__typename === "Chapter",
    );
