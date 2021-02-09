import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: "grey",
    marginBottom: "10px"
  },
  title: {
    fontSize: 50,
    textAlign: "center",
  },
  date: {
    fontSize:25,
    textAlign: "center",
  }
});

let date = new Date();

date = date.toDateString();

export default function Jumbotron() {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          Welcome User!
        </Typography>
        <Typography className={classes.date} gutterBottom>
          {date}
        </Typography>
      </CardContent>
    </Card>
  );
}
