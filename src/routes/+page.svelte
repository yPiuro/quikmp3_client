<script>
	import { Button, Progressbar, Select } from 'flowbite-svelte';
	import { FileOutline } from 'flowbite-svelte-icons';

	const qualityOptions = [{ value: 'best', name: 'best' }];
	let selectedQuality = 'best';
</script>

<!-- The main UI card for the converter -->
<div class="flex w-full max-w-md flex-col items-center space-y-6 rounded-lg p-8">
	<!-- Quality Selector -->
	<div class="flex items-center space-x-2">
		<label
			for="quality-select"
			class="text-lg font-medium text-gray-700 underline dark:text-gray-300"
		>
			Quality:
		</label>
		<Select id="quality-select" items={qualityOptions} value={selectedQuality} />
	</div>

	<!-- File Input -->
	<div class="w-56">
		<label
			for="file-upload"
			class="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-5 text-center hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
		>
			<FileOutline class="mb-2 h-8 w-8 text-gray-500 dark:text-gray-400" />
			<p class="text-sm text-gray-500 dark:text-gray-400">File Input</p>
		</label>
		<input id="file-upload" type="file" class="hidden" />
	</div>

	<!-- Progress Bar (color updated to purple) -->
	<div class="w-56">
		<Progressbar progress={50} color="purple" />
	</div>

	<!-- Convert Button -->
	<div>
		<Button color="dark" size="md">Convert</Button>
	</div>
</div>
