describe('Todos', () => {
	context('initial state', () => {
		beforeEach(() => {
			cy.intercept('GET', 'http://localhost:3001/todos', {
				fixture: 'todos.json'
			}),
			cy.visit('/')
		})

		it('should see the two mocked todos', () => {
			cy.get('#todos')
				.find('li')
				.should('have.length', 2)

			cy.get('#todos')
				.find('li')
				.first()
				.should('contain.text', 'My first todo')
				.should('not.have.class', 'completed')

			cy.get('#todos')
				.find('li')
				.last()
				.should('contain.text', 'My second todo')
				.should('not.have.class', 'completed')
		})

		it('should not show the error dialog', () => {
			cy.get('#error')
				.should('not.be.visible')
		})
	})

	context.skip('create todo', () => {
		beforeEach(() => cy.visit('/'))

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
