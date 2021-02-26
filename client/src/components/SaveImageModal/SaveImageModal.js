//import react and useState method
import React, { useState } from "react";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//import CSS
import "./SaveImageModal.css";
//import API routes
import API from "../../utils/API";
//import useParams function from react-router-dom
import { useParams } from "react-router-dom";
//initialize SaveImageModal component that takes in state variables
const SaveImageModal = ({ setImgUrl, imgURl }) => {
  //initialize state hooks
  const [imgTitle, setImgTitle] = useState("Doodle");
  //this grabs the id from the URL
  const { id } = useParams();
  //this handles input change within the Modal and sets the imgTitle state
  const handleInputChange = (e) => {
    const value = e.target.value;
    setImgTitle(value);
  };
  //this handles the saving of the doodle to the database
  const saveImg = () => {
    API.createDoodle({ title: imgTitle, url: imgURl, book: id })
      .then(() => {
        setImgUrl();
      })
      .catch((err) => console.log(err));
  };
  //this returns a modal that the user can name their doodle, save to book or download, or close out of the modal
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
//sets up prop types for the SaveImageModal component
SaveImageModal.propTypes = {
  setImgUrl: PropTypes.func,
  imgURl: PropTypes.string,
};
//export SaveImageModal component
export default SaveImageModal;
