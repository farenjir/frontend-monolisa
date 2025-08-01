import path from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react-swc";
import basicSsl from "@vitejs/plugin-basic-ssl";

import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 3090,
		// proxy: {
		// 	"/api": {
		// 		target: process.env.VITE_SIGNALR_HUB, // Your SignalR server URL
		// 		changeOrigin: true,
		// 		rewrite: (path) => path.replace(/^\/api/, ""),
		// 	},
		// },
	},
	plugins: [
		{
			name: "ignore-build-errors",
			buildEnd() {},
		},
		react(),
		// https://www.npmjs.com/package/@vitejs/plugin-basic-ssl
		basicSsl({
			/** name of certification */
			name: "dev",
			/** custom trust domains */
			domains: ["*"],
			/** custom certification directory */
			// certDir: '/Users/.../.devServer/cert'
		}),
		// https://www.saurabhmisra.dev/setup-react-pwa-using-vite/
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
			manifest: {
				name: "PackMigo PWA Project",
				short_name: "PackMigo PWA Project",
				theme_color: "#ffffff",
				icons: [
					{
						src: "pwa-64x64.png",
						sizes: "64x64",
						type: "image/png",
					},
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "maskable-icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
			},
		}),
	],
});
