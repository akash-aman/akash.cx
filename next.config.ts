const withPWA = require("@ducanh2912/next-pwa").default({
	dest: "public",
	disable: process.env.NODE_ENV === "development",
});
const isDev = process.env.NODE_ENV !== "production";

/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {
	experimental: {
		// Inline the global CSS into the HTML: removes a render-blocking request (~0.7s on slow 4G).
		inlineCss: true,
	},
	// Drop Next.js's built-in polyfills (Array.prototype.at/flat/flatMap, Object.fromEntries/hasOwn,
	// String.prototype.trimStart/trimEnd). All are native in Safari 15.4+ / Chrome 93+ / Firefox 92+.
	// Relies on an internal Next.js path: re-check after upgrading Next.
	webpack(config, { isServer, webpack }) {
		if (!isServer) {
			config.plugins.push(
				new webpack.NormalModuleReplacementPlugin(
					/next[\\/]dist[\\/]build[\\/]polyfills[\\/]polyfill-module/,
					require.resolve("./src/utils/empty-polyfill.js"),
				),
			);
		}
		return config;
	},
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.pexels.com",
			},
			{
				protocol: "https",
				hostname: "www.google.com",
			},
			{
				protocol: "https",
				hostname: "raw.githubusercontent.com",
			},
			{
				protocol: "https",
				hostname: "backend.akash.cx",
			},
			{
				protocol: "http",
				hostname: "backend.akash.cx",
			},
			{
				protocol: "http",
				hostname: "strapi",
				port: "1337",
			},
		],
	},
};

//module.exports = withPWA(nextConfig);


const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer(withPWA(nextConfig));
