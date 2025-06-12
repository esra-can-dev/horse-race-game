describe('Horse Racing Game - Basic Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3030');
  });

  it('Page loads and all titles should be visible', () => {
    cy.contains('Horse Racing 🐎').should('be.visible');
    cy.contains('Horse List').should('be.visible');
    cy.contains('Game Arena').should('be.visible');
    cy.contains('Program').should('be.visible');
    cy.contains('Results').should('be.visible');
  });

  it('Generate Program button is visible and enabled', () => {
    cy.contains('button', 'Generate Program').should('be.visible').and('not.be.disabled');
  });

  it('Start Game button is disabled before clicking Generate', () => {
    cy.contains('button', 'Start Game').should('be.visible').and('be.disabled');
  });

  it('Reset Game button is disabled before clicking Generate', () => {
    cy.contains('button', 'Reset Game').should('be.visible').and('be.disabled');
  });

  it('Start Game button becomes enabled and text changed after clicking Generate Program button', () => {
    cy.contains('button', 'Generate Program').click();
    cy.contains('button', 'Start Round #1').should('be.visible').and('not.be.disabled');
  });

  it('Reset Game button becomes enabled after clicking Generate Program button', () => {
    cy.contains('button', 'Generate Program').click();
    cy.contains('button', 'Reset Game').should('be.visible').and('not.be.disabled');
  });

  it('HorseList shows exactly 20 horses on page load', () => {
    cy.get('table#vgt-table tbody tr').should('have.length', 20);
  });
});
