import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import WeatherWidget from "./weather-widget";
import NotesWidget from "./notes-widget";
import TodoListWidget from "./todo-list-widget";
import CalendarWidget from "./calendar-widget";
import nextId from "react-id-generator";
const WidgetsWrapper = () => {
  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={2}
        // style={{ overflow: "hidden" }}
      >
        <Grid item xs={12} className="widget-wrapper">
          <WeatherWidget />
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          className="widget-wrapper"
          key="note-widget-grid"
        >
          <NotesWidget />
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          className="widget-wrapper"
          key="todolist-widget-grid"
        >
          <TodoListWidget />
        </Grid>
        <Grid
          item
          xs={12}
          lg={12}
          className="widget-wrapper"
          key="calendar-widget-grid"
        >
          <CalendarWidget />
        </Grid>
      </Grid>
    </>
  );
};
export default React.memo(WidgetsWrapper);
