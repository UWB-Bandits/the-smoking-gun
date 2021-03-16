//import react
import React from "react";
//import Material-Ui component
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
//import Material-Ui icon
import DeleteIcon from "@material-ui/icons/Delete";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//import client side API route handler
import API from "../../utils/API";
//initialize DeleteBookForm Component
const DeleteBookForm = (props) => {
  //sets up prop types for the DaysMenu component
  DeleteBookForm.propTypes = {
    title: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    type: PropTypes.string
  };
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
    <div style={{ display: "flex", justifyContent: "center", margin: "3rem" }}>
      <Box
        boxShadow={2}
        p={2}
        style={{
          width: "80%",
          margin: "10px auto",
          minWidth: "300px",
          borderRadius: "5px",
          backgroundColor: "#DDDDDD",
        }}
      >
        <h2 style={{ fontFamily: "'Rock Salt', cursive", }}>{buttonText}{": "}{props.title}{props.name}</h2>
        <p style={{ display: "inline-block", margin: "1rem", fontFamily: "'Raleway', sans-serif", }}>
          Are you sure you want to {buttonText}?
        </p>
        {/* Material-Ui component that allow users to take actions, and make choices, with a single tap.*/}
        <Fab 
          variant="contained" 
          style={{
              margin: "25px 10px 25px auto",
              display: "block",
              backgroundColor:"#474747",
              color: "white"
            }}
          onClick={handle}
        >
          <DeleteIcon style={{marginRight: "5px", verticalAlign:"sub"}} /> {buttonText}
        </Fab>
      </Box>
    </div>
  );
};
//exports DeleteBookForm component
export default DeleteBookForm;