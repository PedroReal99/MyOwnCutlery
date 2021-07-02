// https://docs.cypress.io/api/introduction/api.html

describe('Login', () => {
    it('Checks the Login parameter', () => {
        cy.visit('http://localhost:8080/#/login')
        cy.contains('#login', 'Login')
    });

});
