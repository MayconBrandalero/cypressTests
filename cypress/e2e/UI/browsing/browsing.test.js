
describe("Browsing Tests", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Should access the PIM module", () => {
    cy.contains('span.oxd-main-menu-item--name', 'PIM').click();
    cy.url().should('include', '/pim');
  });

  it("Should filter employees by name", () => {
    cy.searchPIMByName("test");
    cy.get('div.oxd-table-row').should('have.length.at.least', 1);

    cy.get('.oxd-table-body .oxd-table-card').then(($rows) => {
      let foundName = false;

      $rows.each((_, row) => {
        const firstName = Cypress.$(row).find('.oxd-table-cell').eq(2).text();
        const lastName = Cypress.$(row).find('.oxd-table-cell').eq(3).text();

        console.log(`FirstName: "${firstName}", LastName: "${lastName}"`);

        if (firstName.includes('test') || lastName.includes('test')) {
          foundName = true;
          return false;
        }
      });

      expect(foundName).to.be.true;
    });
  });

  it("Should handle pagination, scrolling and responsiveness", () => {
    cy.contains('span.oxd-main-menu-item--name', 'PIM').click();
    cy.url().should('include', '/pim');

    cy.get('div.oxd-table-row').should('have.length.at.least', 1);

    cy.get('button.oxd-pagination-page-item--previous-next').then(($nextBtn) => {
      if ($nextBtn.is(':visible') && !$nextBtn.is(':disabled')) {
        cy.wrap($nextBtn).click();
        cy.get('.oxd-table-body .oxd-table-card').should('exist');
      }
    });

    cy.get('.oxd-table-card').last().scrollIntoView().should('be.visible');

    cy.viewport(320, 568);
    cy.get('.oxd-table-body').should('be.visible');
});

});
