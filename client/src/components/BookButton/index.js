//import react
import React from "react";
//import Material-Ui
import { makeStyles } from "@material-ui/core/styles";
import {Card, Link, CardActionArea, CardContent, Typography, Grid} from "@material-ui/core/";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//import logo
import BookLogo from "../../utils/images/book-logo.png";
//import components
import EditModal from "../EditModal";
import DeleteModal from "../DeleteModal";
//initialize useStyles variable that uses Material-UI's styling solution makeStyles() function
const useStyles = makeStyles({
  root:{
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "10px",
    backgroundImage: `url(${BookLogo})`,
    backgroundSize: "100%",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  red: {
    backgroundColor: "#F07C5F",
  },
  blue: {
    backgroundColor: "#48C1F0"
  },
  green: {
    backgroundColor: "#78F07D"
  },
  yellow: {
    backgroundColor: "#F0B16C"
  },
  text: {
    backgroundColor: "rgba(204, 204, 204, 0.75)",
    textAlign: "center",
    fontWeight: "bold",
  },
});
//exports the BookButton component
export default function BookButton(props) {
  //initialize the classes variable with our useStyles hook
  const classes = useStyles();
  //deconstruct bookSize from props
  const { bookSize } = props;
  //sets up prop types for the BookButton component
  BookButton.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    description: PropTypes.string,
    colorScheme: PropTypes.string,
    edit: PropTypes.bool,
    id: PropTypes.string,
    bookSize: PropTypes.object
  };
  //checks the prop edit if true returns a clickable book with edit and delete options
  if (props.edit) {
    return(
      //Material-UI's Grid component sets up a responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts.
      <Grid item md={4} xs={6}>
        {/*Material-UI's Link component allows you to easily customize anchor elements with your theme colors and typography styles.*/}
        <Link href={props.link}>
          {/**Material-UI's Card component contain content and actions about a single subject  */}
          <Card className={classes.root + " " + classes[props.colorScheme]} style={{width:bookSize.bookWidth, height:bookSize.bookWidth}}>
            {/*Material-UI's CardActionArea component creates a clickable area inside a card component  */}
            <CardActionArea>
              {/*Material-UI's CardContent component is used to create the "body" of a card component  */}
              <CardContent>
                {/*Material-UI's Typography component allows you to present your design and content as clearly and efficiently as possible.*/}
                <Typography className={classes.text} style={{marginTop:bookSize.pushTop, fontSize:bookSize.textSize}} gutterBottom variant="h5" component="h2">
                  {/* displays the title of the book */}
                  {props.title}
                </Typography>
                <Typography className={classes.text} style={{fontSize:bookSize.textSize}} variant="body2" color="textSecondary" component="p">
                  {/* displays the description of the book */}
                  {props.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
        <Grid container justify="center">
          {/* this component brings up a modal with the ability to edit the book information  */}
          <EditModal 
          title={props.title}
          description={props.description}
          colorScheme={props.colorScheme}
          id={props.id}
          />
          {/* this component brings up a modal with the ability to delete the book from the database */}
          <DeleteModal
          title={props.title}
          id={props.id}
          type="book"
          />
        </Grid>
      </Grid>
    );
  }
  //this returns the create a book icon on the dashboard directs users to CreateBook page
  return (
    <Grid item md={4} xs={6}>
      <Link href={props.link}>
        <Card className={classes.root +" " + classes[props.colorScheme]} style={{width:bookSize.bookWidth, height:bookSize.bookWidth}}>
          <CardActionArea>
            <CardContent>
              <Typography className={classes.text + " " + classes.titleText} style={{marginTop:bookSize.pushTop, fontSize:bookSize.textSize}} gutterBottom variant="h5" component="h2">
                  {props.title}
              </Typography>
              <Typography className={classes.text} style={{fontSize:bookSize.textSize}} variant="body2" color="textSecondary" component="p">
                  {props.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
}
