<script>
	import { enhance } from '$app/forms';
	import Spinner from '$lib/Spinner.svelte';
	import { fly, slide } from 'svelte/transition';
	let { data, form } = $props();
	// console.log(data);
	let creating = $state(false);
	let deleting = $state([]);
</script>

<div class="centered">
	<h1>todos</h1>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<form
		method="POST"
		action="?/create"
		use:enhance={() => {
			creating = true;
			return async ({ update }) => {
				await update();
				creating = false;
			};
		}}
	>
		<label>
			add a todo:
			<input
				name="description"
				value={form?.description ?? ''}
				autocomplete="off"
				required
				disabled={creating}
			/>
		</label>
	</form>

	<ul class="todos">
		{#each data.todos.filter((todo) => !deleting.includes(todo.id)) as todo (todo.id)}
			<li in:fly={{ y: 20 }} out:slide>
				<form
					method="POST"
					action="?/delete"
					use:enhance={() => {
						deleting = [...deleting, todo.id];
						console.log($state.snapshot(deleting));
						return async ({ update }) => {
							await update();
							deleting = deleting.filter((id) => id !== todo.id);
							console.log($state.snapshot(deleting));
						};
					}}
				>
					<input type="hidden" name="id" value={todo.id} />
					<span>{todo.description}</span>
					<button aria-label="Mark as complete"></button>
				</form>
			</li>
		{/each}
	</ul>
	{#if creating}
		<span class="saving">saving...</span>
	{/if}
</div>

<style>
	.centered {
		max-width: 20em;
		margin: 0 auto;
	}

	label {
		width: 100%;
	}

	form {
		display: flex;
		align-items: center;
	}
	input {
		flex: 1;
	}

	span {
		flex: 1;
	}

	button {
		flex: 0.03;
		border: none;
		background: url(./remove.svg) no-repeat 50% 50%;
		background-size: 1.5rem 1.5rem;
		cursor: pointer;
		height: 100%;
		aspect-ratio: 1;
		opacity: 0.5;
		transition: opacity 0.2s;
	}

	button:hover {
		opacity: 1;
	}

	.error {
		color: #ff3e00;
		font-size: 0.8rem;
	}

	.saving {
		opacity: 0.5;
	}
</style>
