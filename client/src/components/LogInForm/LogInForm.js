//import react with useState method
import React, { useState } from "react";
//import Material-Ui components
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
//import Material-Ui Icons
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
//import Material-Ui Lab
import Alert from "@material-ui/lab/Alert";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//import components
import FormButtons from "../FormButtons/FormButtons";
// import ForgotPassword component
import ForgotPassword from "../ChangePassword/ForgotPassword";
//import firebase
import { uiConfig, auth } from "../../utils/firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
//initialize LogInForm component
const LogInForm = (props) => {
  const { handleInputChange, setPage, handleSubmit, loading, error } = props;
  //initialize state hooks
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  //this handles changes in the form and sets value state to the current value of the event target
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    handleInputChange(event);
  };
  //this shows/hides the user password they have entered
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  //this returns a form that allows users to login
  return (
    //Material-UI component that serves as a wrapper component for most of the CSS utility needs.
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
        backgroundColor:"#DDDDDD"
      }}
    >
      <h2>Log In</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Material UI Alert component displays a short, important message in a way that attracts the user's attention without interrupting the user's task. */}
        {error ? <Alert severity="error">{error}</Alert> : ""}

        <div style={{ margin: "0px 5px" }}>
          {/* Material-Ui component that serves as a convenience wrapper */}
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
        {/* Material-Ui component that provides context such as filled/focused/error/required for form inputs. */}
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
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <ForgotPassword />
        </FormControl>
        {/* This is custom made component to provide buttons as needed */}

        <FormButtons
          button1="Log In"
          button2={["Don't have an account? ", "Sign Up"]}
          setPage={setPage}
          loading={loading}
          handleSubmit={handleSubmit}
        />
        
        <div>
          <h2>Or sign in with:</h2>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} /> 
        </div>
      </form>
    </Box>
  );
};
//sets up prop types for the LogInForm component
LogInForm.propTypes = {
  setPage: PropTypes.func,
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string,
};
//exports LogInForm component
export default LogInForm;
