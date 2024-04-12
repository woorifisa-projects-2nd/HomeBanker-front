import React, { Component, useEffect } from 'react';
import {useState } from 'react'
import './Chat.css';

export default function ChatComponent ({user}) {
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState();
    const nickname = JSON.parse(user.stream.connection.data).clientData;
    
    const chatScroll = React.createRef();
    
    user.stream.session.on('signal:chat', (event) => {
    const data = JSON.parse(event.data);
    const newMessage = { streamId: data.streamId, nickname: data.nickname, message: data.message };
    // const document = window.document;
    // setTimeout(() => {
    //     const userImg = document.getElementById('userImg-' + (messageList.length - 1));
    //     const video = document.getElementById('video-' + data.streamId);
    //     const avatar = userImg.getContext('2d');
    //     avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
    // }, 50);
    //scrollToBottom();
    if(data.nickname !== nickname)
        setMessageList([...messageList, newMessage]);
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
            }
        }
        setMessageList([...messageList, {message:message, nickname: nickname, streamId :user.stream.streamId}]);
    }


    const scrollToBottom= ()=> {
        setTimeout(() => {
            try {
                this.chatScroll.current.scrollTop = this.chatScroll.current.scrollHeight;
            } catch (err) {}
        }, 20);
    }

        return (
            <div id="chatContainer" style={{height:'auto'}}>
                <span>채팅창</span>
                <div id="chatComponent" >
                    
                    
                    {/* <div className="message-wrap" ref={this.chatScroll}>
                
                        {messageList.map((data, i) => (
                            <div
                                key={i}
                                id="remoteUsers"
                                className={
                                    'message' + (data.connectionId !== user.getConnectionId() ? ' left' : ' right')
                                }
                            >
                                <canvas id={'userImg-' + i} width="60" height="60" className="user-img" />
                                <div className="msg-detail">
                                    <div className="msg-info">
                                        <p> {data.nickname}</p>
                                    </div>
                                    <div className="msg-content">
                                        <span className="triangle" />
                                        <p className="text">{data.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> */}

                    <div>
                    {Array.from(messageList).map((m, index) => (
                        <div key={index}>{m.nickname} : {m.message}</div>
                    ))}
                    </div>


                    <div id="messageInput">
                        메세지를 입력하세요
                        <input
                            placeholder="Send a messge"
                            id="chatInput"
                            value={message}
                            onChange={handleChange}
                            onKeyPress={handlePressKey}
                        />
                        <h2 title="Send message">
                            <button id="sendButton" onClick={sendMessage}>
                                보내기
                            </button>
                        </h2>
                    </div>
                </div>
            </div>
        );
}
