//import react and react hooks
import React, { useState, useEffect } from "react";
//import Material UI components
import Grid from "@material-ui/core/Grid";
//import components
import UpdateProfile from "../components/UpdateProfile/UpdateProfile";
import ChangeAvatar from "../components/ChangeAvatar/ChangeAvatar";
import SignOut from "../components/SignOut/SignOut";
import ChangePassword from "../components/ChangePassword/ChangePassword";
import SettingsNav from "../components/SettingsNav/SettingsNav";
//import route
import API from "../utils/API";
//import context
import { useAuth } from "../contexts/AuthContext";
//initialize Settings page
const Settings = () => {
  //set state hooks
  const [display, setDisplay] = useState("Update Profile");
  const [user, setUser] = useState({});
  //grab the current user info from context
  const { currentUser } = useAuth();
  //this side effect runs the functions which gets the user info from the database on page load
  useEffect(() => {
    getUser();
  }, []);
  //calls the database for the user info
  const getUser = () => {
    API.getUser(currentUser.uid)
      .then(res => {
        setUser(res.data);
      });
  };
  //sets the state of the display
  const changeDisplay = (e) => {
    setDisplay(e.target.textContent);
  };
  //gets the appropriate component based on what needs to be displayed
  const getComponent = (display) => {
    switch (display) {
      case "Change Avatar":
        return <ChangeAvatar user={user}/>;
      case "Sign Out":
        return <SignOut />;
      case "Change Password":
        return <ChangePassword />;
      default:
        return <UpdateProfile />;
    }
  };
  //this returns the settings page where a user can update their information or log out
  return (
    <div style={{backgroundColor:"rgba(255, 255, 255, 0.5)"}}>
      {/* The Material Design responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts. */}
      <Grid container>
        {/* custom component that returns the navigation through the various settings */}
        <SettingsNav changeDisplay={changeDisplay} display={display} />
        <Grid item xs={12}>
          {/* Determines which display needs to be shown and returns that */}
          {display === "Update Profile" ? (
            <UpdateProfile />
          ) : (
            getComponent(display)
          )}
        </Grid>
      </Grid>
    </div>
  );
};
//exports Settings page
export default Settings;
