import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import UpdateProfile from "../components/UpdateProfile/UpdateProfile";
import ChangeAvatar from "../components/ChangeAvatar/ChangeAvatar";
import SignOut from "../components/SignOut/SignOut";
import ChangePassword from "../components/ChangePassword/ChangePassword";
import SettingsNav from "../components/SettingsNav/SettingsNav";

const Settings = () => {
  const [display, setDisplay] = useState("Update Profile");

  const changeDisplay = (e) => {
    setDisplay(e.target.textContent);
  };

  const getComponent = (display) => {
    switch (display) {
      case "Change Avatar":
        return <ChangeAvatar />;
      case "Sign Out":
        return <SignOut />;
      case "Change Password":
        return <ChangePassword />;
      default:
        return <UpdateProfile />;
    }
  };

  return (
    <div>
      <Grid container>
        <SettingsNav changeDisplay={changeDisplay} />
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
