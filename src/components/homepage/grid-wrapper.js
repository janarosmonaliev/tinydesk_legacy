import { Grid } from "@material-ui/core";
import React from "react";
import BookmarksWrapper from "./bookmarks-wrapper";
import WidgetsWrapper from "./widgets-wrapper";

export default function GridWrapper(props) {
  return (
    <Grid
      container
      spacing={7}
      direction="row"
      justify="center"
      alignItems="flex-start"
      className="grid-wrapper"
    >
      <Grid item md={7} lg={8} xs={12}>
        <BookmarksWrapper
          displayedBookmarks={props.displayedBookmarks}
          jiggle={props.jiggle}
        />
      </Grid>
      <Grid item md={5} lg={4} xs={12}>
        <WidgetsWrapper
          location={props.location}
          todolists={props.todolists}
          jiggle={props.jiggle}
        ></WidgetsWrapper>
      </Grid>
    </Grid>
  );
}
