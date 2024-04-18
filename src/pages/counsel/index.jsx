import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { OpenVidu } from 'openvidu-browser';
import {
  Text,
  Button,
  Stack,
  Box,
  Flex
} from '@chakra-ui/react'
import UserVideoComponent from '../../components/UserVideoComponent';
import { api } from '../../api/api';
import ChatComponent from '../../components/Chat';
import useSpeechToText from '../../hook/useSpeechToText';
import Header from '../../components/Header';
import './counsel.css';
import { useNavigate } from "react-router-dom";
import { event } from 'jquery';
import { IoMdMic, IoMdMicOff} from "react-icons/io";
import { IoVideocamOff, IoVideocam } from "react-icons/io5"
import Exit from '../../components/counsel/Exit';

const SESSION_ID_LIST = ['Session1', 'Session2', 'Session3', 'Session4', 'Session5', 'Session6', 'Session7', 'Session8', 'Session9', 'Session10']

export default function Counsel() {
  const OV = useRef(new OpenVidu());
  const { transcript, listening, toggleListening } = useSpeechToText();

  const [mySessionId, setMySessionId] = useState(SESSION_ID_LIST[0]);
  const [myUserName, setMyUserName] = useState(`Participant${Math.floor(Math.random() * 100)}`)
  const [session, setSession] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const navigate = useNavigate();
  const [videoStatus, setVideoStatus] = useState(true);
  const [audioStatus, setAudioStatus] = useState(true);
  const [exit, setExit] = useState(false);
  const [time, setTime] = useState(5);

  useEffect(() => {
    if (exit) {
    const countdown = setInterval(() => {
      setTime((time) => {
        const nextTime = time -1;
        console.log(nextTime);
        if (nextTime === 0) clearInterval(countdown);
        return nextTime;
      });
    }, 1000);
    
    return () => clearInterval(countdown);
  }
  }, [exit]); 
  


  if (publisher !== undefined) {
    session.on('signal:destroy', (event) => {
      setTimeout(()=> {
      session.unpublish(publisher);
      if (session) {
        session.disconnect();
      }
      navigate('/')
    },5000);
   })}

   if (publisher !== undefined) {
    session.on('signal:exit', (event) => {
      console.log("received")
      setExit(true);
      destroySession();
   })}
  

  const destroySession = () => {
    api.post(`api/sessions/${mySessionId}/destroy`, {}, {
      headers: { 'Content-Type': 'application/json' },
    }); 

    const signalOptions = {
      type: 'destroy', 
      data : JSON.stringify("destroy"),
    };

    session.signal(signalOptions)
      .then(() => {
        console.log('Signal sent');
      })
      .catch(error => {
        console.error(error);
      })
  }

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

    mySession.on('streamCreated', (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((subscribers) => [...subscribers, subscriber]);
    });
    mySession.on('streamDestroyed', (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    setSession(mySession);
  }, [mySessionId]);

  /**
   * 세션 나가기
   */
  const leaveSession = useCallback(() => {
    const signalOptions = {
      type: 'exit', 
      data : JSON.stringify("exit"),
    };

    session.signal(signalOptions)
      .then(() => {
        console.log('Signal sent');
      })
      .catch(error => {
        console.error(error);
      })
    
  }, [session]);

  /**
   * 세션 생성
   */
  const createSession = async () => {
    let response;
    for (let i = 0; i < SESSION_ID_LIST.length; i++) {
      response = await api.post('api/sessions', { customSessionId: SESSION_ID_LIST[i] }, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.data !== 'full') {
        setMySessionId(SESSION_ID_LIST[i]);
        break;
      }
    }
    return response.data;
  };

  /**
   * 토큰 생성
   */
  const createToken = async (sessionId) => {
    const response = await api.post('api/sessions/' + sessionId + '/connections', {}, {
      headers: { 'Content-Type': 'application/json', },
    });
    return response.data; // The token
  };

  const getToken = useCallback(async () => {
    return createSession().then(sessionId =>
      createToken(sessionId),
    );
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
            resolution: '1920x1080',
            frameRate: 60,
            insertMode: 'APPEND',
          });

          session.publish(publisher);

          setPublisher(publisher);
        } catch (error) {
          console.log('There was an error connecting to the session:', error.code, error.message);
        }
      });
    }
  }, [session, myUserName])

  useEffect(() => {
    const handleBeforeUnload = () => {
      leaveSession();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [leaveSession])

  const camStatusChanged = () => {
    publisher.publishVideo(!publisher.stream.videoActive);
    setVideoStatus(publisher.stream.videoActive);
  }

const micStatusChanged = () => {
  publisher.publishAudio(!publisher.stream.audioActive);
  setAudioStatus(publisher.stream.audioActive);
  }

  return (
    <>
      {session !== undefined  && publisher !== undefined?
        <>
          <Header/>
          <Box width="100%" height="100%">
            {/* <div id="leaveCounsel" style={{position:'absolute', right:'400px', zIndex:'5'}}> */}
            <Flex>
              {videoStatus === true ?
                <Button onClick={camStatusChanged}>
                  카메라 끄기 
                <IoVideocamOff/>
                </Button> :
                <Button onClick={camStatusChanged}>
                  카메라 켜기 
                <IoVideocam/>
                </Button> } 

                {audioStatus === true ?
                <Button onClick={micStatusChanged}>
                  마이크 끄기 <IoMdMicOff/>
                </Button>  :
                <Button onClick={micStatusChanged}>
                마이크 켜기 <IoMdMic/>
              </Button>  }

                <Button onClick={leaveSession} >나가기</Button>
            </Flex>
            <Flex justify='center'>
              <div>
                <Box 
                  id="videos" 
                  style={{width:'1000px', height:'562.5px'}}>
                  {publisher !== undefined ?
                    (<UserVideoComponent streamManager={publisher} role='me'/>) : null}
                      {subscribers.length === 0 ? <div style={{backgroundColor:'grey', width:'1000px', height:'562.5px'}}></div> :
                        subscribers.map((sub, i) => ( 
                          <Fragment key={sub.id}>
                            <UserVideoComponent streamManager={sub} role='other'/>
                          </Fragment>
                    ))}
                </Box>
                <div id="subtitle" >
                  <h1>음성인식 자막</h1>
                  <textarea className="transcript" value={transcript} onChange={() => {}} />
                  <button onClick={toggleListening}> {listening ? '음성인식 중지' : '음성인식 시작'} </button>
                </div>
              </div>
              {publisher !== undefined ? <ChatComponent user={publisher} /> : null}
            </Flex>
          </Box>
          {exit===true? <Exit time={time}/> : null}
        </> :

        <Stack alignItems="center">
          <Text>웃는 얼굴로 고객을 맞아주세요</Text>
          <Button size="lg" onClick={joinSession}>화상 상담 시작</Button>
        </Stack>
      }
    </>
  )
}
