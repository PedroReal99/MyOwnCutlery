describe('Machine Type', () => {
    it('Checks the search button', () => {
        cy.visit('http://localhost:8080/#/machineType')
        cy.contains('#searchBt', 'Search')
    });
    it('Checks the Designation parameter', () => {
        cy.visit('http://localhost:8080/#/machineType')
        cy.contains('#des', 'Designation')
    });
    it('Checks the Operations parameter', () => {
        cy.visit('http://localhost:8080/#/machineType')
        cy.contains('#ops', 'Operations')
    });
    it('Checks the create parameter', () => {
        cy.visit('http://localhost:8080/#/machineType')
        cy.contains('#crMT', 'Create Machine Type')
    });
    it('Checks the Description post parameter', () => {
        cy.visit('http://localhost:8080/#/machineType')
        cy.contains('#pDes', 'Description')
    });
    it('Checks the Operations post parameter', () => {
        cy.visit('http://localhost:8080/#/machineType')
        cy.contains('#pOps', 'Select Operations')
    });
    it('Checks the create button', () => {
        cy.visit('http://localhost:8080/#/machineType')
        cy.contains('#createBt', 'Create')
    });

});