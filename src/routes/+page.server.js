import { fail } from '@sveltejs/kit';
import * as db from '$lib/server/database.js';

export function load({ cookies }) {
	let id = cookies.get('userid');

	if (!id) {
		id = crypto.randomUUID();
		cookies.set('userid', id, { path: '/' });
	}

	// console.log(id);

	return {
		todos: db.getTodos(id)
	};
}

export const actions = {
	create: async ({ cookies, request }) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const data = await request.formData();
		try {
			db.createTodo(cookies.get('userid'), data.get('description'));
		} catch (err) {
			return fail(422, {
				description: data.get('description'),
				error: err.message
			});
		}
	},

	delete: async ({ cookies, request }) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const data = await request.formData();
		db.deleteTodo(cookies.get('userid'), data.get('id'));
	}
};
