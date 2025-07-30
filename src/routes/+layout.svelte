<script>
	import '../app.css';
	import { theme } from '$lib/stores/theme.js';
	import ImageLink from '$lib/components/ImageLink.svelte';
	import {
		FolderOpenOutline,
		GithubSolid,
		ServerOutline,
		SunOutline,
		MoonOutline
	} from 'flowbite-svelte-icons';
	import api_url from '$lib/config.js';

	let { children } = $props();

	function toggleTheme() {
		theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
	}
</script>

<link rel="preload" href="images/darkmode-bg.jpg" as="image" />
<link rel="preload" href="images/whitemode-bg.jpg" as="image" />
<div
	class="relative flex min-h-screen flex-col"
	style={`background: url('${
		$theme === 'dark' ? 'images/darkmode-bg.jpg' : 'images/whitemode-bg.jpg'
	}') center/cover no-repeat;`}
>
	<header class="flex items-center justify-between p-6">
		<!-- Cache List Link-->
		<a
			href="/"
			class="hover:text-primary-600 dark:hover:text-primary-400 flex flex-col items-center text-gray-600
            transition-colors dark:text-gray-300"
		>
			<FolderOpenOutline size="xl" />
			<span class="mt-1 text-sm">Cache List</span>
		</a>

		<div class="mt-5 flex flex-col items-center">
			<h1
				class="mb-0 mt-0 text-4xl font-semibold tracking-wider text-gray-800 drop-shadow-sm dark:text-white"
			>
				QuikMP3
			</h1>
			<div class="my-0 mt-2 h-1 w-48 bg-gray-800 dark:bg-gray-200"></div>
		</div>

		<!-- Web Client Repo -->
		<ImageLink
			href="http://example.com/client-repo"
			class="scale-135 hover:scale-145 flex flex-col items-center text-gray-800 dark:text-white"
		>
			<GithubSolid size="xl" />
			<span class="text-shadow-lg/15 text-shadow-amber-200 mr-1.5 mt-1 text-sm"
				>Web Client Repo</span
			>
		</ImageLink>
	</header>

	<!-- Page content -->
	<main class="flex flex-grow items-center justify-center">
		{@render children()}
	</main>

	<!-- Light/Dark toggle in bottom-right -->
	<button
		onclick={toggleTheme}
		class="absolute bottom-6 right-6 rounded-full p-2 shadow outline-1 transition hover:cursor-pointer hover:bg-gray-400 dark:bg-black/30 dark:outline-1 dark:outline-amber-200"
		aria-label="Toggle light/dark mode"
	>
		{#if $theme === 'dark'}
			<SunOutline class="h-6 w-6 text-yellow-400" />
		{:else}
			<MoonOutline class="h-6 w-6 text-blue-900" />
		{/if}
	</button>

	<!-- API docs link & Backend repo in bottom-left -->
	<div class="absolute bottom-6 flex flex-col">
		<ImageLink
			href="http://example.com/backend-repo"
			class="hover:scale-135 mr-10 flex scale-125 flex-col items-center text-gray-800 dark:text-white"
		>
			<ServerOutline size="xl" />
			<span class="text-shadow-lg/15 text-shadow-amber-200 mt-1 text-sm">Backend Repo</span>
		</ImageLink>

		<a
			href={api_url + '/docs'}
			target="_blank"
			rel="noopener"
			class="ml-2 text-sm text-gray-600 hover:text-green-700 dark:text-gray-400 dark:hover:text-green-400"
			><p class="text-shadow-lg/20 text-shadow-blue-200 ml-0 scale-95 text-sm">API Docs</p>
			{api_url}/docs
		</a>
	</div>
</div>
