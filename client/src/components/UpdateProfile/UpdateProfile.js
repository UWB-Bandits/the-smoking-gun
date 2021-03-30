//import react with useState method
import React, { useState } from "react";
//import Material-UI components
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { Fab, Link } from "@material-ui/core";
//import Material-UI labs
import { Alert, AlertTitle } from "@material-ui/lab";
//import API routes
import API from "../../utils/API";
//import context
import { useAuth } from "../../contexts/AuthContext";
//initialize UpdateProfile component
const UpdateProfile = () => {
  //set state variable hooks
  const [formData, setFormData] = useState({ firstName: "", lastName: "" });
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  //deconstruct mongoID from context
  const { mongoID } = useAuth();
  //this handles the submit on update profile
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName === "") {
      setError("Please enter your first name.");
    } else if (formData.lastName === "") {
      setError("Please enter your last name.");
    } else {
      setError("");
      API.updateUser(mongoID, formData)
        .then(() => {
          setMessage(
            "Your name has been updated. Go back to the dashboard to view the change"
          );
        })
        .catch((err) => {
          console.log(err);
          setError("Failed to update user");
        });
    }
  };
  //this handles changes to the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError();
    setMessage();
  };
  //this returns a form to allow users to change their first and last name in the account page
  return (
    // Material-UI component that serves as a wrapper component for most of the CSS utility needs.
    <Box
      boxShadow={2}
      p={2}
      style={{
        width: "70%",
        maxWidth: "400px",
        margin: "10px auto",
        minWidth: "300px",
        borderRadius: "5px",
      }}
      bgcolor="background.paper"
    >
      {/* Material UI Alert component displays a short, important message in a way that attracts the user's attention without interrupting the user's task. */}
      {message && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          {message}— <Link href="/dashboard">check it out!</Link>
        </Alert>
      )}
      {error && <Alert severity="error">{error}</Alert>}
      <h2>Update Profile</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          minWidth: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* _______________________first name______________________________________________ */}
        <div style={{ margin: "0px 5px" }}>
          {/* Material-Ui component that serves as a convenience wrapper */}
          <TextField
            style={{ width: "100%" }}
            id="first-name-input"
            label="First Name"
            type="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        {/* _________________________ last name ____________________________________________ */}
        <div style={{ margin: "0px 5px" }}>
          <TextField
            style={{ width: "100%" }}
            id="last-name-input"
            label="Last Name"
            type="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        {/* Material-UI component that allows users to take actions, and make choices, with a single tap. */}
        <Fab
          variant="extended"
          onClick={handleSubmit}
          style={{ 
            margin: "1rem .5rem", 
            color: "white",
            backgroundColor: "#474747",
            width:"100px"
          }}
        >
          Submit
        </Fab>
      </form>
    </Box>
  );
};

export default UpdateProfile;
