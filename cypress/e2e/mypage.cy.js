describe("마이페이지", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.get(".chakra-button__group > :nth-child(1)").click();
    cy.get(":nth-child(3) > .chakra-input__group > .chakra-input").type("id");
    cy.get(":nth-child(4) > .chakra-input__group > .chakra-input").type("pw");
    cy.get(".css-vlh90x").click();
    cy.wait(1000); //1초 대기
  });

  it("마이페이지 조회", () => {
    cy.get(".chakra-button__group > :nth-child(2)").click();
  });

  it("마이페이지 개인정보 수정", () => {
    cy.get(".chakra-button__group > :nth-child(2)").click();
    cy.get("#phone").clear().type("01011112222");
    cy.get(".chakra-stack > .chakra-button").click();
    cy.wait(2000);
    cy.reload();
    //cy.get('#phone').should("include", "01011112222")
  });

  it("상품가입정보 조회", () => {
    cy.get(".chakra-button__group > :nth-child(2)").click();
    cy.wait(2000); //2초 대기
    cy.get('[data-cy="my-products"]').click();
  });
});
