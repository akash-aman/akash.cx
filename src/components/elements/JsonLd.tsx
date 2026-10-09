/**
 * Renders schema.org structured data as a JSON-LD script tag.
 */
const JsonLd = ({ data }: { data: object }) => (
	<script
		type="application/ld+json"
		dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
	/>
);

export default JsonLd;
