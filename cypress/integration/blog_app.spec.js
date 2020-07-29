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

	describe('When logged in', function() {
		const newBlog = {
			title: 'test-title',
			author: 'test-author',
			url: 'test-url',
		}

		beforeEach(function() {
			cy.request('POST', 'http://localhost:3000/api/login', {
				username: user.username, password: user.password
			}).then(({ body }) => {
				localStorage.setItem('loggedUser', JSON.stringify(body))
				cy.visit('http://localhost:3000')
			})
		})
		
		it('a blog can be created', function() {
			cy.contains('new note')
				.click()

			cy.get('#title')
				.type(newBlog.title)
			cy.get('#author')
				.type(newBlog.author)
			cy.get('#url')
				.type(newBlog.url)
			
			cy.contains('add blog')
				.click()

			cy.contains(newBlog.title && newBlog.author)
		})

		it('user can like a blog', function() {
			cy.contains('new note')
				.click()

			cy.get('#title')
				.type(newBlog.title)
			cy.get('#author')
				.type(newBlog.author)
			cy.get('#url')
				.type(newBlog.url)
			
			cy.contains('add blog')
				.click()

			cy.contains('view')
				.click()
			cy.contains('like')
				.click()
		})
	})
})