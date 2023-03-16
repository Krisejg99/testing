/**
 * todoStorage tests
 */
import mockLocalStorage from '../mocks/mockedLocalStorage'
import { afterEach, describe, expect, it } from 'vitest'
import { getTodos, saveTodos } from '../utils/todoStorage'
import { Todo } from '../types/Todo'

global.localStorage = mockLocalStorage()

const TODO: Todo = {
	id: 1,
	title: "Eat",
	completed: false,
}

describe('getTodos', () => {
	it('retirns empty list of todos', () => {
		const todos = getTodos()

		expect(todos.length).toBe(0)
	})
})

describe('saveTodos', () => {
	afterEach(() => global.localStorage.clear())

	it('can save a todo', () => {
		const result = saveTodos([ TODO ])
		expect(result.success).toBe(true)
	})

	it('can save a todo and then get it', () => {

	})
})
