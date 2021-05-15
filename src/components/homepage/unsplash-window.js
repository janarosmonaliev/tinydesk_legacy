import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import {
  Dialog,
  DialogTitle,
  IconButton,
  SvgIcon,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { TextField, Button, Grid } from "@material-ui/core";
import { X } from "react-feather";
import { createApi } from "unsplash-js";
import InfiniteScroll from "react-infinite-scroller";

const unsplash = createApi({
  accessKey: "NaoP4rMXua-Xgx3YYi4Oa41jeZQTwxEfK_XL03lB8Vs",
});

const UnsplashWindow = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useImperativeHandle(ref, () => ({
    clickOpenUnsplash: () => {
      handleClickOpen();
    },
  }));
  const searchQuery = useRef();
  const [photos, setPhotos] = useState([]);

  const handleGetPhotos = () => {
    unsplash.search
      .getPhotos({
        query: searchQuery.current.value,
        page: 1,
        perPage: 30,
        orientation: "landscape",
      })
      .then((result) => {
        if (result.errors) {
          console.log("error occurred: ", result.errors[0]);
        } else {
          setPhotos(result.response.results);
          // console.log(result.response.results);
        }
      });
  };
  const handleGetMorePhotos = (page) => {
    unsplash.search
      .getPhotos({
        query: searchQuery.current.value,
        page: page,
        perPage: 30,
        orientation: "landscape",
      })
      .then((result) => {
        if (result.errors) {
          console.log("error occurred: ", result.errors[0]);
        } else {
          setPhotos(photos.concat(result.response.results));
          // console.log(result.response.results);
        }
      });
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleGetPhotos();
    }
  };

  const handleClickImage = (tile) => {
    // console.log(tile.urls.full);
    props.handleEditBg(tile.urls.full);
  };

  const cancelChanges = () => {
    props.handleCancelChanges();
    handleClose();
  };

  const saveChanges = () => {
    props.handleSaveChanges();
    handleClose();
  };

  return (
    <>
      <Dialog
        maxWidth={"sm"}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="unsplash-dialog"
        scroll="paper"
        classes={{ paper: "unsplash-window" }}
      >
        <DialogTitle id="unsplash-dialog">
          <h5 className="dialog-title">Edit background</h5>

          <IconButton
            aria-label="close"
            onClick={handleClose}
            size="small"
            className="button-dialog-close"
          >
            <SvgIcon>
              <X />
            </SvgIcon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={9}>
              <TextField
                autoFocus
                inputRef={searchQuery}
                autoComplete="off"
                fullWidth
                label="Search"
                id="unsplash-input"
                variant="outlined"
                size="small"
                onKeyDown={handleKeyPress}
                onSubmit={(e) => e.preventDefault}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                disableElevation
                disableTouchRipple
                onClick={handleGetPhotos}
              >
                Search
              </Button>
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={2}>
            <div className="unsplash-wrapper">
              <InfiniteScroll
                pageStart={2}
                initialLoad={false}
                loadMore={handleGetMorePhotos}
                hasMore={true}
                useWindow={false}
              >
                {photos.map((tile) => (
                  <div className="unsplash-item" id={tile.id} key={tile.id}>
                    <img
                      src={tile.urls.small}
                      alt={tile.alt_description}
                      className="img-fluid"
                    ></img>
                    <a
                      className="unsplash-link"
                      onClick={() => handleClickImage(tile)}
                    ></a>
                  </div>
                ))}
              </InfiniteScroll>
            </div>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            disableTouchRipple
            onClick={saveChanges}
          >
            Save changes
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            disableElevation
            disableTouchRipple
            onClick={cancelChanges}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default React.memo(UnsplashWindow);
