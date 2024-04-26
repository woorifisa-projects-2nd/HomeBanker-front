import React, { useMemo } from "react";
import { jwtDecode } from "jwt-decode";

export default function useCheckId() {
  const loginId = useMemo(() => {
    if (document.cookie) {
      const token = document.cookie.split("=")[1];
      const user = jwtDecode(token);
      return user.loginId;
    }
  }, [document.cookie]);

  return { loginId };
}
