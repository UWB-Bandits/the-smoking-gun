import React from "react";
import PropTypes from "prop-types";
import "./SaveImageModal.css";

const SaveImageModal = ({ setImgUrl, imgURl }) => {
  return (
    <div className="modal-bg">
      {/* <div style={{ position: "absolute", zIndex: 1000, margin: "10% auto 20%" }}> */}

      <div className="modal">
        <button
          className="close-btn"
          onClick={() => {
            setImgUrl();
          }}
        >
          X
        </button>

        <h2 style={{ margin: "20px 0" }}>Save to Book or Download?</h2>
        <img id="modal-img" src={imgURl} alt="doodle preview" />

        <div className="save-options">
          {window.navigator.msSaveBlob ? (
            <button
              className="modal-btn"
              onClick={window.navigator.msSaveBlob(imgURl, "doodle-img.png")}
            >
              {" "}
              i/e download
            </button>
          ) : (
            <a href={imgURl} download="doodle-img.png">
              <button className="modal-btn">Download</button>
            </a>
          )}

          <button className="modal-btn">Save To Book</button>
        </div>
      </div>
    </div>
  );
};

SaveImageModal.propTypes = {
  setImgUrl: PropTypes.func,
  imgURl: PropTypes.string,
};

export default SaveImageModal;
