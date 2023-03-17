/**
 * todoStorage tests
 */

/**
 * @vitest-environment happy-dom
 */

// import mockLocalStorage from '../mocks/mockedLocalStorage'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { getTodos, saveTodos } from '../utils/todoStorage'
import { Todo } from '../types/Todo'

// global.localStorage = mockLocalStorage()

const TODO: Todo = {
	id: 1,
	title: "Eat",
	completed: false,
}

describe('getTodos', () => {
	it('returns empty list of todos', () => {

		const getItemSpy = vi.spyOn(global.localStorage, 'getItem')
		const todos = getTodos()

		expect(getItemSpy).toHaveBeenCalledOnce()
		expect(todos.length).toBe(0)
	})
})

describe('saveTodos', () => {
	afterEach(() => global.localStorage.clear())

	it('can save a todo', () => {
		const getItemSpy = vi.spyOn(global.localStorage, 'setItem')
		const result = saveTodos([ TODO ])

		expect(getItemSpy).toHaveBeenCalledOnce()
		expect(result.success).toBe(true)
	})

	it('can save a todo and then get it', () => {
		const result = saveTodos([ TODO ])
		expect(result.success).toBe(true)

		const todos = getTodos()
		expect(todos).toContainEqual(TODO)
	})
})
