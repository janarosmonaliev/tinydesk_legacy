import { Grid } from "@material-ui/core";
import React, { useContext } from "react";
import WeatherWidget from "./weather-widget";
import NotesWidget from "./notes-widget";
import TodoListWidget from "./todo-list-widget";
import RemoveCircleOutlinedIcon from "@material-ui/icons/RemoveCircleOutlined";

import { UserContext } from "./context/UserContext";
export default function WidgetsWrapper() {
  const { jiggle } = useContext(UserContext);
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
      <Grid item xs={12} className="widget-wrapper">
        {/* {jiggle ? (
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
        )} */}

        <WeatherWidget></WeatherWidget>
      </Grid>
      <Grid item xs={12} lg={6} className="widget-wrapper">
        {/* {jiggle ? (
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
        )} */}
        <NotesWidget></NotesWidget>
      </Grid>
      <Grid item xs={12} lg={6} className="widget-wrapper">
        {/* {jiggle ? (
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
        )} */}
        <TodoListWidget></TodoListWidget>
      </Grid>
    </Grid>
  );
}
