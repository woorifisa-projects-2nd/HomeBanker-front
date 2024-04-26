import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";

export default function OpenViduVideoComponent({
  streamManager,
  size,
  role,
  displayMargin = true,
}) {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <>
      {role === "other" ? (
        <video
          autoPlay={true}
          ref={videoRef}
          width={size ?? "100%"}
          style={{ position: "absolute" }}
        />
      ) : (
        <Box
          zIndex={999}
          margin={displayMargin ? "20px 0px 0px 20px" : 0}
          // mt="20px"
          // ml="20px"
          maxW={size ?? "350px"}
          position="relative"
          borderRadius={80}
        >
          <Box
            borderRadius="15px"
            width={"110%"}
            height={"110%"}
            bgColor={"white"}
            zIndex="1000"
          />
          <video
            autoPlay={true}
            ref={videoRef}
            width={"100%"}
            style={{
              borderRadius: "15px",
              zIndex: "999",
              border: "5px solid white",
            }}
          />
        </Box>
      )}
    </>
  );
}
