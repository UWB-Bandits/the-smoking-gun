// import react
import React from "react";
// import withStyles function from Material-UI
import { withStyles } from "@material-ui/core/styles";
// import Material-UI components for Dialog Modal
import Fab from "@material-ui/core/Fab";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
//import Material-UI icon
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
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
// exports and initializes the ConfirmModal component that is handed down props
export default function ConfirmModal(props) {
  //deconstruct variables from props
  const { handleSubmit, prompt, open, handleClose, buttonLabel } = props;
  // returns a Dialog Modal that is dismissable and displays a prompt to the user and a delete and cancel buttons
  return (
    <div>
      {/* Material-UI component that informs users about a task and can contain critical information, require decisions, or involve multiple tasks. */}
      <Dialog onClose={handleClose} aria-labelledby="form-dialog-title" open={open}>
        <DialogTitle id="form-dialog-title" onClose={handleClose} style={{backgroundColor:"#474747", color:"white"}}>
          <h2>Delete Event</h2>
        </DialogTitle>
        <DialogContent dividers style={{backgroundColor:"#DDDDDD"}}>
          <Typography>
            <p>{prompt}</p>
          </Typography>
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
            variant="contained" 
            autoFocus 
            onClick={handleSubmit} 
            color="primary" 
            startIcon={<DeleteIcon />}
            style={{
              backgroundColor:"#474747", 
              color:"white",
              borderColor:"white",
              borderWidth:"1px",
              borderStyle:"solid"
            }} 
          >
            {buttonLabel}
          </Fab>
        </DialogActions>
      </Dialog>
    </div>
  );
}

//sets up prop types for the ConfirmModal component
ConfirmModal.propTypes = {
  prompt: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  buttonLabel: PropTypes.string,
};