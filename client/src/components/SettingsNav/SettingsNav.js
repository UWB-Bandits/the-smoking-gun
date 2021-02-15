import React from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import "./settings-nav.css";

const SettingsNav = (props) => {
  const { changeDisplay } = props;
  // const styles = {
  //   menuContainer: {
  //     display: "flex",
  //     justifyContent: "space-between",
  //     margin: ".5rem 0",
  //     background: "#232323",
  //     color: "#E0E0E0",
  //     textAlign: "center",
  //   },
  //   menuItems: {
  //     padding: ".5rem 3rem",
  //   },
  // };
  return (
    <Grid item xs={12} id="menuContainer">
      <h3 className="menuItems" onClick={changeDisplay}>
        Update Profile
      </h3>
      <h3 className="menuItems" onClick={changeDisplay}>
        Change Password
      </h3>
      <h3 className="menuItems" onClick={changeDisplay}>
        Change Avatar
      </h3>
      <h3 className="menuItems" onClick={changeDisplay}>
        Sign Out
      </h3>
    </Grid>
  );
};
SettingsNav.propTypes = {
  changeDisplay: PropTypes.func,
};
export default SettingsNav;
