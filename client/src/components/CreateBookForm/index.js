//import react
import React from "react";
//import Material-Ui components
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//initialize the SignInForm component
const SignInForm = (props) => {
  //deconstruct and initialize variables from props
  const { handleInputChange, handleThemeChange, handleSubmit } = props;
  //return a form that helps a user create a new book
  return (
    // Material-Ui component that serves as a wrapper component for most of the CSS utility needs.
    <Box
      boxShadow={2}
      p={2}
      style={{
        width: "80%",
        margin: "10px auto",
        minWidth: "300px",
        borderRadius: "5px",
        backgroundColor:"#DDDDDD"
      }}
    >
      <h2 style={{ fontFamily: "'Rock Salt', cursive", }}>Create a New Book</h2>
      <form
        style={{
          minWidth: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ margin: "0px 5px" }}>
          {/*Material-Ui component that serves as a convenience wrapper */}
          <TextField
            style={{ width: "100%" }}
            id="newBookTitle"
            label="Title"
            type="text"
            name="title"
            onChange={handleInputChange}
          />
          <TextField
            style={{ width: "100%" }}
            id="newBookDescription"
            label="Description"
            name="description"
            onChange={handleInputChange}
            multiline
          />
          {/*Material-Ui component that provides context such as filled/focused/error/required for form inputs.*/}
          <FormControl style={{ width: "60%" }}>
            {/*Material-Ui component that provides a label for fields inside a form.*/}
            <InputLabel id="demo-simple-select-label">Color Theme</InputLabel>
            {/* Material-Ui component used for collecting user provided information from a list of options. */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleThemeChange}
            >
              {/* Material-Ui component is a wrapper around ListItem with some additional styles. */}
              <MenuItem value={"red"}>Red</MenuItem>
              <MenuItem value={"blue"}>Blue</MenuItem>
              <MenuItem value={"green"}>Green</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/*Material-Ui component allow users to take actions, and make choices, with a single tap. */}
        <Fab
          style={{
            margin: "25px 10px 25px auto",
            display: "block",
            backgroundColor:"#474747",
            color:"white"
          }}
          variant="contained"
          onClick={handleSubmit}
        >
          Create Book Now
        </Fab>
      </form>
    </Box>
  );
};
//sets up prop types for the SignInForm component
SignInForm.propTypes = {
  handleInputChange: PropTypes.func,
  handleThemeChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};
//export the SignInForm component
export default SignInForm;
