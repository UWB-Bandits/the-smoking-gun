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
import CircularProgress from "@material-ui/core/CircularProgress";
//import API route handler
import API from "../../utils/API";
//import useParams to grab the URL parameter used to identify the book id
import { useParams } from "react-router-dom";
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
    //initialize the variable id that grabs the URL parameters
    const {id} = useParams();
    //this lets you perform side effects in function component
    useEffect(() => {
      //sets the currentEvents with the handed down events array 
      setCurrentEvents(props.calendar.events);
      //this does another database call to load the current events 
      loadCurrentEvents();
    }, []);
    //this function makes a database query and sets the currentEvents state to the events stored in the database
    function loadCurrentEvents(){
      //this searches by calendar the calendar id
      API.getCalendar(id)
      //then the currentEvents state is set to the events array
      .then(res =>{
        //this is a react hook that sets the currentEvents state
        setCurrentEvents(res.data.events);
      })
      //this console logs any errors that may occur
      .catch(err => console.log(err));
    }
    //this function handles the weekendsVisible toggle to display weekends or not on the calendar
    function handleWeekendsToggle(){
      //this is a react hook that sets the state of weekendsVisible  
      setWeekendsVisible(!weekendsVisible);
    }
    //this function handles events that are clicked on, this then sends a confirm delete and if confirmed the event is removed from the calendar
    function handleEventClick(clickInfo) {
      //checks the confirm from the user to wants to delete this event
      if (confirm(`Are you sure you want to delete the event "${clickInfo.event.title}"`)) {
        //the interactionPlugin allows you to click on an event, this grabs that event info and removes it from the calendar.
        clickInfo.event.remove();
        }
    }
    //this function uses the react hook to set currentEvents this is called after events are initialized/added/changed/removed
    function handleEvents(events) {  
        setCurrentEvents(events);
    }
    //this function adds events to the database saved to the calendar collection by id
    function addEvent(){
      API.updateCalendar(id, {
        ...props.calendar,
        events: currentEvents
      }).then(res => res)
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
    //this function handles a date that is selected by the user and prompts for a title
    function handleDateSelect(selectInfo) {
      //initialize a variable that prompts the user for a title of the event
      let title = prompt("Please enter a new title for your event");
      //this grabs where the user is viewing on the calendar to store this event
      let calendarApi = selectInfo.view.calendar;
      //this clears the date selection
      calendarApi.unselect();
      //this checks if the title was entered in by the user
      if (title) {
        //this adds the event to the calendar
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        });
      }
    }
    //this checks if currentEvents has data if so render the calendar
    if(currentEvents){
      return (
        <div>
            {/* This component returns a temporaryDrawer that opens from the left when a user clicks the info button */}
            <TemporaryDrawer renderInfoDrawerEvent={renderInfoDrawerEvent}  weekends={setWeekendsVisible} toggle={handleWeekendsToggle} currentEvents={currentEvents}/>
            {/* This is the fullCalendar.io react component that makes the interactive event calendar */}
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