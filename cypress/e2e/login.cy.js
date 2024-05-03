describe("로그인", () => {
  it("고객 로그인", () => {
    cy.visit("http://localhost:5173");
    cy.get(".chakra-button__group > :nth-child(1)").click();
    cy.get(":nth-child(3) > .chakra-input__group > .chakra-input").type("id");
    cy.get(":nth-child(4) > .chakra-input__group > .chakra-input").type("pw");
    cy.get(".css-vlh90x").click();
  });

  it("은행원 로그인", () => {
    cy.visit("http://localhost:5173");
    cy.get(".chakra-button__group > :nth-child(1)").click();
    cy.get(":nth-child(3) > .chakra-input__group > .chakra-input").type(
      "admin",
    );
    cy.get(":nth-child(4) > .chakra-input__group > .chakra-input").type("pw");
    cy.get(".css-vlh90x").click();
  });
});
