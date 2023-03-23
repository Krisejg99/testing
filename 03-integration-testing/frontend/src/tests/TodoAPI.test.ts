import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { server } from '../mocks/server'
import * as TodoAPI from '../services/TodoAPI'
import { TodoData } from '../types/Todo'

// Establish API mocking before all tests.
beforeAll(() => server.listen())
// Reset any request handlers that we may add during the tests, so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())

const newTodo: TodoData = {
	title: 'Eat',
	completed: false,
}

describe('TodoAPI', () => {
	it('should return a list', async () => {
		const todos = await TodoAPI.getTodos()

		expect(Array.isArray(todos)).toBe(true)
	})

	it('should create a todo', async () => {
		const todo = await TodoAPI.createTodo(newTodo)

		expect(todo).toMatchObject({
			id: expect.any(Number),
			title: newTodo.title,
			completed: newTodo.completed,
		})
	})

	it('should create and then get the todo', async () => {
		const createdTodo = await TodoAPI.createTodo(newTodo)
		const todo = await TodoAPI.getTodo(createdTodo.id)

		expect(todo).toStrictEqual(createdTodo)
	})

	// it('should create and then find the todo among all todos', async () => {
	// 	const todo = await TodoAPI.createTodo(newTodo)
	// 	const todos = await TodoAPI.getTodos()

	// 	expect(todos).toContainEqual(todo)
	// })

	// it('should create and then update the todo', async () => {
	// 	const todo = await TodoAPI.createTodo(newTodo)
	// 	const updatedTodo = await TodoAPI.updateTodo(todo.id, {
	// 		completed: true,
	// 	})

	// 	expect(updatedTodo).toStrictEqual({
	// 		id: todo.id,
	// 		title: todo.title,
	// 		completed: true,
	// 	})

	// })

	// it('should create and then delete the todo', async () => {
	// 	const todo = await TodoAPI.createTodo(newTodo)
	// 	await TodoAPI.deleteTodo(todo.id)
	// 	const todos = await TodoAPI.getTodos()

	// 	expect(todos).not.toContain(todo)
	// })
})
