// https://docs.cypress.io/api/introduction/api.html

describe('Manufacturing Plan', () => {
    it('Checks the Plano de Fabrico parameter', () => {
        cy.visit('http://localhost:8080/#/manufacturingplan')
        cy.contains('#pf', 'Plano Fabrico')
    });

    it('Checks the search button', () => {
        cy.visit('http://localhost:8080/#/manufacturingplan')
        cy.contains('#searchBt', 'Search')
    });

    it('Checks the Date parameter', () => {
        cy.visit('http://localhost:8080/#/manufacturingplan')
        cy.contains('#date', 'Date')
    });

    it('Checks the Operations name parameter', () => {
        cy.visit('http://localhost:8080/#/manufacturingplan')
        cy.contains('#opName', 'Operations Name')
    });

    it('Checks the plano fabrico post parameter', () => {
        cy.visit('http://localhost:8080/#/manufacturingplan')
        cy.contains('#cpf', 'Criar Plano Fabrico')
    });

    it('Checks the post button', () => {
        cy.visit('http://localhost:8080/#/manufacturingplan')
        cy.contains('#postBt', 'Post')
    });
    it('Checks the Operations post parameter', () => {
        cy.visit('http://localhost:8080/#/manufacturingplan')
        cy.contains('#postOps', 'Select Operations')
    });
    it('Checks the create button', () => {
        cy.visit('http://localhost:8080/#/manufacturingplan')
        cy.contains('#createBt', 'Create')
    });
});
