<script>
	let { children, href, class: extraClass = '' } = $props();
</script>

<a
	{href}
	target="_blank"
	rel="noopener noreferrer"
	class="
    transform
    drop-shadow-[0_0_3px_theme(colors.blue.200)]
    transition-all
    duration-200
    ease-in-out
	hover:scale-103
    hover:drop-shadow-[0_0_3px_theme(colors.blue.500)]
    {extraClass}"
>
	{@render children()}
</a>
