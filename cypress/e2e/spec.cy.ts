describe("Login page", () => {
  it("Logs user in", () => {
    cy.viewport("iphone-xr");
    cy.visit("https://mobile.ready-app.hu/login");
    cy.get("#email").type("kekesi.adam@students.jedlik.eu");
    cy.get("#pswd").type("Supa$3cr3t!!!");
    cy.screenshot("form fields filled");
    cy.get(".ready-btn").click();
    cy.screenshot("clicked login");
    cy.url().should("contain", "buffet-select");
    cy.wait(3000);
    cy.screenshot("login successful");
  });

  it("Tries wrong password", () => {
    cy.viewport("iphone-xr");
    cy.visit("https://mobile.ready-app.hu/login");
    cy.get("#email").type("kekesi.adam@students.jedlik.eu");
    cy.get("#pswd").type("wrong");
    cy.get(".ready-btn").click();
    cy.url().should("contain", "login");
    cy.get(".validation-text").should(
      "have.html",
      "Hibás email és jelszó páros!",
    );
    cy.wait(3000);
    cy.screenshot("error message");
  });
});
