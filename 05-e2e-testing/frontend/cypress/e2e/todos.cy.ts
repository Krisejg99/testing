describe('Todos', () => {
	beforeEach(() => cy.visit('/'))

	it('should see at least 1 todo', () => {
		cy.get('#todos')
			.find('li')
			.should('have.length.at.least', 1)
	})

	context('create todo', () => {
		it('create a todo form should be empty', () => {
			cy.get('#new-todo-form')
				.find('input')
				.should('be.empty')
		})

		it('cant create a todo without a title', () => {
			cy.get('#new-todo-title')
				.type('{enter}')

			cy.get('#error')
				.should('exist')
				.should('have.text', 'Title cannot be empty')
		})

		it('can create a new todo (and see it in the list)', () => {
			cy.get('#new-todo-title')
				.type('Eat, sleep, game, repeat...{enter}')

			cy.get('#todos>li')
				.eq(-1)
				.should('contain.text', 'Eat, sleep, game, repeat...')
		})

		it('can type in the create todo form and then reset the form', () => {
			cy.get('#new-todo-form')
				.find('input')
				.type("Typing a todo, but as I'm typing it I realize I don't need this todo on the list...")

			cy.get('#new-todo-form>button[type="reset"]')
				.click()

			cy.get('#new-todo-title')
				.should('be.empty')
		})
	})
})
