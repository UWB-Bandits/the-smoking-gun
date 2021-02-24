import React from "react";
import PropTypes from "prop-types";
// import "./canvas-width.css";

const CanvasEraser = ({ handleUpdate }) => {
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

CanvasEraser.propTypes = {
  handleUpdate: PropTypes.func,
  canvasSetting: PropTypes.object,
  ACTIONS: PropTypes.object,
};
export default CanvasEraser;
