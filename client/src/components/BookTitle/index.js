import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: "grey",
    marginBottom: "20px",
    textAlign: "center"
  },
  title: {
    fontSize: 50,
    textAlign: "center",
  },
});

BookTitle.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default function BookTitle(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {props.title}
        </Typography>
        <Typography gutterBottom>
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
