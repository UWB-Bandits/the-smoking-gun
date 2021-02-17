import React, { useRef, useEffect, useState } from "react";

const DoodlePage = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [imgURl, setImgUrl] = useState("");
  const [lineWidth, setLineWidth] = useState(4);
  const [lineColor, setLineColor] = useState("black");
  let canvas;
  let ctx;

  useEffect(() => {
    SetCanvas();
    resize();
  }, []);

  useEffect(() => {
    SetCanvas();
  }, [lineColor, lineWidth]);

  const SetCanvas = () => {
    //   changeColors();
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  };

  const changeColors = (e) => {
    setLineColor(e.target.value);
    // SetCanvas();
  };
  const changeWidth = (e) => {
    setLineWidth(e.target.value);
    //   SetCanvas();
  };

  const resize = () => {
    window.addEventListener("resize", resize);
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight - 150;
    canvas.style.width = `${window.innerWidth * 0.8}px`;
    canvas.style.height = `${window.innerHeight * 0.8} px`;
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    ctxRef.current.closePath();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };
  const makeImg = () => {
    // const test = canvasRef.toDataURL();
    // console.log(test);
    const test = canvasRef.current.toDataURL();
    console.log(test);
    console.log(canvasRef.current);
    setImgUrl(test);
  };
  // _______________________________________MOBILE TOUCH EVENTS________________________________________________________________________________
  const touchStart = (e) => {
    var rect = e.target.getBoundingClientRect();
    console.log(e.changedTouches[0]);
    const { clientX, clientY } = e.changedTouches[0];
    console.log(clientX, clientY);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };
  const touchDraw = (e) => {
    var rect = e.target.getBoundingClientRect();
    if (!isDrawing) {
      return;
    }
    const { clientX, clientY } = e.changedTouches[0];
    ctxRef.current.lineTo(clientX - rect.left, clientY - rect.top);
    ctxRef.current.stroke();
  };
  // _______________________________________Download btn________________________________________________________________________________
  //   const download = () => {
  //     if (window.navigator.msSaveBlob) {
  //       window.navigator.msSaveBlob(
  //         canvasRef.current.msToBlob(),
  //         "doodle-img.png"
  //       );
  //     }
  //   };

  return (
    <div>
      <button onClick={makeImg} ref={canvasRef}>
        Make an Image?
      </button>
      <button value="red" onClick={changeColors} ref={canvasRef}>
        change color
      </button>
      <button value={8} onClick={changeWidth} ref={canvasRef}>
        change Width
      </button>

      {imgURl && (
        <div
          style={{ position: "absolute", zIndex: 1000, margin: "10% auto 20%" }}
        >
          <div>
            {window.navigator.msSaveBlob ? (
              <button
                onClick={window.navigator.msSaveBlob(imgURl, "doodle-img.png")}
              >
                {" "}
                i/e download
              </button>
            ) : (
              <a href={imgURl} download="doodle-img.png">
                <button> normal download</button>
              </a>
            )}
            <button
              onClick={() => {
                setImgUrl();
              }}
            >
              close
            </button>
          </div>

          <img
            style={{
              background: "black",
              width: "200px",
              height: "200px",
            }}
            src={imgURl}
          />
        </div>
      )}

      <canvas
        style={{
          background: "#f3f3f3",
          marginRight: "10%",
          marginLeft: "10%",
          //   position: "absolute",
          left: "10%",
          right: "10%",
          touchAction: "none",
        }}
        onMouseDown={startDrawing}
        onTouchStart={touchStart}
        onMouseUp={stopDrawing}
        onTouchEnd={stopDrawing}
        onTouchMove={touchDraw}
        onMouseMove={draw}
        onMouseLeave={stopDrawing}
        ref={canvasRef}
      />
    </div>
  );
};

export default DoodlePage;
