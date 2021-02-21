import React, { useEffect, useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TitleItem from "../components/TitleItem";
import { makeStyles } from "@material-ui/core/styles";
import NewListForm from "../components/NewItemForm";
import NewCalendarForm from "../components/NewCalendarForm";
import API from "../utils/API";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";
import IconButton from "@material-ui/core/IconButton";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";

function IndexPage() {
  const [formData, setFormData] = useState({ newList: "" });
  const [calendarFormData, setCalendarFormData] = useState({ newCalendar: "" });
  const [book, setBook] = useState({});
  const [lists, setLists] = useState([]);
  const [calendars, setCalendars] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    API.getBook(id)
      .then(res => {
        setBook(res.data);
        setLists(res.data.lists);
        setCalendars(res.data.calendars);
      })
      .catch(err => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({ newList: value });
  };

  const handleCalendarInputChange = (e) => {
    const { value } = e.target;
    setCalendarFormData({ newCalendar: value });
  };

  const addList = () => {
    API.saveList({
      name: formData.newList,
      items: [],
      book: book._id
    }).then(res => {
      let newBookLists = lists.map(list => list._id);
      newBookLists.push(res.data._id);
      API.updateBook(id, {
        ...book,
        lists: newBookLists
      }).then(res => res)
      .catch(err => console.log(err));
      window.location.href = "/lists/" + res.data._id;
    })
    .catch(err => console.log(err));
  };

  const addCalendar = () => {
    API.saveCalendar({
      name: calendarFormData.newCalendar,
      book: book._id
    }).then(res => {
      let newBookCalendars = calendars.map(calendar => calendar._id);
      newBookCalendars.push(res.data._id);
      API.updateBook(id, {
        ...book,
        calendars: newBookCalendars
      }).then(res => res)
      .catch(err => console.log(err));
      window.location.href = "/calendars/" + res.data._id;
    })
    .catch(err => console.log(err));
  };

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

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
        <TitleItem {...book} />
        <Grid container justify="center" >
          <EditModal 
          title={book.title}
          link={book.link}
          description={book.description}
          colorScheme={book.colorScheme}
          id={id}
          />
          <DeleteModal
          title={book.title}
          id={id}
          type="book"
          />
        </Grid>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/dashboard" className={classes.link}>
            <HomeIcon style={{verticalAlign: "middle"}} className={classes.icon} />
            <span style={{fontSize: "12px",  marginLeft: "2px"}}>Dashboard</span>
          </Link>
          <Typography color="textPrimary" className={classes.link}>
            <ImportContactsIcon style={{verticalAlign: "middle"}} className={classes.icon} />
            <span style={{fontSize: "12px",  marginLeft: "2px"}}>{book.title}</span>
          </Typography>
        </Breadcrumbs>
        <Accordion>
          <AccordionSummary
            className={classes.accordion}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Lists</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List className={classes.root} aria-label="mailbox folders">
              {lists ? lists.map((item) => (
                // <li key={item._id}>
                  
                //   <a href={`/lists/${item._id}`}>
                //     {item.name}
                //     <EditModal/>
                //     <DeleteModal/>
                //     </a>  
                // </li>
                <div key={item._id}>
                 <ListItemLink href={`/lists/${item._id}`} >
                  <ListItemAvatar>
                    <Avatar>
                      <PlaylistAddCheckIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteModal id={item._id} name={item.name} type="list"/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItemLink>
                <Divider />
                </div>
            
              ))
              :
              <ListItem>Add a new list to get started</ListItem>
            }
              <NewListForm
                handleInputChange={handleInputChange}
                addItem={addList}
                type="list"
              />
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            className={classes.accordion}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>
              Calendars
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* <ul>
              {calendars ? calendars.map((item) => (
                <li key={item._id}>
                  <a href={`/calendars/${item._id}`}>{item.name}</a>
                </li>
              ))
              :
              <li>Add a new list to get started</li>
            }
              
            </ul> */}
            <List className={classes.root} aria-label="mailbox folders">
              {calendars ? calendars.map((item) => (
                <div key={item._id}>
                 <ListItemLink href={`/calendars/${item._id}`} >
                  <ListItemAvatar>
                    <Avatar>
                      <PlaylistAddCheckIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteModal id={item._id} name={item.name} type={"calendar"}/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItemLink>
                <Divider />
                </div>
            
              ))
              :
              <ListItem>Add a new calendar to get started</ListItem>
            }
              <NewCalendarForm
                handleCalendarInputChange={handleCalendarInputChange}
                addCalendar={addCalendar}
                type="Calendar"
              />
            </List>
          </AccordionDetails>
          </Accordion>
          <Accordion>
          <AccordionSummary
            className={classes.accordion}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>
              Habits
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
              <h2><a href={`/habits/${id}`}>Track your daily habits</a></h2>
          </AccordionDetails>        
        </Accordion>
      </Box>
    </div>
  );
}

export default IndexPage;
