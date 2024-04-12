import Axios from 'axios';

export const api = Axios.create({
  //baseURL: `http://localhost:8080`,
  baseURL: `http://homebank-b.shop:443`,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
