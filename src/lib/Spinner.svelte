<script>
	let { color = '#333', width = '40px' } = $props();
</script>

<div class="wrapper">
	<div class="loader" style="--color:{color};--width:{width}"></div>
</div>

<style>
	/* HTML: <div class="loader"></div> */
	:global(*:has(> .wrapper)) {
		position: relative;
	}
	.wrapper {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		/* background-color: inherit; */
		background-color: transparent;
		backdrop-filter: blur(1px);
	}
	.loader {
		width: var(--width);
		padding: 8px;
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--color);
		--_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
		-webkit-mask: var(--_m);
		mask: var(--_m);
		-webkit-mask-composite: source-out;
		mask-composite: subtract;
		animation: l3 1s infinite linear;
	}
	@keyframes l3 {
		to {
			transform: rotate(1turn);
		}
	}
</style>
