describe("Test Login", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("client_url")}/login`);
  });

  afterEach(() => cy.pause());

  it.only("Successful login", () => {
    cy.login({
      username: "leventprueba",
      pwd: "prueba123",
    });
  });

  it.only("profile edit", () => {
    cy.get('[id="dropdown-basic"]').click();
    // my profile and my posts - button
    cy.get('[id="my-profile-button"]').click();
    cy.profile_edit({
      name: "Levent App",
      telephone: "+51932838229",
      descripCompany: "App para encontrar los mejores proveedores para eventos",
    });
  });
});
