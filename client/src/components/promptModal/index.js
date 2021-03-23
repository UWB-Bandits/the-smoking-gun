// import react
import React from "react";
// import withStyles function from Material-UI
import { withStyles } from "@material-ui/core/styles";
// import Material-UI components for Dialog Modal
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
//import Material UI icon
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
//import Material-UI lab
import Alert from "@material-ui/lab/Alert";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
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
// exports and initializes the PromptModal component that is handed down props
export default function PromptModal(props) {
  //deconstruct variables from props
  const { handleSubmit, handleInputChange, prompt, open, handleClose, buttonLabel, error } = props;
  // returns a Dialog Modal that is dismissable and displays a prompt to the user and a delete and cancel buttons
  return (
    <div>
      {/* Material-UI component that informs users about a task and can contain critical information, require decisions, or involve multiple tasks. */}
      <Dialog onClose={handleClose} aria-labelledby="form-dialog-title" open={open}>
        <DialogTitle id="form-dialog-title" onClose={handleClose} style={{backgroundColor:"#474747", color:"white"}}>
          <h2>Add Event</h2>
        </DialogTitle>
        <DialogContent dividers style={{backgroundColor:"#DDDDDD"}}>
          {/*Material-Ui component that serves as a convenience wrapper */}
          {error && <Alert severity="error">{error}</Alert>}
          <Typography>
            <p>{prompt}</p>
          </Typography>
          {/* Material-Ui component that serves as a convenience wrapper */}
          <TextField
            autoFocus
            margin="dense"
            id="promptAnswer"
            type="text"
            name="promptAnswer"
            fullWidth
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions style={{backgroundColor:"#474747"}}>
          {/* Material-UI component that allows users to take actions, and make choices, with a single tap. */}
          <Fab 
            variant="outlined" 
            onClick={handleClose} 

          >
            Cancel
          </Fab>
          <Fab 
            className={"styled-button"}
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
            {buttonLabel}
          </Fab>
        </DialogActions>
      </Dialog>
    </div>
  );
}

//sets up prop types for the PromptModal component
PromptModal.propTypes = {
  prompt: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  buttonLabel: PropTypes.string,
  error: PropTypes.string
};