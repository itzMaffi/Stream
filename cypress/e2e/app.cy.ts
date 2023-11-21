/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress E2E Test
describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should navigate to the main page", () => {
    cy.get(".h-full > .hidden").contains("New");
    cy.get('[href="/history"]').contains("History");
    cy.get(".gap-2 > .bg-stream-500").contains("New");
  });

  it("should have a history button that navigates to the history page", () => {
    cy.get('[href="/history"]')
      .click()
      .url()
      .should("include", "/history");
  });

  it("should create a new note", () => {
    cy.get(".rounded-md").type("text for test, and then clear the text");

    cy.get(".bg-red-400")
      .should("exist")
      .click();

    cy.get(".rounded-md").should("be.empty");

    cy.get(".rounded-md").type("text for test, and then save the text");

    cy.get(".my-8 > .bg-stream-500").click();
  });
});

describe("History", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/history");
  });

  it("should navigate to the history page", () => {
    cy.get('[href="/"]')
      .should("exist")
      .contains("New")
      .click()
      .url()
      .should("include", "/");
  });

  it("should navigate to the history page", () => {
    cy.get('[href="/"]');
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
