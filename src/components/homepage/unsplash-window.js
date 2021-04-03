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
  Divider,
} from "@material-ui/core";
import { TextField, Button, Grid } from "@material-ui/core";
import { GridList, GridListTile } from "@material-ui/core";
import { X } from "react-feather";
import { createApi } from "unsplash-js";

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
        perPage: 120,
        orientation: "landscape",
      })
      .then((result) => {
        if (result.errors) {
          console.log("error occurred: ", result.errors[0]);
        } else {
          setPhotos(result.response.results);
        }
      });
  };
  return (
    <>
      <Dialog
        maxWidth={"sm"}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="unsplash-dialog"
        className="unsplash-window"
        scroll="paper"
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
                inputRef={searchQuery}
                fullWidth
                label="Search"
                id="unsplash-input"
                variant="outlined"
                size="small"
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
            <Grid item xs={12}>
              <GridList cellHeight={180} cols={2}>
                {photos.map((tile) => (
                  <GridListTile key={tile.id} cols={1}>
                    <img src={tile.urls.small} alt={tile.alt_description}></img>
                  </GridListTile>
                ))}
              </GridList>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
});

export default UnsplashWindow;
