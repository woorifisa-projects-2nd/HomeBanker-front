import SignatureCanvas from "react-signature-canvas";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Canvas = () => {
  const [width, setWidth] = useState(518);
  const [height, setHeight] = useState(250);
  const [backgroundImg, setBackgroundImg] = useState("");
  const [imgs, setImgs] = useState([]);

  const signCanvas = useRef();

  const save = () => {
    const image = signCanvas.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "sign_image.png";
    link.click();
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
      <button
        type="button"
        style={{ backgroundColor: "#0A71F1", color: "white" }}
        onClick={save}
      >
        Export Drawing
      </button>

      <SignatureCanvas
        ref={signCanvas}
        canvasProps={{
          className: "signature-canvas",
          width: width,
          height: height,
        }}
        clearOnResize={false}
      />
    </div>
  );
};

export default Canvas;
