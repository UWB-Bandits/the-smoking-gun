import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SettingsIcon from "@material-ui/icons/Settings";
import HomeIcon from "@material-ui/icons/Home";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
  },
  phantom: {
    height: "50px",
    display: "block",
    width: "100%",
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();

  return (
    <div id="footer">
      <div className={classes.phantom} />
      <BottomNavigation showLabels className={classes.root}>
        <BottomNavigationAction
          href="/dashboard"
          label="Dashboard"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          href="/create-book"
          label="Create New Book"
          icon={<ImportContactsIcon />}
        />
        <BottomNavigationAction
          // onClick={Settings}
          href="/settings"
          label="Settings"
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    </div>
  );
}
