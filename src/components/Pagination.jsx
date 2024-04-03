import React, { Fragment } from 'react'
import { Button, Flex, HStack } from "@chakra-ui/react"

export default function Pagination({ pagination, setPagination }) {
  const { totalItems, itemCountPerPage, pageCount, currentPage } = pagination;

  const totalPages = Math.ceil(totalItems / itemCountPerPage);
  const noPrev = currentPage === 0;
  const noNext = currentPage + pageCount - 1 >= totalPages;

  return (
    <Flex width={"100%"} >
      <Flex justifyContent={"center"} alignItems={"center"} width={"100%"}>{!noPrev &&
        <Button variant={"none"} bgColor="white" onClick={
          () => {
            setPagination({ ...pagination, currentPage: currentPage - 1 })
          }}>이전</Button>}

        <HStack>
          {[...Array(pageCount)].map((a, i) => (
            <Fragment key={i}>
              {currentPage < totalPages && (
                <Button onClick={() =>
                  setPagination({ ...pagination, currentPage: i })
                } bgColor={currentPage === i ? "blue400" : "white"}>{i + 1}</Button>
              )}
            </Fragment>
          ))}
        </HStack>

        {!noNext &&
          <Button variant={"none"} bgColor="white" onClick={() =>
            setPagination({ totalItems, itemCountPerPage, pageCount, currentPage: currentPage + 1 })
          }>다음</Button>}
      </Flex>
    </Flex>


  )
}
