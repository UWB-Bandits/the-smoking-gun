import React, { useState, useEffect } from "react";
import {
  Box,
} from "@material-ui/core";
import TitleItem from "../components/TitleItem";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import API from "../utils/API";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import PropTypes from "prop-types";
import EntryForm from "../components/EntryForm";

function Journaling(props) {
  const [formData, setFormData] = useState({ title: "", body: "" });
  const [entry, setEntry] = useState({});
  const [book, setBook] = useState({});

  const {bookId, journalId} = useParams();
  
  Journaling.propTypes = {
    type: PropTypes.string,
  };

  useEffect(() => {
    if (props.type === "old") {
      loadEntry();
    } else {
      loadBook();
    }
  }, [formData]);

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

  const loadBook = () => {
    API.getBook(bookId)
    .then(res => setBook(res.data))
    .catch(err => console.log(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSave = () => {
    if (props.type === "new") {
      API.saveEntry({
        title: formData.title,
        body: formData.body,
        book: bookId
      })
      .then(res => {
        let bookEntries = book.entries;
        bookEntries.push(res.data._id);
        API.updateBook(book._id, {...book, entries: bookEntries})
        .then(res => console.log(res))
        .catch(err => console.log(err));
        window.location.href = "/books/" + bookId + "/journal/" + res.data._id;
      })
      .catch(err => console.log(err));      
    } else {
      API.updateEntry(entry._id, {
        ...entry,
        title: formData.title,
        body: formData.body,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    }
  };

  const onDelete = () => {
    API.deleteEntry(entry._id)
    .then(res => {
      console.log(res);
      window.location.href = "/books/" + book._id;
    })
    .catch(err => console.log(err));
  };

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

  return (
    <div className={book.colorScheme} style={{backgroundColor:"rgba(255, 255, 255, 0.5)"}}>
      <Box>
        <TitleItem title={props.type==="old" ? entry.title : "New Journal Entry"} />
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/dashboard" className={classes.link}>
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
          <Typography color="textPrimary" className={classes.link}>
            <PlaylistAddCheckIcon style={{verticalAlign: "middle"}} className={classes.icon} />
            <span style={{fontSize: "12px",  marginLeft: "2px"}}>{props.type==="old" ? entry.title : "New Entry"}</span>
          </Typography>
        </Breadcrumbs>
        <EntryForm type={props.type} onSave={onSave} onDelete={onDelete} title={formData.title} body={formData.body} handleInputChange={handleInputChange} {...entry}/>
      </Box>
    </div>
  );
}

export default Journaling;
