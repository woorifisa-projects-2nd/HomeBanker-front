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
  Box,
} from "@chakra-ui/react";
import { useProductsQuery } from "../../../api/counsel/api";
import { BOARD_PAGINATION_SIZE } from "../../../constants/index";
import Pagination from "../../Pagination";
import { api } from "../../../api/api";
import ProductItem from "../../counsel/ProductItem";

const PRODUCT_TYPE = {
  전체상품: "all",
  카드: "card",
  예적금: "deposit",
  대출: "loan",
};

export default function ProductsTab({
  selectedProduct,
  setSelectedProduct,
  isDisplayed = true,
  isBoxStyle = false,
}) {
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

  const handleProductClick = (product) => {
    if (isDisplayed == false) {
      setSelectedProduct(product);
    }
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
          <Box borderBottom={isBoxStyle ? "1px solid #CFCFCF" : "none"}>
            <Select
              focusBorderColor="#CFCFCF"
              onChange={(e) => {
                setSelectedCategory(e.target.value);
              }}
              w="150px"
              variant="outline"
              marginLeft={isBoxStyle ? "10px" : "50px"}
              marginBottom={isBoxStyle ? "10px" : "20px"}
              border="1px solid #CFCFCF"
            >
              {Object.entries(PRODUCT_TYPE).map((item) => (
                <Fragment key={item[1]}>
                  <option value={item[1]}>{item[0]}</option>
                </Fragment>
              ))}
            </Select>
          </Box>

          {products && isBoxStyle ? (
            <Box paddingLeft={"14px"} paddingRight={"14px"}>
              {products.map((item, i) => (
                <Fragment key={i}>
                  <ProductItem
                    product={item}
                    onClick={() => handleProductClick(item)}
                    bgColor={
                      selectedProduct != undefined &&
                        item.productId == selectedProduct.productId
                        ? "gray.100"
                        : "white"
                    }
                  />
                </Fragment>
              ))}
            </Box>
          ) : (
            <TableContainer
              style={{
                ...commonCellStyle,
                marginLeft: "50px",
                marginRight: "50px",
              }}
              borderRadius={"12px"}
              border="1.5px solid #CFCFCF"
            >
              <Table variant='unstyled'>
                <Thead borderBottom={"1.5px solid #CFCFCF"}>
                  <Tr bg="#dcecff">
                    <Th style={{ ...commonCellStyle, paddingTop: "20px", paddingBottom: "20px", textAlign: "center" }}>
                      상품 분류
                    </Th>
                    <Th style={{ ...commonCellStyle, textAlign: "center" }}>
                      상품 이름
                    </Th>
                    <Th style={{ ...commonCellStyle, textAlign: "center" }}>
                      상품 금리
                    </Th>
                    <Th style={{ ...commonCellStyle, textAlign: "center" }}>
                      상품 설명
                    </Th>
                    {isDisplayed && (
                      <Th style={{ ...commonCellStyle, textAlign: "center" }}>
                        상품 노출
                      </Th>
                    )}
                  </Tr>
                </Thead>
                <Tbody>
                  {products.map((item, idx) => {
                    return (
                      <Tr
                        borderBottom={idx === products.length - 1 ? "none" : "1.5px solid #CFCFCF"}

                        key={item.productId}
                        onClick={() => handleProductClick(item)}
                        cursor="pointer"
                        backgroundColor={
                          selectedProduct != undefined &&
                            item.productId == selectedProduct.productId
                            ? "gray.100"
                            : "white"
                        }
                        _hover={{ backgroundColor: "gray.100" }}
                      >
                        <Td style={{ textAlign: "center", lineHeight: "40px" }}>
                          {item.productCode.typeName}
                        </Td>
                        <Td style={{ textAlign: "center" }}>
                          {item.productName}
                        </Td>
                        <Td style={{ textAlign: "center" }}>
                          {item.productInterest}
                        </Td>
                        <Td style={{ textAlign: "center" }}>
                          {item.productDescription}
                        </Td>

                        {isDisplayed && (
                          <Td style={{ textAlign: "center" }}>
                            <Switch
                              size="lg"
                              isChecked={item.isShown}
                              onChange={() =>
                                changeDisplay(item.productId, item.isShown)
                              }
                            />
                          </Td>
                        )}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
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
