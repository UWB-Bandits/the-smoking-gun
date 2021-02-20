import React from "react";
import PropTypes from "prop-types";
import "./canvas-width.css";

const CanvasControls = ({ handleUpdate, canvasSetting }) => {
  //   let data = [];
  // const [message, setMessage] = useState("");
  // const [data, setData] = useState([]);
  //   // const [loading, setLoading] = useState(true);
  //   const [customColor, setCustomColor] = useState("#e7f4a8");

  //   // useEffect(() => {

  //   //   setLoading(false);
  //   // }, [loading]);

  //   const handleColorChange = (e) => {
  //     setCustomColor(e.target.value);
  //     handleUpdate(e);
  //   };

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
            width: 24,
            height: 24,
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
            width: 32,
            height: 32,
          }}
          value={6}
          onClick={handleUpdate}
        ></button>
      </div>
      {/* <div
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
      </div> */}
    </div>
  );
};
CanvasControls.propTypes = {
  handleUpdate: PropTypes.func,
  canvasSetting: PropTypes.object,
  ACTIONS: PropTypes.object,
};

export default CanvasControls;
