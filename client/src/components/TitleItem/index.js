import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

import ThemeContext from "../../contexts/ThemeContext";
import BookThemes from "../../Colors";

// const useStyles = makeStyles({
//   root: {
//     minWidth: 275,
//     backgroundColor: bookTheme.backgroundColor,
//     marginBottom: "20px",
//     textAlign: "center"
//   },
//   title: {
//     fontSize: 50,
//     textAlign: "center",
//   },
// });

TitleItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default function TitleItem(props) {
  const bookTheme = useContext(ThemeContext);
  const currentTheme = BookThemes[bookTheme];
  // console.log(bookTheme);

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      // backgroundColor: bookTheme.blue.backgroundColor,
      marginBottom: "20px",
      textAlign: "center"
    },
    title: {
      fontSize: 50,
      textAlign: "center",
    },
  });

  const classes = useStyles();


  return (
    <Card className={classes.root} variant="outlined" style={{backgroundColor: `${currentTheme.backgroundColor}`}}>
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
