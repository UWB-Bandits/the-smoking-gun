//import react
import React from "react";
//import Material UI function
import { makeStyles } from "@material-ui/core/styles";
//import Material UI components
import { Modal, Box, TextField, Button } from "@material-ui/core/";
//import Material UI icon
import SaveIcon from "@material-ui/icons/Save";
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
//initialize and export PromptModal component
export default function PromptModal(props) {
  //initialize the classes variable with our useStyles hook
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  //deconstruct variables from props
  const {handleSubmit, handleInputChange, prompt, open, handleClose, buttonLabel} = props;
  //sets up prop types for the PromptModal component
  PromptModal.propTypes = {
    prompt: PropTypes.string,
    handleInputChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    buttonLabel: PropTypes.string,
  };
  //this returns a modal with a passed down prompt
  return (
    <div>
      {/* Material-UI component that provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else. */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          {/* Material-UI component that serves as a wrapper component for most of the CSS utility needs. */}
          <Box
            boxShadow={2}
            p={2}
            style={{
              width: "80%",
              margin: "10px auto",
              minWidth: "300px",
              borderRadius: "5px",
            }}
            bgcolor="background.paper"
          >
            <h2>{prompt}</h2>
            <form
              style={{
                minWidth: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ margin: "0px 5px" }}>
                {/* Material-Ui component that serves as a convenience wrapper */}
                <TextField
                  style={{ width: "100%" }}
                  id="promptAnswer"
                  type="text"
                  name="promptAnswer"
                  onChange={handleInputChange}
                />
              </div>
              {/* Material-UI component that allows users to take actions, and make choices, with a single tap. */}
              <Button
                style={{
                  margin: "25px 10px 25px auto",
                  display: "block",
                }}
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}//Material-UI icon component
                onClick={handleSubmit}
              >
                {buttonLabel}
              </Button>
            </form>
          </Box>
        </div>
      </Modal>
    </div>
  );
}