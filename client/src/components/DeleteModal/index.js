// import react
import React from "react";
// import Material-UI components for Dialog Modal
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
//import Material-UI Icon
import DeleteIcon from "@material-ui/icons/Delete";
//import component
import DeleteBookForm from "../DeleteBookForm";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//this exports and initializes the DeleteModal component that is handed down props
export default function DeleteModal(props) {
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
    <div>
      <DeleteBookForm 
        title={props.title} 
        id={props.id} 
        name={props.name} 
        type={props.type}
        handleClose = {handleClose} 
      />
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
      {/* Material-UI component that informs users about a task and can contain critical information, require decisions, or involve multiple tasks. */}
      <Dialog
        onClose={handleClose} 
        aria-labelledby="form-dialog-title" 
        open={open}
      >
        {body}
      </Dialog>
    </div>
  );
}

//sets up prop types for the DeleteModal component
DeleteModal.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.string
};