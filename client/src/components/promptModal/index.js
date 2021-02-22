import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Box,
  TextField,
  Button
} from "@material-ui/core/";
import PropTypes from "prop-types";
import SaveIcon from "@material-ui/icons/Save";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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

export default function PromptModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const {handleSubmit, handleInputChange, prompt, open, handleClose, buttonLabel} = props;



  PromptModal.propTypes = {
    prompt: PropTypes.string,
    handleInputChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    buttonLabel: PropTypes.string,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
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
                <TextField
                  style={{ width: "100%" }}
                  id="promptAnswer"
                  type="text"
                  name="promptAnswer"
                  onChange={handleInputChange}
                />
              </div>
              <Button
                style={{
                  margin: "25px 10px 25px auto",
                  display: "block",
                }}
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
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