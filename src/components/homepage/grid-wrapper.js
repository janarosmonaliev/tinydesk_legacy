import { Grid } from "@material-ui/core";
import React from "react";
import BookmarksWrapper from "./bookmarks-wrapper";
import WidgetsWrapper from "./widgets-wrapper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  gridWrapper: {
    paddingTop: "24px",
  },
});
export default function GridWrapper(props) {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={7}
      direction="row"
      justify="center"
      alignItems="flex-start"
      className={classes.gridWrapper}
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
