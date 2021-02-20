import React from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import API from "../../utils/API";

const DeleteBookForm = (props) => {

    DeleteBookForm.propTypes = {
        title: PropTypes.string.isRequired,
        name: PropTypes.string,
        id: PropTypes.string.isRequired,
    };

    console.log(props.title);
    console.log(props.id);

    const handleDelete = () => {
        console.log(props.id);
        API.deleteBook(props.id)
        .then( res => {
            console.log("Books has been Deleted");
            console.log(res);
            window.location.href = "/dashboard";
        })
        .catch(err => console.log(err));
    };
    
    let buttonText;

    if(props.title){
      buttonText = "Delete Book";
    } else {
      buttonText = "Delete List";
    }

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "3rem" }}>
      <div>
      <h2>{buttonText}{": "}{props.title}{props.name}</h2>
        <p style={{ display: "inline-block", margin: "1rem" }}>
          Are you sure you want to delete this book?
        </p>

        <Button 
        variant="contained" 
        color="secondary"
        startIcon={<DeleteIcon />} 
        style={{
            margin: "25px 10px 25px auto",
            display: "block",
          }}
        onClick={handleDelete}
          >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
export default DeleteBookForm;