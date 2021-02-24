import React from "react";
import PropTypes from "prop-types";
import "./canvas-width.css";

const CanvasControls = ({ handleUpdate, canvasSetting }) => {
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
CanvasControls.propTypes = {
  handleUpdate: PropTypes.func,
  canvasSetting: PropTypes.object,
  ACTIONS: PropTypes.object,
};

export default CanvasControls;
