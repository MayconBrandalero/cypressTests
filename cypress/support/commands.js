Cypress.Commands.add("login", (username = "Admin", password = "admin123") => {
    cy.visit('/');
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
  });

Cypress.Commands.add("searchPIMByName", (name) => {
    cy.contains('span.oxd-main-menu-item--name', 'PIM').click();
    cy.url().should('include', '/pim');
    
    cy.contains('label.oxd-label', 'Employee Name').parent().parent().find('input[placeholder="Type for hints..."]').clear().type(name);
    cy.get('button[type="submit"]').contains('Search').click();
    cy.wait(2000);
});
