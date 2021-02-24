//import react
import React from "react";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//import Material-UI functions
import { makeStyles, withStyles } from "@material-ui/core/styles";
// import Material-UI Components
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
//Import Material-UI Icons
import CloseIcon from "@material-ui/icons/Close";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
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
//initialize the Material-UI DialogTitle Component with custom styles that sets the Title of each news article
const DialogTitle = withStyles(styles) ((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    // The MuiDialogTitle name can be used for providing default props or style overrides at the theme level.
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {/*Material-UI's Typography component allows you to present your design and content as clearly and efficiently as possible.*/}
      <Typography variant="h6">
        {children}
      </Typography>
          {onClose ? (
            // Material-UI's component that wraps an Icon and handles like a button
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
              {/* Material-UI's Icon component */}
              <CloseIcon />
            </IconButton>
          ) : null}
      </MuiDialogTitle>
  );
});
//initialize the Material-UI DialogContent component with custom styles
const DialogContent = withStyles((theme) => ({
  root: {
      padding: theme.spacing(2),
  },
}))(MuiDialogContent);
//initialize the Material-UI DialogAction component with custom styles
const DialogActions = withStyles((theme) => ({
  root: {
      margin: 0,
      padding: theme.spacing(2),
  },
}))(MuiDialogActions);
//export and initialize the Weather component that takes in weather object
export default function Weather({ weather }) {
  //initialize the classes variable with our useStyles hook
  const classes = useStyles();
  //sets the state variable hooks
  const [open, setOpen] = React.useState(false);
  //this function handles the opening of the modal and sets open state to true
  const handleClickOpen = () => {
    setOpen(true);
  };
  //this function handles the closing of the modal and sets the open state to false
  const handleClose = () => {
    setOpen(false);
  };
  //Initialize weather variables to fill out weather component
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
  //this returns a modal filled with the users current weather info from http://api.weatherapi.com
  return (
    <div style={{marginRight: "10px", marginLeft: "10px", marginBottom: "10px"}}>
      {/* Material-UI's floating action button appears in front of all screen content, typically as a circular shape with an icon in its center.  */}
      <Fab color="primary" aria-label="current weather" variant="extended" onClick={handleClickOpen}>
        {/* Material-UI's icon component */}
        <WbSunnyIcon className={classes.extendedIcon} />
        Current Weather
      </Fab>
      {/* Material-UI component that inform users about a task and can contain critical information, require decisions, or involve multiple tasks. */}
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
//sets up prop types for the Weather component
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
