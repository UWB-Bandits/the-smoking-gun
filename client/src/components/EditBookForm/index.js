//import react, and useState and useEffect methods
import React, {useState, useEffect} from "react";
//import Material-Ui components
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
//import Material-Ui icon
import SaveIcon from "@material-ui/icons/Save";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//import API route handler
import API from "../../utils/API";
//initialize the EditBookForm component that receives props
const EditBookForm = (props) => {
  //sets the state variable hooks
  const [formData, setFormData] = useState({
      title: "",
      description: "",
      colorScheme: "",
    });
  //this lets you perform side effects in function component
  useEffect(() => {
      setFormData({
          title: props.title,
          description: props.description,
          colorScheme: props.colorScheme
      });
  }, []);
  //sets up prop types for the EditBOokForm component
  EditBookForm.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    colorScheme: PropTypes.string,
    id: PropTypes.string
  };
  //This changes the formData.colorScheme state to the event target
  const handleThemeChange = (event) => {
    setFormData({ ...formData, colorScheme: event.target.value });
  };
  //this handles input changes by changing the name of the event to the value of the target
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    };
  //this handles the submit by sending it to the API call to the database
  const handleSubmit = () => {
    API.updateBook(props.id, formData)
    .then( res => {
      res;
      window.location.reload(true);
    })
    .catch(err => console.log(err));
  };
  //This returns a form that the user can use to update the current book title, description, and colorScheme 
  return (
    //Material-UI component that serves as a wrapper component for most of the CSS utility needs. 
    <Box
      boxShadow={2}
      p={2}
      style={{
        width: "80%",
        margin: "10px auto",
        minWidth: "300px",
        borderRadius: "5px",
      }}
      bgcolor="background.paper"
    >
      <h2>Edit {"'"}{props.title}{"'"} Book</h2>
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
        <Button
          style={{
            margin: "25px 10px 25px auto",
            display: "block",
          }}
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />} //Material-Ui Icon component
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
      </form>
    </Box>
  );
};
//export the EditBookForm component
export default EditBookForm;