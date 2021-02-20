import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Card, Link, CardActionArea, CardContent, Typography, Grid} from "@material-ui/core/";
import PropTypes from "prop-types";
import BookLogo from "../../utils/images/book-logo.png";
import EditModal from "../EditModal";
import DeleteModal from "../DeleteModal";


const useStyles = makeStyles({
  root:{
    width: "175px",
    height: "175px",
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "10px",
    backgroundImage: `url(${BookLogo})`,
    backgroundSize: "100%"
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
    marginTop: "20px",
    backgroundColor: "rgba(204, 204, 204, 0.5)",
    textAlign: "center",
    fontWeight: "bold",
  }
});

export default function BookButton(props) {
  const classes = useStyles();

  BookButton.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    colorScheme: PropTypes.string,
    edit: PropTypes.bool,
    id: PropTypes.string
  };

  if(props.edit){
    return(
      <Grid item md={4} xs={6}>
        
    <Link href={props.link}>
        <Card className={classes.root +" " + classes[props.colorScheme]}>
        
        <CardActionArea>
            <CardContent>
            <Typography className={classes.text} gutterBottom variant="h5" component="h2">
                {props.title}
            </Typography>
            <Typography className={classes.text} variant="body2" color="textSecondary" component="p">
                {props.description}
            </Typography>
            </CardContent>
        </CardActionArea>
        
        </Card>
    </Link>
    <Grid container justify="center" >
          <EditModal 
          title={props.title}
          description={props.description}
          colorScheme={props.colorScheme}
          id={props.id}
          />
          <DeleteModal
          title={props.title}
          id={props.id}
          />
        </Grid>
    </Grid>
    );
  }

  return (
    <Grid item md={4} xs={6}>
    <Link href={props.link}>
        <Card className={classes.root +" " + classes[props.colorScheme]}>
        <CardActionArea>
            <CardContent>
            <Typography className={classes.text} gutterBottom variant="h5" component="h2">
                {props.title}
            </Typography>
            <Typography className={classes.text} variant="body2" color="textSecondary" component="p">
                {props.description}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    </Link>
    </Grid>
  );
}
