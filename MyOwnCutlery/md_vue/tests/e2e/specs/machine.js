// https://docs.cypress.io/api/introduction/api.html

describe('Machine', () => {
    it('Checks the button', () => {
        cy.visit('http://localhost:8080/#/machine')
        cy.contains('#bt', 'Search')
    });

    it('Checks the title', () => {
        cy.visit('http://localhost:8080/#/machine')
        cy.contains('h2', 'Machine')
    });

    it('Checks the Designation parameter', () => {
        cy.visit('http://localhost:8080/#/machine')
        cy.contains('#des', 'Designation')
    });

    it('Checks the Machine Type Designation parameter', () => {
        cy.visit('http://localhost:8080/#/machine')
        cy.contains('#mtd', 'Machine Type Designation')
    });

    it('Checks the Modle parameter', () => {
        cy.visit('http://localhost:8080/#/machine')
        cy.contains('#mod', 'Model')
    });

    it('Checks the Factory parameter', () => {
        cy.visit('http://localhost:8080/#/machine')
        cy.contains('#fac', 'Factory')
    });
    it('Checks the Floor parameter', () => {
        cy.visit('http://localhost:8080/#/machine')
        cy.contains('#flo', 'Floor')
    });
    it('Checks the Section parameter', () => {
        cy.visit('http://localhost:8080/#/machine')
        cy.contains('#sec', 'Section')
    });
    it('Checks the Position parameter', () => {
        cy.visit('http://localhost:8080/#/machine')
        cy.contains('#pos', 'Position')
    });
    it('Checks the Capacity parameter', () => {
        cy.visit('http://localhost:8080/#/machine')
        cy.contains('#cap', 'Capacity')
    });
    it('Checks the Machine Type post parameter', () => {
        cy.visit('http://localhost:8080/#/machine')
        cy.contains('#pMac', 'Machine Type')
    });
    it('Checks the Model post parameter', () => {
        cy.visit('http://localhost:8080/#/machine')
        cy.contains('#pMod', 'Model')
    });
    it('Checks the Location Factory post parameter', () => {
        cy.visit('http://localhost:8080/#/machine')
        cy.contains('#pLC', 'Location Factory')
    });
    it('Checks the Location Floor post parameter', () => {
        cy.visit('http://localhost:8080/#/machine')
        cy.contains('#pLF', 'Location Floor')
    });
    it('Checks the Location Section post parameter', () => {
        cy.visit('http://localhost:8080/#/machine')
        cy.contains('#pLS', 'Location Section')
    });
    it('Checks the Position post parameter', () => {
        cy.visit('http://localhost:8080/#/machine')
        cy.contains('#pPos', 'Position')
    });
    it('Checks the Capacity post parameter', () => {
        cy.visit('http://localhost:8080/#/machine')
        cy.contains('#pCap', 'Capacity')
    });
});
