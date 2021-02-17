import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import TemporaryDrawer from "../TemporaryDrawer";
import PropTypes from "prop-types";

let eventGuid = 0;

export default function Calendar(props) {
    const [weekendsVisible, setWeekendsVisible] = useState(true);
    const [currentEvents, setCurrentEvents] = useState([]);

    const {calendar} = props;

    useEffect(() => {
        setCurrentEvents(calendar);
      }, []);

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


    function renderEventContent(eventInfo) {
    return (
        <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
        </>
    );
    }

    function createEventId() {
        return String(eventGuid++);
    }

    function handleDateSelect(selectInfo) {
        let title = prompt("Please enter a new title for your event");
        let calendarApi = selectInfo.view.calendar;
    
        calendarApi.unselect(); // clear date selection
    
        if (title) {
          calendarApi.addEvent({
            id: createEventId(),
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
          });
        }
    }

    return (
      <div>
          <TemporaryDrawer  weekends={setWeekendsVisible} toggle={handleWeekendsToggle}/>
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
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
      </div>
    );
}

Calendar.propTypes = {
    calendar: PropTypes.object
  };