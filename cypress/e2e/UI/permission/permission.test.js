
describe("Permission Tests", () => {
    it("Should redirect to login if not authenticated", () => {
    cy.clearCookies();
    cy.visit('/web/index.php/pim/viewEmployeeList');

    cy.url().should('include', '/auth/login');
    });
});