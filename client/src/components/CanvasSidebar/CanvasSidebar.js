//import react and useState method
import React, { useState } from "react";
//import Link and useParams from react-router-dom
import { Link, useParams } from "react-router-dom";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//import components
import CanvasColors from "../CanvasColors/CanvasColors";
import CanvasPenWidth from "../CanvasPenWidth/CanvasPenWidth";
import CanvasEraser from "../CanvasEraser/CanvasEraser";
//import Material-UI Icons
import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import CreateIcon from "@material-ui/icons/Create";
//initialize CanvasSidebar component that takes in makeImg function, ACTIONS object, dispatch reducer, and existing canvasSettings object  
const CanvasSidebar = ({
  makeImg,
  ACTIONS,
  dispatch,
  canvasSetting,
  clickAway,
}) => {
  //initialize state hook variables
  const [display, setDisplay] = useState("0");
  const [showSettings, setShowSettings] = useState("<- Hide");
  const [settingToChange, setSettingToChange] = useState("");
  const [storedLineWidth, setStoredLineWidth] = useState(4);
  const { bookId } = useParams();

  const showSidebar = () => {
    showSettings === "Show ->"
      ? setShowSettings("<- Hide")
      : setShowSettings("Show ->");
    display === "0" ? setDisplay("-200px") : setDisplay("0");
  };
  //this function handles the settings clicks and changes the setSettingToChange state,
  //if the event equals to ACTIONS.pen use the dispatch reducer to set the pen settings
  const handleSettingClick = (e) => {
    const setting = e.target.dataset.setting;
    setSettingToChange(setting);
    if (setting === ACTIONS.PEN) {
      dispatch({
        type: settingToChange,
        payload: { lineColor: "#f3f3f3" },
      });
    }
  };
  //this function handles updates to the different menus, this checks the type of ACTIONS the use dispatch reducer
  const handleUpdate = (e) => {
    const payload = e.target.value;
    switch (settingToChange) {
      case ACTIONS.COLOR:
        dispatch({
          type: settingToChange,
          payload: { lineColor: payload, lineWidth: storedLineWidth },
        });
        break;
      case ACTIONS.WIDTH:
        dispatch({ type: settingToChange, payload: { lineWidth: payload } });
        break;
      case ACTIONS.PEN:
        setStoredLineWidth(canvasSetting.lineWidth);
        dispatch({
          type: settingToChange,
          payload: {
            lineWidth: e.target.getAttribute("data-width"),
            lineColor: e.target.value,
          },
        });
        break;
    }
  };
  //this returns the canvas sidebar menu that allows users to return to the dashboard, or book
  //displays the current settings with the color, width, and type of pen.
  //also displays the different menus for each canvas setting
  return (
    <div id="canvasSidebar" style={{ left: display }}>
      <div className="link-home" onClick={clickAway}>
        <Link to="/dashboard">
          <HomeIcon /> Dashboard
        </Link>
      </div>
      <div className="link-book" onClick={clickAway}>
        <Link to={`/books/${bookId}`}>
          <MenuBookIcon /> Book
        </Link>
      </div>
      <div className="link-book" onClick={clickAway}>
        <Link to={`/books/${bookId}/doodlesIndex`}>
          <CreateIcon /> Doodles
        </Link>
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
          onClick={handleSettingClick}
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
      {settingToChange === ACTIONS.PEN && (
        <CanvasEraser
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
//sets up prop types for the CanvasSidebar component
CanvasSidebar.propTypes = {
  changeSettings: PropTypes.func,
  makeImg: PropTypes.func,
  clickAway: PropTypes.func,
  ACTIONS: PropTypes.object,
  dispatch: PropTypes.func,
  canvasSetting: PropTypes.object,
};
//exports CanvasSidebar component
export default CanvasSidebar;
