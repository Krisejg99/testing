describe('Todos', () => {
	beforeEach(() => cy.visit('/'))

	context('initial state', () => {
		it('should see at least 1 todo', () => {
			cy.get('#todos')
				.find('li')
				.should('have.length.at.least', 1)
		})
		it('should not show the error dialog', () => {
			cy.get('#error')
				.should('not.be.visible')
		})
	})

	context('create todo', () => {
		it('create a todo form should be empty', () => {
			cy.get('#new-todo-title')
				.should('have.value', '')
		})

		it('cant create a todo without a title', () => {
			cy.get('#new-todo-title')
				.type('{enter}')

			cy.get('#error')
				.should('be.visible')
				.should('have.text', 'Title cannot be empty')
		})

		it('can create a new todo (and see it in the list and clears input)', () => {
			const todoTitle = 'Eat, sleep, game, repeat...'

			cy.get('#new-todo-title')
				.type(`${todoTitle}{enter}`)
				.should('have.value', '')

			cy.get('#todos')
				.find('li')
				.last()
				.should('contain.text', `${todoTitle}`)
		})

		it('can type in the create todo form and then reset the form', () => {
			cy.get('#new-todo-title')
				.type("Typing a todo, but as I'm typing it I realize I don't need this todo on the list...")

			cy.get('#new-todo-form')
				.find('[type="reset"]')
				.click()

			cy.get('#new-todo-title')
				.should('have.value', '')
		})
	})
})
