import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			registerType: 'autoUpdate', // or 'prompt' for manual update prompt
			includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
			injectRegister: 'auto',
			manifest: {
				name: 'Flow',
				short_name: 'Flow',
				description: 'A personal task manager',
				theme_color: '#286BD7',
				start_url: '/',
				display: 'standalone',
				icons: [
					{
						src: 'android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
			},
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	optimizeDeps: {
		exclude: ['@electric-sql/pglite'],
	},
})
