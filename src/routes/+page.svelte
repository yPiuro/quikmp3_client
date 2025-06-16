<script>
	import { Button, Progressbar, Select } from "flowbite-svelte";
	import { FileOutline } from "flowbite-svelte-icons";
	import api_url from "$lib/config.js";
	import { onMount } from "svelte";

	let fileInputElm;
	let selectedQuality = "best";
	const qualityOptions = [{ value: "best", name: "best" }];

	onMount(() => {
		console.log("The main component has been mounted to the DOM!");
		document
			.getElementById("convertBtn")
			.addEventListener("click", convertButtonFn, false);
		fileInputElm = document.getElementById("file-upload");
	});

	async function convertButtonFn() {
		console.log("Clicked");
		if (!fileInputElm.files.length) {
			alert("Please select a video file first.");
			return;
		}
		const file = fileInputElm.files[0];

		const form = new FormData();
		form.append("file", file);
		console.log(file);
		try {
			const res = await fetch(
				`${api_url}/convert/?quality=${encodeURIComponent(selectedQuality)}`,
				{
					method: "POST",
					body: form,
				},
			);
			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				alert("Conversion failed: " + (err.detail || res.statusText));
				return;
			}
			let blobUrl = URL.createObjectURL(await res.blob());
			setTimeout(() => {
				URL.revokeObjectURL(blobUrl);
			}, 60_000);
			simDlClick(`${file.name.split(".")[0]}.mp3`, blobUrl);
		} catch (e) {
			console.error(e);
			alert("Network error: " + e.message);
		}
	}

	function simDlClick(filename, url) {
		const dlElm = document.createElement("a");
		dlElm.href = url;
		dlElm.download = filename;
		document.body.append(dlElm);
		dlElm.click();
		dlElm.remove();
	}
</script>

	<!-- Main Content (Card Like Structure) -->

<div
	class="flex w-full max-w-md flex-col items-center space-y-6 rounded-lg p-8"
>
	<!-- Quality Selector -->
	<div class="flex items-center space-x-2">
		<label
			for="quality-select"
			class="text-lg font-medium text-gray-700 underline dark:text-gray-300"
		>
			Quality:
		</label>
		<Select
			id="quality-select"
			items={qualityOptions}
			value={selectedQuality}
		/>
	</div>

	<div class="w-56">
		<label
			for="file-upload"
			class="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-5 text-center hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
		>
			<FileOutline
				class="mb-2 h-8 w-8 text-gray-500 dark:text-gray-400"
			/>
			<p class="text-sm text-gray-500 dark:text-gray-400">File Input</p>
		</label>
		<input id="file-upload" type="file" accept="video/*" class="hidden" />
	</div>

	<!-- Progress Bar (color updated to purple (placeholer)) -->
	<div class="w-56">
		<Progressbar progress={50} color="purple" />
	</div>

	<!-- Convert Button -->
	<div>
		<Button class="cursor-pointer" color="dark" size="md" id="convertBtn"
			>Convert</Button
		>
	</div>
</div>
