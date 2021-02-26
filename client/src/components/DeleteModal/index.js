// import react
import React from "react";
//import makeStyles function from Material-UI
import { makeStyles } from "@material-ui/core/styles";
//import Material-UI components
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
//import Material-UI Icon
import DeleteIcon from "@material-ui/icons/Delete";
//import component
import DeleteBookForm from "../DeleteBookForm";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//this function helps position the modal where open
function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
//initialize useStyles variable that uses Material-UI's styling solution makeStyles() function
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
//this exports and initializes the DeleteModal component that is handed down props
export default function DeleteModal(props) {
  //sets up prop types for the DeleteModal component
  DeleteModal.propTypes = {
          title: PropTypes.string,
          name: PropTypes.string,
          id: PropTypes.string.isRequired,
          type: PropTypes.string
  };
  //initialize the classes variable with our useStyles hook
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  //sets the state variable hooks
  const [open, setOpen] = React.useState(false);
  //this function handles the opening of the modal and sets open state to true
  const handleOpen = () => {
    setOpen(true);
  };
  //this function handles the closing of the modal and sets the open state to false
  const handleClose = () => {
    setOpen(false);
  };
  //initialize body variable that displays the info inside the Modal
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <DeleteBookForm title={props.title} id={props.id} name={props.name} type={props.type} />
    </div>
  );
  //this returns a modal that shows info about the item that was clicked on and allows users to delete this item from the database
  return (
    <div>
      {/* Material-UI component that allows users to take actions, and make choices, with a single tap that wraps an Icon */}
      <IconButton color="secondary" aria-label="Delete Book" component="span" onClick={handleOpen}>
        {/* Material-UI Icon component */}
        <DeleteIcon />
      </IconButton>
      {/*Material-UI component that provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else. */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}