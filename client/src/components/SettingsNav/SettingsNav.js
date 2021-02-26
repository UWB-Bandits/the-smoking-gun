//import react with useEffect method
import React, { useEffect } from "react";
// import Material-Ui component
import Grid from "@material-ui/core/Grid";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//import css
import "./settings-nav.css";
//initialize SettingsNav component that is handed down props
const SettingsNav = (props) => {
  //deconstruct variables from props
  const { changeDisplay, display } = props;
  //this lets you perform side effects in function component
  useEffect(() => {
    setClass();
  }, []);
  //this will set the class depending on the value
  const setClass = (value) => {
    return value === display ? "menuItems sn-active" : "menuItems";
  };
  //this returns a nav inside the account page with different menus
  return (
    // Material-UI's Grid component sets up a responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts.
    <Grid item xs={12} id="menuContainer">
      <p className={setClass("Update Profile")} onClick={changeDisplay}>
        Update Profile
      </p>
      <p className={setClass("Change Password")} onClick={changeDisplay}>
        Change Password
      </p>
      <p className={setClass("Change Avatar")} onClick={changeDisplay}>
        Change Avatar
      </p>
      <p className={setClass("Sign Out")} onClick={changeDisplay}>
        Sign Out
      </p>
    </Grid>
  );
};
//sets up prop types for the SettingsNav component
SettingsNav.propTypes = {
  changeDisplay: PropTypes.func,
  display: PropTypes.string,
};
// export SettingNav component
export default SettingsNav;
