import { Grid } from "@material-ui/core";
import React from "react";
import BookmarksWrapper from "./bookmarks-wrapper";
import WidgetsWrapper from "./widgets-wrapper";

export default function GridWrapper() {
  return (
    <Grid
      container
      spacing={8}
      direction="row"
      justify="center"
      alignItems="flex-start"
      className="grid-wrapper"
    >
      <Grid item md={7} lg={8} xs={12}>
        <BookmarksWrapper />
      </Grid>
      <Grid item md={5} lg={4} xs={12}>
        <WidgetsWrapper></WidgetsWrapper>
      </Grid>
    </Grid>
  );
}
