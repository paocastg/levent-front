describe("Test Sign Up", () => {
  afterEach(() => cy.pause());

  it("Username not valid", () => {
    cy.visit(`${Cypress.env("client_url")}/signup`);
    cy.url().should("include", "/signup");
    cy.signup({
      username: "abc",
      email: "pruebalevent@gmail.com",
      pwd: "123456",
      validpwd: "123456",
    });
  });

  it("Email not valid", () => {
    cy.visit(`${Cypress.env("client_url")}/signup`);
    cy.url().should("include", "/signup");
    cy.signup({
      username: "leventprueba",
      email: "prueba",
      pwd: "123456",
      validpwd: "123456",
    });
  });

  it("Password doesnt match", () => {
    cy.visit(`${Cypress.env("client_url")}/signup`);
    cy.url().should("include", "/signup");
    cy.signup({
      username: "leventprueba",
      email: "pruebalevent@gmail.com",
      pwd: "abcde",
      validpwd: "123456",
    });
  });

  it("Password doesnt match 2", () => {
    cy.visit(`${Cypress.env("client_url")}/signup`);
    cy.url().should("include", "/signup");
    cy.signup({
      username: "leventprueba",
      email: "pruebalevent@gmail.com",
      pwd: "123456",
      validpwd: "holahola",
    });
  });

  it("Successful signup", () => {
    cy.visit(`${Cypress.env("client_url")}/signup`);
    cy.url().should("include", "/signup");
    cy.request("DELETE", `${Cypress.env("api_url")}/cleanusers`);
    cy.signup({
      username: "leventprueba",
      email: "pruebalevent@gmail.com",
      pwd: "prueba123",
      validpwd: "prueba123",
    });
  });

  it("log out", () => {
    cy.get('[id="username-menu"]').click();
    // my profile and my posts - button
    cy.get('[id="logout-button"]').click();
  });
});
