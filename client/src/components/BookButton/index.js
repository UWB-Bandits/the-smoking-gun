//import react
import React from "react";
//import Material-Ui
import { makeStyles } from "@material-ui/core/styles";
import { Link, Typography, Grid} from "@material-ui/core/";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//import logo
import BookLogo from "../../utils/images/book-logo.png";
//import components
import EditModal from "../EditModal";
import DeleteModal from "../DeleteModal";
//initialize useStyles variable that uses Material-UI's styling solution makeStyles() function
const useStyles = makeStyles((theme) => ({
  root:{
    margin:"10px",
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "10px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    width:"40%",
    
  },
  red: {
    backgroundColor: "#ca4541",
  },
  blue: {
    backgroundColor: "#0a8cbf"
  },
  green: {
    backgroundColor: "#477754"
  },
  yellow: {
    backgroundColor: "#E88821"
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "'Rock Salt', cursive",
    color: "black",
  },
  grid: {
    backgroundColor: "#DDDDDD",
    margin: theme.spacing(2),
    borderRadius:"10px",
    marginBottom:"30px",
  }
}));
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
  
  return(
    //Material-UI's Grid component sets up a responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts.
    <Grid item md={4} xs={6} >
      <div className={classes.grid}>
        {/*Material-UI's Link component allows you to easily customize anchor elements with your theme colors and typography styles.*/}
        <Link href={props.link} >
          {/*Material-UI's Typography component allows you to present your design and content as clearly and efficiently as possible.*/}
          <Typography className={classes.text} style={{marginTop:bookSize.pushTop, fontSize:bookSize.textSize}} gutterBottom variant="h5" component="h2">
            {/* displays the title of the book */}
            {props.title}
          </Typography>
          <Typography className={classes.text} style={{fontSize:bookSize.textSize}} variant="body2" color="textSecondary" component="p">
            {/* displays the description of the book */}
            {props.description}
          </Typography>
          {/**Material-UI's Card component contain content and actions about a single subject  */}
          <div className={classes.root +" " + classes[props.colorScheme]} ><img style={{width:"100%"}} src={BookLogo} /></div>
        </Link>
        {//checks the prop edit if true returns a clickable book with edit and delete options
          props.edit ?
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
        :
          <Grid style={{padding:10}}> </Grid>
        }
      </div>
    </Grid>
  );
}
