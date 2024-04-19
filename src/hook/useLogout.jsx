import { useNavigate } from "react-router-dom";

export default function useLogout ()  {
    const navigate = useNavigate();
    const handleLogout = () => {
    
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  return handleLogout;
};
