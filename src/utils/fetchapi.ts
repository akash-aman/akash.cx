import { DocumentNode } from "graphql";

export async function wretch<T, V>(
	API: string,
	document: DocumentNode,
	variables: V,
	next?: any,
): Promise<T> {
	const header = new Headers();
	header.append("Content-Type", "application/json");

	const data = await fetch(API, {
		method: "POST",
		headers: header,
		cache: "force-cache",
		next: next,
		body: JSON.stringify({
			query: document?.loc?.source?.body,
			variables: variables,
		}),
	});

	return (await data.json()).data as T;
}