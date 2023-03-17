describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'testUser',
      username: 'testUsername',
      password: 'testPassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testUsername')
      cy.get('#password').type('testPassword')
      cy.get('#login-button').click()
      cy.contains('Login successful')
    })
    it('fails with incorrect credentials', function() {
      cy.get('#username').type('wrongUsername')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()
      cy.contains('invalid password or username')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testUsername')
      cy.get('#password').type('testPassword')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new note').click()
      cy.get('#title-input').type('testTitle')
      cy.get('#author-input').type('testAuthor')
      cy.get('#url-input').type('testUrl')
      cy.get('#create-button').click()
      cy.contains('testTitle')
    })
    it('A blog can be liked', function() {
      cy.contains('create new note').click()
      cy.get('#title-input').type('testTitle')
      cy.get('#author-input').type('testAuthor')
      cy.get('#url-input').type('testUrl')
      cy.get('#create-button').click()
      cy.contains('testTitle')

      cy.contains('view').click()
      cy.get('#like-button').click()
      cy.contains('1')
    })
    it('A blog can be deleted by its creator', function() {
      cy.contains('create new note').click()
      cy.get('#title-input').type('testTitle')
      cy.get('#author-input').type('testAuthor')
      cy.get('#url-input').type('testUrl')
      cy.get('#create-button').click()
      cy.contains('testTitle')

      cy.contains('view').click()
      cy.get('#delete-button').click()

      cy.contains('testTitle').should('not.exist')
    })

    it('Blogs are sorted by likes', function() {
      cy.contains('create new note').click()
      cy.get('#title-input').type('testTitle1')
      cy.get('#author-input').type('testAuthor')
      cy.get('#url-input').type('testUrl')
      cy.get('#create-button').click()
      cy.contains('testTitle1')

      cy.contains('create new note').click()
      cy.get('#title-input').type('testTitle2')
      cy.get('#author-input').type('testAuthor')
      cy.get('#url-input').type('testUrl')
      cy.get('#create-button').click()
      cy.contains('testTitle2')

      cy.get('.view').eq(1).click()
      cy.get('#like-button').click()
      cy.contains('hide').click()

      cy.get('.title').eq(0).should('contain', 'testTitle2')
    })
  })
})