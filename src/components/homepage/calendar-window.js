import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
  useCallback,
  useContext,
} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import { IconButton, SvgIcon, Popover } from "@material-ui/core";
import { Trash2, X } from "react-feather";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import nextId from "react-id-generator";
import produce from "immer";
import * as calendarapi from "../../api/calendarapi";
import { UserContext } from "./context/UserContext";

moment.updateLocale("en", {
  week: {
    dow: 1,
    doy: 4,
  },
});
const localizer = momentLocalizer(moment);
const useStyles = makeStyles((theme) => ({
  popoverContent: {
    padding: theme.spacing(2),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  newEvent: {
    padding: "15px 15px 15px 15px",
  },
}));

const CalendarWindow = forwardRef((props, ref) => {
  const { events, setEvents } = useContext(UserContext);
  const classes = useStyles();
  const newTitleRef = useRef(null);
  const titleRef = useRef(null);
  const newRef = useRef(null);
  const initialEvent = {
    title: "",
    start: new Date(),
  };
  //Should default eventData populated from the app that got from the backend
  //const [events, setEvents] = useState(eventData);
  const [event, setEvent] = useState(initialEvent);
  //Window State & Func
  useImperativeHandle(ref, () => ({
    openCalendar: () => {
      handleOpen();
    },
  }));
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //Popver Edit
  const [anchorEl, setAnchorEl] = useState(null);
  // const [editEvent, setEditEvent] = useState(initialEvent)
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "event-popover" : undefined;

  const handleSelectEvent = (event, e) => {
    setEvent(event);

    setAnchorEl(e.currentTarget);
    // setEditEvent()
  };
  const handleDelete = () => {
    setEvents(events.filter((e) => e._id !== event._id));
    setEvent(initialEvent);
    handleClosePopover();
    apiDeleteEvent(event._id);
  };
  const apiDeleteEvent = useCallback((id) => {
    const payload = { removeId: id };
    console.log("deleting event's id front ", id);
    calendarapi.apiDeleteEvent(payload);
  });
  //Clicking Outside the popover will cancel the editing
  //This is intentional
  //Only the submit (enter) will successfully edit
  const handleSubmit = (e) => {
    e.preventDefault();
    const index = events.findIndex((e) => e._id === event._id);
    setEvents(
      produce((draft) => {
        draft[index].title = titleRef.current.value;
        apiChangeEventTitle(draft[index]);
      })
    );
    handleClosePopover();
  };

  const apiChangeEventTitle = useCallback((event) => {
    const data = { _id: event._id, title: event.title };
    console.log("change title of this event ", event._id);
    calendarapi.apiChangeEventTitle(data);
  });

  //Event Handler
  const handleSelect = ({ start, end }) => {
    //Open another dialog

    setOpenAdd(true);
    setStart(start);
    setEnd(end);
  };

  //Add New Event Handlers
  const [openAdd, setOpenAdd] = useState(false);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const addNewEvent = (e) => {
    e.preventDefault();
    console.log(start);
    console.log(end);
    const title = newTitleRef.current.value;
    const allDay = false;
    const _id = nextId();
    const days = moment(end).diff(moment(start), "days");

    if (title) {
      var newEvent = {
        title: title,
        allDay: allDay,
        start: start,
        end: end,
        _id: _id,
      };
      if (days >= 1) {
        newEvent = {
          ...newEvent,
          end: new Date(moment(end).add(86399, "seconds").format()),
        };
      }

      //setEvents([...events, { _id, title, allDay, start, end }]);

      const newlist = [...events];
      setEvents([...events, newEvent]);
      apiAddNewEvent(newlist, newEvent);
    }
    setOpenAdd(false);
  };

  async function apiAddNewEvent(newlist, newEvent) {
    try {
      let result = await calendarapi.apiAddNewEvent(newEvent);
      console.log("id from backend ", result);
      const newEventTwo = {
        title: newEvent.title,
        allDay: newEvent.allDay,
        start: newEvent.start,
        end: newEvent.end,
        _id: result,
      };
      setEvents([...newlist, newEventTwo]);
      console.log("id changed to", newEventTwo._id);
    } catch (e) {
      console.log(e);
    }
  }

  const handleStartDateChange = (date) => {
    setStart(date);
  };
  const handleEndDateChange = (date) => {
    setEnd(date, typeof date);
  };
  const handleStartDateChangeOnEdit = (date, event) => {
    const startDate = moment(date);
    const endDate = moment(event.end);
    console.log(date);
    if (startDate.isAfter(endDate)) {
      return;
    }
    const index = events.findIndex((e) => e._id === event._id);
    setEvents(
      produce((draft) => {
        draft[index].start = date;
        apiChangeEventDate("start", draft[index]);
      })
    );
  };
  const handleEndDateChangeOnEdit = (date, event) => {
    const startDate = moment(event.start);
    const endDate = moment(date);
    if (endDate.isBefore(startDate)) {
      return;
    }
    const index = events.findIndex((e) => e._id === event._id);
    setEvents(
      produce((draft) => {
        draft[index].end = date;
        apiChangeEventDate("end", draft[index]);
      })
    );
  };

  const apiChangeEventDate = useCallback((when, event) => {
    console.log("change date of event with id: ", event._id);
    const data = { _id: event._id, date: "", when: when };
    if (when === "start") {
      data.date = event.start;
    } else if (when === "end") {
      data.date = event.end;
    }
    calendarapi.apiChangeEventDate(data);
  });

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
        aria-labelledby="calendar-window"
      >
        <DialogTitle id="calendar-window">
          <h5 className="dialog-title">Calendar</h5>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            size="small"
            className="button-dialog-close"
          >
            <SvgIcon>
              <X />
            </SvgIcon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
        </DialogContentText> */}

          <Calendar
            onSelectEvent={handleSelectEvent}
            selectable
            localizer={localizer}
            events={events}
            defaultView={Views.MONTH}
            defaultDate={new Date()}
            style={{ height: "70vh" }}
            onSelectSlot={handleSelect}
          ></Calendar>
          <Popover
            id={id}
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Typography className={classes.popoverContent}>
              <Grid container item xs={12}>
                <form onSubmit={handleSubmit}>
                  <TextField defaultValue={event.title} inputRef={titleRef} />
                </form>
                <Button onClick={handleDelete}>
                  <Trash2 color="red" />
                </Button>
              </Grid>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="start-date-picker-inline"
                    label="Start"
                    value={event.start}
                    // value={event.start}
                    onChange={(date) =>
                      handleStartDateChangeOnEdit(date, event)
                    }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
                <Grid item xs>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="end-date-picker-inline"
                    label="End"
                    value={event.end}
                    // value={event.end}
                    onChange={(date) => handleEndDateChangeOnEdit(date, event)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>

              {/* <Typography variant="subtitle2" gutterBottom>
                {String(moment(event.start).format("l"))}
              </Typography> */}
            </Typography>
          </Popover>
        </DialogContent>
      </Dialog>
      <Dialog
        onClose={addNewEvent}
        aria-labelledby="new-event-dialog"
        open={openAdd}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container className={classes.newEvent} direction="column">
            <Grid item xs>
              <form onSubmit={addNewEvent}>
                <TextField
                  maxWidth
                  inputRef={newTitleRef}
                  placeholder="New Event"
                  autoFocus
                />
              </form>
            </Grid>
            <Grid item xs>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="start-date-picker-inline"
                label="Start"
                value={start}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item xs>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="end-date-picker-inline"
                label="End"
                value={end}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </Dialog>
    </div>
  );
});

export default CalendarWindow;
