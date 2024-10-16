describe('Login Tests', () => {
  it('should log in with valid credentials', () => {
    cy.visit('/');
    cy.get('input[name=username]').type('validUsername');
    cy.get('input[name=password]').type('validPassword');
    cy.get('button[type=submit]').click(); 
    cy.url().should('include', '/'); 
  });
});

it('should show a message when invalid credentials are provided', () => {
  cy.visit('/');
  cy.get('input[name=username]').type('invalidUsername');
  cy.get('input[name=password]').type('invalidPassword');
  cy.get('button[type=submit]').click();
  cy.get('.error-message').should('be.visible');
});

it('should log out when the logout button is clicked', () => {
  cy.get('button#logout').click();
  cy.url().should('include', '/'); 
});

