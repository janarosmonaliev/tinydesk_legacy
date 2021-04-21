import { Grid } from "@material-ui/core";
import React from "react";
import WeatherWidget from "./weather-widget";
import NotesWidget from "./notes-widget";
import TodoListWidget from "./todo-list-widget";
import RemoveCircleOutlinedIcon from "@material-ui/icons/RemoveCircleOutlined";
export default function WidgetsWrapper(props) {
  const handleDeleteWidget = (widgetType) => {
    console.log(widgetType);
  };
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
        {props.jiggle ? (
          <Grid container item xs={12} justify="flex-end">
            <RemoveCircleOutlinedIcon
              color="error"
              fontSize="large"
              className="delete-icon widget"
              onClick={() => handleDeleteWidget("weather")}
            />
          </Grid>
        ) : (
          <></>
        )}

        <WeatherWidget location={props.location}></WeatherWidget>
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        className={props.jiggle ? "widget-wrapper jiggle" : "widget-wrapper"}
        jiggle={props.jiggle}
      >
        {props.jiggle ? (
          <Grid container item xs={12} justify="flex-end">
            <RemoveCircleOutlinedIcon
              color="error"
              fontSize="large"
              className="delete-icon widget"
              onClick={() => handleDeleteWidget("note")}
            />
          </Grid>
        ) : (
          <></>
        )}
        <NotesWidget jiggle={props.jiggle}></NotesWidget>
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        className={props.jiggle ? "widget-wrapper jiggle" : "widget-wrapper"}
        jiggle={props.jiggle}
      >
        {props.jiggle ? (
          <Grid container item xs={12} justify="flex-end">
            <RemoveCircleOutlinedIcon
              color="error"
              fontSize="large"
              className="delete-icon widget"
              onClick={() => handleDeleteWidget("todolist")}
            />
          </Grid>
        ) : (
          <></>
        )}
        <TodoListWidget
          todolists={props.todolists}
          jiggle={props.jiggle}
        ></TodoListWidget>
      </Grid>
    </Grid>
  );
}
