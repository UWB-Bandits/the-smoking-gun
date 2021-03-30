//import react
import React from "react";
//import withStyles function from Material-UI
import { withStyles } from "@material-ui/core/styles";
// import Material-UI components for Dialog Modal
import Fab from "@material-ui/core/Fab";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
//import Material-Ui icon
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//import client side API route handler
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
//initialize DeleteBookForm Component
const DeleteBookForm = (props) => {
  //this function handles the book delete 
  const handleBookDelete = () => {
    API.deleteBook(props.id)
    .then( res => {
      res;
      window.location.href = "/dashboard";
    })
    .catch(err => console.log(err));
  };
  //this function handles the list delete
  const handleListDelete = () => {
    API.deleteList(props.id)
    .then( res => {
      res;
      window.location.reload(true);
    })
    .catch(err => console.log(err));
  };
  //this function handles the calendar delete
  const handleCalendarDelete = () => {
    API.deleteCalendar(props.id)
    .then( res => {
      res;
      window.location.reload(true);
    })
    .catch(err => console.log(err));
  };
  //this function handles the habit delete
  const handleHabitDelete = () => {
    API.deleteHabit(props.id)
    .then( res => {
      res;
      window.location.reload(true);
    })
    .catch(err => console.log(err));
  };
  //this function handles the journal entry delete
  const handleEntryDelete = () => {
    API.deleteEntry(props.id)
    .then( res => {
        console.log("Entry has been Deleted");
        console.log(res);
        window.location.reload(true);
    })
    .catch(err => console.log(err));
  };
  //this initialize variables that will store what text to show and how to handle
  let buttonText;
  let handle;
  //this if else block checks the prop type and assigns buttonText and handle correlating info
  if(props.type === "book"){
    buttonText = "delete book";
    handle = handleBookDelete;
  } else if (props.type === "list"){
    buttonText = "delete list";
    handle = handleListDelete;
  } else if (props.type === "calendar"){
    buttonText = "delete calendar";
    handle = handleCalendarDelete;
  } else if (props.type === "habit"){
    buttonText = "delete habit";
    handle = handleHabitDelete;
  } else if (props.type === "entry"){
    buttonText = "delete journal entry";
    handle = handleEntryDelete;
  }
  //this returns a form to the delete modal with correlating deletion information
  return (
    <div style={{backgroundColor: "#DDDDDD"}}>
      {/* Material-UI component that informs users about a task and can contain critical information, require decisions, or involve multiple tasks. */}
      <DialogTitle style={{color:"white",   backgroundColor:"#474747"}} id="form-dialog-title" onClose={props.handleClose} >
      <span style={{ fontFamily: "'Rock Salt', cursive"}}>{buttonText} </span>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          <span style={{ fontFamily: "'Raleway', sans-serif"}}>Are you sure you want to {buttonText}{": "}{props.title}{props.name}</span>?
        </Typography>
      </DialogContent>
      <DialogActions style={{backgroundColor:"#474747"}}>
        <Fab 
            style={{
              color:"#474747",
              fontWeight:"bold",

            }}
            variant="outlined" 
            onClick={props.handleClose} 
          >
            Cancel
          </Fab>
        <Fab 
            variant="extended" 
            autoFocus 
            onClick={handle} 
            color="primary" 
            style={{
              backgroundColor:"#474747", 
              color:"white",
              borderColor:"white",
              borderWidth:"1px",
              borderStyle:"solid"
            }}
          >
            <DeleteIcon style={{marginRight:"5px"}}/>
            {buttonText}
          </Fab>
      </DialogActions>
    </div>
  );
};
//sets up prop types for the DaysMenu component
DeleteBookForm.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  handleClose: PropTypes.func
};
//exports DeleteBookForm component
export default DeleteBookForm;