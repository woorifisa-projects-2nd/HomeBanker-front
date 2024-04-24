import CanvasDraw from "react-canvas-draw";

import React, { useState, useEffect } from "react";

const Canvas = () => {
  const [color, setColor] = useState("#FFFFFF");
  const [width, setWidth] = useState(518);
  const [height, setHeight] = useState(250);
  const [brushRadius, setBrushRadius] = useState(5);
  const [lazyRadius, setLazyRadius] = useState(5);
  const [backgroundImg, setBackgroundImg] = useState("");
  const [imgs, setImgs] = useState([]);

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
      <CanvasDraw
        ref={canvasRef}
        color={color}
        canvasWidth={width}
        canvasHeight={height}
        brushRadius={brushRadius}
        lazyRadius={lazyRadius}
        onChange={() => console.log("onChange")}
      />
    </div>
  );
};

export default Canvas;
