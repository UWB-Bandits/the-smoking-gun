//import react and the useState method
import React, { useState } from "react";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//import this components css file
import "./canvas-colors.css";
//initialize CanvasColors component which takes in an object
const CanvasColors = ({ handleUpdate }) => {
  //initialize state hooks
  const [customColor, setCustomColor] = useState("#e7f4a8");
  //this function handles the color change and sets customColor state
  const handleColorChange = (e) => {
    setCustomColor(e.target.value);
    handleUpdate(e);
  };
  //this returns a menu component that allows users to select a color on the doodle page
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h4>Change Pen Color</h4>
      <div>
        {/* Blue Color */}
        <button
          className="colorOption"
          style={{
            backgroundColor: "blue",
          }}
          value={"blue"}
          onClick={handleUpdate}
        ></button>
      </div>
      <div>
        {/* Red Color */}
        <button
          className="colorOption"
          style={{
            backgroundColor: "red",
          }}
          value={"red"}
          onClick={handleUpdate}
        ></button>
      </div>
      <div>
        {/* Green Color */}
        <button
          className="colorOption"
          style={{
            backgroundColor: "green",
          }}
          value={"green"}
          onClick={handleUpdate}
        ></button>
      </div>
      <div
        className="colorOption"
        style={{
          border: "none",
          marginTop: "15px",
        }}
      >
        {/* Custom Color */}
        <input
          style={{
            padding: "0",
            margin: "0",
            border: "none",
            width: "30px",
            height: "30px",
          }}
          type="color"
          id="colorPicker"
          name="colorPicker"
          value={customColor}
          onChange={handleColorChange}
        />
      </div>
      <div>
        <label
          style={{ padding: "0", margin: "0" }}
          data-payload={customColor}
          htmlFor="colorPicker"
          onClick={handleUpdate}
        >
          Color Picker
        </label>
      </div>
    </div>
  );
};
//sets up prop types for the CanvasColors component
CanvasColors.propTypes = {
  handleUpdate: PropTypes.func,
  settingToChange: PropTypes.string,
  ACTIONS: PropTypes.object,
};
//exports CanvasColors component
export default CanvasColors;
