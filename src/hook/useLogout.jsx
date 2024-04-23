import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { api } from "../api/api";

export default function useLogout() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const token = document.cookie.split("=")[1];
    const user = jwtDecode(token);

    const tokenLoginId = user.loginId;
    const tokenRole = user.role;

    const sendData = {
      loginId: tokenLoginId,
      role: tokenRole,
    };

    try {
      const response = await api.post("/exit", sendData);

      console.log(response);

      if (response.status === 200) {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        alert("로그아웃 되었습니다.");
        navigate("/login");
      } else {
        console.error("로그아웃 요청이 실패했습니다.");
      }
    } catch (error) {
      console.error("로그아웃 요청 중 오류가 발생했습니다.", error);
    }
  };

  return handleLogout;
}
