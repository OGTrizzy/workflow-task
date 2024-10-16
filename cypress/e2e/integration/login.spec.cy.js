import { apiPath } from '../../../src/js/api';

describe('Login and Logout Tests', () => {
  beforeEach(() => {
    cy.visit('/index.html');

    cy.get('body').then(($body) => {
      if ($body.find('#closeButton').length > 0) {
        cy.get('#closeButton').click({ force: true });
      }
    });
  });

  it('should login successfully with correct credentials', () => {
    cy.get('#loginEmail').type('ogtrizzy420@stud.noroff.no');
    cy.get('#loginPassword').type('111222333');

    cy.intercept('POST', `${apiPath}/social/auth/login`).as('loginAttempt');

    cy.get('#loginForm').submit();

    cy.wait('@loginAttempt').its('response.statusCode').should('eq', 200);
  });

  it('should not login with incorrect credentials and should display error message', () => {
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Your password or email is incorrect');
    });

    cy.get('#loginEmail').type('ogtrizzy420@noroff.no');
    cy.get('#loginPassword').type('wrongpassword');

    cy.intercept('POST', `${apiPath}/social/auth/login`).as('loginAttempt');
    cy.get('#loginForm').submit();

    cy.wait('@loginAttempt').its('response.statusCode').should('eq', 401);
  });

  it('should logout user successfully', () => {
    cy.get('#loginEmail').type('ogtrizzy420@stud.noroff.no');
    cy.get('#loginPassword').type('111222333');

    cy.intercept('POST', `${apiPath}/social/auth/login`).as('loginAttempt');
    cy.get('#loginForm').submit();

    cy.wait('@loginAttempt').its('response.statusCode').should('eq', 200);

    cy.window().then((window) => {
      expect(window.localStorage.getItem('token')).to.exist;
    });

    cy.get('#logoutButton').should('be.visible').click();

    cy.window().then((window) => {
      expect(window.localStorage.getItem('token')).to.be.null;
    });
  });
});
