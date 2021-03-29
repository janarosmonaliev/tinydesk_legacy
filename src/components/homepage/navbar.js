import React from "react";
import { Grid } from "@material-ui/core";
import UnicornButton from "./unicorn-button";
import SettingsButton from "./settings-button";
import SearchBar from "./search-bar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  unicorn: {
    float: "left",
  },
  settings: {
    float: "right",
  },
});

export default function NavigationBar() {
  const classes = useStyles();
  return (
    <div className="navbar-wrapper">
      <Grid
        container
        spacing={1}
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs>
          <UnicornButton className={classes.unicorn} />
        </Grid>
        <Grid item xs={8}>
          <SearchBar />
        </Grid>
        <Grid item xs>
          <SettingsButton className={classes.settings} />
        </Grid>
      </Grid>
    </div>
  );
}
