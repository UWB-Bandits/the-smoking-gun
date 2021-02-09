import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import FormButtons from "../FormButtons/FormButtons";
import Box from "@material-ui/core/Box";

const SignInForm = (props) => {
  const { handleInputChange, setPage } = props;
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
            id="standard-password-input"
            label="Username"
            type="Username"
            name="username"
            autoComplete="current-password"
            onChange={handleInputChange}
          />
        </div>
        <FormControl>
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
        <FormControl>
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <Input
            id="confirmPassword"
            type={values.showConfirmPassword ? "text" : "password"}
            value={values.confirmPassword}
            name="confirm-password"
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
        <FormButtons
          button1="Sign Up"
          button2={["Have an account? ", "Log In"]}
          setPage={setPage}
        />
      </form>
    </Box>
  );
};

SignInForm.propTypes = {
  setPage: PropTypes.func,
  handleInputChange: PropTypes.func,
};

export default SignInForm;
