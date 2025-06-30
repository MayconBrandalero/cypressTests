
describe ("Login Tests", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it("Should display login fields", ()=> {
        cy.get('input[name="username"]').should('be.visible');
        cy.get('input[name="password"]').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');
    });

    it("Should not allow login with empty fields", () => {
        cy.get('button[type="submit"]').click();
        cy.get('span.oxd-input-field-error-message').should('contain', 'Required');
    });

    it("Should not allow login with invalid credentials", () => {
        cy.login('invalidUser', 'invalidPass');
        cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
    });

    it("Should login with valid credentials", () => {
        cy.login();
        cy.url().should('include', '/dashboard');
        cy.get('p.oxd-userdropdown-name').should('be.visible');
    });

    it.skip('Should expire the session after inactivity', () => {
        cy.login();
        cy.url().should('include', '/dashboard');
        
        cy.wait(60000 * 31);
        
        cy.url().should('include', '/login');
        cy.get('input[name="username"]').should('be.visible');
    });
});
