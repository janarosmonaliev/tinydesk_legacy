import { Grid } from "@material-ui/core";
import React from "react";
import WeatherWidget from "./weather-widget";
import NotesWidget from "./notes-widget";
import TodoListWidget from "./todo-list-widget";
export default function WidgetsWrapper() {
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={2}
    >
      <Grid item xs={12} className="widget-wrapper">
        <WeatherWidget></WeatherWidget>
      </Grid>
      <Grid item xs={12} lg={6} className="widget-wrapper">
        <NotesWidget></NotesWidget>
      </Grid>
      <Grid item xs={12} lg={6} className="widget-wrapper">
        <TodoListWidget todolist={props.todolist}></TodoListWidget>
      </Grid>
    </Grid>
  );
}
