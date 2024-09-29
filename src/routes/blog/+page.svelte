<script>
	import Spinner from '$lib/Spinner.svelte';

	const { data } = $props();
	const posts = data.summaries;
	// console.log(posts);

	async function sleep() {
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}
</script>

<h1>blog</h1>

<ul>
	{#each data.summaries as { slug, title }}
		<li><a href="/blog/{slug}">{title}</a></li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
	}
</style>
