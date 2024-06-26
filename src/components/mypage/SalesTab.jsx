import React, { Fragment, useEffect, useState } from "react";
import {
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
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
    pagination.currentPage,
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

  const commonCellStyle = {
    fontFamily: "WooriDaumR",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "28px",
    lineHeight: "40px",
    color: "black",
  };

  return (
    <Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {sales && sales.length > 0 ? (
            <TableContainer
              style={{
                ...commonCellStyle,
                marginLeft: "50px",
                marginRight: "50px",
              }}
            >
              <Table variant="simple">
                <Thead>
                  <Tr bg="#dcecff">
                    <Th sx={commonCellStyle} textAlign="center">
                      상품 이름<span class="blind">상품 이름</span>
                    </Th>
                    <Th sx={commonCellStyle} textAlign="center">
                      상품 설명<span class="blind">상품 설명</span>
                    </Th>
                    <Th sx={commonCellStyle} textAlign="center">
                      가입 날짜<span class="blind">가입 날짜</span>
                    </Th>
                    <Th sx={commonCellStyle} textAlign="center">
                      상품 금액 (원)<span class="blind">상품 금액 (원)</span>
                    </Th>
                    <Th sx={commonCellStyle} textAlign="center">
                      상품 기간 (달)<span class="blind">상품 기간 (달)</span>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {sales.map((item) => (
                    <Tr key={item.saleId}>
                      <Td sx={commonCellStyle} textAlign="center">
                        {item.productName}
                        <span class="blind">{item.productName}</span>
                      </Td>
                      <Td sx={commonCellStyle} textAlign="center">
                        {item.productDescription}{" "}
                        <span class="blind">{item.productDescription}</span>
                      </Td>
                      <Td sx={commonCellStyle} textAlign="center">
                        {formatDate(item.createdAt)}
                        <span class="blind">{formatDate(item.createdAt)}</span>
                      </Td>
                      <Td sx={commonCellStyle} textAlign="center">
                        {item.saleAmount}{" "}
                        <span class="blind">{item.saleAmount}</span>
                      </Td>
                      <Td sx={commonCellStyle} textAlign="center">
                        {item.saleMonth}
                        <span class="blind">{item.saleMonth}</span>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <Box textAlign="center" marginTop="50px">
              <p style={{ ...commonCellStyle }}>
                가입한 상품이 없습니다.
                <span class="blind">가입한 상품이 없습니다.</span>
              </p>
            </Box>
          )}

          <div style={{ marginTop: "30px" }}>
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
          </div>
        </>
      )}
    </Box>
  );
}
