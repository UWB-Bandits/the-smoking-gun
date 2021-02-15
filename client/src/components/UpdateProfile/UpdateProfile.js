import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
const UpdateProfile = () => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
            // autoComplete="current-password"
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
            // autoComplete="current-password"
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
