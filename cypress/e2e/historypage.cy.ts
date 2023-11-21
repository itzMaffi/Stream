describe("History", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/history");
  });

  it("should ensure all notes are exist and each has a open button", () => {
    cy.get(".rounded-md").each(element => {
      cy.wrap(element).should("exist");
    });
  });

  it("the button Open should link the page to visit", () => {
    cy.get(":nth-child(1) > .absolute")
      .click()
      .url()
      .should("include", "/visit");
  });

  it("the button Open should link the page to visit", () => {});

  // it("should have a New button that navigates to the home page", () => {
  //   cy.get('[href="/"]')
  //     .click()
  //     .url()
  //     .should("include", "/");
  // });
});
