//import react and react hooks
import React, { useEffect, useState } from "react";
//import Material UI components
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
//import Material UI icons
import HomeIcon from "@material-ui/icons/Home";
import DateRangeIcon from "@material-ui/icons/DateRange";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
//import Material UI function
import { makeStyles } from "@material-ui/core/styles";
//import useParams to grab URL parameters
import { useParams } from "react-router-dom";
//import routes
import API from "../utils/API";
//import components
import DoodleSlider from "../components/DoodleSlider/DoodleSlider";
//import context
import { useAuth } from "../contexts/AuthContext";
import TitleItem from "../components/TitleItem";
import { Fab
 } from "@material-ui/core";

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
//initialize DoodleIndex page
const DoodleIndex = () => {
  //grab current user info from context
  const { currentUser } = useAuth();
  //set state hooks
  const [doodles, setDoodles] = useState([]);
  const [bookTitle, setBookTitle] = useState([]);
  const [colorScheme, setColorScheme] = useState("");
  //grab the bookId from the URL
  const { bookId } = useParams();
  //this hook runs side effects and runs the functions setting bookTitle state and loadDoodles function
  useEffect(() => {
    API.getBook(bookId, currentUser.uid).then((res) => {
      console.log(res.data.colorScheme);
      setColorScheme(res.data.colorScheme);
      setBookTitle(res.data.title);
    });
    loadDoodles();
  }, []);
  //this deletes the doodle of the event target from the database
  const deleteDoodle = (e) => {
    const doodle_id = e.target.id;
    API.deleteDoodle(doodle_id)
      .then(() => {
        loadDoodles();
      })
      .catch((err) => console.log(err));
  };
  //this loads the doodles that are stored in the current book
  const loadDoodles = () => {
    API.getDoodles(bookId)
      .then((res) => {
        setDoodles(res.data);
        const listOfDoodles_id = res.data.map((item) => item._id);
        API.updateBook(bookId, { doodles: listOfDoodles_id });
      })
      .catch((err) => console.log(err));
  };
  //this returns a doodle index page that displays a history of doodles to view or delete
  return (
    <div
      className={colorScheme}
      style={{ backgroundColor: "rgba(221, 221, 221, 0.5)"}}
    >
      <TitleItem title="View or Make doodles" />
      {/* Material-UI Breadcrumb component allow users to make selections from a range of values. */}
      <Breadcrumbs aria-label="breadcrumb">
        {/* Material-UI Link component allows you to easily customize anchor elements with your theme colors and typography styles. */}
        <Link color="inherit" href="/dashboard" className={classes.link}>
          {/*  Material-UI Icon Component  */}
          <HomeIcon
            style={{ verticalAlign: "middle" }}
            className={classes.icon}
          />
          <span style={{ fontSize: "12px", marginLeft: "2px", fontFamily: "'Raleway', sans-serif", }}>Dashboard</span>
        </Link>
        <Link
          color="inherit"
          href={"/books/" + bookId}
          className={classes.link}
        >
          <ImportContactsIcon
            style={{ verticalAlign: "middle" }}
            className={classes.icon}
          />
          <span style={{ fontSize: "12px", marginLeft: "2px", fontFamily: "'Raleway', sans-serif", }}>
            {bookTitle}
          </span>
        </Link>
        {/* Material-UI Typography component is used to present your design and content as clearly and efficiently as possible. */}
        <Typography color="textPrimary" className={classes.link}>
          <DateRangeIcon
            style={{ verticalAlign: "middle" }}
            className={classes.icon}
          />
          <span style={{ fontSize: "12px", marginLeft: "2px", fontFamily: "'Raleway', sans-serif", }}>
            Doodle Index
          </span>
        </Typography>
      </Breadcrumbs>
      <div style={{ margin: "2rem 0", textAlign: "center" }}>
        <Fab
          variant="extended"
          className={`${colorScheme} styled-button`}>
          {/* <h2> */}
          <Link
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1.3rem",
            }}
            href={`/books/${bookId}/newDoodle`}
          >
            Make a New Doodle?
          </Link>
          {/* </h2> */}
        </Fab
        >
      </div>
      {/* _______________________________Previous Doodles_____________________________ */}
      <DoodleSlider
        colorScheme={colorScheme}
        deleteDoodle={deleteDoodle}
        doodles={doodles}
      />
    </div>
  );
};
//exports DoodleIndex page
export default DoodleIndex;
