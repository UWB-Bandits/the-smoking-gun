//import react
import React from "react";
//import material-ui function
import { makeStyles } from "@material-ui/core/styles";
//import material-ui components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//sets up prop types for the TitleItem component
TitleItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
//initialize useStyles variable that uses Material-UI's styling solution makeStyles() function
const useStyles = makeStyles({
  root: {
    marginBottom: "20px",
    textAlign: "center"
  },
  title: {
    fontSize: 50,
    textAlign: "center",
    fontFamily: "'Rock Salt', cursive",
  },
});
//initialize and export TitleItem component
export default function TitleItem(props) {
  //initialize the classes variable with our useStyles hook
  const classes = useStyles();
  //this returns a card with the title and description of the book
  return (
    // Material-UI's Card component contain content and actions about a single subject 
    <Card className={`${classes.root} background`} variant="outlined">
      {/* Material-UI's CardContent component is used to create the "body" of a card component*/}
      <CardContent>
        {/* Material-UI's Typography component allows you to present your design and content as clearly and efficiently as possible. */}
        <Typography className={classes.title} gutterBottom>
          {props.title}
        </Typography>
        <Typography style={{fontFamily: "'Rock Salt', cursive",}}>
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
