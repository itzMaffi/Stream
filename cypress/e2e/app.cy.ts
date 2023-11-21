/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress E2E Test
describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should navigate to the main page", () => {
    // Find a link with an href attribute containing "about" and click it
    // cy.get('a[href*="about"]').click();

    // // The new url should include "/about"
    // cy.url().should("include", "/about");

    // The new page should contain an h1 with "About page"
    cy.get(".h-full > .hidden").contains("New");
    cy.get('[href="/history"]')
      .contains("History")
      .should("exist")
      .click();
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
