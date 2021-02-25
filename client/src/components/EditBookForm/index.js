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
  //this lets you perform side effects in function component
  EditBookForm.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    colorScheme: PropTypes.string,
    id: PropTypes.string
  };
  
  const handleThemeChange = (event) => {
    setFormData({ ...formData, colorScheme: event.target.value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    };

  const handleSubmit = () => {
    API.updateBook(props.id, formData)
    .then( res => {
      res;
      window.location.reload(true);
    })
    .catch(err => console.log(err));
};
  return (
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
          <FormControl style={{ width: "60%" }}>
            <InputLabel id="demo-simple-select-label">Color Theme</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleThemeChange}
            >
              <MenuItem value={"red"}>Red</MenuItem>
              <MenuItem value={"blue"}>Blue</MenuItem>
              <MenuItem value={"green"}>Green</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button
          style={{
            margin: "25px 10px 25px auto",
            display: "block",
          }}
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
      </form>
    </Box>
  );
};



export default EditBookForm;