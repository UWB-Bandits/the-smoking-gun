import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AnnouncementIcon from "@material-ui/icons/Announcement";
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

export default function News({ news }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
    return (
      <div style={{marginRight: "10px", marginLeft: "10px", marginBottom: "10px"}}>
        <Fab color="primary" aria-label="top news stories" variant="extended" onClick={handleClickOpen}>
          <AnnouncementIcon className={classes.extendedIcon} />
          Top News Stories
        </Fab>
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

  News.propTypes = {
    news: PropTypes.array,
};