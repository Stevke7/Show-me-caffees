import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundColor: {
				"custom-body": "#1c1a1d", // Replace with your desired color
			},
			colors: {
				"back-color": "#1c1a1d",
				"nav-bg": "#131313",
				"tile-active": "#1c1a1d",
				"bg-btn": "#a45de9",
			},
		},
	},
	plugins: [],
};
export default config;
