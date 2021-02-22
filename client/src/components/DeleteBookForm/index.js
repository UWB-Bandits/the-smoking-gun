import React from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import API from "../../utils/API";

const DeleteBookForm = (props) => {

    DeleteBookForm.propTypes = {
        title: PropTypes.string,
        name: PropTypes.string,
        id: PropTypes.string.isRequired,
        type: PropTypes.string
    };

    const handleBookDelete = () => {
        API.deleteBook(props.id)
        .then( res => {
            res;
            window.location.reload(true);
        })
        .catch(err => console.log(err));
    };

    const handleListDelete = () => {
      API.deleteList(props.id)
      .then( res => {
          res;
          window.location.reload(true);
      })
      .catch(err => console.log(err));
  };

  const handleCalendarDelete = () => {
      API.deleteCalendar(props.id)
      .then( res => {
          res;
          window.location.reload(true);
      })
      .catch(err => console.log(err));
  };

  const handleHabitDelete = () => {
      API.deleteHabit(props.id)
      .then( res => {
          res;
          window.location.reload(true);
      })
      .catch(err => console.log(err));
  };

  const handleEntryDelete = () => {
    console.log(props.id);
      API.deleteEntry(props.id)
      .then( res => {
          console.log("Entry has been Deleted");
          console.log(res);
          window.location.reload(true);
      })
      .catch(err => console.log(err));
  };
    
    let buttonText;
    let handle;

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

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "3rem" }}>
      <div>
      <h2>{buttonText}{": "}{props.title}{props.name}</h2>
        <p style={{ display: "inline-block", margin: "1rem" }}>
          Are you sure you want to {buttonText}?
        </p>

        <Button 
        variant="contained" 
        color="secondary"
        startIcon={<DeleteIcon />} 
        style={{
            margin: "25px 10px 25px auto",
            display: "block",
          }}
        onClick={handle}
          >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
export default DeleteBookForm;