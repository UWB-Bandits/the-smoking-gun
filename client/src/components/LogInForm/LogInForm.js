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
const LogInForm = (props) => {
  const { handleInputChange, setPage } = props;
  const [values, setValues] = useState({
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
    >
      <h2>Log In</h2>
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
        <FormControl className={""} style={{ margin: "0px 5px" }}>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
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
        <FormButtons
          button1="Log In"
          button2={["Don't have an account? ", "Sign Up"]}
          setPage={setPage}
        />
      </form>
    </Box>
  );
};

LogInForm.propTypes = {
  setPage: PropTypes.func,
  handleInputChange: PropTypes.func,
};

export default LogInForm;
