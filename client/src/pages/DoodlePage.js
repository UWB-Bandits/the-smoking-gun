//import react and react hooks
import React, { useRef, useEffect, useState, useReducer } from "react";
//import components
import CanvasSidebar from "../components/CanvasSidebar/CanvasSidebar";
import SaveImageModal from "../components/SaveImageModal/SaveImageModal";
//import CSS
import "../components/CanvasSidebar/canvas.css";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//initialize DoodlePage page
const DoodlePage = (props) => {
  //set useRefs
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  //set state hooks
  const [isDrawing, setIsDrawing] = useState(false);
  const [imgURl, setImgUrl] = useState("");
  const [canvasPainted, setCanvasPainted] = useState(false);
  //initialize variables
  let canvas;
  let ctx;
  //sets up prop types for the DoodlePage page
  DoodlePage.propTypes = {
    clickAway: PropTypes.func,
  };
  //sets a variable to store types of actions
  const ACTIONS = {
    COLOR: "change color",
    PEN: "change pen",
    WIDTH: "change width",
  };
  //this updates the canvas setting and action
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
  //this dispatches the writing utensil settings to the component
  const [canvasSetting, dispatch] = useReducer(updateCanvas, {
    penStyle: "round",
    lineColor: "black",
    lineWidth: 3,
  });
  //this side effect runs the setCanvas and resize functions
  useEffect(() => {
    SetCanvas();
    resize();
  }, []);
  //this side effect runs the setCanvas function without changing the canvasSettings
  useEffect(() => {
    SetCanvas();
  }, [canvasSetting]);
  //this sets the canvas
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
  //this resizes the canvas based on the window
  const resize = () => {
    window.addEventListener("resize", resize);
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.9;
    canvas.style.width = `${window.innerWidth * 0.9}px`;
    canvas.style.height = `${window.innerHeight * 0.9} px`;
  };
  //this allows the drawing to start
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };
  //this disables the drawing
  const stopDrawing = () => {
    setIsDrawing(false);
    ctxRef.current.closePath();
  };
  //this puts the color on the canvas
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };
  //this makes turns the doodle into data to store
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
  //this returns a sidebar menu to pick colors, sizes, and type of brush and then a full screen canvas to doodle on
  return (
    <div>
      <CanvasSidebar
        canvasSetting={canvasSetting}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
        makeImg={makeImg}
        clickAway={props.clickAway}
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
//exports DoodlePage page
export default DoodlePage;
