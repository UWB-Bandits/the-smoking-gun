//import react
import React from "react";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//import CSS
import "./DoodleSlider.css";
//import Material Ui Icons
import DeleteIcon from "@material-ui/icons/Delete";
import GetAppIcon from "@material-ui/icons/GetApp";
//import Material Ui components
import { Button } from "@material-ui/core";
//initialize DoodleSlider component, takes in doodles array and deleteDoodle function
const DoodleSlider = ({ doodles, deleteDoodle, colorScheme }) => {
  //this returns a slider full of doodles
  return (
    <div className="horizontalSlider">
      {doodles !== [] && (
        <div className="sliderContainer">
          {doodles.map((item) => (
            <div key={item._id} className="doodleItem">
              <p>{item.title}</p>
              <img src={item.url} alt={`Doodle for ${item.title}`} />
              <div className="iconContainer">
                <a href={item.url} download={item.title}>
                  <Button
                    className={`doodle-icon-btn ${colorScheme} styled-button`}
                  >
                    {/* Material Ui Icon component */}
                    <GetAppIcon fontSize="large" style={{ color: "white" }} />
                  </Button>
                </a>

                {/* Material-Ui component that allow users to take actions, and make choices, with a single tap.*/}
                <Button
                  className={"deleteDoodle doodle-icon-btn"}
                  style={{ backgroundColor: "darkgray" }}
                  id={item._id}
                  onClick={deleteDoodle}
                >
                  {/* Material Ui Icon component */}
                  <DeleteIcon
                    fontSize="large"
                    color="secondary"
                    // style={{ color: "white" }}
                  />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
//sets up prop types for the DoodleSlider component
DoodleSlider.propTypes = {
  doodles: PropTypes.array,
  deleteDoodle: PropTypes.func,
  colorScheme: PropTypes.string,
};
//exports DoodleSlider component
export default DoodleSlider;
