//import react
import React from "react";
//import Material-Ui functions
import { makeStyles } from "@material-ui/core/styles";
//import Material-Ui components
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
//import Material-Ui icons
import SettingsIcon from "@material-ui/icons/Settings";
import HomeIcon from "@material-ui/icons/Home";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
//initialize useStyles variable that uses Material-UI's styling solution makeStyles() function
const useStyles = makeStyles({
  root: {
    textAlign: "center",
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
    backgroundColor: "#DDDDDD",
    borderTopColor: "#474747",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    color: "#474747"
  },
  phantom: {
    height: "50px",
    display: "block",
    width: "100%",
  },
});
//exports the SimpleBottomNavigation component
export default function SimpleBottomNavigation() {
  //initialize the classes variable with our useStyles hook
  const classes = useStyles();
  //this returns footer with icons that send the user to various parts of the webpage
  return (
    <div id="footer">
      <div className={classes.phantom} />
      {/*Material-UI's BottomNavigation allows movement between primary destinations in an app. */}
      <BottomNavigation showLabels className={classes.root}>
        {/*Material-UI's BottomNavigationAction is used to wrap the action within the BottomNavigation component */}
        <BottomNavigationAction
          href="/dashboard"
          label="Dashboard"
          icon={<HomeIcon />}//Material-UI's Icon
          style={{color:"#474747"}}
        />
        <BottomNavigationAction
          href="/create-book"
          label="Create New Book"
          icon={<ImportContactsIcon />}//Material-UI's Icon
          style={{color:"#474747"}}
        />
        <BottomNavigationAction
          href="/settings"
          label="Settings"
          icon={<SettingsIcon />}//Material-UI's Icon
          style={{color:"#474747"}}
        />
      </BottomNavigation>
    </div>
  );
}
