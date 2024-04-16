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

// 예금 상품 데이터
const depositProducts = [
    { id: 1, type: '예금', title: '청년희망적금', content: '19세에서 34세의 청년 중 총급여 3600만 원 이하의 청년이 가입할 수 있다.' },
    { id: 2, type: '예금', title: '스마트저축예금', content: '높은 이자율을 제공하는 저축예금 상품' },
    { id: 3, type: '예금', title: '우대이자적금', content: '특정 조건 충족 시 추가 이자 제공' },
    { id: 4, type: '예금', title: '행복플러스저축예금', content: '장기 저축을 위한 상품' },
    { id: 5, type: '예금', title: '신규창업자금적금', content: '신규 창업자를 위한 특별적금 상품' },
    { id: 6, type: '예금', title: '미래설계저축예금', content: '미래를 위한 저축 계획 상품' },
    { id: 7, type: '예금', title: '골드라인적금', content: '고액 저축자를 위한 고이자 적금 상품' },
    { id: 8, type: '예금', title: '주니어스마트저축예금', content: '어린이와 청소년을 위한 저축예금 상품' },
    { id: 9, type: '예금', title: '행복나눔적금', content: '사회공헌 활동 연계 적금 상품' },
    { id: 10, type: '예금', title: '여행목돈마련적금', content: '여행자금 마련을 위한 적금 상품' }
  ];
  
  // 대출 상품 데이터
  const loanProducts = [
    { id: 51, type: '대출', title: '신용대출', content: '신용등급에 따른 맞춤형 대출 상품' },
    { id: 52, type: '대출', title: '주택담보대출', content: '주택을 담보로 제공하여 받을 수 있는 대출' },
    { id: 53, type: '대출', title: '자동차대출', content: '자동차 구매를 위한 대출 상품' },
    { id: 54, type: '대출', title: '학자금대출', content: '학비 지원을 위한 대출 상품' },
    { id: 55, type: '대출', title: '사업자금대출', content: '사업 운영 자금을 지원하는 대출 상품' },
    { id: 56, type: '대출', title: '햇살론', content: '저신용자나 저소득층을 위한 정부지원 대출 상품' },
    { id: 57, type: '대출', title: '전세자금대출', content: '전세 보증금을 마련하기 위한 대출 상품' },
    { id: 58, type: '대출', title: '신혼부부전용대출', content: '신혼부부를 위한 맞춤형 대출 상품' },
    { id: 59, type: '대출', title: '장기주택담보대출', content: '장기간 주택담보 대출 상품' },
    { id: 60, type: '대출', title: '개인사업자대출', content: '개인 사업자를 위한 운영 자금 대출 상품' }
  ];
  
  // 카드 상품 데이터
  const cardProducts = [
    { id: 101, type: '카드', title: '프리미엄 포인트 카드', content: '높은 포인트 적립률을 제공하는 프리미엄 카드' },
    { id: 102, type: '카드', title: '여행 마일리지 카드', content: '항공 마일리지 적립에 최적화된 카드' },
    { id: 103, type: '카드', title: '영화 할인 카드', content: '영화관 이용 시 할인 혜택을 제공하는 카드' },
    { id: 104, type: '카드', title: '쇼핑 리워드 카드', content: '다양한 쇼핑몰에서의 할인 혜택을 제공하는 카드' },
    { id: 105, type: '카드', title: '주유 할인 카드', content: '주유 시 할인 혜택을 제공하는 카드' },
    { id: 106, type: '카드', title: '다이닝 리워드 카드', content: '음식점에서의 할인 및 리워드 제공 카드' },
    { id: 107, type: '카드', title: '교통 리워드 카드', content: '대중교통 이용 시 혜택을 제공하는 카드' },
    { id: 108, type: '카드', title: '건강 관리 카드', content: '건강 관련 지출에 대한 리워드를 제공하는 카드' },
    { id: 109, type: '카드', title: '교육 리워드 카드', content: '교육 관련 지출 시 혜택을 제공하는 카드' },
    { id: 110, type: '카드', title: '환경 친화 카드', content: '환경 보호 활동에 기여하는 소비에 대해 리워드를 제공하는 카드' }
  ];

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

  const getProductData = () => {
    switch (selectedFilter) {
      case '예금':
        return depositProducts;
      case '대출':
        return loanProducts;
      case '카드':
        return cardProducts;
      default:
        return [...depositProducts, ...loanProducts, ...cardProducts];
    }
  };

  const filteredResults = getProductData().filter((item) => {
    if (selectedFilter === '전체상품') {
      return true; // 모든 상품 표시
    }
    return item.type === selectedFilter;
  });

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
            <MenuItem onClick={() => handleFilterSelect('전체상품')}>전체상품</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('예금')}>예금</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('대출')}>대출</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('카드')}>카드</MenuItem>
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