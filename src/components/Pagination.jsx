import React, { Fragment } from "react";
import { Button, Flex, HStack } from "@chakra-ui/react";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";

export default function Pagination({ pagination, setPagination }) {
  const { totalItems, itemCountPerPage, pageCount, currentPage } = pagination;
  const totalPages = Math.ceil(totalItems / itemCountPerPage);
  const noPrev = currentPage === 0;
  const noNext = currentPage + 1 >= totalPages;

  // 페이지 그룹 계산
  const pageGroupSize = 5;
  const currentPageGroup = Math.floor(currentPage / pageGroupSize);
  const startPage = currentPageGroup * pageGroupSize;
  const endPage = Math.min(startPage + pageGroupSize, totalPages);

  // 이전 페이지 그룹으로 이동 가능 여부
  const noPrevGroup = currentPageGroup === 0;

  // 다음 페이지 그룹으로 이동 가능 여부
  const noNextGroup =
    currentPageGroup + 1 >= Math.ceil(totalPages / pageGroupSize);

  return (
    <Flex width={"100%"}>
      <Flex justifyContent={"center"} alignItems={"center"} width={"100%"}>
        {!noPrevGroup && (
          <Button
            leftIcon={<TbPlayerTrackPrev />}
            variant={"none"}
            bgColor="white"
            onClick={() =>
              setPagination({
                ...pagination,
                currentPage: startPage - 1,
              })
            }
          ></Button>
        )}

        {!noPrev && (
          <Button
            leftIcon={<GrCaretPrevious />}
            variant={"none"}
            bgColor="white"
            onClick={() => {
              setPagination({ ...pagination, currentPage: currentPage - 1 });
            }}
          ></Button>
        )}

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
                bgColor={currentPage === page ? "blue.400" : "white"}
              >
                {page + 1}
              </Button>
            </Fragment>
          ))}
        </HStack>

        {!noNext && (
          <Button
            rightIcon={<GrCaretNext />}
            variant={"none"}
            bgColor="white"
            onClick={() =>
              setPagination({
                ...pagination,
                currentPage: currentPage + 1,
              })
            }
          ></Button>
        )}

        {!noNextGroup && (
          <Button
            rightIcon={<TbPlayerTrackNext />}
            variant={"none"}
            bgColor="white"
            onClick={() =>
              setPagination({
                ...pagination,
                currentPage: startPage + pageGroupSize,
              })
            }
          ></Button>
        )}
      </Flex>
    </Flex>
  );
}
