import React from "react";
import { Button, Flex, HStack } from "@chakra-ui/react";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";

export default function Pagination({ pagination, setPagination }) {
  const { totalItems, itemCountPerPage, currentPage } = pagination;
  const totalPages = Math.ceil(totalItems / itemCountPerPage);
  const noPrev = currentPage === 0;
  const noNext = currentPage + 1 >= totalPages;

  return (
    <Flex width={"100%"}>
      <Flex justifyContent={"center"} alignItems={"center"} width={"100%"}>
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
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              onClick={() => setPagination({ ...pagination, currentPage: i })}
              bgColor={currentPage === i ? "blue.400" : "white"}
            >
              {i + 1}
            </Button>
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
      </Flex>
    </Flex>
  );
}
