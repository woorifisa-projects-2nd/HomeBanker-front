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
  Switch,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useProductsQuery } from "../../../api/counsel/api";
import { BOARD_PAGINATION_SIZE } from "../../../constants/index";
import Pagination from "../../Pagination";
import { api } from "../../../api/api";

const PRODUCT_TYPE = {
  전체: "all",
  카드: "card",
  예적금: "deposit",
  대출: "loan",
};
export default function ProductsTab() {
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    itemCountPerPage: 0,
    pageCount: 0,
    currentPage: 0,
  });
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [productsData, isLoading, refetchProducts] = useProductsQuery(
    selectedCategory,
    pagination.currentPage,
    BOARD_PAGINATION_SIZE,
  );

  // 상품 노출 변경
  const changeDisplay = (productId, isShown) => {
    api
      .post(`/api/banker/product/show`, {
        productId,
        isShown,
      })
      .then(() => {
        refetchProducts();
        toast({
          position: "top",
          title: "노출이 변경되었습니다.",
          status: "success",
          duration: 800,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    if (productsData) {
      setProducts(productsData.data.productItems);
      setPagination({
        totalItems: productsData.data.pagination.totalElements,
        itemCountPerPage: BOARD_PAGINATION_SIZE,
        pageCount: productsData.data.pagination.totalPages,
        currentPage: productsData.data.pagination.pageNumber,
      });
    }
  }, [productsData]);

  useEffect(() => {
    refetchProducts();
  }, [pagination.currentPage, selectedCategory]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Select
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
            width={"150px"}
            variant="outline"
            placeholder="전체"
          >
            {Object.entries(PRODUCT_TYPE).map((item) => (
              <Fragment key={item[1]}>
                <option value={item[1]}>{item[0]}</option>
              </Fragment>
            ))}
          </Select>

          {products && (
            <TableContainer>
              <Table variant="simple">
                {/* 테이블 헤더 */}
                <Thead>
                  <Tr>
                    <Th>상품 분류</Th>
                    <Th>상품 이름</Th>
                    <Th>상품 금리</Th>
                    <Th>상품 설명</Th>
                    <Th>상품 노출</Th>
                  </Tr>
                </Thead>

                {/* 테이블 바디 */}
                <Tbody>
                  {products.map((item) => {
                    return (
                      <Tr key={item.productId}>
                        <Td>{item.productCode.typeName ?? ""}</Td>
                        <Td>{item.productName ?? ""}</Td>
                        <Td>{item.productInterest ?? 0}</Td>
                        <Td>{item.productDescription ?? ""}</Td>
                        <Td>
                          <Switch
                            size="lg"
                            isChecked={item.isShown}
                            onChange={() =>
                              changeDisplay(item.productId, item.isShown)
                            }
                          />
                        </Td>
                      </Tr>
                    );
                  })}
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
