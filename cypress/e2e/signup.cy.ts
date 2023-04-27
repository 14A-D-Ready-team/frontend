describe("Signup page", () => {
  it("Tries wrong password", () => {
    cy.viewport("iphone-xr");
    cy.visit("https://mobile.ready-app.hu/signup");
    cy.get("#name").type("BelaVagyok");
    cy.get("#email").type("Bela19@gmail.com");
    cy.get("#pswd").type("wrong");
    cy.get(".ready-btn").should("be.disabled");
    cy.url().should("contain", "signup");
  });

  it("Tries wrong username", () => {
    cy.viewport("iphone-xr");
    cy.visit("https://mobile.ready-app.hu/signup");
    cy.get("#email").type("Bela19@gmail.com");
    cy.get("#pswd").type("Jelszo123$!");
    cy.get("#name").type("B$la");
    cy.get(".ready-btn").should("be.disabled");
    cy.url().should("contain", "signup");
  });

  it("Tries wrong email", () => {
    cy.viewport("iphone-xr");
    cy.visit("https://mobile.ready-app.hu/signup");
    cy.get("#pswd").type("Jelszo123$!");
    cy.get("#name").type("Béla");
    cy.get("#email").type("Belavagyokgmail.com");
    cy.get(".ready-btn").should("be.disabled");
    cy.url().should("contain", "signup");
  });
});
