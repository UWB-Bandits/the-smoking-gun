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
// import fire from "../../utils/firebase";

const SignInForm = (props) => {
  const { handleInputChange, setPage, handleSubmit } = props;
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
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   test.createUserWithEmailAndPassWord(formData.email, formData.password);
  // };
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(`submitted email:
  //         ${formData.email} password: ${formData.password} confirm: ${formData.confirmPassword}`);

  //   if (formData.password === formData.confirmPassword) {
  //     fire
  //       .auth()
  //       .createUserWithEmailAndPassword(formData.email, formData.password);
  //     // console.log("they Match");
  //   } else {
  //     console.log("passwords don't match");
  //   }
  // };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // console.log(formData);

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
        <div style={{ margin: "0px 5px" }}>
          <TextField
            style={{ width: "100%" }}
            id="standard-password-input"
            label="Email"
            type="email"
            name="email"
            autoComplete="current-password"
            onChange={handleInputChange}
          />
        </div>
        <FormControl style={{ margin: "0px 5px" }}>
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
        <FormControl style={{ margin: "0px 5px" }}>
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
        <FormButtons
          button1="Sign Up"
          button2={["Have an account ", "Log In"]}
          setPage={setPage}
        />
      </form>
    </Box>
  );
};

SignInForm.propTypes = {
  setPage: PropTypes.func,
  handleInputChange: PropTypes.func,
  // formData: PropTypes.object,
  handleSubmit: PropTypes.func,
};

export default SignInForm;
