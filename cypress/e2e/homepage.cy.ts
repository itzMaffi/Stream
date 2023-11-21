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

  it("cloud creat a new note, and cancle it", () => {
    cy.get(".rounded-md").type("text for test, and then clear the text");

    cy.get(".bg-red-400")
      .should("exist")
      .click();

    cy.get(".rounded-md").should("be.empty");
  });

  it("cloud creat a new note in english, and save it", () => {
    cy.get(".rounded-md").type("text for test, and then save the text");

    cy.get(".my-8 > .bg-stream-500")
      .should("exist")
      .click();
  });

  it("cloud creat a new note in chinese, and save it", () => {
    cy.get(".rounded-md").type("这段文字用于测试，输入文字，并能够保存。");

    cy.get(".my-8 > .bg-stream-500")
      .should("exist")
      .click();
  });

  it("cloud creat a new note in Germany, and save it", () => {
    cy.get(".rounded-md").type("Dieser Text mit ä ö ü ß dient zum Testen, zur Texteingabe und könnte gespeichert werden. ");

    cy.get(".my-8 > .bg-stream-500")
      .should("exist")
      .click();
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
