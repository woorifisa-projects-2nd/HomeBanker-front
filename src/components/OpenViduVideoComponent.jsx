import React, { useEffect, useRef } from 'react'

export default function OpenViduVideoComponent({ streamManager, size, role }) {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <>
      {role === 'other' ?
        <video autoPlay={true} ref={videoRef} width={size ?? "1000"} style={{ position: 'absolute' }} />
        : <video autoPlay={true} ref={videoRef} width={300} style={{ position: 'absolute', zIndex: "999" }} />
      }
    </>
  )
}
