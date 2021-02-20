import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CanvasColors from "../CanvasColors/CanvasColors";
import CanvasPenWidth from "../CanvasPenWidth/CanvasPenWidth";

const CanvasSidebar = ({ makeImg, ACTIONS, dispatch, canvasSetting }) => {
  const [display, setDisplay] = useState("0");
  const [showSettings, setShowSettings] = useState("<- Hide");
  const [settingToChange, setSettingToChange] = useState("");

  const showSidebar = () => {
    showSettings === "Show ->"
      ? setShowSettings("<- Hide")
      : setShowSettings("Show ->");
    display === "0" ? setDisplay("-200px") : setDisplay("0");
  };

  const handleSettingClick = (e) => {
    const setting = e.target.dataset.setting;
    console.log(setting);
    setSettingToChange(setting);
    console.log(settingToChange);
    // changeSettings(settingToChange, "red");
  };
  const handleUpdate = (e) => {
    console.log("SETTING:", settingToChange);
    console.log("PAYLOAD", e.target.value);
    const payload = e.target.value;
    switch (settingToChange) {
      case ACTIONS.COLOR:
        dispatch({ type: settingToChange, payload: { lineColor: payload } });
        break;
      case ACTIONS.WIDTH:
        dispatch({ type: settingToChange, payload: { lineWidth: payload } });
        break;
    }
  };
  return (
    <div id="canvasSidebar" style={{ left: display }}>
      <div className="link-home">
        <Link to="/dashboard">Dashboard</Link>
      </div>

      <ul id="canvasSettings">
        <li
          data-setting={ACTIONS.COLOR}
          className={settingToChange === ACTIONS.COLOR ? "active" : ""}
          onClick={handleSettingClick}
        >
          Change Color
        </li>
        <li
          data-setting={ACTIONS.WIDTH}
          className={settingToChange === ACTIONS.WIDTH ? "active" : ""}
          onClick={handleSettingClick}
        >
          Change Width
        </li>
        <li
          data-setting={ACTIONS.PEN}
          className={settingToChange === ACTIONS.PEN ? "active" : ""}
          onClick={(e) => {
            handleSettingClick(e);
            dispatch({
              type: settingToChange,
              payload: { lineColor: "#f3f3f3" },
            });
          }}
        >
          Eraser
        </li>
      </ul>
      <div>
        <button className="save-btn" onClick={makeImg}>
          Save Image?
        </button>
      </div>
      {settingToChange === ACTIONS.COLOR && (
        <CanvasColors
          handleUpdate={handleUpdate}
          settingToChange={settingToChange}
          ACTIONS={ACTIONS}
        />
      )}
      {settingToChange === ACTIONS.WIDTH && (
        <CanvasPenWidth
          canvasSetting={canvasSetting}
          handleUpdate={handleUpdate}
          settingToChange={settingToChange}
          ACTIONS={ACTIONS}
        />
      )}
      <button id="showSettings" onClick={showSidebar}>
        {showSettings}
      </button>
    </div>
  );
};

CanvasSidebar.propTypes = {
  changeSettings: PropTypes.func,
  makeImg: PropTypes.func,
  ACTIONS: PropTypes.object,
  dispatch: PropTypes.func,
  canvasSetting: PropTypes.object,
};

export default CanvasSidebar;
