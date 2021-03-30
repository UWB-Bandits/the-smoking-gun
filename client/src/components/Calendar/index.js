//import react, with useState and useEffect methods
import React, { useState, useEffect } from "react";
//import FullCalendar a JavaScript Calendar Library and features
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
//import components 
import TemporaryDrawer from "../TemporaryDrawer";
//import a dependency that keeps track of the prop types
import PropTypes from "prop-types";
//import Material-Ui components
import { CircularProgress, Grid } from "@material-ui/core/";
//import API route handler
import API from "../../utils/API";
//import useParams to grab the URL parameter used to identify the book id
import { useParams } from "react-router-dom";
//import modal components
import PromptModal from "../promptModal";
import ConfirmModal from "../ConfirmModal";

//initializes a variable that keeps a count and helps set an id for events in the calendar
let eventGuid = 0;
/*
  A developer note on the FullCalendar component 
  I had issues setting the initial state of the calendar due to the time it takes to get the events from the database.
  Currently the component will show a loading spinner until the currentEvents state has data.
  I have two useEffects in place, the first grabbing the data from the props if the data loaded in time where the component is called, 
  and second this makes a new call to the database to then setCurrentEvents. This worked to initialize the calendar with the stored events from the
  database. This is critical in how saving the events currently work, if the calendar is initialized without the old events, the database 
  is over written by currentEvents state because this holds what is saved to the database. 
  Any change on the calendar triggers a save to the database.
*/
//exports the Calendar component
export default function Calendar(props) {
    //sets the state variable hooks
    const [weekendsVisible, setWeekendsVisible] = useState(false);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [formData, setFormData] = useState("");
    const [titleOpen, setTitleOpen] = useState(false);
    const [calendarApi, setCalendarApi] = useState({});
    const [selectInfo, setSelectInfo] = useState({});
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [clickInfo, SetClickInfo] = useState({});
    const [book, setBook] = useState({});
    const [error, setError] = useState("");
    // initialize the id variable for the bookId and calendarId (calId) that grabs the URL parameters
    const {bookId, calId} = useParams();
    //this lets you perform side effects in function component
    useEffect(() => {
      // load book information
      loadBook();
      // sets the currentEvents with the handed down events array
      setCurrentEvents(props.calendar.events);
      // this does another database call to load the current events
      loadCurrentEvents();
    }, []);
    //closes the modal
    const handleClose = () => {
      setTitleOpen(false);
      setDeleteOpen(false);
    };
    // this function makes a database query to get the book information the calendar is contained in
    // in order to access the colorScheme
    const loadBook = async () => {
      const bookResponse = await API.getBook(bookId);
      setBook(bookResponse.data);
      console.log(book);
    };
    //this function makes a database query and sets the currentEvents state to the events stored in the database
    function loadCurrentEvents(){
      //this searches by calendar the calendar id
      API.getCalendar(calId)
      //then the currentEvents state is set to the events array
      .then(res =>{
        //this is a react hook that sets the currentEvents state
        setCurrentEvents(res.data.events);
      })
      //this console logs any errors that may occur
      .catch(err => console.log(err));
    }
    
    const handleInputChange = (e) => {
      const { value } = e.target;
      setFormData(value );
    };
    //this function handles events that are clicked on, this then sends a confirm delete and if confirmed the event is removed from the calendar
    function handleEventClick(clickedInfo) {
        //opens modal that checks the confirm from the user to wants to delete this event
        setDeleteOpen(true);
        //sets the info from the event into state so it can be called on later
        SetClickInfo(clickedInfo);
    }
    //this function handles the weekendsVisible toggle to display weekends or not on the calendar
    function handleWeekendsToggle(){
      //this is a react hook that sets the state of weekendsVisible  
      setWeekendsVisible(!weekendsVisible);
    }
    //this function uses the react hook to set currentEvents this is called after events are initialized/added/changed/removed
    function handleEvents(events) {  
      setCurrentEvents(events);
    }
    //this function adds events to the database saved to the calendar collection by id
    function addEvent(){
      API.updateCalendar(calId, {
        ...props.calendar,
        events: currentEvents
      }).then()
      .catch(err => console.log(err));
    }
    //this function returns a custom render of an event when the user clicks on an event
    function renderEventContent(eventContent) {
      return (
        <>
          <b>{eventContent.timeText}</b>
          <i>{eventContent.event.title}</i>
        </>
      );
    }
    //this function lists all events that are in the calendar inside the temporary drawer
    function renderInfoDrawerEvent(event) {
        return (
          <li key={event.title+Date.now()}>
            <b>{formatDate(event.start, {year: "numeric", month: "short", day: "numeric"})}</b>
            <i>    {event.title}</i>
          </li>
        );
      }
    //this function creates an eventId that is unique by adding one to the evenGuid variable
    function createEventId() {
      return String(eventGuid++);
    }
    //this function is triggered when a date is selected and prompts the modal to name an event to open. 
    function handleDateSelect(selectedInfo) {
        setTitleOpen(true);
        //saves the info passed in from Full Calendar to state
        setCalendarApi(selectedInfo.view.calendar);
        setSelectInfo(selectedInfo);        
    }
    //This function runs after a title is saved using the modal
    const onTitleSubmit = () => {
      if (formData === "") {
        setError("Please enter the title of your event.");
      } else {
        setError("");
        //closes the modal
        setTitleOpen(false);
        //checks for form data and updates state if there is data
        if (formData) {
          let newEvent = {
            id: createEventId(),
            title: formData,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
          };
          //sends event to Full Calendar
          calendarApi.addEvent(newEvent);
          let newEvents = currentEvents;
          newEvents.push(newEvent);
          setCurrentEvents(newEvents);
          //sends new event to the database
          addEvent();        
        }
      }
      //resets the modal form
      setFormData("");
    };
    //triggers after user confirms they want to delete an event
    const onDeleteSubmit = ()=>{
      //closes modal
      setDeleteOpen(false);
      //filters out the deleted event
      let leftEvents = currentEvents.filter(event => event._instance !== clickInfo.event._instance);
      //updates state
      setCurrentEvents(leftEvents);
      //removes event from Full Calendar
      clickInfo.event.remove();
      //removes event from database
      API.updateCalendar(calId, {
        ...props.calendar,
        events: leftEvents
      }).then(console.log("event deleted"))
      .catch(err => console.log(err));
    };

    if(currentEvents){
      return (
        <div>
            {/* This will open a drawer on the left with info on how to use the calendar and events */}
            <TemporaryDrawer renderInfoDrawerEvent={renderInfoDrawerEvent}  weekends={weekendsVisible} toggle={handleWeekendsToggle} currentEvents={currentEvents}/>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left:  "title",
                center: "",
                right: "today"
                }}
              footerToolbar={{
                  left: "prev,next",
                  center: "",
                  right: "dayGridMonth,timeGridWeek,timeGridDay"
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={weekendsVisible}
              initialEvents={currentEvents} 
              select={handleDateSelect}
              eventContent={renderEventContent}
              eventClick={handleEventClick}
              eventsSet={handleEvents}
              eventAdd={addEvent}
              eventChange={addEvent}
              eventRemove={addEvent}
            />
            {/* Material-UI's Grid component sets up a responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts. */}
            <Grid container justify="center" >
              <PromptModal 
                prompt="Please enter the title of your event:"
                handleSubmit = {onTitleSubmit}
                handleInputChange = {handleInputChange}
                handleClose = {handleClose}
                buttonLabel ="Save event"
                open = {titleOpen}
                error = {error}
              />
              <ConfirmModal 
                prompt={`Are you sure you want to delete "${clickInfo.event ? clickInfo.event.title : ""}"?`}
                handleSubmit = {onDeleteSubmit}
                handleClose = {handleClose}
                buttonLabel ="Delete Event"
                open = {deleteOpen}
              />
            </Grid>
        </div>
      ); 
    //If currentEvents does not have data render this
    } else {
      return (
        //this is Material-Ui loading spinner
        <div>Loading Calendar...<CircularProgress /></div>
      );
    }
}
//sets up prop types for the Calendar component
Calendar.propTypes = {
  calendar: PropTypes.object
};