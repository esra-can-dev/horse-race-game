describe('Horse Racing Game - Race Execution', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3030');
    cy.contains('button', 'Generate Program').click();
    cy.contains('button', 'Start Round #1').click();
  });

  it('Displays results sequentially as each round finishes', async () => {
    await cy.wait(10000);
    cy.get('.race-result__round').should('have.length.at.least', 1);

    cy.contains('button', 'Start Round #2').click();
    await cy.wait(10000);
    cy.get('.race-result__round').should('have.length.at.least', 2);
  });

  it('Pauses and resumes the race correctly', async () => {
    await cy.wait(1000);
    cy.contains('button', 'Pause').click();

    cy.get('.race-arena__participant svg').then(($horsesBefore) => {
      const positionsBefore = [...$horsesBefore].map((h) => h.style.transform);

      cy.wait(1000);

      cy.get('.race-arena__participant svg').each((horse, index) => {
        expect(horse[0].style.transform).to.equal(positionsBefore[index]);
      });
    });

    cy.contains('button', 'Continue').click();

    await cy.wait(1000);
    cy.get('.race-arena__participant svg').then(($horsesAfter) => {
      const positionsAfter = [...$horsesAfter].map((h) => h.style.transform);

      cy.get('.race-arena__participant svg').each((horse, index) => {
        expect(horse[0].style.transform).to.not.equal(positionsAfter[index]);
      });
    });
  });

  it('Reset the game when Reset Game button clicked', async () => {
    await cy.wait(10000);
    cy.contains('button', 'Reset Game').click();
    cy.get('.race-program__round').should('not.be.visible');
    cy.get('.race-arena__participants').should('not.be.visible');
    cy.get('.race-result__round').should('not.be.visible');
  });
});
