//import react and react hooks
import React, { useState, useEffect } from "react";
//import Material UI components
import {
  Box,
  Snackbar,
  IconButton,
  Typography,
  Breadcrumbs,
  Link
} from "@material-ui/core";
//import components
import TitleItem from "../components/TitleItem";
import EntryForm from "../components/EntryForm";
//import Material UI hook
import { makeStyles } from "@material-ui/core/styles";
//import useParams to grab URL parameters
import { useParams } from "react-router-dom";
//import route
import API from "../utils/API";
//import Material UI icons
import HomeIcon from "@material-ui/icons/Home";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import CloseIcon from "@material-ui/icons/Close";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//import context
import { useAuth } from "../contexts/AuthContext";

function Journaling(props) {
  //set state hooks
  const [formData, setFormData] = useState({ title: "", body: "" });
  const [entry, setEntry] = useState({});
  const [book, setBook] = useState({});
  const [open, setOpen] = React.useState(false);
  const { currentUser } = useAuth();
  //grab the bookId and journalID from the URL
  const {bookId, journalId} = useParams();
  //sets up prop types for the Journaling component
  Journaling.propTypes = {
    type: PropTypes.string,
  };
  //closes the snackbar if the user clicks away
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  //determines if loading an old entry or starting a new one
  useEffect(() => {
    if (props.type === "old") {
      //if loading old entry, loads entry info
      loadEntry();
    } else {
      //if starting new entry, loads book info
      loadBook();
    }
  },[]);
  //gets entry info from database and updates state
  const loadEntry = () =>{
    API.getEntry(journalId)
    .then(res => {
      console.log(res.data);
      setEntry(res.data);
      setBook(res.data.book);
      setFormData({ ...formData, title: res.data.title, body: res.data.body });
    })
    .catch(err => console.log(err));
  };
  //gets book data from database and updates state
  const loadBook = () => {
    API.getBook(bookId, currentUser.uid)
    .then(res => setBook(res.data))
    .catch(err => console.log(err));
  };
  //updates state when user fills out the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (props.type === "new") {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({title: entry.title, body: value});
    }
  };
  //saves entry to the database when the user hits save
  const onSave = () => {
    if (props.type === "new") {
      //if new entry, saves the new entry to the database
      API.saveEntry({
        title: formData.title,
        body: formData.body,
        book: bookId
      })
      .then(res => {
        //pushes the new entry to the book and updates the book document in the database
        let bookEntries = book.entries;
        bookEntries.push(res.data._id);
        API.updateBook(book._id, {...book, entries: bookEntries})
        //opens snackbar to indicate entry was saved
        .then(setOpen(true))
        .catch(err => console.log(err));
        //directs to the page for the new book entry, and treats the entry as "old" now
        window.location.href = "/books/" + bookId + "/journal/" + res.data._id;
      })
      .catch(err => console.log(err));      
    } else {
      //if old entry, updates the old document in the database
      API.updateEntry(entry._id, {
        ...entry,
        body: formData.body,
      })
      //opens snackbar to indicate entry was saved
      .then(setOpen(true))
      .catch(err => console.log(err));
    }
  };
  //deletes the entry from the database
  const onDelete = () => {
    API.deleteEntry(entry._id)
    .then(res => {
      console.log(res);
      //directs to the book index
      window.location.href = "/books/" + book._id;
    })
    .catch(err => console.log(err));
  };
  //initialize the classes variable with our makeStyles hook
  const classes = makeStyles((theme) => ({
    root: {
      width: "100%",
      marginLeft: "10px",
      marginRight: "10px",
    },
    accordion: {
      width: "100%",
      marginLeft: "10px",
      marginRight: "10px",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    link: {
      display: "flex",
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
  }));
  //this returns a journal entry page that a user create new journal entries, or update old ones
  return (
    <div className={book.colorScheme} style={{backgroundColor:"rgba(255, 255, 255, 0.5)"}}>
      {/* Material-UI Box component serves as a wrapper component for most of the CSS utility needs. */}
      <Box>
        {/* custom component that displays a title nicely */}
        <TitleItem title={props.type==="old" ? entry.title : "New Journal Entry"} />
        {/* Material-UI Breadcrumb component allow users to make selections from a range of values. */}
        <Breadcrumbs aria-label="breadcrumb">
          {/* Material-UI Link component allows you to easily customize anchor elements with your theme colors and typography styles. */}
          <Link color="inherit" href="/dashboard" className={classes.link}>
            {/* Material-UI Icon Component */}
            <HomeIcon style={{verticalAlign: "middle"}} className={classes.icon} />
            <span style={{fontSize: "12px",  marginLeft: "2px"}}>Dashboard</span>
          </Link>
          <Link
            color="inherit"
            href={"/books/" + book._id}
            className={classes.link}
          >
            <ImportContactsIcon style={{verticalAlign: "middle"}} className={classes.icon} />
            <span style={{fontSize: "12px", marginLeft: "2px"}}>{book.title}</span>
          </Link>
          {/* Material-UI Typography component is used to present your design and content as clearly and efficiently as possible. */}
          <Typography color="textPrimary" className={classes.link}>
            <PlaylistAddCheckIcon style={{verticalAlign: "middle"}} className={classes.icon} />
            <span style={{fontSize: "12px",  marginLeft: "2px"}}>{props.type==="old" ? entry.title : "New Entry"}</span>
          </Typography>
        </Breadcrumbs>
        {/* Custom component which sets up the layout of the journal entry form */}
        <EntryForm  type={props.type} onSave={onSave} onDelete={onDelete} formData={formData} handleInputChange={handleInputChange} {...entry}/>
      </Box>
      {/* Material-UI Snackbar component displays a message to users on set events */}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Journal Entry Saved!"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

export default Journaling;
