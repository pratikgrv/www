import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
		name: "pratik grv",
		short_name: "pg.",
		description: "yo!",
		start_url: "/",
		display: "standalone",
		background_color: "#fff",
		theme_color: "#fff",
		icons: [
			{
				src: "/favicon.ico",
				sizes: "any",
				type: "image/x-icon",
			},
			{
				src: "/icon.png",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "/apple-icon.png",
				sizes: "any",
				type: "image/png",
			},
		],
	};
}