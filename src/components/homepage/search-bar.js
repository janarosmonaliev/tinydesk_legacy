import React, { useRef } from "react";
import { InputAdornment, InputBase } from "@material-ui/core";
import { SvgIcon } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Search } from "react-feather";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  searchInput: {
    "& > input": {
      padding: "0px",
    },
  },
  searchIcon: {
    minWidth: "0px",
  },
});

export default function SearchBar() {
  const classes = useStyles();
  const searchText = useRef();

  const handleClickSearch = () => {
    let searchQuery = searchText.current.value;
    // If the text is empty or whitespace
    if (!searchQuery.replace(/\s/g, "").length) {
      return;
    } else {
      searchQuery.replace(/\s/g, "+");
      window.open(
        "https://www.google.com/search?q=" + searchQuery,
        "_blank",
        "noopener noreferrer"
      );
      searchText.current.value = "";
    }
  };
  //   if Enter is pressed
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleClickSearch();
    }
  };
  return (
    <>
      <div className="search-bar-glass">
        <InputBase
          placeholder="Search Google..."
          inputProps={{ "aria-label": "search-bar" }}
          inputRef={searchText}
          onKeyDown={handleKeyPress}
          onSubmit={(e) => e.preventDefault}
          className={classes.searchInput}
          endAdornment={
            <InputAdornment position="end">
              <Button
                aria-controls="search-bar"
                className={classes.searchIcon}
                onClick={handleClickSearch}
              >
                <SvgIcon>
                  <Search strokeWidth={2} color="#4f4f4f"></Search>
                </SvgIcon>
              </Button>
            </InputAdornment>
          }
        ></InputBase>
      </div>
    </>
  );
}
