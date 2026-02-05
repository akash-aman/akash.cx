"use client";

const Style = ({ params }: { params: { chapter: string } }) => {
	return (

		<style jsx global>
			{`
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
			`}
		</style>
	);
};

export default Style;
