// https://docs.cypress.io/api/introduction/api.html

describe('Production Line', () => {
    it('Checks the search button', () => {
        cy.visit('http://localhost:8080/#/productionLine')
        cy.contains('#searchBt', 'Search')
    });

    it('Checks the Product line parameter', () => {
        cy.visit('http://localhost:8080/#/productionLine')
        cy.contains('#pli', 'Production Line Index')
    });

    it('Checks the Machines designation parameter', () => {
        cy.visit('http://localhost:8080/#/productionLine')
        cy.contains('#md', 'Machines designation')
    });

    it('Checks the production line post parameter', () => {
        cy.visit('http://localhost:8080/#/productionLine')
        cy.contains('#cpl', 'Create Production Line')
    });

    it('Checks the post button', () => {
        cy.visit('http://localhost:8080/#/productionLine')
        cy.contains('#postBt', 'Post')
    });
    it('Checks the Machines post parameter', () => {
        cy.visit('http://localhost:8080/#/productionLine')
        cy.contains('#pMac', 'Select Machines')
    });
    it('Checks the create button', () => {
        cy.visit('http://localhost:8080/#/productionLine')
        cy.contains('#createBt', 'Create')
    });
});
