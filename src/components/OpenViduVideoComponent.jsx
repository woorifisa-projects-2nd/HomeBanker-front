import React, { useEffect, useRef } from "react";
import { Box, AspectRatio } from "@chakra-ui/react";

export default function OpenViduVideoComponent({ streamManager, size, role }) {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <>
      {role === "other" ? (
        <AspectRatio>
          <video
            autoPlay={true}
            ref={videoRef}
            width={size ?? "100%"}
            height={"100%"}
            style={{ position: "absolute" }}
          />
        </AspectRatio>
      ) : (
        <AspectRatio
          mt="20px"
          ml="20px"
          maxW="350px"
          ratio={353 / 222}
          position="relative"
          borderRadius={20}
        >
          <>
            <video
              autoPlay={true}
              ref={videoRef}
              width={"100%"}
              style={{
                borderRadius: "15px",
                zIndex: "999",
                padding: "5px",
              }}
            />
            <Box
              borderRadius="15px"
              width={"110%"}
              height={"110%"}
              bgColor={"white"}
              zIndex="998"
            />
          </>
        </AspectRatio>
      )}
    </>
  );
}
