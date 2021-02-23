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
      bottom: "60px",
      maxHeight: "200px",
      maxWidth: "300px",
      border: "3px solid #000000",
      padding: "10px",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      float: "inherit",
      margin: "10px",
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

export default function Weather({ weather }) {
    const classes = useStyles();

    let cityName = weather.location.name + ", " + weather.location.region;
    let weatherText = weather.current.condition.text;
    let weatherIcon = weather.current.condition.icon;
    let temperature = "Current Temperature: " + weather.current.temp_f + ", but Feels Like: " + weather.current.feelslike_f;
    let wind = "Wind speeds: " + weather.current.wind_mph + " mph, Gusts at " + weather.current.gust_mph + " mph";
    let humidity = "Humidity: " + weather.current.humidity;
    let updated = "Last updated at: " + weather.current.last_updated;
    // let updated = "Last updated at: " + new Date(weather.current.last_updated).toLocaleDateString("en-US", {
    //   year: "numeric",
    //   month: "short",
    //   day: "numeric"
    // });
  
    return (
      <Card className={classes.root}>
        <Typography variant="h5" component="h2">
            Current Weather
            <Typography className={classes.title} color="textSecondary">
              {cityName}
              <img src={weatherIcon} style={{float: "right"}}/>
            </Typography>
        </Typography>
        <CardContent>
          <Typography className={classes.pos} color="textSecondary">
            {weatherText} 
          </Typography>
          <Typography variant="body2" component="p">
            {temperature} 
          </Typography>
          <Typography variant="body2" component="p">
            {wind} 
          </Typography>
          <Typography variant="body2" component="p">
            {humidity}
          </Typography>
          <Typography variant="body2" component="p">
            {updated}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
        <Typography variant="body2" component="p">
            Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a>
        </Typography>
      </Card>
    );
  }

Weather.propTypes = {
    weather: PropTypes.object,
    current: PropTypes.object,
    condition: PropTypes.object,
    location: PropTypes.object,
    name: PropTypes.string,
    region: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.string,
    feelslike_f: PropTypes.string,
    temp_f: PropTypes.string,
    gust_mph: PropTypes.string,
    wind_mph: PropTypes.string,
    humidity: PropTypes.string,
    updated: PropTypes.string
};
