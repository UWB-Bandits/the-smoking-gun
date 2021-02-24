import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

// Icon Style
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

// Modal style
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles) ((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
          <Typography variant="h6">
              {children}
          </Typography>
          {onClose ? (
              <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                  <CloseIcon />
              </IconButton>
          ) : null}
      </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
      padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
      margin: 0,
      padding: theme.spacing(2),
  },
}))(MuiDialogActions);

export default function Weather({ weather }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    let cityName = weather.location.name + ", " + weather.location.region;
    let weatherText = weather.current.condition.text;
    let weatherIcon = weather.current.condition.icon;
    let temperature = "Current Temperature: " + weather.current.temp_f;
    let feelsLike = "Feels Like: " + weather.current.feelslike_f;
    let wind = "Wind speeds: " + weather.current.wind_mph + " mph";
    let gusts = "Gusts at " + weather.current.gust_mph + " mph";
    let humidity = "Humidity: " + weather.current.humidity;
    let updated = "Last updated: " + new Intl.DateTimeFormat(
      "en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }
    ).format(new Date(weather.current.last_updated));
  
    return (
      <div style={{marginRight: "10px", marginLeft: "10px", marginBottom: "10px"}}>
        <Fab color="primary" aria-label="current weather" variant="extended" onClick={handleClickOpen}>
          <WbSunnyIcon className={classes.extendedIcon} />
          Current Weather
        </Fab>
        <Dialog style={{backgroundColor: "#CACACC"}} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            <img src={weatherIcon} /> 
            {cityName} 
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              {weatherText}
            </Typography>
            <Typography gutterBottom>
              {temperature} &deg;F
            </Typography>
            <Typography gutterBottom>
              {feelsLike} &deg;F
            </Typography>
            <Typography gutterBottom>
              {wind}
            </Typography>
            <Typography gutterBottom>
              {gusts}
            </Typography>
            <Typography gutterBottom>
              {humidity}
            </Typography>
          </DialogContent>
          <DialogActions>
          {updated}
          </DialogActions>
          <DialogActions>
            Powered by <a href="https://www.weatherapi.com/" title="Weather API"> WeatherAPI.com</a>
          </DialogActions>
        </Dialog>
      </div>
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
