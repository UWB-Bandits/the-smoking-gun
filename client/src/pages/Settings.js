import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import UpdateProfile from "../components/UpdateProfile/UpdateProfile";
import ChangeAvatar from "../components/ChangeAvatar/ChangeAvatar";
import SignOut from "../components/SignOut/SignOut";
import ChangePassword from "../components/ChangePassword/ChangePassword";
import SettingsNav from "../components/SettingsNav/SettingsNav";
import API from "../utils/API";
import { useAuth } from "../contexts/AuthContext";

const Settings = () => {
  const [display, setDisplay] = useState("Update Profile");
  const [user, setUser] = useState({});
  const { currentUser } = useAuth();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    API.getUser(currentUser.uid)
      .then(res => {
        setUser(res.data);
      });
  };

  const changeDisplay = (e) => {
    setDisplay(e.target.textContent);
  };

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

  return (
    <div style={{backgroundColor:"rgba(255, 255, 255, 0.5)"}}>
      <Grid container>
        <SettingsNav changeDisplay={changeDisplay} display={display} />
        <Grid item xs={12}>
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

export default Settings;
