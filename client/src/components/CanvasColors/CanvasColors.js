import React, { useState } from "react";
import PropTypes from "prop-types";
import "./canvas-colors.css";

const CanvasControls = ({ handleUpdate }) => {
  //   let data = [];
  // const [message, setMessage] = useState("");
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [customColor, setCustomColor] = useState("#e7f4a8");

  // useEffect(() => {

  //   setLoading(false);
  // }, [loading]);

  const handleColorChange = (e) => {
    setCustomColor(e.target.value);
    handleUpdate(e);
  };

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
CanvasControls.propTypes = {
  handleUpdate: PropTypes.func,
  settingToChange: PropTypes.string,
  ACTIONS: PropTypes.object,
};

export default CanvasControls;
