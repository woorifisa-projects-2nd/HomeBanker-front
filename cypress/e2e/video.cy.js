describe("화상 상담", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.get(".chakra-button__group > :nth-child(1)").click();
    cy.get(":nth-child(3) > .chakra-input__group > .chakra-input").type("id");
    cy.get(":nth-child(4) > .chakra-input__group > .chakra-input").type("pw");
    cy.get(".css-vlh90x").click();
    cy.wait(1000); //1초 대기
  });

  it("화상 상담 입장", () => {
    cy.visit("http://localhost:5173");
  });
});
