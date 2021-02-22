import React, { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import TemporaryDrawer from "../TemporaryDrawer";
import PropTypes from "prop-types";
import {CircularProgress, Grid} from "@material-ui/core/";
import API from "../../utils/API";
import { useParams } from "react-router-dom";
import PromptModal from "../promptModal";

let eventGuid = 0;

export default function Calendar(props) {
    const [weekendsVisible, setWeekendsVisible] = useState(false);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [formData, setFormData] = useState("");
    const {id} = useParams();
    const [titleOpen, setTitleOpen] = useState(false);

    useEffect(() => {
        setCurrentEvents(props.calendar.events);
        loadCurrentEvents();
    }, []);
  
    const handleClose = () => {
      setTitleOpen(false);
    };

    function loadCurrentEvents(){
      API.getCalendar(id)
      .then(res =>{
        setCurrentEvents(res.data.events);
      })
      .catch(err => console.log(err));
    }
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    
    function handleWeekendsToggle(){
      setWeekendsVisible(!weekendsVisible);
    }

    function handleEventClick(clickInfo) {
        if (confirm(`Are you sure you want to delete the event "${clickInfo.event.title}"`)) {
        clickInfo.event.remove();
        }
    }

    function handleEvents(events) {  
      setCurrentEvents(events);
    }

    function addEvent(){
      API.updateCalendar(id, {
        ...props.calendar,
        events: currentEvents
      }).then(res => res)
      .catch(err => console.log(err));
    }

    function renderEventContent(eventContent) {
    return (
        <>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
        </>
    );
    }

    function renderInfoDrawerEvent(event) {
        return (
          <li key={event.title+Date.now()}>
            <b>{formatDate(event.start, {year: "numeric", month: "short", day: "numeric"})}</b>
            <i>    {event.title}</i>
          </li>
        );
      }

    function createEventId() {
        return String(eventGuid++);
    }

    function handleDateSelect() {
      setTitleOpen(true);
    }

    const onTitleSubmit = (selectInfo) =>{
      let calendarApi = selectInfo.view.calendar;
      if(formData !== ""){
        calendarApi.addEvent({
          id: createEventId(),
          title: formData,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        });
      }
      calendarApi.unselect();
      setTitleOpen(false);
    };

    if(currentEvents){
      return (
        <div>
            <TemporaryDrawer renderInfoDrawerEvent={renderInfoDrawerEvent}  weekends={setWeekendsVisible} toggle={handleWeekendsToggle} currentEvents={currentEvents}/>
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
              initialEvents={currentEvents} // alternatively, use the `events` setting to fetch from a feed
              select={handleDateSelect}
              eventContent={renderEventContent} // custom render function
              eventClick={handleEventClick}
              eventsSet={handleEvents} // called after events are initialized/added/changed/removed
              eventAdd={addEvent}
              eventChange={addEvent}
              eventRemove={addEvent}
            />
            <Grid container justify="center" >
              <PromptModal 
              prompt="Please enter a new title for your event"
              handleSubmit = {onTitleSubmit}
              handleInputChange = {handleInputChange}
              handleClose = {handleClose}
              buttonLabel ="Save event"
              open={titleOpen}
              />
            </Grid>
    
        </div>
      ); 
    } else {
    return (
      <div>Loading Calendar...<CircularProgress /></div>
    );
    }
}

Calendar.propTypes = {
    calendar: PropTypes.object
  };