//import react
import React from "react";
//import Material UI components
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//initialize the NewListForm component
const NewListForm = (props) => {
  //deconstruct variables from props that are used down below
  const { handleInputChange, addItem, type, formDataShown} = props;
  //this returns a form that allows user to add a list to their book
  return (
    //Material-UI component that serves as a wrapper component for most of the CSS utility needs.
    <Box style={{width:"100%"}}>
      <form
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ margin: "0px 5px" }}>
          {/* Material-Ui component that serves as a convenience wrapper */}
          <TextField
            style={{ width: "100%" }}
            id="newListInput"
            label={`Add a new ${type}`}
            type="text"
            name="newList"
            onChange={handleInputChange}
            value={formDataShown}
          />
        </div>
        {/* Material-UI component that allows users to take actions, and make choices, with a single tap. */}
        <Fab
          className={"styled-button"}
          variant="contained"
          color="primary"
          onClick={addItem}
          style={{marginTop:"5px", maxWidth:"100px"}}
        >Add
        </Fab>
      </form>
    </Box>
  );
};
//sets up prop types for the NewListForm component
NewListForm.propTypes = {
  addItem: PropTypes.func,
  handleInputChange: PropTypes.func,
  type: PropTypes.string,
  formDataShown: PropTypes.string
};
//export the NewListForm component
export default NewListForm;
