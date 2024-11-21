import type { Config } from "tailwindcss";

const config = {
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			gridTemplateColumns: {
				shiori: "repeat(auto-fit, 11rem)",
			},
			gridTemplateRows: {
				shiori: "4rem 10rem auto auto auto",
				inherit: "inherit",
			},
			gridRow: {
				inherit: "inherit",
			},
		},
	},
} satisfies Config;

export default config;
