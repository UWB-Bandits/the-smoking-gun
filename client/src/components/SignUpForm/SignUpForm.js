import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import PropTypes from "prop-types";
import FormButtons from "../FormButtons/FormButtons";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Alert from "@material-ui/lab/Alert";
const SignInForm = (props) => {
  const {
    handleInputChange,
    setPage,
    handleSubmit,
    loading,
    error,
    // formData,
  } = props;
  const [values, setValues] = useState({
    confirmPassword: "",
    showConfirmPassword: false,
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    handleInputChange(event);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
      <h2>Sign Up</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          minWidth: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {error && <Alert severity="error">{error}</Alert>}
        <div style={{ margin: "0px 5px" }}>
          <TextField
            style={{ width: "100%" }}
            id="email-input"
            label="Email"
            type="email"
            name="email"
            // autoComplete="current-password"
            onChange={handleInputChange}
          />
          <FormControl style={{ width: "100%" }}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              name="password"
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl style={{ width: "100%" }}>
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <Input
              id="confirmPassword"
              type={values.showConfirmPassword ? "text" : "password"}
              value={values.confirmPassword}
              name="confirmPassword"
              onChange={handleChange("confirmPassword")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showConfirmPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
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
        {/* ________________________ profile pic_____________________________________________ */}
        <div style={{ margin: "10px 0px" }}>
          <FormControl component="fieldset">
            <FormLabel style={{ margin: "10px 0px" }} component="legend">
              Choose Your Avatar.
            </FormLabel>
            <RadioGroup
              row
              defaultValue="image one"
              aria-label="profile-pic"
              name="profilePic"
              // value={FormData.avatar}
              onChange={handleInputChange}
            >
              <FormControlLabel
                labelPlacement="top"
                value={"image one"}
                control={<Radio />}
                label="Image One"
              />
              <FormControlLabel
                labelPlacement="top"
                value="image two"
                control={<Radio />}
                label="Image Two"
              />
              <FormControlLabel
                labelPlacement="top"
                value="image three "
                control={<Radio />}
                label="Image Three"
              />
              <FormControlLabel
                labelPlacement="top"
                value="image four"
                // disabled
                control={<Radio />}
                label="Image four"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <FormButtons
          button1="Sign Up"
          button2={["Have an account? ", "Log In"]}
          setPage={setPage}
          loading={loading}
        />
      </form>
    </Box>
  );
};

SignInForm.propTypes = {
  setPage: PropTypes.func,
  handleInputChange: PropTypes.func,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  error: PropTypes.string,
  // formData: PropTypes.object,
};

export default SignInForm;
