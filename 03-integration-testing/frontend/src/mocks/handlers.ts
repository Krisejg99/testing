import { rest } from 'msw'
import { Todo, TodoData } from '../types/Todo'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const dummyTodos: Todo[] = [
	{ id: 1, title: 'My first todo', completed: false },
	{ id: 2, title: 'My second todo', completed: true },
]

export const handlers = [
	rest.get(`${BASE_URL}/todos`, (_req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json(dummyTodos)
		)
	}),

	rest.get(`${BASE_URL}/todos/:todoId`, (req, res, ctx) => {
		const todoId = Number(req.params.todoId)
		const todo = dummyTodos.find(todo => todo.id === todoId)
		if (!todo) {
			return res(
				ctx.status(404),
				ctx.json({})
			)
		}

		return res(
			ctx.status(200),
			ctx.json(todo)
		)
	}),

	rest.post(`${BASE_URL}/todos`, async (req, res, ctx) => {
		const payload = await req.json<TodoData>()
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

	rest.patch(`${BASE_URL}/todos/:todoId`, async (req, res, ctx) => {
		const payload = await req.json<Partial<TodoData>>()

		const todoId = Number(req.params.todoId)
		const todo = dummyTodos.find(todo => todo.id === todoId)
		if (!todo) {
			return res(
				ctx.status(404),
				ctx.json({})
			)
		}

		todo.title = payload.title ?? todo.title
		todo.completed = payload.completed ?? todo.completed

		return res(
			ctx.status(200),
			ctx.json(todo)
		)
	}),

	rest.delete(`${BASE_URL}/todos/:todoId`, (req, res, ctx) => {
		const todoId = Number(req.params.todoId)
		const todo = dummyTodos.find(todo => todo.id === todoId)
		if (!todo) {
			return res(
				ctx.status(404),
				ctx.json({})
			)
		}

		dummyTodos.splice(dummyTodos.indexOf(todo), 1)

		return res(
			ctx.status(200),
			ctx.json({})
		)
	}),
]
