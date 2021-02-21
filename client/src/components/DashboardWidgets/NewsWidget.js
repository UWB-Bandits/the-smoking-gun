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
      overflow: "auto"
    },
    title: {
      fontSize: 14,
    },
    date: {
      fontSize: 12,
      textAlign: "right"
    },
});

export default function News({ news }) {
    const classes = useStyles();

    // console.log(news);
  
    return (
      <Card className={classes.root}>
        <Typography variant="h5" component="h2">
          New York Times 
        </Typography>
        <Typography variant="h5" component="h2">
          Top Stories
        </Typography>
          {news.map((item) => (
            <div key={item.published_date}>
              <Typography className={classes.title} color="textSecondary">
                <a href={item.short_url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </Typography>
              <Typography className={classes.date} color="textSecondary">
                Published: {new Date(item.published_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })}
              </Typography>
              <Typography className={classes.title} color="textSecondary">
                  {item.abstract}
              </Typography>
              <Typography className={classes.date} color="textSecondary">
                  {item.byline}
              </Typography>
              <hr />
            </div>
          ))}
      </Card>
    );
  }

  News.propTypes = {
    news: PropTypes.array,
};