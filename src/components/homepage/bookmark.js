import React, { useContext } from "react";
import RemoveCircleOutlinedIcon from "@material-ui/icons/RemoveCircleOutlined";
import Grid from "@material-ui/core/Grid";
import { UserContext } from "./context/UserContext";

export default function Bookmark(props) {
  const { jiggle } = useContext(UserContext);
  const handleClick = (url) => {
    // TODO Add noopener and noreferrer tags
    window.open(url, "_blank").focus();
  };
  const handleDeleteBookmark = () => {
    console.log("HELLO");
  };
  return (
    <>
      {jiggle ? (
        <Grid item xs={12} container justify="center">
          <div onClick={handleDeleteBookmark}>
            <RemoveCircleOutlinedIcon
              color="error"
              fontSize="large"
              className="delete-icon bookmark"
            />
          </div>
        </Grid>
      ) : (
        <></>
      )}

      <div
        className={
          jiggle
            ? "bookmark-wrapper not-hoverable"
            : "bookmark-wrapper hoverable"
        }
        onClick={() => handleClick(props.url)}
      >
        <img src={props.thumbnail} width="80" height="80"></img>

        <small>{props.title}</small>
      </div>
    </>
  );
}
