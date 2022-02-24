describe("Test Login", () => {
  afterEach(() => cy.pause());

  it("Username not valid", () => {
    cy.visit(`${Cypress.env("client_url")}/login`);
    cy.url().should("include", "/login");
    cy.login({
      username: "abc",
      pwd: "prueba123",
    });
  });

  it("Password not valid", () => {
    cy.visit(`${Cypress.env("client_url")}/login`);
    cy.url().should("include", "/login");
    cy.login({
      username: "leventprueba",
      pwd: "xxx",
    });
  });

  it("Username not exist", () => {
    cy.visit(`${Cypress.env("client_url")}/login`);
    cy.url().should("include", "/login");
    cy.login({
      username: "leventxxx",
      pwd: "prueba123",
    });
  });

  it("Username not match", () => {
    cy.visit(`${Cypress.env("client_url")}/login`);
    cy.url().should("include", "/login");
    cy.login({
      username: "zoealessa",
      pwd: "123456",
    });
  });

  it("Successful login", () => {
    cy.visit(`${Cypress.env("client_url")}/login`);
    cy.url().should("include", "/login");
    cy.login({
      username: "leventprueba",
      pwd: "prueba123",
    });

    cy.get('[id="dropdown-basic"]').click();
    // my profile and my posts - button
    cy.get('[id="logout-button"]').click();
  });
});
