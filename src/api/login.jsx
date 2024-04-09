import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const Login = async (LoginForm) => {
  try {
    const response = await axios.post('http://localhost:8080/login', LoginForm, {
      withCredentials: true,
    });
    const jwtToken = response.data;
    document.cookie = `accessJwtToken=${jwtToken}; path=/`; // 쿠키에 토큰 저장
    // const decodedUserInfo = jwt_decode(jwtToken); // 토큰 decode
    // localStorage.setItem('userInfo', JSON.stringify(decodedUserInfo)); //토큰에 저장되어있는 userInfo 저장
    return response;
  } catch (error) {
    alert('로그인이 실패했습니다. 정보가 올바른지 다시 확인해주세요');
    console.error('로그인 실패:', error);
  }
};

export default Login;
