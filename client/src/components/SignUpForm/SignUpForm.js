//import react with useState method
import React, { useState } from "react";
//import Material-UI components
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
//import Material-UI icons
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
//import Material-UI lab
import Alert from "@material-ui/lab/Alert";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//import components
import FormButtons from "../FormButtons/FormButtons";
//require in gravatar
import Tooltip from "@material-ui/core/Tooltip";
import { uiConfig, auth } from "../../utils/firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const useGravatar = require("gravatar");
//initialize SignUpForm component that is handed down props
const SignUpForm = (props) => {
  //deconstruct variables from props
  const {
    handleInputChange,
    setPage,
    handleSubmit,
    loading,
    error,
    checkEmail,
    formData,
    checkPassword,
  } = props;
  //set state variable hooks
  const [values, setValues] = useState({
    confirmPassword: "",
    showConfirmPassword: false,
    password: "",
    showPassword: false,
  });
  // FirebaseUI


  // __________________________GRAVATAR________________________________________
  const [gravatar, setGravatar] = useState({
    standard:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    retro:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    robohash:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    wavatar:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    monsterid:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    identicon:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  });
  //this grabs new Gravatar url images to use as avatars
  const getGravatar = () => {
    let standard = useGravatar.url(formData.email, { s: "100" }, true);
    let retro = useGravatar.url(
      formData.email,
      { s: "100", r: "pg", d: "retro" },
      true
    );
    let robohash = useGravatar.url(
      formData.email,
      { s: "100", r: "pg", d: "robohash" },
      true
    );
    let wavatar = useGravatar.url(
      formData.email,
      { s: "100", r: "pg", d: "wavatar" },
      true
    );
    let monsterid = useGravatar.url(
      formData.email,
      { s: "100", r: "pg", d: "monsterid" },
      true
    );
    let identicon = useGravatar.url(
      formData.email,
      { s: "100", r: "pg", d: "identicon" },
      true
    );
    setGravatar({
      standard: standard,
      retro: retro,
      robohash: robohash,
      wavatar: wavatar,
      monsterid: monsterid,
      identicon: identicon,
    });
  };
  // __________________________INPUT/CLICK FUNCTIONS________________________________________
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    getGravatar();
    handleInputChange(event);
  };
  //this handles show/hide password  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  //this handles confirmation of password
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
    // Material-UI component that serves as a wrapper component for most of the CSS utility needs.
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
      <h2>Sign Up</h2>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "3rem",
        }}
      >
        {/*  Material UI Alert component displays a short, important message in a way that attracts the user's attention without interrupting the user's task. */}
        {error && <Alert severity="error">{error}</Alert>}

        <div style={{ margin: "0px 5px" }}>
          <Tooltip
            placement="top"
            title="Needs to be a valid email example: name@email.com"
          >
            {/* _______________________email______________________________________________ */}
            <TextField
              style={{ width: "100%" }}
              id="email-input"
              label="Email *"
              type="email"
              name="email"
              onBlur={checkEmail}
              onChange={handleInputChange}
            />
          </Tooltip>
          {/* _______________________set password______________________________________________ */}
          <Tooltip
            placement="top"
            title="Password needs to be 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter."
          >
            <FormControl style={{ width: "100%" }}>
              <InputLabel htmlFor="password">Password *</InputLabel>
              <Input
                id="password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                onChange={handleChange("password")}
                onBlur={checkPassword}
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
          </Tooltip>
          {/* _______________________confirm password______________________________________________ */}
          <Tooltip placement="top" title="Needs to match password field.">
            <FormControl style={{ width: "100%" }}>
              <InputLabel htmlFor="confirmPassword">
                Confirm Password *
              </InputLabel>
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
          </Tooltip>
        </div>
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
        {/* ________________________ gravatar _____________________________________________ */}
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
              onChange={handleInputChange}
            >
              <FormControlLabel
                labelPlacement="top"
                value={gravatar.standard}
                control={<Radio />}
                label={<img src={gravatar.standard} alt="Default" />}
              />
              <FormControlLabel
                labelPlacement="top"
                value={gravatar.retro}
                control={<Radio />}
                label={<img src={gravatar.retro} alt="Retro" />}
              />
              <FormControlLabel
                labelPlacement="top"
                value={gravatar.robohash}
                control={<Radio />}
                label={<img src={gravatar.robohash} alt="Robohash" />}
              />
              <FormControlLabel
                labelPlacement="top"
                value={gravatar.wavatar}
                control={<Radio />}
                label={<img src={gravatar.wavatar} alt="Wavatar" />}
              />
              <FormControlLabel
                labelPlacement="top"
                value={gravatar.monsterid}
                control={<Radio />}
                label={<img src={gravatar.monsterid} alt="Monsterid" />}
              />
              <FormControlLabel
                labelPlacement="top"
                value={gravatar.identicon}
                control={<Radio />}
                label={<img src={gravatar.identicon} alt="Identicon" />}
              />
            </RadioGroup>
          </FormControl>
        </div>
        
        <FormButtons
          button1="Sign Up"
          button2={["Have an account? ", "Log In"]}
          setPage={setPage}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </form>
      <div>
          <h2>Or sign in with:</h2>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} /> 
      </div>
    </Box>
  );
};
//sets up prop types for the SignUpForm component
SignUpForm.propTypes = {
  setPage: PropTypes.func,
  handleInputChange: PropTypes.func,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  error: PropTypes.string,
  formData: PropTypes.object,
  checkEmail: PropTypes.func,
  checkPassword: PropTypes.func,
};
//exports SignUpForm component
export default SignUpForm;
