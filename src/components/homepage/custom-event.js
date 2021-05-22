import {
  Divider,
  makeStyles,
  Popover,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useRef } from "react";
import moment from "moment";
import produce from "immer";
const useStyles = makeStyles((theme) => ({
  popoverContent: {
    padding: theme.spacing(2),
  },
}));

// const classes = use;

const CustomEventContainer = ({ setEvents, events }) => (props) => {
  return <CustomEvent event={props} setEvents={setEvents} events={events} />;
};
const CustomEvent = React.memo((props) => {
  const titleRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log(props.events);
    // const index = props.events.findIndex((e) => e.id === props.event.id);
    // console.log(index);
    setAnchorEl(null);
    // props.setEvents(
    //   produce((draft) => {
    //     draft[props.index].title = titleRef.current.value;
    //   })
    // );
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <div onClick={handleClick}>{props.event.title}</div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.popoverContent}>
          <TextField
            defaultValue={props.event.title}
            // onChange={handleChange}
            inputRef={titleRef}
          />
          <Divider />
          <Typography variant="subtitle2" gutterBottom>
            {String(moment(props.event.start).format("l"))}
          </Typography>
        </Typography>
      </Popover>
    </>
  );
});

export default CustomEventContainer;
