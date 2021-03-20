//import react and react hooks
import React, { useEffect, useState } from "react";
//import Material UI components
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
  ListItemSecondaryAction,
  Button,
} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
//import Material UI icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HomeIcon from "@material-ui/icons/Home";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import IconButton from "@material-ui/core/IconButton";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
//import Material UI hooks
import { makeStyles } from "@material-ui/core/styles";
//import useParams to grab URL parameters
import { useParams } from "react-router-dom";
//import components
import TitleItem from "../components/TitleItem";
import NewListForm from "../components/NewItemForm";
import NewCalendarForm from "../components/NewCalendarForm";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";
//import Material-UI lab
import Alert from "@material-ui/lab/Alert";
//import routes
import API from "../utils/API";
//import context
import { useAuth } from "../contexts/AuthContext";
//initialize IndexPage page
function IndexPage() {
  //set state hooks
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState({ newList: "" });
  const [calendarFormData, setCalendarFormData] = useState({ newCalendar: "" });
  const [book, setBook] = useState({});
  const [lists, setLists] = useState([]);
  const [entries, setEntries] = useState([]);
  const [calendars, setCalendars] = useState([]);
  const [error, setError] = useState("");
  const [calError, setCalError] = useState("");
  //get current user info from context
  const { currentUser } = useAuth();
  //get bookId from URL
  const { bookId } = useParams();
  //this side effect grabs the book info
  useEffect(() => {
    API.getBook(bookId, currentUser.uid)
      .then((res) => {
        setBook(res.data);
        setLists(res.data.lists);
        setEntries(res.data.entries);
        setCalendars(res.data.calendars);
      })
      .catch((err) => console.log(err));
  }, []);
  //this handles Accordion  expanded state
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  //this handles formData state input changes
  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({ newList: value });
  };
  //this handles calendar input changes
  const handleCalendarInputChange = (e) => {
    const { value } = e.target;
    setCalendarFormData({ newCalendar: value });
  };
  //this adds lists to the book and directs the user to the lists page
  const addList = () => {
    if (formData.newList === "") {
      setError("Please enter a title for your new list.");
    } else {
      setError("");
      API.saveList({
        name: formData.newList,
        items: [],
        book: book._id,
      })
      .then((res) => {
        let newBookLists = lists.map((list) => list._id);
        newBookLists.push(res.data._id);
        API.updateBook(bookId, {
          ...book,
          lists: newBookLists,
        })
          .then((res) => res)
          .catch((err) => console.log(err));
        window.location.href = "/books/" + bookId + "/lists/" + res.data._id;
      })
      .catch((err) => console.log(err));
      }
  };
  //this adds calendars to the book and directs the user to the calendar page
  const addCalendar = () => {
    if (calendarFormData.newCalendar === "") {
      setCalError("Please enter a title for your new calendar.");
    } else {
      setCalError("");
      API.saveCalendar({
        name: calendarFormData.newCalendar,
        book: book._id,
      })
      .then((res) => {
        let newBookCalendars = calendars.map((calendar) => calendar._id);
        newBookCalendars.push(res.data._id);
        API.updateBook(bookId, {
          ...book,
          calendars: newBookCalendars,
        })
        .then((res) => res)
        .catch((err) => console.log(err));
        window.location.href = "/books/" + bookId + "/calendars/" + res.data._id;
      })
      .catch((err) => console.log(err));
    }
  };
  //this returns the clickable item that contains props
  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }
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
  //this returns an index page that holds Lists, Calendars, Doodles, Habits, and Journal entries
  return (
    <div className={book.colorScheme}>
      {/* Material-UI Box component serves as a wrapper component for most of the CSS utility needs. */}
      <Box>
        {/* custom component that displays the title of the book */}
        <TitleItem {...book} />
        {/* The Material Design responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts. */}
        <Grid container justify="center">
          {/* custom component that displays a modal containing a form that the user can use to edit the book */}
          <EditModal
            title={book.title}
            link={book.link}
            description={book.description}
            colorScheme={book.colorScheme}
            id={bookId}
          />
          {/* custom component that displays a modal containing a form that the user can use to delete the book */}
          <DeleteModal title={book.title} id={bookId} type="book" />
        </Grid>
        {/* Pagination*/}
        {/* Material-UI Breadcrumb component allow users to make selections from a range of values. */}
        <Breadcrumbs aria-label="breadcrumb">
          {/* Material-UI Link component allows you to easily customize anchor elements with your theme colors and typography styles. */}
          <Link color="inherit" href="/dashboard" className={classes.link}>
            {/* Material-UI Icon Component  */}
            <HomeIcon
              style={{ verticalAlign: "middle" }}
              className={classes.icon}
            />
            <span style={{ fontSize: "12px", marginLeft: "2px" }}>
              Dashboard
            </span>
          </Link>
          {/* Material-UI Typography component is used to present your design and content as clearly and efficiently as possible. */}
          <Typography color="textPrimary" className={classes.link}>
            <ImportContactsIcon
              style={{ verticalAlign: "middle" }}
              className={classes.icon}
            />
            <span style={{ fontSize: "12px", marginLeft: "2px" }}>
              {book.title}
            </span>
          </Typography>
        </Breadcrumbs>
        {/* Lists*/}
        {/* Material UI Accordion component contain creation flows and allow lightweight editing of an element. */}
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleAccordionChange("panel1")}
        >
          {/* Material UI AccordionSummary is a wrapper that act as a header/description of and Accordion component  */}
          <AccordionSummary
            className={classes.accordion}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Lists</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {error && <Alert severity="error">{error}</Alert>}
          </AccordionDetails>
          {/* Material UI AccordionDetails is what is expanded when an Accordion component is clicked */}
          <AccordionDetails>
            {/* Material-UI Link component allows you to easily customize anchor elements with your theme colors and typography styles. */}
            <List
              style={{ width: "100%" }}
              className={classes.root}
              aria-label="mailbox folders"
            >
              {lists ? (
                // this maps over this books lists an creates a link to that list page
                lists.map((item) => (
                  <div style={{ width: "100%" }} key={item._id}>
                    <ListItemLink href={`/books/${bookId}/lists/${item._id}`}>
                      <ListItemAvatar>
                        <Avatar className={"list-icon"}>
                          <PlaylistAddCheckIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.name} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteModal
                            id={item._id}
                            name={item.name}
                            type="list"
                          />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItemLink>
                    <Divider />
                  </div>
                ))
              ) : (
                <ListItem>Add a new list to get started</ListItem>
              )}
              <NewListForm
                handleInputChange={handleInputChange}
                addItem={addList}
                type="list"
              />
            </List>
          </AccordionDetails>
        </Accordion>
        {/* Calendars */}
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleAccordionChange("panel2")}
        >
          <AccordionSummary
            className={classes.accordion}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>Calendars</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {calError && <Alert severity="error">{calError}</Alert>}
          </AccordionDetails>
          <AccordionDetails>
            <List
              style={{ width: "100%" }}
              className={classes.root}
              aria-label="mailbox folders"
            >
              {calendars ? (
                calendars.map((item) => (
                  <div key={item._id}>
                    <ListItemLink
                      href={`/books/${bookId}/calendars/${item._id}`}
                    >
                      <ListItemAvatar>
                        <Avatar className={"list-icon"}>
                          <PlaylistAddCheckIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.name} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteModal
                            id={item._id}
                            name={item.name}
                            type={"calendar"}
                          />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItemLink>
                    <Divider />
                  </div>
                ))
              ) : (
                <ListItem>Add a new calendar to get started</ListItem>
              )}
              <NewCalendarForm
                handleCalendarInputChange={handleCalendarInputChange}
                addCalendar={addCalendar}
                type="Calendar"
              />
            </List>
          </AccordionDetails>
        </Accordion>
        {/* Doodles */}
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleAccordionChange("panel3")}
        >
          <AccordionSummary
            className={classes.accordion}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>Doodles</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List
              style={{ width: "100%" }}
              className={classes.root}
              aria-label="mailbox folders"
            >
              <div style={{ width: "100%" }}>
                <ListItemLink href={`/books/${bookId}/doodlesIndex`}>
                  <ListItemAvatar>
                    <Avatar className={"list-icon"}>
                      <PlaylistAddCheckIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={"View or Make a Doodle"} />
                </ListItemLink>
                <Divider />
              </div>
            </List>
          </AccordionDetails>
        </Accordion>
        {/* Habits */}
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleAccordionChange("panel4")}
        >
          <AccordionSummary
            className={classes.accordion}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>Habits</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List
              style={{ width: "100%" }}
              className={classes.root}
              aria-label="mailbox folders"
            >
              <div style={{ width: "100%" }}>
                <ListItemLink href={`/books/${bookId}/habits/${bookId}`}>
                  <ListItemAvatar>
                    <Avatar className={"list-icon"}>
                      <PlaylistAddCheckIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={"Track your daily habits!"} />
                </ListItemLink>
                <Divider />
              </div>
            </List>
          </AccordionDetails>
        </Accordion>
        {/* Journal */}
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleAccordionChange("panel5")}
        >
          <AccordionSummary
            className={classes.accordion}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>Journal Entries</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List
              style={{ width: "100%" }}
              className={classes.root}
              aria-label="mailbox folders"
            >
              {entries ? (
                entries.map((item) => (
                  <div style={{ width: "100%" }} key={item._id}>
                    <ListItemLink href={`/books/${bookId}/journal/${item._id}`}>
                      <ListItemAvatar>
                        <Avatar className={"list-icon"}>
                          <PlaylistAddCheckIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.title} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteModal
                            id={item._id}
                            name={item.title}
                            type="entry"
                          />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItemLink>
                    <Divider />
                  </div>
                ))
              ) : (
                <ListItem>Add a new journal entry to get started</ListItem>
              )}
              <Button
                className={"styled-button"}
                style={{
                  margin: "10px",
                  display: "block",
                  textAlign: "center",
                }}
                href={`/books/${bookId}/new-entry/${bookId}`}
                variant="contained"
                color="primary"
              >
                Add a new journal entry
              </Button>
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
}
//exports IndexPage page
export default IndexPage;