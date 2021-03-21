import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/Textfield";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
//import Material-Ui Lab
import Alert from "@material-ui/lab/Alert";
import { useAuth } from "../../contexts/AuthContext";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ForgotPassword() {
  //sets the state variable hooks
  const [formData, setFormData] = useState({
    email: ""
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const { passwordUpdate } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setError("");
  };
  
  const checkEmail = (email) => {
    // Regex for valid email
    const verifyEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const check = email.match(verifyEmail) ? true : false;
    check === true
      ? setError("")
      : setError("Please enter a valid email address.");
  };

  //this handles input changes by changing the name of the event to the value of the target
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
    console.log(formData);
  };
  //this handles the submit by sending it to the API call to the database
  const handleSubmit = () => {
    if (formData.email === "") {
      setError("Please enter a valid email address.");
    } else if (formData.email) {
      checkEmail(formData.email);
      passwordUpdate(formData.email);
    }
  };
  // this returns a modal that allows users to reset their password 
  return (
    <div style={{ textAlign: "right" }}>
      <Button color="primary" onClick={handleClickOpen}>
        Forgot password?
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Reset Password
        </DialogTitle>
        <DialogContent dividers>
          {/* Material UI Alert component displays a short, important message in a way that attracts the user's attention without interrupting the user's task. */}
          {error ? <Alert severity="error">{error}</Alert> : ""}
          <Typography gutterBottom>
            Please enter your email address used for your account to receive an email link to reset your password.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            variant="outlined" 
            onClick={handleClose} 
            color="primary"
          >
            Cancel
          </Button>
          <Button
            variant="contained" 
            autoFocus 
            onClick={handleSubmit} 
            color="primary"
          >
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
