import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Card, Link, CardActionArea, CardContent, Typography, Grid} from "@material-ui/core/";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root:{
    width: "95%",
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "10px"
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
});

export default function BookButton(props) {
  const classes = useStyles();

  BookButton.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    colorScheme: PropTypes.string
  };

  return (
    <Grid item xs={6}>
    <Link href={props.link}>
        <Card className={classes.root +" " + classes[props.colorScheme]}>
        <CardActionArea>
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {props.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {props.description}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    </Link>

    </Grid>
  );
}
