import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios"
const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const clickRef = useRef(null);
  const buildMessage = (slotInfo) => {
    return `Clicked on: ${slotInfo.start.toLocaleDateString()}`;
  };
  useEffect(() => {
    /**
     * What Is This?
     * This is to prevent a memory leak, in the off chance that you
     * teardown your interface prior to the timed method being called.
     */
    const fetchData = async () => {
      const response = await axios.get("/api/workout/calendar");
      const data = response.data.workouts;

      const formattedEvents = data.map((workout) => {
        const startDate = new Date(workout.date);
        const endDate = new Date(workout.date);
        endDate.setHours(endDate.getHours() + 1); // Assuming each workout is 1 hour long

        return {
          start: startDate,
          end: endDate,
          title: `(${workout.split})`,
          allDay: false,
          resource: workout, // You can store the entire workout object as a custom field if needed
        };
      });

      setEvents(formattedEvents);
    };

    fetchData();
    return () => {
      window.clearTimeout(clickRef?.current);
    };
  }, []);

  const onSelectSlot = useCallback((slotInfo) => {
    /**
     * Here we are waiting 250 milliseconds (use what you want) prior to firing
     * our method. Why? Because both 'click' and 'doubleClick'
     * would fire, in the event of a 'doubleClick'. By doing
     * this, the 'click' handler is overridden by the 'doubleClick'
     * action.
     */
    window.clearTimeout(clickRef?.current);
    clickRef.current = window.setTimeout(() => {
      window.alert(buildMessage(slotInfo));
    }, 250);
  }, []);

  return (
    <div className="flex justify-center align-center pt-8">
      <Calendar
        style={{ height: "90vh", width: "70vw" }}
        localizer={localizer}
        events={events}
        onSelectSlot={onSelectSlot}
        selectable
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};

export default CalendarPage;
