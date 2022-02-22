import "cypress-file-upload";

const fixtureFile = "foto1.jpg";
const fixtureFile2 = "foto2.jpg";

Cypress.Commands.add("signup", ({ username, email, pwd, validpwd }) => {
  cy.get('[data-test-id="newusername-login-form"]')
    .type(username)
    .should("have.value", username);

  cy.get('[data-test-id="email-login-form"]')
    .type(email)
    .should("have.value", email);

  cy.get('[data-test-id="password-login-form"]')
    .type(pwd)
    .should("have.value", pwd);

  cy.get('[data-test-id="validpassword-login-form"]')
    .type(validpwd)
    .should("have.value", validpwd);

  cy.get('[id="button-login-form"]').click();
});

Cypress.Commands.add("login", ({ username, pwd }) => {
  cy.get('[data-test-id="username-login-form"]')
    .type(username)
    .should("have.value", username);

  cy.get('[data-test-id="password-login-form"]')
    .type(pwd)
    .should("have.value", pwd);

  cy.get('[type="checkbox"]').check();
  cy.get('[id="button-login-form"]').click();
});

Cypress.Commands.add("profile_edit", ({ name, telephone, descripCompany }) => {
  cy.get('[type="file"]').attachFile(fixtureFile2);
  cy.pause();

  cy.get('[data-test-id="name-profile-form"]')
    .type(name)
    .should("have.value", name);

  cy.get('[data-test-id="telephone-profile-form"]')
    .type(telephone)
    .should("have.value", telephone);

  cy.get('[data-test-id="descripCompany-profile-form"]')
    .type(descripCompany)
    .should("have.value", descripCompany);

  cy.get('[id="profileupdate-button"]').click();
});

Cypress.Commands.add(
  "create_post",
  ({ company, rate, page, facebook, instagram, description }) => {
    cy.get('[data-test-id="photos-post-form"]').attachFile(fixtureFile);
    cy.pause();

    cy.get('[data-test-id="company-post-form"]')
      .type(company)
      .should("have.value", company);

    cy.get('[data-test-id="category-select-form"]')
      .select("Event Planner")
      .should("have.value", "Event Planner");

    cy.get('[data-test-id="ubication-select-form"]')
      .select("Lima")
      .should("have.value", "Lima");

    cy.get('[data-test-id="rate-post-form"]')
      .type(rate)
      .should("have.value", rate);

    cy.get('[data-test-id="page-post-form"]')
      .type(page)
      .should("have.value", page);

    cy.get('[data-test-id="facebook-post-form"]')
      .type(facebook)
      .should("have.value", facebook);

    cy.get('[data-test-id="instagram-post-form"]')
      .type(instagram)
      .should("have.value", instagram);

    cy.get('[data-test-id="description-post-form"]')
      .type(description)
      .should("have.value", description);

    cy.get('[id="button-login-form"]').click();
    cy.pause();
  }
);
