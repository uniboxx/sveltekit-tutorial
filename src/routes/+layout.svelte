<nav>
	<a href="/">home</a>
	<a href="/about">about</a>
	<a href="/blog">blog</a>
	<a href="/a/deeply/nested/route">$lib/message</a>
</nav>

<slot />

<style>
	:global(body) {
		background-color: #333;
		color: #ccc;
	}
	nav {
		a {
			color: inherit;
			margin-right: 1rem;
		}
	}
</style>
