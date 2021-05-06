import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import UnicornButton from "./unicorn-button";
import SettingsButton from "./settings-button";
import SearchBar from "./search-bar";
import { UserContext } from "./context/UserContext";

export default function NavigationBar(props) {
  const { unicorn } = useContext(UserContext);
  return (
    <div className="navbar-wrapper">
      <Grid
        container
        spacing={1}
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        {unicorn ? (
          <Grid item xs>
            <UnicornButton className="button-unicorn" />
          </Grid>
        ) : (
          <Grid item xs></Grid>
        )}

        <Grid item xs={8}>
          <SearchBar />
        </Grid>
        <Grid item xs>
          <SettingsButton
            className="button-settings"
            handleEditBg={(url) => props.handlePassBgUrl(url)}
            handleCancelChanges={props.cancelChanges}
            handleSaveChanges={props.saveChanges}
            bookmarkRef={props.bookmarkRef}
          />
        </Grid>
      </Grid>
    </div>
  );
}
