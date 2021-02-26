//import react
import React from "react";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//import this components css file
import "./canvas-width.css";
//initialize CanvasPenWidth component that takes in the handleUpdate function and canvasSetting object
const CanvasPenWidth = ({ handleUpdate, canvasSetting }) => {
  //this returns a menu to allow users to change their pen width
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h4>Change Pen Width</h4>
      <div>
        {/* extra small */}
        <button
          className="penOption"
          style={{
            backgroundColor: canvasSetting.lineColor,
            width: 16,
            height: 16,
          }}
          value={2}
          onClick={handleUpdate}
        ></button>
      </div>
      <div>
        {/* small */}
        <button
          className="penOption"
          style={{
            backgroundColor: canvasSetting.lineColor,
            width: 20,
            height: 20,
          }}
          value={4}
          onClick={handleUpdate}
        ></button>
      </div>
      <div>
        {/* medium */}
        <button
          className="penOption"
          style={{
            backgroundColor: canvasSetting.lineColor,
            width: 26,
            height: 26,
          }}
          value={6}
          onClick={handleUpdate}
        ></button>
      </div>
      <div>
        {/* large */}
        <button
          className="penOption"
          style={{
            backgroundColor: canvasSetting.lineColor,
            width: 32,
            height: 32,
          }}
          value={8}
          onClick={handleUpdate}
        ></button>
      </div>
    </div>
  );
};
//sets up prop types for the CanvasPenWidth component
CanvasPenWidth.propTypes = {
  handleUpdate: PropTypes.func,
  canvasSetting: PropTypes.object,
  ACTIONS: PropTypes.object,
};
//exports CanvasPenWidth component
export default CanvasPenWidth;
