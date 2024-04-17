import React from 'react' 

const ChatMessage = ({message, sender}) => {
    console.log(`message bubble by ${sender}`);
  return (
    <>
    {sender === "me" ?
    <div style={{alignSelf:'end', width:'fit-content' ,display:'inline-block', overflowWrap: 'anywhere',borderTopLeftRadius:'30px', borderTopRightRadius:'30px', borderBottomLeftRadius:'30px' ,backgroundColor:'lightgrey', padding:'15px'}}>{message}</div> :
    <div style={{width:'fit-content' ,display:'inline-block',overflowWrap: 'anywhere',borderTopLeftRadius:'30px', borderTopRightRadius:'30px', borderBottomRightRadius:'30px' ,backgroundColor:'#62B8FF', padding:'15px'}}>{message}</div>    
    }
    </>
  )
}

export default ChatMessage