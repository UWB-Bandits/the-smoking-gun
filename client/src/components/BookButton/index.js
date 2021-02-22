import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Card, Link, CardActionArea, CardContent, Typography, Grid} from "@material-ui/core/";
import PropTypes from "prop-types";
import BookLogo from "../../utils/images/book-logo.png";
import EditModal from "../EditModal";
import DeleteModal from "../DeleteModal";

const useStyles = makeStyles({
  root:{
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
    backgroundColor: "rgba(204, 204, 204, 0.75)",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default function BookButton(props) {
  const classes = useStyles();

  const { bookSize } = props;

  BookButton.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    description: PropTypes.string,
    colorScheme: PropTypes.string,
    edit: PropTypes.bool,
    id: PropTypes.string,
    bookSize: PropTypes.object
  };

  if (props.edit) {
    return(
      <Grid item md={4} xs={6}>
        <Link href={props.link}>
          <Card className={classes.root + " " + classes[props.colorScheme]} style={{width:bookSize.bookWidth, height:bookSize.bookWidth}}>
            <CardActionArea>
              <CardContent>
                <Typography className={classes.text} style={{marginTop:bookSize.pushTop, fontSize:bookSize.textSize}} gutterBottom variant="h5" component="h2">
                    {props.title}
                </Typography>
                <Typography className={classes.text} style={{fontSize:bookSize.textSize}} variant="body2" color="textSecondary" component="p">
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
