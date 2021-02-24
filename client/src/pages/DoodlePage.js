/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState, useReducer } from "react";
import CanvasSidebar from "../components/CanvasSidebar/CanvasSidebar";
import SaveImageModal from "../components/SaveImageModal/SaveImageModal";
const pathname = window.location.pathname;
import { useParams } from "react-router-dom";

const DoodlePage = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [imgURl, setImgUrl] = useState("");
  const [canvasPainted, setCanvasPainted] = useState(false);
  let canvas;
  let ctx;
  const { id } = useParams();

  if (pathname === `/doodle/${id}`) {
    require("../components/CanvasSidebar/canvas.css");
  }

  const ACTIONS = {
    COLOR: "change color",
    PEN: "change pen",
    WIDTH: "change width",
  };

  const updateCanvas = (canvasSetting, action) => {
    switch (action.type) {
      case ACTIONS.COLOR:
        return { ...canvasSetting, ...action.payload };
      case ACTIONS.PEN:
        return { ...canvasSetting, ...action.payload };
      case ACTIONS.WIDTH:
        return { ...canvasSetting, lineWidth: action.payload.lineWidth };
      default:
        return canvasSetting;
    }
  };

  const [canvasSetting, dispatch] = useReducer(updateCanvas, {
    penStyle: "round",
    lineColor: "black",
    lineWidth: 3,
  });

  useEffect(() => {
    SetCanvas();
    resize();
  }, []);

  useEffect(() => {
    SetCanvas();
  }, [canvasSetting]);

  const SetCanvas = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    ctx.lineCap = canvasSetting.penStyle;
    ctx.strokeStyle = canvasSetting.lineColor;
    ctx.lineWidth = canvasSetting.lineWidth;
    if (!canvasPainted) {
      ctx.fillStyle = "#f3f3f3";
      ctx.fillRect(0, 0, window.innerWidth, window.innerWidth);
      setCanvasPainted(true);
    }

    ctxRef.current = ctx;
  };

  const resize = () => {
    window.addEventListener("resize", resize);
    // setCanvasPainted(false);
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.9;
    canvas.style.width = `${window.innerWidth * 0.9}px`;
    canvas.style.height = `${window.innerHeight * 0.9} px`;
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
    const test = canvasRef.current.toDataURL();
    setImgUrl(test);
  };
  // _______________________________________MOBILE TOUCH EVENTS________________________________________________________________________________
  const touchStart = (e) => {
    var rect = e.target.getBoundingClientRect();
    const { clientX, clientY } = e.changedTouches[0];
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
    ctxRef.current.stroke();
  };

  return (
    <div>
      <CanvasSidebar
        canvasSetting={canvasSetting}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
        makeImg={makeImg}
      />

      {imgURl && <SaveImageModal setImgUrl={setImgUrl} imgURl={imgURl} />}

      <canvas
        style={{
          background: "#f3f3f3",
          margin: "8vh 5vw 2vh 5vw",
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