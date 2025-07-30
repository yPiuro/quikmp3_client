<script>
	import { Button, Progressbar, Select } from 'flowbite-svelte';
	import { FileOutline } from 'flowbite-svelte-icons';
	import api_url from '$lib/config.js';
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme.js';

	let fileInputElm;
	let selectedQuality = 'best';
	let progress = 0;
	const qualityOptions = [
		{ value: 'low', name: 'Low' },
		{ value: 'medium', name: 'Medium' },
		{ value: 'high', name: 'High' },
		{ value: 'best', name: 'Best' }
	];

	onMount(() => {
		console.log('The main component has been mounted to the DOM!');
		document.getElementById('convertBtn').addEventListener('click', convertButtonFn, false);
		fileInputElm = document.getElementById('file-upload');

		const dropZone = document.getElementById('file-drop-zone');
		dropZone.addEventListener('dragover', (e) => {
			e.preventDefault();
			dropZone.classList.add('border-blue-500');
		});
		dropZone.addEventListener('dragleave', () => {
			dropZone.classList.remove('border-blue-500');
		});
		dropZone.addEventListener('drop', (e) => {
			e.preventDefault();
			dropZone.classList.remove('border-blue-500');
			const files = e.dataTransfer.files;
			if (files.length) {
				fileInputElm.files = files;
			}
		});
	});

	async function convertButtonFn() {
		console.log('Clicked');
		if (!fileInputElm.files.length) {
			alert('Please select a video file first.');
			return;
		}
		const file = fileInputElm.files[0];

		const form = new FormData();
		form.append('file', file);
		progress = 33;
		try {
			setTimeout(() => {
				progress = 66;
			}, 100);
			const res = await fetch(
				`${api_url}/convert/?quality=${encodeURIComponent(selectedQuality)}`,
				{
					method: 'POST',
					body: form
				}
			);
			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				alert('Conversion failed: ' + (err.detail || res.statusText));
				return;
			}
			let blobUrl = URL.createObjectURL(await res.blob());
			setTimeout(() => {
				URL.revokeObjectURL(blobUrl);
			}, 60_000);
			setTimeout(() => {
				progress = 100;
			}, 200);
			simDlClick(`${file.name.split('.')[0]}.mp3`, blobUrl);
		} catch (e) {
			console.error(e);
			alert('Network error: ' + e.message);
		}
	}

	function simDlClick(filename, url) {
		const dlElm = document.createElement('a');
		dlElm.href = url;
		dlElm.download = filename;
		document.body.append(dlElm);
		dlElm.click();
		setTimeout(() => {
			progress = 0;
		}, 700);
		dlElm.remove();
	}
</script>

<!-- Main Content-->
<div class="flex w-full max-w-md flex-col items-center space-y-6 rounded-lg p-8">
	<!-- Quality Selector -->
	<div class="flex items-center space-x-2">
		<label
			for="quality-select"
			class="font-serif text-lg font-bold text-gray-700 dark:text-amber-50"
		>
			Quality:
		</label>
		<Select
			id="quality-select"
			items={qualityOptions}
			value={selectedQuality}
			class="max-h-10 border-green-600 text-xs font-bold focus:ring-2 focus:ring-green-800 dark:border-green-300 dark:focus:ring-2 dark:focus:ring-green-400"
			style="background-color: transparent !important; color: green !important;"
		/>
	</div>

	<!-- Drag-and-Drop File Input -->
	<div id="file-drop-zone" class="w-56">
		<label
			for="file-upload"
			class="background-transparent flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-5 text-center focus:border-gray-500"
		>
			<FileOutline class="mb-2 h-8 w-8 text-gray-500 dark:text-gray-400" />
			<p class="text-sm text-gray-500 dark:text-gray-400">Drag & Drop /<br /> Click to Upload</p>
		</label>
		<input id="file-upload" type="file" accept="video/*" class="hidden" />
	</div>

	<!-- Progress Bar -->
	<div class="w-56">
		<Progressbar {progress} color="orange" divClass="bg-gray-600" />
	</div>

	<!-- Convert Button -->
	<div>
		<Button
			class="max-h-16 cursor-pointer bg-amber-300 dark:bg-amber-900"
			color="dark"
			size="md"
			id="convertBtn">Convert</Button
		>
	</div>
</div>
