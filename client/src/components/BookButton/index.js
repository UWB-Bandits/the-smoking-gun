import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Card, Link, CardActionArea, CardContent, Typography, Grid} from "@material-ui/core/";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "grey"
  },
  media: {
    minHeight: 140,
  },
});

export default function BookButton(props) {
  const classes = useStyles();

  BookButton.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

  return (
    <Grid item xs={6}>
    <Link href={props.link}>
        <Card className={classes.root}>
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
