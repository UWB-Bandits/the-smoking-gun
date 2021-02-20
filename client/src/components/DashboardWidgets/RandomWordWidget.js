import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function WordCard({ randomWord }) {
  console.log(randomWord);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          {randomWord[0].word}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {randomWord[0].definition}
        </Typography>
        <Typography variant="body2" component="p">
          Pronunciation: {randomWord[0].pronunciation}
        </Typography>
      </CardContent>
    </Card>
  );
}

WordCard.propTypes = {
  randomWord: PropTypes.array,
  word: PropTypes.string,
  definition: PropTypes.string,
  pronunciation: PropTypes.string
};