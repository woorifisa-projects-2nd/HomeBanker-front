import React, { useState } from 'react';
import {
  Box,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  VStack,
  Flex,
  Input,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

// 가상의 더미 데이터 배열
const dummyData = [];
for (let i = 1; i <= 50; i++) {
  dummyData.push(
    { id: i, type: '예금', title: `예금 상품 ${i}`, content: `예금 상품 설명 ${i}` },
    { id: i + 50, type: '적금', title: `적금 상품 ${i}`, content: `적금 상품 설명 ${i}` },
    { id: i + 100, type: '대출', title: `대출 상품 ${i}`, content: `대출 상품 설명 ${i}` }
  );
}

const ProductFilter = () => {
  const [selectedFilter, setSelectedFilter] = useState('전체상품');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [amount, setAmount] = useState(''); // 가입 금액
  const [period, setPeriod] = useState(''); // 가입 기간

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const handleItemClick = (product) => {
    if (selectedProduct && selectedProduct.id === product.id) {
      setShowDetails(!showDetails); // 상세 정보 창을 열거나 닫음
    } else {
      setSelectedProduct(product);
      setShowDetails(true); // 상세 정보 창 열기
    }
  };

  const handleSend = () => {
    console.log(`금액: ${amount}, 기간: ${period}`);
    setShowDetails(false);
    setSelectedProduct(null);
    setAmount('');
    setPeriod('');
  };

  const handleAmountChange = (value) => {
    // 입력된 값에서 숫자 이외의 문자 제거
    const cleanValue = value.replace(/[^0-9]/g, '');

    // 세 자리마다 쉼표(,) 추가하여 포맷팅
    const formattedValue = (+cleanValue).toLocaleString();

    setAmount(formattedValue);
  };

  const handlePeriodChange = (value) => {
    // 숫자 이외의 값은 입력하지 않도록 처리
    const cleanValue = value.replace(/[^0-9]/g, '');
    setPeriod(cleanValue);
  };

  const filteredResults = dummyData.filter((item) => item.type === selectedFilter);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedResults = filteredResults.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  return (
    <Box p={4}>
      <Box bg="gray.200" borderRadius="md" p={4} mb={4} display="flex" alignItems="center">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="outline" w="auto">
            {selectedFilter}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleFilterSelect('예금')}>예금</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('적금')}>적금</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('대출')}>대출</MenuItem>
          </MenuList>
        </Menu>
      </Box>

      <Divider />

      <VStack mt={4} spacing={4} align="stretch">
        {paginatedResults.map((result) => (
          <Box
            key={result.id}
            borderWidth="1px"
            borderRadius="md"
            p={4}
            onClick={() => handleItemClick(result)}
            cursor="pointer"
          >
            <Text fontSize="lg">{result.type}</Text>
            <Text fontWeight="bold">{result.title}</Text>
            <Text>{result.content}</Text>
          </Box>
        ))}
      </VStack>

      {/* Pagination */}
      {totalPages > 1 && (
        <Flex mt={4} justify="center">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              variant={currentPage === index + 1 ? 'solid' : 'outline'}
              colorScheme="teal"
              mx={1}
            >
              {index + 1}
            </Button>
          ))}
        </Flex>
      )}

      {/* 상세 정보 창 */}
      {showDetails && selectedProduct && (
        <Box
          position="fixed"
          bottom="0"
          left="50%"
          transform="translateX(-50%)"
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="lg"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="90%"
          maxW="600px"
        >
          <Box>
            <Text>금액:</Text>
            <Input
              type="text" // type을 text로 설정하여 숫자 포맷을 유지하고 쉼표(,)를 표시
              placeholder="금액을 입력하세요"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              mt={2}
              mb={4}
            />
            <Text>기간:</Text>
            <Input
              type="number"
              placeholder="기간을 입력하세요"
              value={period}
              onChange={(e) => handlePeriodChange(e.target.value)}
              mt={2}
              mb={4}
            />
          </Box>
          <Button colorScheme="teal" onClick={handleSend}>
            전송
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProductFilter;