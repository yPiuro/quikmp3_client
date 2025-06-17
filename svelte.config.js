import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter: adapter({
		// 	// See below for an explanation of these options
		// 	config: undefined,
		// 	platformProxy: {
		// 		configPath: undefined,
		// 		environment: undefined,
		// 		persist: undefined
		// 	},
		// 	fallback: 'plaintext',
		// 	routes: {
		// 		include: ['/*'],
		// 		exclude: ['<all>']
		// 	}
		// })
	}
};


