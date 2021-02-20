import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      position: "sticky",
      bottom: "60px",
      maxHeight: "200px",
      maxWidth: "200px",
      // height: "auto",
      width: "auto",
      border: "3px solid #000000",
      padding: "10px",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      float: "inherit",
      overflow: "auto"
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12,
      float: "right",
      textAlign: "center"
    },
});

export default function News({ news }) {
    const classes = useStyles();

    console.log(news);
    let abstract = news.abstract;
    let byline = news.byline;
    let published = new Date(news.published_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
    let articleLink = news.short_url;
    let title = news.title;
  
    return (
      <Card className={classes.root}>
        <Typography variant="h5" component="h2">
            New York Times Top Stories
            <Typography className={classes.title} color="textSecondary">
                <a href={articleLink} target="_blank" rel="noopener noreferrer">
                  {title}
                </a>
            </Typography>
            <Typography className={classes.title} color="textSecondary">
                Published: {published}
            </Typography>
            <Typography className={classes.title} color="textSecondary">
                {abstract}
            </Typography>
            <Typography className={classes.title} color="textSecondary">
                {byline}
            </Typography>
        </Typography>
        <CardContent>
          {/* <Typography className={classes.pos} color="textSecondary">
            {abstract}
            {byline}
          </Typography> */}
        </CardContent>
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
        <Typography variant="body2" component="p">
            
        </Typography>
      </Card>
    );
  }

  News.propTypes = {
    news: PropTypes.object,
    abstract: PropTypes.string,
    byline: PropTypes.string,
    published: PropTypes.string,
    articleLink: PropTypes.string,
    title: PropTypes.string
};