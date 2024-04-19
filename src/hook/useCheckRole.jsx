import React, { useMemo } from "react";
import { jwtDecode } from "jwt-decode";

export default function useCheckRole() {
  const role = useMemo(() => {
    if (document.cookie) {
      const token = document.cookie.split("=")[1];
      const user = jwtDecode(token);
      return user.role;
    }
  }, [document.cookie]);

  return { role };
}
