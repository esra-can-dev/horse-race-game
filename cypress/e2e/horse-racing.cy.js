describe('At Yarışı Oyunu Testi', () => {
  it('Anasayfa açılıyor ve başlık görünüyor', () => {
    cy.visit('http://localhost:3030'); // Projenin lokal adresi

    // Sayfada "At Yarışı" gibi bir başlık varsa onu kontrol edelim
    cy.contains('Horse Racing 🐎').should('be.visible');
  });
});
