import { api } from "../api";
import { useQuery } from '@tanstack/react-query'

// 상담게시글 리스트 조회
export function useBoardsQuery(size, page) {
  const getBoards = async () => {
    return await api.get(`/api/board?size=${size}&page=${page}`);
  };

  const getBoardsQuery = useQuery({
    queryKey: ['boards'],
    queryFn: () => getBoards(),
    keepPreviousData: true
  });

  return [getBoardsQuery.data, getBoardsQuery.isLoading, getBoardsQuery.refetch];
}

// 상품 리스트 조회
export function useProductsQuery(category, page, size) {
  const getProducts = async () => {
    return await api.get(`/api/banker/product?category=${category}&page=${page}&size=${size}`)
  }

  const getProductsQeury = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
    keepPreviousData: true,
  })

  return [getProductsQeury.data, getProductsQeury.isLoading, getProductsQeury.refetch]

}