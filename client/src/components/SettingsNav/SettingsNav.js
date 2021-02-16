import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import "./settings-nav.css";

const SettingsNav = (props) => {
  const { changeDisplay, display } = props;

  useEffect(() => {
    setClass();
  }, []);

  const setClass = (value) => {
    return value === display ? "menuItems sn-active" : "menuItems";
  };

  return (
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
SettingsNav.propTypes = {
  changeDisplay: PropTypes.func,
  display: PropTypes.string,
};
export default SettingsNav;
