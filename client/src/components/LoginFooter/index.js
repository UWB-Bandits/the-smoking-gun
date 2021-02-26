import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
    backgroundColor: "black",
    padding: 15,
    color:"white"
  },
  phantom: {
    height: "100px",
    display: "block",
    width: "100%",
  },
});

export default function LoginFooter() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.phantom} />
      <div className={classes.root}>Designed By: The Bandits &#169; 2021</div>
    </div>
  );
}
