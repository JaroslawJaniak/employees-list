describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
    cy.visit("http://localhost:5173/");
  });
});
