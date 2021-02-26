import React, { useState } from "react";
import PropTypes from "prop-types";
import "./SaveImageModal.css";
import API from "../../utils/API";
import { useParams } from "react-router-dom";

const SaveImageModal = ({ setImgUrl, imgURl }) => {
  const [imgTitle, setImgTitle] = useState("Doodle");
  const { bookId } = useParams();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setImgTitle(value);
  };
  const saveImg = () => {
    API.createDoodle({ title: imgTitle, url: imgURl, book: bookId })
      .then(() => {
        setImgUrl();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="modal-bg">
      <div className="modal">
        <button
          className="close-btn"
          onClick={() => {
            setImgUrl();
          }}
        >
          X
        </button>

        <h2 style={{ margin: "20px 0 10px 0" }}>Save to Book or Download?</h2>
        <div className="inputContainer">
          <div>
            <label htmlFor="imgTitle">Name Your Doodle</label>
          </div>

          <input
            type="text"
            id="imgTitle"
            name="imgTitle"
            onChange={handleInputChange}
          />
        </div>
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

          <button className="modal-btn" onClick={saveImg}>
            Save To Book
          </button>
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
