import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useRef } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import { current } from "immer";
import { red } from "@material-ui/core/colors";
import CalendarWindow from "./calendar-window";
const useStyles = makeStyles({
  calendarDaysGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    listStyle: "none",
    paddingInlineStart: "0px",
    marginBottom: "0px",
    "& > li": {
      display: "inline",
      textAlign: "center",
      marginTop: "0.5px",
      marginBottom: "0px",
      fontSize: "12px",
    },
  },
  currentDay: {
    // padding: "0 4px",
    background: "red",
    borderRadius: "10%",
  },
  calendarWidgetText: {
    color: "white",
    mixBlendMode: "multiply",
    textAlign: "center",
  },
  calendarWidgetMonth: {
    color: "white",
    textAlign: "left",
  },
});

const CalendarWidget = () => {
  const classes = useStyles();
  // Preparing calendar data
  const currentDate = dayjs();
  let currentDay = currentDate.date();
  let currentDateFormatted = dayjs(currentDate).format("dddd, MMMM D, YYYY");
  const daysOfTheWeek = ["M", "T", "W", "T", "F", "S", "S"];
  dayjs.extend(weekday);
  const daysInMonth = dayjs(currentDate).daysInMonth();
  const dayOfTheWeek = dayjs().startOf("M").weekday();
  const shift = dayOfTheWeek === 0 ? 6 : dayOfTheWeek - 1;
  const daysShift = new Array(shift).fill(" ");
  let daysOfTheMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  daysOfTheMonth = [...daysShift, ...daysOfTheMonth];

  const calendarWindowRef = useRef();
  const handleClick = () => {
    calendarWindowRef.current.openCalendar();
  };
  return (
    <>
      <a onClick={handleClick}>
        <div className="calendar-widget-wrapper">
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={8} md={6}>
              <ol className={classes.calendarDaysGrid}>
                {daysOfTheWeek.map((day) => (
                  <li>{day}</li>
                ))}
              </ol>
              <ol className={classes.calendarDaysGrid}>
                {daysOfTheMonth.map((day) => {
                  if (day === currentDay) {
                    return (
                      <li className={classes.currentDay}>
                        <span>{day}</span>
                      </li>
                    );
                  } else {
                    return <li>{day}</li>;
                  }
                })}
              </ol>
            </Grid>
            <Grid item xs={4} md={6}>
              <Box textAlign="center">
                <p className={classes.calendarWidgetMont}>
                  {currentDateFormatted}
                </p>
                <small className={classes.calendarWidgetText}>
                  No more events today
                </small>
              </Box>
            </Grid>
          </Grid>
        </div>
      </a>
      <CalendarWindow ref={calendarWindowRef} />
    </>
  );
};

export default React.memo(CalendarWidget);
