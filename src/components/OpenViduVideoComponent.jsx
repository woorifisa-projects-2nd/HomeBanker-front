import React, { useEffect, useRef } from 'react'

export default function OpenViduVideoComponent({ streamManager, size }) {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <video autoPlay={true} ref={videoRef} width={size ?? "1000"} />
  )
}
