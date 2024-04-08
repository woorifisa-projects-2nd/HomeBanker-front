import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { OpenVidu } from 'openvidu-browser';
import {
  Text,
  Button,
  Stack
} from '@chakra-ui/react'
import UserVideoComponent from '../../components/UserVideoComponent';
import { api } from '../../api/api';

const DEFAULT_SESSION_ID = 'SessionA'

export default function Counsel() {
  const OV = useRef(new OpenVidu());

  const [mySessionId, setMySessionId] = useState(DEFAULT_SESSION_ID)
  const [myUserName, setMyUserName] = useState(`Participant${Math.floor(Math.random() * 100)}`)
  const [session, setSession] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);

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
  }, []);

  /**
   * 세션 나가기
   */
  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }

    // Reset all states and OpenVidu object
    OV.current = new OpenVidu();
    setSession(undefined);
    setSubscribers([]);
    setMySessionId(DEFAULT_SESSION_ID);
    setMyUserName('Participant' + Math.floor(Math.random() * 100));
    setPublisher(undefined);
  }, [session]);

  /**
   * 세션 생성
   */
  const createSession = async (sessionId) => {
    const response = await api.post('api/sessions', { customSessionId: sessionId }, {
      headers: { 'Content-Type': 'application/json', },
    });
    return response.data; // The sessionId
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
    return createSession(mySessionId).then(sessionId =>
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
            resolution: '640x480',
            frameRate: 30,
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

  return (
    <Stack>
      {session !== undefined ?
        <>
          <Button onClick={leaveSession} >나가기</Button>

          {publisher !== undefined ?
            (<Stack >
              <UserVideoComponent streamManager={publisher} /></Stack>) : null}
          <>
            {subscribers.map((sub, i) => (
              <Fragment key={sub.id}>
                <Text>{sub.id}</Text>
                <UserVideoComponent streamManager={sub} />
              </Fragment>
            ))}
          </>
        </> :

        <Stack alignItems="center">
          <Text>웃는 얼굴로 고객을 맞아주세요</Text>
          <Button size="lg" onClick={joinSession}>화상 상담 시작</Button>
        </Stack>
      }
    </Stack>
  )
}
