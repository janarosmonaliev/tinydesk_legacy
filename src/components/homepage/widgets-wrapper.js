import { Grid } from "@material-ui/core";
import React, { useContext } from "react";
import WeatherWidget from "./weather-widget";
import NotesWidget from "./notes-widget";
import TodoListWidget from "./todo-list-widget";
import { UserContext } from "./context/UserContext";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

export default function WidgetsWrapper() {
  const { widgets, setWidgets } = useContext(UserContext);
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setWidgets(arrayMove(widgets, oldIndex, newIndex));
  };
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
    }
  };

  const SortableWidget = SortableElement(({ value }) => {
    return getWidget(value);
  });

  const SortableWidgetContainer = SortableContainer(({ items }) => {
    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={2}
        // style={{ overflow: "hidden" }}
      >
        {items.map((value, index) => (
          <SortableWidget index={index} value={value} />
        ))}
      </Grid>
    );
  });

  return (
    <SortableWidgetContainer
      items={widgets}
      onSortEnd={onSortEnd}
      distance={5}
      axis="xy"
    />
  );
}
