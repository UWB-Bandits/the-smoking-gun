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
import Alert from "@material-ui/lab/Alert";

const LogInForm = (props) => {
  const { handleInputChange, setPage, handleSubmit, loading, error } = props;
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
        width: "80%",
        marginTop: "10px",
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: "75px",
        borderRadius: "5px",
      }}
      bgcolor="background.paper"
    >
      <h2>Log In</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {error ? <Alert severity="error">{error}</Alert> : ""}

        <div style={{ margin: "0px 5px" }}>
          <TextField
            style={{ width: "100%" }}
            id="login-email-input"
            label="Email"
            type="email"
            name="email"
            autoComplete="current-password"
            onChange={handleInputChange}
          />
        </div>
        <FormControl className={""} style={{ margin: "0px 5px" }}>
          <InputLabel htmlFor="login-password">Password</InputLabel>
          <Input
            id="login-password"
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
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </form>
    </Box>
  );
};

LogInForm.propTypes = {
  setPage: PropTypes.func,
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default LogInForm;
