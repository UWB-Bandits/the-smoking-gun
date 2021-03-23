//import react, and useState and useEffect methods
import React, { useState, useEffect } from "react";
//import withStyles function from Material-UI
import { withStyles } from "@material-ui/core/styles";
// import Material-UI components for Dialog Modal
import Fab from "@material-ui/core/Fab";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
//import Material-Ui components
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
//import Material-UI lab
import Alert from "@material-ui/lab/Alert";
//import Material-Ui icon
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//import API route handler
import API from "../../utils/API";

// sets styles variable for the title box of the dialog
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
// sets up the title box of the dialog
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h5">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
// sets up the content box of the dialog
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}))(MuiDialogContent);
// sets up the footer box of the dialog
const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

//initialize the EditBookForm component that receives props
const EditBookForm = (props) => {
  //sets the state variable hooks
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    colorScheme: "",
  });
  const [error, setError] = useState("");
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title === "") {
      setError("Please enter a title.");
    } else if (formData.description === "") {
      setError("Please enter a description.");
    } else if (formData.colorScheme === "") {
      setError("Please choose a color theme.");
    } else {
      setError("");
      API.updateBook(props.id, formData)
      .then(res => {
        res;
        window.location.reload(true);
      })
      .catch(err => {
        console.log(err);
        setError(err.message);
      });
    }
  };
  //This returns a form that the user can use to update the current book title, description, and colorScheme 
  return (
    <div style={{backgroundColor: "#DDDDDD"}}>
      {/* Material-UI component that informs users about a task and can contain critical information, require decisions, or involve multiple tasks. */}
      <DialogTitle id="form-dialog-title" onClose={props.handleClose} style={{color:"white",   backgroundColor:"#474747"}}>
        <span style={{fontFamily: "'Rock Salt', cursive",}}>Edit {"'"}{props.title}{"'"}</span>
      </DialogTitle>
      <DialogContent dividers>
        {/*Material-Ui component that serves as a convenience wrapper */}
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
            style={{ width: "100%", }}
            id="newBookTitle"
            label="Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <TextField
            style={{ width: "100%" }}
            id="newBookDescription"
            label="Description"
            name="description"
            value={formData.description}
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
              value={formData.colorScheme}
            >
              {/* Material-Ui component is a wrapper around ListItem with some additional styles. */}
              <MenuItem value={"red"}>Red</MenuItem>
              <MenuItem value={"blue"}>Blue</MenuItem>
              <MenuItem value={"green"}>Green</MenuItem>
            </Select>
          </FormControl>
      </DialogContent>
      <DialogActions style={{backgroundColor:"#474747"}}>
        <Fab 
            style={{
              color:"#474747",
              fontWeight:"bold",

            }}
            variant="extended" 
            onClick={props.handleClose} 
          >
            Cancel
          </Fab>
        <Fab 
            variant="extended" 
            autoFocus 
            onClick={handleSubmit} 
            style={{
              backgroundColor:"#474747", 
              color:"white",
              borderColor:"white",
              borderWidth:"1px",
              borderStyle:"solid"
            }}
          >
            <SaveIcon style={{marginRight:"5px"}}/>
            Save Book
          </Fab>
      </DialogActions>
    </div>
  );
};
//sets up prop types for the EditBOokForm component
EditBookForm.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  colorScheme: PropTypes.string,
  id: PropTypes.string,
  handleClose: PropTypes.func
};
//export the EditBookForm component
export default EditBookForm;