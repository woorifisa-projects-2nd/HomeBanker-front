// import React from 'react';
// import axios from 'axios';
// import jwt_decode from 'jwt-decode';

// export const api = axios.create({
//     baseURL: `http://localhost:8080`,
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })

// const Login = async (LoginForm) => {
//   try {
//     const response = await api.post('/login', LoginForm);
//     const jwtToken = response.data;
//     document.cookie = `accessJwtToken=${jwtToken}; path=/`; // 쿠키에 토큰 저장
//     // const decodedUserInfo = jwt_decode(jwtToken); // 토큰 decode
//     // localStorage.setItem('userInfo', JSON.stringify(decodedUserInfo)); //토큰에 저장되어있는 userInfo 저장
//     return response;
//   } catch (error) {
//     alert('로그인이 실패했습니다. 정보가 올바른지 다시 확인해주세요');
//     console.error('로그인 실패:', error);
//   }
// };

// export default Login;
