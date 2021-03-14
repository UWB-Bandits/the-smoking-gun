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
import AnnouncementIcon from "@material-ui/icons/Announcement";
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
  title: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
    textAlign: "right"
  },
  newsLink: {
    textDecoration: "none",
    fontWeight: "bold",
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
//export and initialize the News component that takes in news object
export default function News({ news, buttonSize }) {
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
    //this returns a modal of the top news articles from the NYT on the news widget on the dashboard
    return (
      <div style={{marginRight: "10px", marginLeft: "10px", marginBottom: "10px"}}>
        {/* Material-UI's floating action button appears in front of all screen content, typically as a circular shape with an icon in its center.  */}
        <Fab style={{backgroundColor:"#474747", color:"white"}} aria-label="top news stories" variant="extended" onClick={handleClickOpen}>
          {/* Material-UI's icon component */}
          <AnnouncementIcon className={buttonSize==="large" ? classes.extendedIcon : ""} />
          {buttonSize==="large" ? "Top News Stories" : ""}
        </Fab>
        {/* Material-UI component that inform users about a task and can contain critical information, require decisions, or involve multiple tasks. */}
        <Dialog style={{backgroundColor: "#CACACC"}} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Top Stories
          </DialogTitle>
          <DialogContent dividers>
            {news.map((item) => (
              <div key={item.published_date}>
                <Typography gutterBottom>
                  <a href={item.short_url} target="_blank" rel="noopener noreferrer" className={classes.newsLink}>
                    {item.title}
                  </a>
                </Typography>
                <Typography className={classes.title} gutterBottom>
                  {item.abstract}
                </Typography>
                <Typography className={classes.date} gutterBottom>
                  {item.byline}
                </Typography>
                <Typography className={classes.date} gutterBottom>
                  Published: {new Date(item.published_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                  })}
                </Typography>
                <hr />
              </div>
            ))}
          </DialogContent>
          <DialogActions>
            <a href="https://www.nytimes.com/" title="New York Times">New York Times</a>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  //sets up prop types for the News component
  News.propTypes = {
    news: PropTypes.array,
    buttonSize: PropTypes.string
};