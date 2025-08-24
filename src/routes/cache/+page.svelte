<script>
	import { onMount } from 'svelte';
	let cachedFiles = [];
	let loading = false;
	import api_url from '$lib/config.js';
	let intervalId;

	async function fetchCachedFiles() {
		if (loading) return;
		loading = true;

		try {
			const res = await fetch(`${api_url}/cache`);
			if (!res.ok) {
				throw new Error('Failed to fetch cached files');
			}
			const data = await res.json();
			const files = Object.entries(data.files).map(([filename, details]) => ({
				filename,
				...details
			}));

			cachedFiles = files;
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	}

	function handleScroll() {
		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
		if (scrollTop + clientHeight >= scrollHeight - 100) {
			const visibleCount = document.querySelectorAll('.card').length;
			const nextBatch = cachedFiles.slice(visibleCount, visibleCount + 10);
			if (nextBatch.length > 0) {
				cachedFiles = [...cachedFiles.slice(0, visibleCount), ...nextBatch];
			}
		}
	}

	onMount(() => {
		fetchCachedFiles();
		intervalId = setInterval(fetchCachedFiles, 30000); // Fetch every 30 seconds
		window.addEventListener('scroll', handleScroll);

		return () => {
			clearInterval(intervalId);
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<!-- Main Content -->
<div class="container">
	{#each cachedFiles as file}
		<div class="card">
			<img src="data:image/jpeg;base64,{file.thumbnail}" alt="Thumbnail" class="thumbnail" />
			<div class="card-info">
				<div class="filename">
					{file.filename}
					<span class="tag">{file.file_extension.replace('.', '').toUpperCase()}</span>
				</div>
				<div class="links">
					<a href={file.link_original} target="_blank" class="text-blue-500 underline">
						Original
					</a>
					<span> | </span>
					<a href={file.link_converted} target="_blank" class="text-blue-500 underline">
						Converted
					</a>
				</div>
				<div class="expiry text-sm text-gray-500">
					Expires in {file.minutes_until_invalid} minutes ({file.time_invalidate})
				</div>
			</div>
		</div>
	{/each}

	{#if loading}
		<div class="text-center text-gray-500">Loading...</div>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-wrap: wrap;
		gap: 5%;
		justify-content: center;
	}

	.card {
		flex: 1 1 calc(33.333% - 16px);
		max-width: 375px;
		box-sizing: border-box;
		margin-bottom: 1%;
	}

	.card-info {
		border: 1px solid #ddd;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		background-color: #fff;
		padding: 16px;
	}

	.thumbnail {
		width: 100%;
		height: auto;
	}

	.filename {
		font-family: 'Roboto', sans-serif;
		font-weight: bold;
		font-size: 1.2rem;
		margin-bottom: 8px;
	}

	.tag {
		display: inline-block;
		padding: 4px 8px;
		background-color: #f0f0f0;
		border-radius: 12px;
		font-weight: bold;
		font-size: 0.9rem;
		margin-left: 8px;
	}
</style>
