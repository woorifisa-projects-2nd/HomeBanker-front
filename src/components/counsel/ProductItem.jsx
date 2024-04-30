import React from "react";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";

export default function ProductItem({ product, onClick, bgColor }) {
  return (
    <Box
      bgColor={bgColor}
      onClick={onClick}
      borderBottom={"1px solid #CFCFCF"}
      paddingLeft="10px"
      paddingRight="10px"
      paddingTop={"18px"}
      paddingBottom={"18px"}
    >
      <HStack spacing={2} fontSize={"14px"}>
        <Text
          fontWeight={"bold"}
          borderRadius={5}
          color="white"
          bgColor={"#3686DF"}
          paddingLeft={"8px"}
          paddingRight={"8px"}
          paddingTop="2px"
          paddingBottom="2px"
        >
          {product.productCode.typeName}
        </Text>
        <Text fontWeight={"bold"}>{product.productName}</Text>
      </HStack>

      <Stack spacing={1} marginTop={"10px"} fontSize="12px">
        <HStack>
          <Text>{product.productDescription}</Text>
        </HStack>

        {product.productInterest && (
          <HStack>
            <Text fontWeight="bold">기본 금리</Text>
            <Text>{product.productInterest}</Text>
          </HStack>
        )}

        {product.maxMonth && (
          <HStack>
            <Text fontWeight="bold">최대 가입 기간</Text>
            <Text>{product.maxMonth} 개월</Text>
          </HStack>
        )}
      </Stack>
    </Box>
  );
}
