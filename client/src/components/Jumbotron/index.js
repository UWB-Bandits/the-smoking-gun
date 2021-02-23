import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Hero from "../../utils/images/hero.jpg";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: "10px",
    backgroundImage: `url(${Hero})`,
    backgroundSize: "100%"
  },
  title: {
    fontSize: 30,
    fontFamily: "'Rock Salt', cursive",
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "rgba(204, 204, 204, 0.5)"
  },
  date: {
    fontSize:25,
    textAlign: "center",
    backgroundColor: "rgba(204, 204, 204, 0.5)",
    fontFamily: "'Raleway', sans-serif",
  }
});

let date = new Date();

date = date.toDateString();

export default function Jumbotron(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          Welcome {props.userName}!
        </Typography>
        <Typography className={classes.date} gutterBottom>
          {date}
        </Typography>
      </CardContent>
    </Card>
  );
}

Jumbotron.propTypes = {
  userName: PropTypes.string,
};
