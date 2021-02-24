import React from "react";
import PropTypes from "prop-types";
import "./DoodleSlider.css";
import DeleteIcon from "@material-ui/icons/Delete";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Button } from "@material-ui/core";

const DoodleSlider = ({ doodles, deleteDoodle }) => {
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
                  <GetAppIcon fontSize="large" color="primary" />
                </a>

                <Button
                  className="deleteDoodle"
                  id={item._id}
                  onClick={deleteDoodle}
                >
                  <DeleteIcon fontSize="large" color="error" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
DoodleSlider.propTypes = {
  doodles: PropTypes.array,
  deleteDoodle: PropTypes.func,
};

export default DoodleSlider;
