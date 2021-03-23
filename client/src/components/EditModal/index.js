//import react
import React from "react";
// import Material-UI components for Dialog Modal
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
//import Material-Ui icon
import EditIcon from "@material-ui/icons/Edit";
//import components
import EditBookForm from "../EditBookForm";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//this exports and initializes the EditModal component that is handed down props
export default function EditModal(props) {
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
      <EditBookForm
        title={props.title}
        description={props.description}
        colorScheme={props.colorScheme}
        id={props.id}
        handleClose = {handleClose} 
      />
    </div>
  );
  //this returns a modal that shows info about the item that was clicked on and allows users to edit the item in the database
  return (
    <div>
      {/* Material-UI component that allows users to take actions, and make choices, with a single tap that wraps an Icon */}
      <IconButton style={{color:"#474747"}} aria-label="Edit Book" component="span" onClick={handleOpen} >
        {/* Material-UI Icon component */}
        <EditIcon />
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

//sets up prop types for the EditModal component
EditModal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  colorScheme: PropTypes.string,
  id: PropTypes.string.isRequired
};