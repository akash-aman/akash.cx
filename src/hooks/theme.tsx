const ApplyTheme = () => {
	/**
	 * @description - Minified JS only reduce CODE SIZE by only 19 B,That`s why it's not worth it.
	 * 				  At least we can understand code better compared to minified JS.
	 * 				  Before: 239 B | After: 220 B | Saving: 7.95% (19 B)
	 */
	const theme = `
	if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
		document.documentElement.classList.add('dark')
	} else {
		document.documentElement.classList.remove('dark')
	}`;

	return <script dangerouslySetInnerHTML={{ __html: theme }} />;
};

export default ApplyTheme;
