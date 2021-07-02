// https://docs.cypress.io/api/introduction/api.html

describe('Operations', () => {
    it('Checks the Operations parameter', () => {
        cy.visit('http://localhost:8080/#/operations')
        cy.contains('#ops', 'Operations by Machine Type')
    });

    it('Checks the search button', () => {
        cy.visit('http://localhost:8080/#/operations')
        cy.contains('#searchBt', 'Search')
    });

    it('Checks the Name parameter', () => {
        cy.visit('http://localhost:8080/#/operations')
        cy.contains('#name', 'Name')
    });

    it('Checks the Operations type parameter', () => {
        cy.visit('http://localhost:8080/#/operations')
        cy.contains('#opsTID', 'Operations Type')
    });

    it('Checks the duration parameter', () => {
        cy.visit('http://localhost:8080/#/operations')
        cy.contains('#dur', 'Duration')
    });

    it('Checks the tool Description parameter', () => {
        cy.visit('http://localhost:8080/#/operations')
        cy.contains('#td', 'Tool description')
    });

    it('Checks the post operations', () => {
        cy.visit('http://localhost:8080/#/operations')
        cy.contains('#cOps', 'Create Operations')
    });
    it('Checks the Name post parameter', () => {
        cy.visit('http://localhost:8080/#/operations')
        cy.contains('#pName', 'Name')
    });
    it('Checks the Operations Type post parameter', () => {
        cy.visit('http://localhost:8080/#/operations')
        cy.contains('#pOps', 'Select Operations Type')
    });
    it('Checks the Duration post parameter', () => {
        cy.visit('http://localhost:8080/#/operations')
        cy.contains('#pDur', 'Duration')
    });
    it('Checks the Description post parameter', () => {
        cy.visit('http://localhost:8080/#/operations')
        cy.contains('#pDes', 'description')
    });
    it('Checks the create button', () => {
        cy.visit('http://localhost:8080/#/operations')
        cy.contains('#createBt', 'Create')
    });
});
