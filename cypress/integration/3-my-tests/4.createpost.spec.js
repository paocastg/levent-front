describe("Test Create Post", () => {
  afterEach(() => cy.pause());

  it("Successful login", () => {
    cy.visit(`${Cypress.env("client_url")}/login`);
    cy.login({
      username: "leventprueba",
      pwd: "prueba123",
    });
  });

  it("profile edit", () => {
    cy.request("DELETE", `${Cypress.env("api_url")}/cleanposts`);
    cy.contains("Crear Anuncio").click();

    cy.create_post({
      company: "Fernanda Medina",
      rate: "1200",
      page: "https://www.facebook.com/FernandaMedinaWP",
      facebook: "https://www.facebook.com/FernandaMedinaWP",
      instagram: "https://www.instagram.com/tuboda.piura/",
      description:
        "Somos una empresa, dedicada a la producción de bodas, y desde entonces hemos formado parte del evento más importante de muchos novios: SU BODA",
    });
  });

  it("view my posts", () => {
    cy.visit(Cypress.env("client_url"));
    cy.url().should("include", "/");
    cy.get('[id="dropdown-basic"]').click();
    cy.get('[id="my-posts-button"]').click();
  });
});
