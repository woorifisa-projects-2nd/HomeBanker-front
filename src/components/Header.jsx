import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import {Flex, Spacer, Button, ButtonGroup} from '@chakra-ui/react'
import logo from '../assets/icon/logo.svg'
import { MdLogout, MdLogin } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";

export default function Header({isLoggedIn}) {
  const navigate = useNavigate();

  const goMainPage= () => {
    navigate('/');
  }

  const goLoginPage = () => {
    navigate('/login')
  }

  const goMyPage = () => {
    navigate('/myPage')
  }

  return (

    <div style={{width:"100vw", height:"5em", paddingLeft:'3em', paddingRight:'3em', borderBottom:'3px solid', borderBottomColor:'#E9E9E9'}}>
      <Flex alignItems='center' style={{height:'100%'}}>
        <img src={logo} onClick={goMainPage}></img>
        <Spacer/>
        <Flex>
          <ButtonGroup gap='2' variant='ghost' style={{fontFamily:'WooridaumR'}}>
            {isLoggedIn ?<Button leftIcon={<MdLogout/>}> 로그아웃</Button> :
            <Button leftIcon={<MdLogin/>} onClick={goLoginPage}> 로그인</Button> }
          <Button leftIcon={<FaHouseUser/>} onClick={goMyPage}> 내 정보</Button>
          </ButtonGroup>
        </Flex>
      </Flex>
  </div>
  )
}
