//import react
import React from "react";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//import Material-Ui component 
import Button from "@material-ui/core/Button";
//initialize FormButton component and vairous props
const FormButtons = ({ button1, button2, setPage, loading, handleSubmit }) => {
  //this returns buttons designed for the Login and SignUp form
  return (
    <div>
      <div>
        {/*Material-UI component that allows users to take actions, and make choices, with a single tap. */}
        <Button
          style={{
            margin: "25px 10px 25px auto",
            display: "block",
          }}
          disabled={loading}
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          {button1}
        </Button>
      </div>
      <p
        style={{
          textAlign: "center",
          width: "100%",
        }}
      >
        {button2[0]}
        <Button
          style={{
            margin: "10px 5px",
            padding: "3px 8px ",
          }}
          variant="contained"
          value={button2[1]}
          onClick={setPage}
        >
          {button2[1]}
        </Button>
      </p>
    </div>
  );
};
//sets up prop types for the FormButtons component
FormButtons.propTypes = {
  button1: PropTypes.string,
  button2: PropTypes.array,
  setPage: PropTypes.func,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
};
//export the FormButtons component
export default FormButtons;
