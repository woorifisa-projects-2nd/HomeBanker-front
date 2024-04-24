import { api } from "../api";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

// 가입상품 리스트 조회
export function useSalesQuery(size, page) {
  const getSales = async () => {
    return await api.get(`/api/mypage/sale?size=${size}&page=${page}`);
  };

  const getSalesQuery = useQuery({
    queryKey: ["sales"],
    queryFn: () => getSales(),
    keepPreviousData: true,
  });
  return [getSalesQuery.data, getSalesQuery.isLoading, getSalesQuery.refetch];
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
