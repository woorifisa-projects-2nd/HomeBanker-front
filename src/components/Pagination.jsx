import React, { Fragment } from "react";
import { Button, Flex, HStack } from "@chakra-ui/react";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";

export default function Pagination({ pagination, setPagination }) {
  const { totalItems, itemCountPerPage, currentPage } = pagination;
  const totalPages = Math.ceil(totalItems / itemCountPerPage);
  const noPrev = currentPage === 0;
  const noNext = currentPage + 1 >= totalPages;

  // 페이지 그룹 계산
  const pageGroupSize = 5;
  const currentPageGroup = Math.floor(currentPage / pageGroupSize);
  const startPage = currentPageGroup * pageGroupSize;
  const endPage = Math.min(startPage + pageGroupSize, totalPages);

  return (
    <Flex width={"100%"}>
      <Flex justifyContent={"center"} alignItems={"center"} width={"100%"}>
        <Button
          leftIcon={<GrCaretPrevious />}
          variant={"none"}
          bgColor="white"
          onClick={() => {
            if (!noPrev) {
              setPagination({ ...pagination, currentPage: currentPage - 1 });
            }
          }}
          disabled={noPrev}
        ></Button>

        <HStack>
          {Array.from(
            { length: endPage - startPage },
            (_, i) => startPage + i,
          ).map((page) => (
            <Fragment key={page}>
              <Button
                onClick={() =>
                  setPagination({ ...pagination, currentPage: page })
                }
                bgColor={currentPage === page ? "#CFCFCF" : "white"}
                textDecoration={currentPage === page ? "underline" : "none"}
                textDecorationThickness={currentPage === page ? "2px" : "0"}
                textUnderlineOffset={currentPage === page ? "4px" : "0"}
              >
                {page + 1}
                <span class="blind">{page + 1}</span>
              </Button>
            </Fragment>
          ))}
        </HStack>

        <Button
          rightIcon={<GrCaretNext />}
          variant={"none"}
          bgColor="white"
          onClick={() => {
            if (!noNext) {
              setPagination({ ...pagination, currentPage: currentPage + 1 });
            }
          }}
          disabled={noNext}
        ></Button>
      </Flex>
    </Flex>
  );
}
