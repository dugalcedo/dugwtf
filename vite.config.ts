import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path'

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			"@c": path.resolve(import.meta.dirname, './src/components')
		}
	},
	server: {
		watch: {
			usePolling: true,
			interval: 500
		}
	}
});
