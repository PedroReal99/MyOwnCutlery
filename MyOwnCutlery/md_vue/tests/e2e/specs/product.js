// https://docs.cypress.io/api/introduction/api.html

describe('Product', () => {
    it('Checks the Product parameter', () => {
        cy.visit('http://localhost:8080/#/product')
        cy.contains('#prod', 'Product')
    });

    it('Checks the search button', () => {
        cy.visit('http://localhost:8080/#/product')
        cy.contains('#searchPr', 'Search')
    });

    it('Checks the Name parameter', () => {
        cy.visit('http://localhost:8080/#/product')
        cy.contains('#name', 'Name')
    });

    it('Checks the Manufacturing plan id parameter', () => {
        cy.visit('http://localhost:8080/#/product')
        cy.contains('#mpid', 'Manufacturing Plan Id')
    });

    it('Checks the date parameter', () => {
        cy.visit('http://localhost:8080/#/product')
        cy.contains('#date', 'Date')
    });

    it('Checks the produto post parameter', () => {
        cy.visit('http://localhost:8080/#/product')
        cy.contains('#prodpost', 'Criar Produto')
    });
    it('Checks the Nome post parameter', () => {
        cy.visit('http://localhost:8080/#/product')
        cy.contains('#pNome', 'Nome')
    });
    it('Checks the Manufacturing plan id button', () => {
        cy.visit('http://localhost:8080/#/product')
        cy.contains('#pMPID', 'Manufacturing Plan Id')
    });
    it('Checks the create button', () => {
        cy.visit('http://localhost:8080/#/product')
        cy.contains('#createBt', 'Create')
    });
});
