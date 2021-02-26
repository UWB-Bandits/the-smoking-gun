//import react
import React from "react";
//import utility for constructing className strings conditionally.
import clsx from "clsx";
//import Material-UI function
import { makeStyles } from "@material-ui/core/styles";
//import Material-UI components
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
//import Material-UI Icon
import InfoIcon from "@material-ui/icons/Info";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//initialize useStyles variable that uses Material-UI's styling solution makeStyles() function
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});
//initialize and export TemporaryDrawer component that is passed props
export default function TemporaryDrawer(props) {
  //initialize the classes variable with our useStyles hook
  const classes = useStyles();
  //set state hook
  const [state, setState] = React.useState({
    left: false,
  });
  //this function lits for key dow tab or shift events and sets the state 
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  //this sets the anchor to the screen and displays information to the user
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <h2>Instructions</h2>
        <ul>
        <li>Touch and hold a date and to create a new event</li>
        <li>Drag, drop, and resize events</li>
        <li>Touch an event to delete it</li>
        </ul>
        <label>
            <input
              type="checkbox"
              checked={props.weekends}
              onChange={props.toggle}
            ></input>
            Show weekends
          </label>
          <div>
          <h2>All Events ({props.currentEvents.length})</h2>
          <ul>
            {props.currentEvents.map(props.renderInfoDrawerEvent)}
          </ul>
        </div>
    </div>
  );
//this returns a drawer that opens from the bottom on the calendar page
  return (
    <div>
        <React.Fragment key={"bottom"}>
          <Button onClick={toggleDrawer("bottom", true)}><InfoIcon/></Button>
          {/*Material-UI Navigation drawers provide access to destinations in your app.*/}
          <Drawer anchor={"bottom"} open={state["bottom"]} onClose={toggleDrawer("bottom", false)}>
            {list("bottom")}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
//sets up prop types for the TemporaryDrawer component
TemporaryDrawer.propTypes = {
  weekends: PropTypes.bool,
  toggle: PropTypes.func,
  currentEvents: PropTypes.array,
  renderInfoDrawerEvent: PropTypes.func
};