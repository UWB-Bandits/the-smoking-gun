//import react with react hooks
import React, { useState, useEffect } from "react";
//import Matierial-UI functions
import { makeStyles } from "@material-ui/core/styles";
//import Matierial-UI components
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
//import Matierial-UI icons
import HomeIcon from "@material-ui/icons/Home";
import DateRangeIcon from "@material-ui/icons/DateRange";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
//import useParams from react-router-dom
import { useParams } from "react-router-dom";
//import Api routes
import API from "../utils/API";
//import components
import Calendar from "../components/Calendar";
//import context
import { useAuth } from "../contexts/AuthContext";
//initialize the Calendars page
function Calendars() {
  //set state hooks
  const [calendar, setCalendar] = useState({});
  const [book, setBook] = useState({});
  //grabs the URL params
  const {bookId, calId} = useParams();
  //deconstucts a currentUser from our context
  const { currentUser } = useAuth();
  //this side effect runs load books and calender functions
  useEffect(() => {
    loadBook();
    loadCalender();
  }, []);
  //this does an api call to load the book data of the current user
  const loadBook = async () => {
    const bookResponse = await API.getBook(bookId, currentUser.uid);
    setBook(bookResponse.data);
  };
  //this does an api call to load the calendar by ID
  const loadCalender = () =>{
    API.getCalendar(calId)
      .then(res => {
        let pageList = {
          user: res.data.book.user,
          name: res.data.name,
          events: res.data.events,
          date: res.data.date,
          bookName: res.data.book.title,
          bookId: res.data.book._id
        };
        setCalendar(pageList);
      })
      .catch(err => console.log(err));
  };
  //initialize the classes variable with our useStyles hook
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
      <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/dashboard" className={classes.link}>
            <HomeIcon style={{verticalAlign: "middle"}} className={classes.icon} />
            <span style={{fontSize: "12px",  marginLeft: "2px"}}>Dashboard</span>
          </Link>
          <Link
            color="inherit"
            href={"/books/" + calendar.bookId}
            className={classes.link}
          >
            <ImportContactsIcon style={{verticalAlign: "middle"}} className={classes.icon} />
            <span style={{fontSize: "12px", marginLeft: "2px"}}>{calendar.bookName}</span>
          </Link>
          <Typography color="textPrimary" className={classes.link}>
            <DateRangeIcon style={{verticalAlign: "middle"}} className={classes.icon} />
            <span style={{fontSize: "12px",  marginLeft: "2px"}}>{calendar.name}</span>
          </Typography>
        </Breadcrumbs>
      <Calendar calendar={calendar}/>
    </div>
  );
}

export default Calendars;