// Server component: a plain <style> keeps styled-jsx (~8KB) out of the client bundle.
const ChapterStyles = ({ params }: { params: { chapter: string } }) => {
	return (
		<style
			dangerouslySetInnerHTML={{
				__html: `
				.dark .${params.chapter} {
					color: #fff;
				}
				.${params.chapter} {
					color: #000;
				}
				.div-${params.chapter} > div {
					display: none;
				}
				.div-${params.chapter} > span {
					display: flex;
				}
			`,
			}}
		/>
	);
};

export default ChapterStyles;
