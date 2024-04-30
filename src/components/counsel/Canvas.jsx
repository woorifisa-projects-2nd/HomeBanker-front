import SignatureCanvas from "react-signature-canvas";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, ButtonGroup } from "@chakra-ui/react";

const Canvas = () => {
  const [width, setWidth] = useState(518);
  const [height, setHeight] = useState(250);
  const [backgroundImg, setBackgroundImg] = useState("");
  const [imgs, setImgs] = useState([]);

  const signCanvas = useRef();

  const save1 = () => {
    const image = signCanvas.current.toDataURL("image/png");
    const decodedURL = image.replace(/^data:image\/\w+;base64,/, "");
    const buf = Buffer.from(decodedURL, "base64");
    const blob = new Blob([buf], { type: "image/png" });
    return new File([blob], `test.png`, { type: "image/png" });
  };

  const save = () => {
    const image = signCanvas.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "sign_image.png";
    link.click();
  };

  const clearSignature = () => {
    signCanvas.current.clear();
  };

  useEffect(() => {
    // 2초마다 배경 이미지 변경
    const imgInterval = setInterval(() => {
      if (imgs.length && backgroundImg) {
        let newImg = "";
        for (let i = 0; i < imgs.length; i++) {
          if (imgs[i] !== backgroundImg) {
            newImg = imgs[i];
            break;
          }
        }
        setBackgroundImg(newImg);
      }
    }, 1000);

    return () => {
      clearInterval(imgInterval);
    };
  }, [imgs, backgroundImg]);

  return (
    <div>
      <Box borderWidth="5px">
        <SignatureCanvas
          ref={signCanvas}
          canvasProps={{
            className: "signature-canvas",
            width: width,
            height: height,
          }}
          backgroundColor={"#FAFAFA"}
          clearOnResize={false}
        />
      </Box>

      <button
        type="button"
        style={{ backgroundColor: "#0A71F1", color: "white" }}
        onClick={save}
      >
        서명 저장
      </button>

      <ButtonGroup variant="outline" spacing="6">
        <Button colorScheme="blue" variant="outline" size="md" onClick={save}>
          저장
        </Button>
        <Button colorScheme="blue" size="md" onClick={clearSignature}>
          초기화
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Canvas;
