import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  
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
    </div>
  );

  return (
    <div>
        <React.Fragment key={"bottom"}>
          <Button onClick={toggleDrawer("bottom", true)}><InfoIcon/></Button>
          <Drawer anchor={"bottom"} open={state["bottom"]} onClose={toggleDrawer("bottom", false)}>
            {list("bottom")}
          </Drawer>
        </React.Fragment>
    </div>
  );
}