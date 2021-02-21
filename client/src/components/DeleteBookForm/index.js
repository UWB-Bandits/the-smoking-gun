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
    console.log(props.type);
    console.log(props.name);
    console.log(props.title);
    console.log(props.id);

    const handleBookDelete = () => {
        console.log(props.id);
        API.deleteBook(props.id)
        .then( res => {
            console.log("Book has been Deleted");
            console.log(res);
            window.location.reload(true);
        })
        .catch(err => console.log(err));
    };

    const handleListDelete = () => {
      console.log(props.id);
      API.deleteList(props.id)
      .then( res => {
          console.log("List has been Deleted");
          console.log(res);
          window.location.reload(true);
      })
      .catch(err => console.log(err));
  };

  const handleCalendarDelete = () => {
    console.log(props.id);
      API.deleteCalendar(props.id)
      .then( res => {
          console.log("Calendar has been Deleted");
          console.log(res);
          window.location.reload(true);
      })
      .catch(err => console.log(err));
  };

  const handleHabitDelete = () => {
    console.log(props.id);
      API.deleteHabit(props.id)
      .then( res => {
          console.log("Habit has been Deleted");
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