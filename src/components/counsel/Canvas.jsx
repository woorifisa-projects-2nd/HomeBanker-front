import SignatureCanvas from "react-signature-canvas";
import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { Button, ButtonGroup, Box } from "@chakra-ui/react";
import { ModalContext } from "./modal/ModalProvider";
import { Buffer } from "buffer";

const Canvas = () => {
  const [width, setWidth] = useState(518);
  const [height, setHeight] = useState(250);

  const { signAction, signImg, signImgAction } = useContext(ModalContext);
  const { setIsSigned } = signAction;
  const { sign } = signImg;
  const { setSign } = signImgAction;

  const signCanvas = useRef();

  const save1 = () => {
    const image = signCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    setSign(image);
    // const decodedURL = image.replace(/^data:image\/\w+;base64,/, "");
    // const buf = Buffer.from(decodedURL, "base64");
    // const blob = new Blob([buf], { type: "image/png" });
    // return new File([blob], `test.png`, { type: "image/png" });
    // console.log(new File([blob], `test.png`, { type: "image/png" }));
    console.log(sign);
  };

  // const save = () => {
  //   const image = signCanvas.current.getTrimmedCanvas().toDataURL("image/png");
  //   const link = document.createElement("a");
  //   link.href = image;
  //   link.download = "sign_image.png";
  //   link.click();
  // };

  const clearSignature = () => {
    signCanvas.current.clear();
    setIsSigned(false);
  };

  return (
    <div>
      <Box borderWidth="5px">
        <SignatureCanvas
          ref={signCanvas}
          onBegin={() => {
            setIsSigned(true);
          }}
          onEnd={() => {
            save1();
          }}
          canvasProps={{
            className: "signature-canvas",
            width: width,
            height: height,
          }}
          backgroundColor={"#FAFAFA"}
          clearOnResize={false}
        />
      </Box>

      <ButtonGroup variant="outline" spacing="6">
        {/* <Button colorScheme="blue" variant="outline" size="md" onClick={save1}>
          저장
        </Button> */}
        <Button colorScheme="blue" size="md" onClick={clearSignature}>
          초기화
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Canvas;
