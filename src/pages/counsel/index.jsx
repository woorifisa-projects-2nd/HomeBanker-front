import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext,
} from "react";
import { OpenVidu } from "openvidu-browser";
import {
  Text,
  Button,
  Stack,
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
} from "@chakra-ui/react";
import UserVideoComponent from "../../components/UserVideoComponent";
import { api } from "../../api/api";
import ChatComponent from "../../components/Chat";
import logoLogin from "../../assets/icon/logoLogin.svg";
import Header from "../../components/Header";
import "./counsel.css";
import { useNavigate } from "react-router-dom";
import CounselToolbar from "../../components/CounselToolbar";
import { IoMdMic, IoMdMicOff } from "react-icons/io";
import { IoVideocamOff, IoVideocam, IoLogOutOutline } from "react-icons/io5";

import { jwtDecode } from "jwt-decode";
import Exit from "../../components/counsel/Exit";
import Notice from "../../components/counsel/Notice";
import TransferTab from "../../components/board/admin/TransferTab";
import { ModalContext } from "../../components/counsel/modal/ModalProvider";
import WaitImage from "../../assets/image/background.svg";
import useCheckRole from "../../hook/useCheckRole";

import useCheckId from "../../hook/useCheckId";
import { createBrowserHistory } from "history";
import { formatDate } from "../../util/counsel";

const SESSION_ID_LIST = [
  "Session1",
  "Session2",
  "Session3",
  "Session4",
  "Session5",
  "Session6",
  "Session7",
  "Session8",
  "Session9",
  "Session10",
  "Session11",
  "Session12",
  "Session13",
  "Session14",
  "Session15",
  "Session16",
  "Session17",
  "Session18",
  "Session19",
  "Session20",
];

export default function Counsel() {
  const OV = useRef(new OpenVidu());

  const [mySessionId, setMySessionId] = useState(SESSION_ID_LIST[0]);
  const [myUserName, setMyUserName] = useState(
    `Participant${Math.floor(Math.random() * 100)}`,
  );
  const [session, setSession] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);

  const navigate = useNavigate();
  const [videoStatus, setVideoStatus] = useState(true);
  const [audioStatus, setAudioStatus] = useState(true);
  const [exit, setExit] = useState(false);
  const [time, setTime] = useState(5);
  const history = createBrowserHistory();

  const tabRef = useRef();

  // 상품가입정보
  const [productName, setProductName] = useState();
  const [productId, setProductId] = useState();
  const [amount, setAmount] = useState();
  const [period, setPeriod] = useState();
  const [productDescription, setProductDescription] = useState();

  const {
    state,
    actions,
    setMode,
    id,
    idAction,
    cId,
    CIdAction,
    counseltype,
    setCounseltype,
  } = useContext(ModalContext);
  const { isModalDisplayed } = state;
  const { setIsModalDisplayed } = actions;
  const { setModalMODE } = setMode;
  const { bankerId } = id;
  const { setBankerId } = idAction;
  const { setCustomerId } = CIdAction;
  const { customerId } = cId;
  const { counselType } = counseltype;
  const { setCounselType } = setCounseltype;

  const { role } = useCheckRole();
  const { loginId } = useCheckId();

  const [subtileText, setSubtileText] = useState("");



  useEffect(() => {
    if (exit) {
      setIsModalDisplayed(false); //
      const countdown = setInterval(() => {
        setTime((time) => {
          const nextTime = time - 1;
          if (nextTime === 0) clearInterval(countdown);
          return nextTime;
        });
      }, 1000);
      return () => {
        registerCounsel();

        clearInterval(countdown);
      };
    }
  }, [exit]);

  const getUserRole = () => {
    const token = document.cookie.split("=")[1];

    if (token) {
      const user = jwtDecode(token);

      return user.role;
    }
  };

  if (publisher !== undefined) {
    session.on("signal:destroy", (event) => {
      // setIsModalDisplayed(false);

      setTimeout(() => {
        session.unpublish(publisher);
        if (session) {
          session.disconnect();
        }
        navigate("/");
      }, 5000);
    });
  }

  if (publisher !== undefined) {
    session.on("signal:exit", (event) => {
      setExit(true);
      destroySession();
    });
  }

  // 상담기록 저장하는 api 연동
  const registerCounsel = () => {
    api
      .post(`/api/counsel/register`, {
        customerId: customerId,
        bankerId: bankerId,
        startedAt: localStorage.getItem("startedAt"),
        endedAt: formatDate(new Date()),
        content: subtileText,
        counselType: counselType,
      })
      .then(() => {
        console.log("성공");
      })
      .catch((e) => console.log("실패", e));
  };

  const destroySession = () => {
    api.post(
      `api/sessions/${mySessionId}/destroy`,
      {},
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    const signalOptions = {
      type: "destroy",
      data: JSON.stringify("destroy"),
    };

    session
      .signal(signalOptions)
      .then(() => {
        console.log("Signal sent");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteSubscriber = useCallback((streamManager) => {
    setSubscribers((prevSubscribers) => {
      const index = prevSubscribers.indexOf(streamManager);
      if (index > -1) {
        const newSubscribers = [...prevSubscribers];
        newSubscribers.splice(index, 1);
        return newSubscribers;
      } else {
        return prevSubscribers;
      }
    });
  }, []);

  /**
   * 세션 등록
   */
  const joinSession = useCallback(() => {
    const mySession = OV.current.initSession();

    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((subscribers) => [...subscribers, subscriber]);
    });
    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    setSession(mySession);
    localStorage.setItem("startedAt", formatDate(new Date()));
  }, [mySessionId]);

  /**
   * 세션 나가기
   */
  const leaveSession = useCallback(() => {
    const signalOptions = {
      type: "exit",
      data: JSON.stringify("exit"),
    };

    session
      .signal(signalOptions)
      .then(() => {
        console.log("Signal sent");
        // setIsModalDisplayed(false);
      })
      .catch((error) => {
        console.error(error);
        // setIsModalDisplayed(false);
      });
  }, [session]);

  /**
   * 세션 생성
   */
  const createSession = async () => {
    let response;
    let i;
    const role = getUserRole();
    for (i = 0; i < SESSION_ID_LIST.length; i++) {
      response = await api.post(
        "api/sessions",
        { customSessionId: SESSION_ID_LIST[i], role: role },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      if (response.data !== "full") {
        setMySessionId(SESSION_ID_LIST[i]);
        break;
      }
    }
    if (i === SESSION_ID_LIST.length) {
      alert("모든 상담사가 상담중입니다. 잠시 기다려주세요");
    }

    return response.data;
  };

  /**
   * 토큰 생성
   */
  const createToken = async (sessionId) => {
    const response = await api.post(
      "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    return response.data; // The token
  };

  const getToken = useCallback(async () => {
    return createSession().then((sessionId) => createToken(sessionId));
  }, [mySessionId]);

  useEffect(() => {
    if (session) {
      // Get a token from the OpenVidu deployment
      getToken().then(async (token) => {
        try {
          await session.connect(token, { clientData: myUserName });

          let publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: "1920x1080",
            frameRate: 60,
            insertMode: "APPEND",
            mirror: false,
          });

          session.publish(publisher);

          setPublisher(publisher);
        } catch (error) {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message,
          );
        }
      });
    }
  }, [session, myUserName]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      leaveSession();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveSession]);

  const camStatusChanged = () => {
    publisher.publishVideo(!publisher.stream.videoActive);
    setVideoStatus(publisher.stream.videoActive);
  };

  const micStatusChanged = () => {
    publisher.publishAudio(!publisher.stream.audioActive);
    setAudioStatus(publisher.stream.audioActive);
  };

  // 상품 가입 정보 수신
  if (publisher !== undefined) {
    setCustomerId(loginId);
    session.on("signal:enrollment", (e) => {
      console.log(isModalDisplayed);

      const receivedData = JSON.parse(e.data);
      console.log(receivedData.product);
      console.log("상품 이름 :", receivedData.product.productName);
      console.log("상품 코드 :", receivedData.product.productId);
      console.log("상품 설명 :", receivedData.product.productDescription);
      console.log("상품 금액 :", receivedData.amount);
      console.log("가입 기간 :", receivedData.period);
      console.log("은행원 ID :", receivedData.bankerId);
      setProductName(receivedData.product.productName);
      setProductId(receivedData.product.productId);
      setProductDescription(receivedData.product.productDescription);
      setAmount(receivedData.amount);
      setPeriod(receivedData.period);
      setBankerId(receivedData.bankerId);
      setIsModalDisplayed(true);
      console.log(isModalDisplayed);
      console.log("은행원-ID :", bankerId);
    });
  }

  // 모달 다음페이지 자동 전환 수신
  if (publisher !== undefined) {
    session.on("signal:register", (e) => {
      const receivedData = JSON.parse(e.data);
      if (role === "ROLE_ADMIN" && receivedData.nextModal === "F") {
        // toast({
        //   position: "top",
        //   title: "상품 가입이 완료되었습니다",
        //   status: "success",
        //   duration: 1000,
        //   isClosable: true,
        // });
        setIsModalDisplayed(false);
        setModalMODE(receivedData.nextModal);
      } else if (role == "ROLE_ADMIN") setModalMODE(receivedData.nextModal);
      console.log(receivedData.nextModal);
    });
  }


  return (
    <>
      {session !== undefined && publisher !== undefined ? (
        <Grid height="100vh" width="100vw" templateColumns="repeat(12, 1fr)">
          <GridItem colSpan={9} position="relative">
            <Stack
              bgColor={"black"}
              zIndex="99"
              position="absolute"
              right="0"
              space={0}
            >
              <Flex
                width={10}
                height={10}
                justifyContent={"center"}
                alignItems={"center"}
                cursor="pointer"
                onClick={videoStatus ? camStatusChanged : camStatusChanged}
              >
                {videoStatus ? (
                  <IoVideocam fontSize="34px" color="#C8DFFA" />
                ) : (
                  <IoVideocamOff fontSize="34px" color="white" />
                )}
              </Flex>

              <Flex
                width={10}
                height={10}
                justifyContent={"center"}
                alignItems={"center"}
                cursor="pointer"
                onClick={audioStatus ? micStatusChanged : micStatusChanged}
              >
                {audioStatus ? (
                  <IoMdMic fontSize="37px" color="#C8DFFA" />
                ) : (
                  <IoMdMicOff fontSize="37px" color="white" />
                )}
              </Flex>

              <Flex
                width={10}
                height={10}
                justify={"center"}
                align={"center"}
                cursor="pointer"
                onClick={leaveSession}
              >
                <IoLogOutOutline fontSize="37px" color="#C8DFFA" />
              </Flex>
            </Stack>

            <Box width="100%" position="absolute" top={0}>
              {publisher !== undefined ? (
                <UserVideoComponent streamManager={publisher} role="me" />
              ) : null}
            </Box>

            {subscribers.length === 0 ? (
              <>
                <Image
                  position="absolute"
                  bottom={0}
                  left={0}
                  objectFit="cover"
                  src={WaitImage}
                  width="100%"
                  maxHeight="100vh"
                />
                <Box width="100%" height="100%" bgColor={"#C8DFFA"} />
              </>
            ) : (
              subscribers.map((sub, i) => (
                <Box key={i}>
                  <UserVideoComponent streamManager={sub} role="other" />
                </Box>
              ))
            )}

            <CounselToolbar
              subtileText={subtileText}
              setSubtileText={setSubtileText}
              publisher={publisher}
              subscriber={subscribers[0]}
            />
          </GridItem>

          <GridItem colSpan={3}>
            {/* 여기 안에서 탭 관리 */}
            <Tabs ref={tabRef} position={"relative"} height="100vh">
              <TabList>
                <Tab>채팅</Tab>
                {getUserRole() === "ROLE_ADMIN" ? <Tab>상품</Tab> : null}
              </TabList>

              <TabPanels>
                <TabPanel padding={0} pt={"10px"} pl={"10px"} pr={"10px"}>
                  {publisher !== undefined ? (
                    <ChatComponent user={publisher} />
                  ) : null}
                </TabPanel>

                <TabPanel padding={0}>
                  <TransferTab
                    session={session}
                    user={publisher}
                    productName={productName}
                    productId={productId}
                    productDescription={productDescription}
                    amount={amount}
                    period={period}
                    bankerId={bankerId}

                  // isModalDisplayed={isModalDisplayed}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
          {exit === true ? <Exit time={time} /> : null}
        </Grid>
      ) : getUserRole() === "ROLE_ADMIN" ? (
        <>
          <Header />
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <Flex
              style={{ fontFamily: "WooriDaum", fontSize: "30px" }}
              align="center"
              direction="column"
            >
              <img src={logoLogin} alt="NoImage" style={{ margin: "20px" }} />
              <Text>웃는 얼굴로 고객을 맞아주세요</Text>
              <div style={{ height: "50px" }}></div>
              <Button
                size="lg"
                onClick={joinSession}
                style={{
                  width: "300px",
                  height: "80px",
                  fontSize: "25px",
                  fontFamily: "WooriDaumR",
                }}
              >
                화상 상담 시작
              </Button>
            </Flex>
          </div>
        </>
      ) : (
        <>
          <Header />
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <Notice joinSession={joinSession}></Notice>
          </div>
        </>
      )}
    </>
  );
}
