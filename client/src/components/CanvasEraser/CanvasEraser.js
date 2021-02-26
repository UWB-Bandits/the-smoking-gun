//import react
import React from "react";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//initialize the CanvasEraser component that take in the handleUpdate function
const CanvasEraser = ({ handleUpdate }) => {
  //This returns a menu that allows users to select an eraser size that will return the same color of the canvas
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h4>Set Eraser</h4>
      <div>
        {/* Extra Small */}
        <button
          className="penOption"
          style={{
            backgroundColor: "#f3f3f3",
            width: 16,
            height: 16,
            borderRadius: "0px",
          }}
          value={"#f3f3f3"}
          data-width="4"
          onClick={handleUpdate}
        ></button>
      </div>
      <div>
        {/* Small */}
        <button
          className="penOption"
          style={{
            backgroundColor: "#f3f3f3",
            width: 20,
            height: 20,
            borderRadius: "0px",
          }}
          value={"#f3f3f3"}
          data-width="6"
          onClick={handleUpdate}
        ></button>
      </div>
      <div>
        {/* Medium */}
        <button
          className="penOption"
          style={{
            backgroundColor: "#f3f3f3",
            width: 26,
            height: 26,
            borderRadius: "0px",
          }}
          value={"#f3f3f3"}
          data-width="8"
          onClick={handleUpdate}
        ></button>
      </div>
      <div>
        {/* Large */}
        <button
          className="penOption"
          style={{
            backgroundColor: "#f3f3f3",
            width: 32,
            height: 32,
            borderRadius: "0px",
          }}
          value={"#f3f3f3"}
          data-width="10"
          onClick={handleUpdate}
        ></button>
      </div>
    </div>
  );
};
//sets up prop types for the CanvasControls component
CanvasEraser.propTypes = {
  handleUpdate: PropTypes.func,
  canvasSetting: PropTypes.object,
  ACTIONS: PropTypes.object,
};
//exports CanvasEraser component
export default CanvasEraser;
