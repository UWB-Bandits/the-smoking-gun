//import react
import React from "react";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//import Material-Ui component 
import Fab from "@material-ui/core/Fab";
//initialize FormButton component and various props
const FormButtons = ({ button1, button2, setPage, loading, handleSubmit }) => {
  //this returns buttons designed for the Login and SignUp form
  return (
    <div>
      <div>
        {/*Material-UI component that allows users to take actions, and make choices, with a single tap. */}
        <Fab
          style={{
            margin: "25px 10px 25px auto",
            display: "block",
            backgroundColor: "#FAB228"
          }}
          disabled={loading}
          variant="extended"
          type="submit"
          onClick={handleSubmit}
        >
          {button1}
        </Fab>
      </div>
      <p
        style={{
          textAlign: "center",
          width: "100%",
        }}
      >
        {button2[0]}
        <Fab
          style={{
            margin: "10px 5px",
            backgroundColor:"#474747",
            color:"white"
          }}
          variant="extended"
          value={button2[1]}
          onClick={setPage}
        >
          {button2[1]}
        </Fab>
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
