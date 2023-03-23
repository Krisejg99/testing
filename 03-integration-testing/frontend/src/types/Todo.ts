export type TodoData = {
	title: string,
	completed: boolean,
}

export type Todo = TodoData & {
	id: number,
}

export type UpdateTodoData = {
	title?: string,
	completed?: boolean,
}
