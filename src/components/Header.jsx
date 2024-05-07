import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Flex, Spacer, Button, ButtonGroup, Box } from "@chakra-ui/react";
import logo from "../assets/icon/logo.svg";
import { MdLogout, MdLogin } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";
import { useAuth } from "../api/counsel/api.js";
import useLogout from "../hook/useLogout";

export default function Header() {
  const navigate = useNavigate();
  const { data: user, isError } = useAuth();
  const handleLogout = useLogout();

  const goMainPage = () => {
    navigate("/");
  };

  const goLoginPage = () => {
    navigate("/login");
  };

  const goMyPage = () => {
    if (user && user.role === "ROLE_CUSTOMER") {
      navigate("/myPage");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "5em",
        paddingLeft: "3em",
        paddingRight: "3em",
        borderBottom: "3px solid",
        borderBottomColor: "#E9E9E9",
      }}
    >
      <Flex alignItems="center" style={{ height: "100%" }}>
        <Box
          _hover={{
            transform: "scale(1.1)",
            transition: "transform .15s ease-in",
          }}
        >
          <img src={logo} onClick={goMainPage} alt="우리집은행"></img>
        </Box>
        {/* <img src={logo} onClick={goMainPage}></img> */}
        <Spacer />
        <Flex>
          <ButtonGroup
            gap="2"
            size="lg"
            variant="ghost"
            style={{ fontFamily: "WooridaumR" }}
          >
            {user ? (
              <Button leftIcon={<MdLogout />} onClick={handleLogout}>
                {" "}
                로그아웃 <span class="blind">로그아웃</span>
              </Button>
            ) : (
              <Button leftIcon={<MdLogin />} onClick={goLoginPage}>
                {" "}
                로그인<span class="blind">로그인</span>
              </Button>
            )}
            {user ? (
              user.role === "ROLE_CUSTOMER" ? (
                <Button leftIcon={<FaHouseUser />} onClick={goMyPage}>
                  {" "}
                  내 정보<span class="blind">내 정보</span>
                </Button>
              ) : null
            ) : null}
          </ButtonGroup>
        </Flex>
      </Flex>
    </div>
  );
}
