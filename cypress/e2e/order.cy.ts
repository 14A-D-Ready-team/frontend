describe("Select buffet", () => {
  it("Select Jedlik buffet", () => {
    cy.viewport("iphone-xr");
    cy.visit("https://mobile.ready-app.hu/buffet-select");
    cy.get("#select-buffet").click();
    cy.screenshot("buffet list opened");
    cy.get("#2").click();
    cy.get("#choose-btn").click();
    cy.screenshot("buffet selected");
    cy.get("#final-choose-btn").click();
  });
});
