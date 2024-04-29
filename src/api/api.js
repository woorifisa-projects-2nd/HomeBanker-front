import Axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const api = Axios.create({
  //baseURL: `http://localhost:8080`,
  baseURL: `https://homebanker-b.shop:443`,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "https://homebanker-f.shop:5173",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = cookies.get("token");
    console.log("api에서 가져온 token", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
