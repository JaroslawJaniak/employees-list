/// <reference types="cypress" />

describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should render the select with the correct options", () => {
    cy.get("select#languageSelector").should("exist");
    cy.get("select#languageSelector option").should("have.length", 2);
    cy.get("select#languageSelector option")
      .eq(0)
      .should("have.text", "Polski");
    cy.get("select#languageSelector option")
      .eq(1)
      .should("have.text", "English");
    
  });


  it("should render the button with the correct text", () => {
   
    cy.contains("button", "Dodaj Pracownika").should("be.visible");
  });

  it("passes", () => {});
});
