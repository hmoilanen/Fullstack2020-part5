describe('Blog app', function() {
	const user = {
		name: 'Juuso Heino',
		username: 'jvhh',
		password: '12345'
	}

	beforeEach(function() {
		cy.request('POST', 'http://localhost:3000/api/testing/reset')
    cy.request('POST', 'http://localhost:3000/api/users/', user) 
    cy.visit('http://localhost:3000')
	})

	it('front page can be opened and it displays the login form by default', function() {
		cy.visit('http://localhost:3000')
		cy.contains('username')
	})

	describe('Login', function() {
		it('make sure login wont work with incorrect credentials', function() {
			cy.visit('http://localhost:3000')
			cy.get('#loginUsername')
				.type(user.username + '-to-fail')
			cy.get('#loginPassword')
				.type(user.password)
			cy.contains('login')
				.click()
				.contains('login')
		})

		it('make sure login works with correct credentials', function() {
			cy.visit('http://localhost:3000')
			cy.get('#loginUsername')
				.type(user.username)
			cy.get('#loginPassword')
				.type(user.password)
			cy.contains('login')
				.click()
		})
	})
})