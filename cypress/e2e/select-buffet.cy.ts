describe("Select buffet", () => {
  it("Select Jedlik buffet", () => {
    cy.viewport("iphone-xr");
    cy.visit("http://localhost:4200/buffet-select");
    cy.get("#select-buffet").click();
    cy.get("ion-radio").first().click();
    cy.get("ion-button").contains("Választás").click();
    cy.screenshot("buffet selected");
    cy.get(".ready-btn").click();
    cy.url().should("contain", "buffetId");
  });
  it("Without select buffet", () => {
    cy.viewport("iphone-xr");
    cy.visit("http://localhost:4200/buffet-select");
    cy.get(".ready-btn").should("be.disabled");
    cy.url().should("contain", "buffet-select");
  });
});
