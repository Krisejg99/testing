import { rest } from 'msw'
import { Todo } from '../types/Todo'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const dummyTodos: Todo[] = [
	{ id: 1, title: 'My first todo', completed: false },
	{ id: 2, title: 'My second todo', completed: true },
]

export const handlers = [
	rest.get(`${BASE_URL}/todos`, (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json(dummyTodos)
		)
	}),

	rest.get(`${BASE_URL}/todos/:todoId`, () => {

	}),

	rest.post(`${BASE_URL}/todos`, async (req, res, ctx) => {
		const payload = await req.json()
		const id = Math.max(0, ...dummyTodos.map(todo => todo.id)) + 1
		const todo: Todo = {
			id,
			title: payload.title,
			completed: payload.completed,
		}

		dummyTodos.push(todo)

		return res(
			ctx.status(201),
			ctx.json(todo)
		)
	}),

	rest.patch(`${BASE_URL}/todos/:todoId`, () => {

	}),

	rest.delete(`${BASE_URL}/todos/:todoId`, () => {

	}),
]
