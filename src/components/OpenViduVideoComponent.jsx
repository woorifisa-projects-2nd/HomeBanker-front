import React, { useEffect, useRef } from 'react'

export default function OpenViduVideoComponent({ streamManager, role }) {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <>
      {role === 'other' ?
      <video autoPlay={true} ref={videoRef} width="1000px" style={{position:'absolute'}}/>
      : <video autoPlay={true} ref={videoRef} width="300px" style={{position:'absolute', zIndex:"999"}}/>
      }
    </>
  )
}
