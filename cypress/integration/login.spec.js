
describe('Navigation', () => {
    it('should fail to login with wrong password', () => {
      cy.visit('http://localhost:3000/admin/login')
      cy.get('input[name="username"]').type("lärare").should("have.value", "lärare");
      cy.get('input[name="password"]').type("wrongpassword").should("have.value", "wrongpassword");
      cy.get("button").click()
      cy.get('span').contains('Fel lösenord')
    })
  })