import React, { useRef, useEffect } from 'react';
import {useState } from 'react'
import './Chat.css';
import {Flex, Button, Stack, Spacer} from '@chakra-ui/react'

export default function ChatComponent ({user}) {
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState();
    const nickname = JSON.parse(user.stream.connection.data).clientData;

    const chatScroll = useRef();
    const inputRef = useRef();
    
    user.stream.session.on('signal:chat', (event) => {
    const data = JSON.parse(event.data);
    
    if(data.message !=='' && data.message!==' ' && data.message!==null) {
        const newMessage = { streamId: data.streamId, nickname: data.nickname, message: data.message };

        if(data.nickname !== nickname)
            setMessageList([...messageList, newMessage]);
        }
    });

    const handleChange = (event) => {
        setMessage(event.target.value);
    }


    const handlePressKey = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    const sendMessage= ()=> {
        if (user && message) {
            if (message !== '' && message !== ' ') {
                const data = { message: message, nickname: nickname, streamId: user.stream.streamId };
                user.stream.session.signal({
                    data: JSON.stringify(data),
                    type: 'chat',
                });
                setMessageList([...messageList, {message:message, nickname: nickname, streamId :user.stream.streamId}]);
                setMessage('');
            }
        }
    }


    const scrollToBottom= ()=> {
        chatScroll.current?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect (() => {
        scrollToBottom();;
    },[messageList]);

        return (
            <div id="chatContainer" style={{height:'auto', width: '-webkit-fill-available'}}>
                <div id="chatComponent" style={{margin:"30px", backgroundColor:"skyblue", padding:"20px"}}>
                    <div style={{width:"auto", height:"500px", overflowY:"auto" , paddingBottom:"30px"}}>
                    
                    {Array.from(messageList).map((m, index) => (
                        <div  ref={chatScroll} key={index}>{m.nickname} : {m.message}</div>
                    ))}
                    
                    </div>
                    <Flex >
                        <input
                            ref={inputRef}
                            placeholder="Send a messge"
                            id="chatInput"
                            value={message}
                            onChange={handleChange}
                            onKeyPress={handlePressKey}
                        />
                        <Spacer />
                        <h2 title="Send message">
                            <Button id="sendButton" onClick={sendMessage}>
                                보내기
                            </Button>
                        </h2>
                    </Flex>
                </div>
            </div>
        );
}
