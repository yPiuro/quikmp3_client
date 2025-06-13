<script>
	import '../app.css';
	import {
		FolderOpenOutline,
		ClockOutline,
		GithubSolid,
		ServerOutline // The new icon for the backend
	} from 'flowbite-svelte-icons';
	import ImageLink from '$lib/components/ImageLink.svelte';
	let api_url = 'http://localhost:8000';
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col bg-white dark:bg-gray-900">
	<!-- Main Header -->
	<header class="flex items-center justify-between p-6">
		<!-- Left: Cache List Link -->
		<a
			href="/"
			class="hover:text-primary-600 dark:hover:text-primary-400 flex flex-col items-center text-gray-600 transition-colors duration-200 dark:text-gray-300"
		>
			<FolderOpenOutline
				class="scale-180 transition-all duration-200 ease-in-out hover:scale-200"
				size="xl"
			/>
			<span class="mt-1 text-sm">Cache List</span>
		</a>

		<!-- Center: Title -->
		<div class="flex flex-col items-center">
			<ClockOutline size="xl" class="text-red-500" />
			<h1 class="m-0 p-0 text-4xl font-semibold tracking-wider text-gray-800 dark:text-white">
				QuikMP3
			</h1>
			<div class="mt-2 h-1 w-48 bg-gray-800 dark:bg-gray-200"></div>
		</div>

		<!-- Right: Client Repo Link -->
		<ImageLink href="http://example.com/client-repo" class="text-gray-800 dark:text-white">
			<GithubSolid
				class="mb-5 ml-10 scale-180 transition-all duration-200 ease-in-out hover:scale-235"
				size="xl"
			/>
			<p class="text-sm">Web Client Repo</p>
		</ImageLink>
	</header>

	<!-- Main content area -->
	<main class="flex flex-grow items-center justify-center">
		{@render children()}
	</main>

	<!-- Bottom-right: Backend Repo Link -->
	<div class="absolute right-6 bottom-6">
		<ImageLink
			href="{api_url}/docs"
			class="flex items-center space-x-2 text-sm text-gray-500 transition-colors duration-200 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400"
			>{api_url}/docs</ImageLink
		>
		<ImageLink
			href="http://example.com/backend-repo"
			class="flex items-center space-x-2 text-sm text-gray-500 transition-colors duration-200 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
		>
			<ServerOutline
				class="mt-5 mr-5 scale-180 transition-all duration-200 ease-in-out hover:scale-235"
			/>
			<br />
			<span class="mt-5 text-sm">Backend Repo</span>
		</ImageLink>
	</div>
</div>
