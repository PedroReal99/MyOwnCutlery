// https://docs.cypress.io/api/introduction/api.html

describe('Order', () => {
    it('Checks the Order parameter', () => {
        cy.visit('http://localhost:8080/#/orderClient')
        cy.contains('#Order', 'Order')
    });

    it('Checks the Name of the ckient parameter', () => {
        cy.visit('http://localhost:8080/#/orderClient')
        cy.contains('#nameClient', 'Name Client')
    });

    it('Checks the Product Name parameter', () => {
        cy.visit('http://localhost:8080/#/orderClient')
        cy.contains('#prodName', 'Product name')
    });

    it('Checks the Quantity parameter', () => {
        cy.visit('http://localhost:8080/#/orderClient')
        cy.contains('#quant', 'Quantity')
    });

    it('Checks the order date parameter', () => {
        cy.visit('http://localhost:8080/#/orderClient')
        cy.contains('#ordDate', 'Order Date')
    });

    it('Checks the address parameter', () => {
        cy.visit('http://localhost:8080/#/orderClient')
        cy.contains('#addr', 'Address')
    });
    it('Checks the Postal Code parameter', () => {
        cy.visit('http://localhost:8080/#/orderClient')
        cy.contains('#postCode', 'Postal Code')
    });
        it('Checks the Products available parameter', () => {
        cy.visit('http://localhost:8080/#/orderClient')
        cy.contains('#prodsAvail', 'Products Available')
    });
    it('Checks the Change Order parameter', () => {
        cy.visit('http://localhost:8080/#/orderAdmin')
        cy.contains('#changeOrders', 'Change Orders')
    });
    it('Checks the Create Order parameter', () => {
        cy.visit('http://localhost:8080/#/orderClient')
        cy.contains('#createOrder', 'Create order')
    });
    it('Checks the Search Products button', () => {
        cy.visit('http://localhost:8080/#/orderClient')
        cy.contains('#searchProds', 'Search Products')
    });
    it('Checks the post quantity parameter', () => {
        cy.visit('http://localhost:8080/#/orderClient')
        cy.contains('#pQuant', 'Quantity')
    });
    it('Checks the post Address parameter', () => {
        cy.visit('http://localhost:8080/#/orderClient')
        cy.contains('#pAddress', 'Address')
    });
    it('Checks the post Postal Code parameter', () => {
        cy.visit('http://localhost:8080/#/orderClient')
        cy.contains('#ppc', 'Postal Code')
    });
    it('Checks the post Nib parameter', () => {
        cy.visit('http://localhost:8080/#/orderClient')
        cy.contains('#pnib', 'Nib')
    });
    it('Checks the Create button', () => {
        cy.visit('http://localhost:8080/#/orderClient')
        cy.contains('#pCreate', 'Create')
    });
    it('Checks the Search orders button', () => {
        cy.visit('http://localhost:8080/#/orderAdmin')
        cy.contains('#SearchCB', 'Search')
    });
    it('Checks the Select order parameter', () => {
        cy.visit('http://localhost:8080/#/orderAdmin')
        cy.contains('#SelectOrder', 'Select order')
    });
    it('Checks the Search button', () => {
        cy.visit('http://localhost:8080/#/orderAdmin')
        cy.contains('#SearchPBB', 'Search')
    });
    it('Checks the new quantity parameter', () => {
        cy.visit('http://localhost:8080/#/orderAdmin')
        cy.contains('#cQuant', 'New Quantity')
    });
    it('Checks the Change button', () => {
        cy.visit('http://localhost:8080/#/orderAdmin')
        cy.contains('#cChange', 'Change')
    });
    it('Checks the orders button', () => {
        cy.visit('http://localhost:8080/#/orderAdmin')
        cy.contains('#cancelSearch', 'Search')
    });
    it('Checks the Cancel button', () => {
        cy.visit('http://localhost:8080/#/orderAdmin')
        cy.contains('#cancelButton', 'Cancel')
    });
});
