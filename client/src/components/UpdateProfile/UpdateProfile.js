import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { Button, Link } from "@material-ui/core";
import API from "../../utils/API";
import { useAuth } from "../../contexts/AuthContext";
import { Alert, AlertTitle } from "@material-ui/lab";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "" });
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const { mongoID } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    API.updateUser(mongoID, formData)
      .then(() => {
        setMessage(
          "Update Complete go back to the dashboard to view the change"
        );
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to update user");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError();
    setMessage();
  };

  return (
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
      {message && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          {message}— <Link href="/dashboard">check it out!</Link>
        </Alert>
      )}
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}— <strong>check your connection!</strong>
        </Alert>
      )}
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
          <TextField
            style={{ width: "100%" }}
            id="first-name-input"
            label="First Name"
            type="firstName"
            name="firstName"
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
            onChange={handleInputChange}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ margin: "1rem .5rem" }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default UpdateProfile;
