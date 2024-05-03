describe("고객 문의 게시판", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.get(".chakra-button__group > :nth-child(1)").click();
    cy.wait(1000); //1초 대기
    cy.get(":nth-child(3) > .chakra-input__group > .chakra-input").type("id");
    cy.get(":nth-child(4) > .chakra-input__group > .chakra-input").type("pw");
    cy.get(".css-vlh90x").click();
    cy.wait(1000); //1초 대기
  });

  it("문의 게시판 조회", () => {
    cy.get(".css-pa7cn > :nth-child(2)").click();
    cy.url().should("include", "/board");
  });

  it("문의 게시판 글 작성", () => {
    cy.get(".css-pa7cn > :nth-child(2)").click();
    cy.url().should("include", "/board");
    cy.get(".css-1lekzkb > .chakra-button").click();
    cy.wait(1000); //1초 대기
    cy.get(".chakra-textarea").type("내용입니다.");
    cy.get(".chakra-modal__footer > .chakra-button").click();
  });
});

describe("은행원 문의 게시판", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.get(".chakra-button__group > :nth-child(1)").click();
    cy.wait(1000); //1초 대기
    cy.get(":nth-child(3) > .chakra-input__group > .chakra-input").type(
      "admin",
    );
    cy.get(":nth-child(4) > .chakra-input__group > .chakra-input").type("pw");
    cy.get(".css-vlh90x").click();
  });

  it("문의 게시판 글 조회", () => {
    cy.get(".css-pa7cn > :nth-child(2)").click();
    cy.url().should("include", "/board/admin");
  });

  it("문의 게시판 글 처리 완료", () => {
    cy.get(".css-pa7cn > :nth-child(2)").click();
    cy.wait(1000); //1초 대기
    cy.get(":nth-child(2) > :nth-child(6) > .css-18zl3sm").click();
  });

  it("문의 게시판 글 삭제", () => {
    cy.get(".css-pa7cn > :nth-child(2)").click();
    cy.wait(1000); //1초 대기
    cy.get(":nth-child(2) > :nth-child(6) > .css-1195230").click();
  });

  it("상품관리 게시판 전체 조회", () => {
    cy.get(".css-pa7cn > :nth-child(2)").click();
    cy.wait(1000); //1초 대기
    cy.get('[data-cy="products"]').click();
  });

  it("상품관리 게시판 카테고리별 조회", () => {
    cy.get(".css-pa7cn > :nth-child(2)").click();
    cy.wait(1000); //1초 대기
    cy.get('[data-cy="products"]').click();
    cy.wait(1000); //1초 대기
    cy.get(".chakra-select").select("대출");
  });
});
