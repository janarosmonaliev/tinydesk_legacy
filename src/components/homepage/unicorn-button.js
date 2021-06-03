import React, { useState, useRef } from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { Zap, X, Copy, MoreVertical, Menu, CheckCircle } from "react-feather";
import Unicorn from "../../images/unicorn.svg";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SwipeableViews from "react-swipeable-views";
import Divider from "@material-ui/core/Divider";
import ChromeExtension from "../../images/chrome-extension.png";
import UnicornChrome from "../../images/unicorn-chrome.png";
import UnicornFirefox from "../../images/unicorn-firefox.png";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

// Tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles({
  link: {
    cursor: "pointer",
  },
});

const UnicornButton = (props) => {
  const classes = useStyles();
  //Dialog
  const handleClickExtension = () => {
    // TODO Add noopener and noreferrer tags
    window
      .open("https://chrome.google.com/webstore/category/extensions", "_blank")
      .focus();
  };
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    setCopied(false);
  };
  const handleClose = () => {
    setOpen(false);
    setCopied(false);
  };

  //Tabs index
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setCopied(false);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
    setCopied(false);
  };

  //copy
  const textAreaRef = useRef(null);
  const [copied, setCopied] = useState(false);
  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    setCopied(true);
  }
  return (
    <>
      <button
        className={"button-glass " + props.className}
        onClick={handleClickOpen}
      >
        <SvgIcon>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.28571 8.35C7.28571 8.35 3.92786 12.6824 1.74576 15.7023C1.36349 16.2314 1.59432 16.9734 2.20529 17.203L5.14957 18.3096C5.17565 18.3194 5.20464 18.3179 5.22955 18.3054L10.5522 15.6381C11.0575 15.3848 11.6721 15.6004 11.9085 16.1138L14.5811 21.9176C14.6026 21.9643 14.653 21.9881 14.7013 21.9705C15.3681 21.7278 19.9024 20.0056 21.5 17.5C22.8207 15.4285 22.9838 11.4893 22.9987 11.0209C22.9996 10.9913 22.9872 10.9637 22.9649 10.9443L18.8095 7.3L12 3L9.38095 2V4.675L8.85714 5.725M7.28571 8.35L3.61905 4.15L8.85714 5.725M7.28571 8.35L8.85714 5.725"
              stroke="#4F4F4F"
              stroke-width="2"
            />
          </svg>
        </SvgIcon>
      </button>

      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          <h4 className="dialog-title">Guidelines</h4>
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
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            centered
          >
            <Tab label="Extension" {...a11yProps(0)} />
            <Tab label="Chrome" {...a11yProps(1)} />
            <Tab label="Firefox" {...a11yProps(2)} />
          </Tabs>
          <Divider />
        </DialogTitle>
        <DialogContent style={{ height: "650px" }}>
          <SwipeableViews
            index={value}
            onChangeIndex={handleChangeIndex}
            animateTransitions={false}
          >
            <TabPanel value={value} index={0}>
              <Typography variant="h6">
                <b>How to add Command T Extension</b>
              </Typography>
              <br />
              <Typography>
                1. Go to{" "}
                <b onClick={handleClickExtension} className={classes.link}>
                  https://chrome.google.com/webstore/category/extensions
                </b>
              </Typography>
              <br />
              <Typography>2. Search for "CommandT"</Typography>
              <br />
              <Typography>3. Click "Add to Chrome"</Typography>
              <br />
              <Typography>
                <br />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <textarea
                    ref={textAreaRef}
                    value="https://commandt.herokuapp.com"
                    className="hide"
                  />
                  https://commandt.herokuapp.com
                  <Button onClick={copyToClipboard}>
                    <Copy size={20} strokeWidth={3} />
                  </Button>
                  {copied && (
                    <div className="unicorn-success">
                      <CheckCircle color={"#77dd77"} />
                      <large style={{ color: "#77dd77" }}>
                        &nbsp;Copied Successfully!
                      </large>
                    </div>
                  )}
                </div>
              </Typography>
              <br />

              <img
                src={ChromeExtension}
                style={{
                  borderRadius: "20px",
                  width: "100%",
                }}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography variant="h6">
                <b>How to set Command T as Homepage for Chrome</b>
              </Typography>
              <br />
              <Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  1. Click &nbsp;
                  <MoreVertical
                    style={{
                      backgroundColor: "lightgray",
                      borderRadius: "5px",
                    }}
                  />
                  &nbsp; and go to Settings
                </div>
              </Typography>
              <br />
              <Typography>2. Click "On startup" Tap</Typography>
              <br />
              <Typography>
                3. Select "Open a specific page or set of pages" and click "Add
                a new page"
              </Typography>
              <br />
              <Typography>
                4. Copy and paste URL
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <textarea
                    ref={textAreaRef}
                    value="https://commandt.herokuapp.com"
                    className="hide"
                  />
                  https://commandt.herokuapp.com
                  <Button onClick={copyToClipboard}>
                    <Copy size={20} strokeWidth={3} />
                  </Button>
                  {copied && (
                    <div className="unicorn-success">
                      <CheckCircle color={"#77dd77"} />
                      <large style={{ color: "#77dd77" }}>
                        &nbsp;Copied Successfully!
                      </large>
                    </div>
                  )}
                </div>
              </Typography>
              <br />
              <img
                src={UnicornChrome}
                style={{ borderRadius: "20px", width: "100%" }}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Typography variant="h6">
                <b>How to set Command T as Homepage for Firefox</b>
              </Typography>
              <br />
              <Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  1. Click &nbsp;
                  <Menu
                    style={{
                      backgroundColor: "lightgray",
                      borderRadius: "5px",
                    }}
                    strokeWidth={3}
                  />
                  &nbsp; and go to Preferences
                </div>
              </Typography>
              <br />
              <Typography>2. Click "Home" tab</Typography>
              <br />
              <Typography>
                3. On "Homepage and new windows", select "Custom URLs..."
              </Typography>
              <br />
              <Typography>
                4. Copy and paste URL into the URL field
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <textarea
                    ref={textAreaRef}
                    value="https://commandt.herokuapp.com"
                    className="hide"
                  />
                  https://commandt.herokuapp.com
                  <Button onClick={copyToClipboard}>
                    <Copy size={20} strokeWidth={3} />
                  </Button>
                  {copied && (
                    <div className="unicorn-success">
                      <CheckCircle color={"#77dd77"} />
                      <large style={{ color: "#77dd77" }}>
                        &nbsp;Copied Successfully!
                      </large>
                    </div>
                  )}
                </div>
              </Typography>
              <br />
              <img
                src={UnicornFirefox}
                style={{ borderRadius: "20px", width: "100%" }}
              />
            </TabPanel>
          </SwipeableViews>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default React.memo(UnicornButton);
