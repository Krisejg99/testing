import { rest } from 'msw'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const handlers = [
	rest.get(`${BASE_URL}/todos`, (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json([])
		)
	}),

	rest.get(`${BASE_URL}/todos/:todoId`, () => {

	}),

	rest.post(`${BASE_URL}/todos`, () => {

	}),

	rest.patch(`${BASE_URL}/todos/:todoId`, () => {

	}),

	rest.delete(`${BASE_URL}/todos/:todoId`, () => {

	}),
]
