describe('Horse Racing Game - Race Generation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3030');
    cy.contains('button', 'Generate Program').click();
  });

  it('Generates exactly 6 race rounds', () => {
    cy.get('.race-program__round').should('have.length', 6);
  });

  it('Each round has correct distance', () => {
    const expectedDistances = ['1200', '1400', '1600', '1800', '2000', '2200'];

    cy.get('.race-program__round').each(($round, index) => {
      cy.wrap($round).contains(`${index + 1}. Lap - ${expectedDistances[index]}m`);
    });
  });

  it('Generates Game Arena and shows 10 horse, Finish text', () => {
    cy.get('.race-arena__participants').should('be.visible');
    cy.get('.race-arena__participant').should('have.length', 10);
    cy.contains('FINISH').should('be.visible');
  });
});
