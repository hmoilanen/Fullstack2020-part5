describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'Juuso Heino',
      username: 'jvhh',
      password: '12345'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user) 
    cy.visit('http://localhost:3000')
	})

	it('front page can be opened and it displays the login form by default', function() {
		cy.visit('http://localhost:3000')
		cy.contains('username')
	})
})