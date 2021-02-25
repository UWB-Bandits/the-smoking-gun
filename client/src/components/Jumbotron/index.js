//import react
import React from "react";
//import Material-Ui function
import { makeStyles } from "@material-ui/core/styles";
//import Material-Ui components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
//import image
import Hero from "../../utils/images/hero.jpg";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//initialize useStyles variable that uses Material-UI's styling solution makeStyles() function
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
//initialize a date variable and assign a new date
let date = new Date();
//turn the date variable into a string
date = date.toDateString();
//export and initialize the Jumbotron component that is handed down props
export default function Jumbotron(props) {
  //initialize the classes variable with our useStyles hook
  const classes = useStyles();
  //this returns a jumbotron with a background image that welcomes users to the site by name and displays todays date. 
  return (
    //Material-UI's Card component contain content and actions about a single subject
    <Card className={classes.root} variant="outlined">
      {/* Material-UI's CardContent component is used to create the "body" of a card component */}
      <CardContent>
        {/* Material-UI's Typography component allows you to present your design and content as clearly and efficiently as possible. */}
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
//sets up prop types for the Jumbotron component
Jumbotron.propTypes = {
  userName: PropTypes.string,
};