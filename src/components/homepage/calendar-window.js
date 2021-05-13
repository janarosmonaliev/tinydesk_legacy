import React, { forwardRef, useState, useImperativeHandle } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import eventData from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.updateLocale("en", {
  week: {
    dow: 1,
    doy: 4,
  },
});
const localizer = momentLocalizer(moment);

const CalendarWindow = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    openCalendar: () => {
      handleOpen();
    },
  }));

  const [events, setEvents] = useState(eventData);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };
  return (
    <Dialog
      fullWidth
      maxWidth={"lg"}
      open={open}
      onClose={handleClose}
      aria-labelledby="calendar-window"
    >
      <DialogTitle id="calendar-window">Calendar</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
        </DialogContentText> */}
        <Calendar
          selectable
          localizer={localizer}
          events={events}
          defaultView={Views.MONTH}
          defaultDate={new Date()}
          onSelectEvent={(event) => alert(event.title)}
          style={{ height: "70vh" }}
          onSelectSlot={handleSelect}
        ></Calendar>
      </DialogContent>
    </Dialog>
  );
});

export default CalendarWindow;
