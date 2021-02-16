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
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";


function Calendars() {
  
  const [calendar, setCalendar] = useState({});
  

  const {id} = useParams();


  useEffect(() => {
    loadCalender();
  }, []);

  const loadCalender = () =>{
    API.getCalendar(id)
      .then(res => {
        let pageList = {
          user: res.data.book.user,
          name: res.data.name,
          date: res.data.date,
          bookName: res.data.book.title,
          bookId: res.data.book._id
        };

        setCalendar(pageList);
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
    <div>
      <Box>
        <TitleItem title={calendar.name}/>
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
            <PlaylistAddCheckIcon style={{verticalAlign: "middle"}} className={classes.icon} />
            <span style={{fontSize: "12px",  marginLeft: "2px"}}>{calendar.name}</span>
          </Typography>
        </Breadcrumbs>
        <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
      />
      </Box>
    </div>
  );
}

export default Calendars;