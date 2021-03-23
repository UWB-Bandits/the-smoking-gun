//import react
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Fab from "@material-ui/core/Fab";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return (
    <MuiAlert elevation={6} variant="filled" {...props} />
  );
}

//initialize the ChangePassword component
const ChangePassword = () => {
  const [open, setOpen] = useState(false);
  const { currentUser, passwordUpdate } = useAuth();

  const handleClose = (event, reason) => {
     if (reason === "clickaway") {
       return;
     }
     setOpen(false);
  };

  const handleClick = () => {
    passwordUpdate(currentUser.email)
      .then(() => {
        setOpen(true);
      });
  };

  //return information on how to change your password
  return (
    <div style={{ textAlign: "center" }}>
      <h1>To reset your password, please</h1>
      <Fab
        variant="extended"
        style={{  
          color: "white",
          backgroundColor: "#474747",
          width:"150px" 
        }}
          onClick={handleClick}
      >
        Click Here
      </Fab>
      <h1>for a link to be sent via email.</h1>
      <h3>If you do not see the email, be sure to check your junk folder.</h3>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">Email has been sent!</Alert>
      </Snackbar>
    </div>
  );
};
//export the ChangePassword component
export default ChangePassword;
