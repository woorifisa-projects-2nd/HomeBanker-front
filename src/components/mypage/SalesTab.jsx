import React, { Fragment, useEffect, useState } from "react";
import {
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useSalesQuery } from "../../api/mypage/api";
import { SALE_PAGINATION_SIZE } from "../../constants/index";
import Pagination from "../Pagination";

export default function SalesTab() {
  const [sales, setSales] = useState([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    itemCountPerPage: 0,
    pageCount: 0,
    currentPage: 0,
  });
  const [salesData, isLoading, refetchSales] = useSalesQuery(
    SALE_PAGINATION_SIZE,
    pagination.currentPage
  );
  useEffect(() => {
    if (salesData) {
      setSales(salesData.data.saleItems);
      setPagination({
        totalItems: salesData.data.pagination.totalElements,
        itemCountPerPage: SALE_PAGINATION_SIZE,
        pageCount: salesData.data.pagination.totalPages,
        currentPage: salesData.data.pagination.pageNumber,
      });
    }
  }, [salesData]);

  useEffect(() => {
    refetchSales();
  }, [pagination.currentPage]);

  // 날짜 포맷 함수 추가
  const formatDate = (dateString) => {
    return dateString
      ? new Date(dateString).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {sales && (
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>상품 이름</Th>
                    <Th>상품 설명</Th>
                    <Th>가입 날짜</Th>
                    <Th>상품 금액 (원)</Th>
                    <Th>상품 기간 (달)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {sales.map((item) => (
                    <Tr key={item.saleId}>
                      <Td>{item.productName}</Td>
                      <Td>{item.productDescription}</Td>
                      <Td>{formatDate(item.createdAt)}</Td>{" "}
                      {/* 날짜 포맷 적용 */}
                      <Td>{item.saleAmount}</Td>
                      <Td>{item.saleMonth}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}

          {pagination.totalItems > 0 && (
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
              totalItems={pagination.totalItems}
              itemCountPerPage={pagination.itemCountPerPage}
              pageCount={pagination.pageCount}
              currentPage={pagination.currentPage}
            />
          )}
        </>
      )}
    </>
  );
}
