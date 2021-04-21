import { Grid } from "@material-ui/core";
import React from "react";
import WeatherWidget from "./weather-widget";
import NotesWidget from "./notes-widget";
import TodoListWidget from "./todo-list-widget";
export default function WidgetsWrapper(props) {
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={2}
    >
      <Grid
        item
        xs={12}
        className={props.jiggle ? "widget-wrapper jiggle" : "widget-wrapper"}
      >
        <WeatherWidget
          location={props.location}
          jiggle={props.jiggle}
        ></WeatherWidget>
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        className={props.jiggle ? "widget-wrapper jiggle" : "widget-wrapper"}
        jiggle={props.jiggle}
      >
        <NotesWidget></NotesWidget>
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        className={props.jiggle ? "widget-wrapper jiggle" : "widget-wrapper"}
        jiggle={props.jiggle}
      >
        <TodoListWidget todolists={props.todolists}></TodoListWidget>
      </Grid>
    </Grid>
  );
}
