import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    bottom: "60px",
    maxHeight: "200px",
    maxWidth: "300px",
    border: "3px solid #000000",
    padding: "10px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    float: "inherit",
    margin: "10px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  pos: {
    marginBottom: 12,
  },
});

export default function WordCard({ randomWord }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Typography variant="h5" component="h2">
        Word of the Day
      </Typography>
      <Typography className={classes.title} variant="h5" component="h2">
        {randomWord[0].word}
      </Typography>
      <Typography className={classes.pos} color="textSecondary">
        {randomWord[0].definition}
      </Typography>
      <Typography variant="body2" component="p">
        Pronunciation: {randomWord[0].pronunciation}
      </Typography>
    </Card>
  );
}

WordCard.propTypes = {
  randomWord: PropTypes.array,
  word: PropTypes.string,
  definition: PropTypes.string,
  pronunciation: PropTypes.string
};