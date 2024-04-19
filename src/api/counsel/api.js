import { api } from "../api";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

// 상담게시글 리스트 조회
export function useBoardsQuery(size, page) {
  const getBoards = async () => {
    return await api.get(`/api/board?size=${size}&page=${page}`);
  };

  const getBoardsQuery = useQuery({
    queryKey: ["boards"],
    queryFn: () => getBoards(),
    keepPreviousData: true,
  });

  return [
    getBoardsQuery.data,
    getBoardsQuery.isLoading,
    getBoardsQuery.refetch,
  ];
}

// 상품 리스트 조회
export function useProductsQuery(category, page, size) {
  const getProducts = async () => {
    return await api.get(
      `/api/banker/product?category=${category}&page=${page}&size=${size}`,
    );
  };

  const getProductsQeury = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
    keepPreviousData: true,
  });

  return [
    getProductsQeury.data,
    getProductsQeury.isLoading,
    getProductsQeury.refetch,
  ];
}

const getAuthUser = () => {
  const token = document.cookie.split("=")[1];

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const user = jwtDecode(token);
    return user; // 로그인된 사용자 정보 반환
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const useAuth = () => {
  return useQuery({
    queryKey: "authUser",
    queryFn: () => getAuthUser(),
  });
};
