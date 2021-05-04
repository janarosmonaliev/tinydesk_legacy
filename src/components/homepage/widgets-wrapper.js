import { Grid } from "@material-ui/core";
import React, { useCallback, useContext, useState } from "react";
import WeatherWidget from "./weather-widget";
import NotesWidget from "./notes-widget";
import TodoListWidget from "./todo-list-widget";
import CalendarWidget from "./calendar-widget";
import { UserContext } from "./context/UserContext";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import nextId from "react-id-generator";
import Calendar from "react-calendar";

export default function WidgetsWrapper() {
  const initialWidget = {
    widgets: [
      {
        name: "weather",
        id: nextId(),
      },
      {
        name: "note",
        id: nextId(),
      },
      {
        name: "todolist",
        id: nextId(),
      },
      {
        name: "calendar",
        id: nextId(),
      },
    ],
  };
  const [widgets, setWidgets] = useState(initialWidget.widgets);
  // const { jiggle } = useContext(UserContext);
  // const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
  //   setWidgets(arrayMove(widgets, oldIndex, newIndex));
  // });
  const getWidget = (widget) => {
    switch (widget.name) {
      case "weather":
        return (
          <Grid item xs={12} className="widget-wrapper">
            <WeatherWidget />
          </Grid>
        );
      case "todolist":
        return (
          <Grid item xs={12} lg={6} className="widget-wrapper">
            <TodoListWidget />
          </Grid>
        );
      case "note":
        return (
          <Grid item xs={12} lg={6} className="widget-wrapper">
            <NotesWidget />
          </Grid>
        );
      case "calendar": {
        return (
          <Grid item xs={12} lg={12} className="widget-wrapper">
            <CalendarWidget />
          </Grid>
        );
      }
    }
  };

  // const SortableWidget = SortableElement(({ value }) => {
  //   return getWidget(value);
  // });

  // const SortableWidgetContainer = SortableContainer(({ items }) => {
  //   return (
  //     <Grid
  //       container
  //       direction="row"
  //       justify="flex-start"
  //       alignItems="flex-start"
  //       spacing={2}
  //       // style={{ overflow: "hidden" }}
  //     >
  //       {items.map((value, index) => (
  //         <SortableWidget
  //           key={`widget-sort-${index}`}
  //           index={index}
  //           value={value}
  //         />
  //       ))}
  //     </Grid>
  //   );
  // });

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
        {widgets.map((widget) => getWidget(widget))}
      </Grid>
    </>
  );
}
