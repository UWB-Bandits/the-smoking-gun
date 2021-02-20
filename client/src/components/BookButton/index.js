import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Card, Link, CardActionArea, CardContent, Typography, Grid} from "@material-ui/core/";
import PropTypes from "prop-types";
import BookLogo from "../../utils/images/book-logo.png";


let bookWidth;
let pushTop;
let textSize;
var width = window.innerWidth;

window.onresize = () => {
  let newWidth = window.innerWidth;
  if ((width>1100 && newWidth<1100)||(width>550 && newWidth<550)||(width>340 && newWidth<340)||(width<1100 && newWidth>1100)||(width<550 && newWidth>550)||(width<340 && newWidth>340)){
    location.reload();
  }
};

if (width>1100) {
  bookWidth= "350px";
  pushTop= "100px";
  textSize = "30px";
} else if (width>550) {
  bookWidth= "250px";
  pushTop= "50px";
  textSize = "25px";
} else if (width>340) {
  bookWidth= "150px";
  pushTop="15px";
  textSize = "15px";
} else {
  bookWidth= "120px";
  pushTop="10px";
  textSize = "12px";
}

const useStyles = makeStyles({
  root:{
    width: bookWidth,
    height: bookWidth,
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
    fontSize: textSize
  },
  titleText:{
    marginTop: pushTop
  }
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
    <Grid item md={4} xs={6}>
    <Link href={props.link}>
        <Card className={classes.root +" " + classes[props.colorScheme]}>
        <CardActionArea>
            <CardContent>
            <Typography className={classes.text + " " + classes.titleText} gutterBottom variant="h5" component="h2">
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
