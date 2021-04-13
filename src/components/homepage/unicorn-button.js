import React, { useState, useRef } from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { Zap, X, Copy, MoreVertical, Menu, CheckCircle } from "react-feather";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SwipeableViews from "react-swipeable-views";
import Divider from "@material-ui/core/Divider";
import UnicornSafari from "../../images/unicorn-safari.png";
import UnicornChrome from "../../images/unicorn-chrome.png";
import UnicornFirefox from "../../images/unicorn-firefox.png";
import Button from "@material-ui/core/Button";

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

export default function UnicornButton(props) {
  //Dialog
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
          <Zap strokeWidth={2} color="#4f4f4f"></Zap>
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
            <Tab label="Safari" {...a11yProps(0)} />
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
                <b>How to set Command T as Homepage for Safari</b>
              </Typography>
              <br />
              <Typography>
                1. Go to Safari "Preferences" OR Press (⌘ + ,)
              </Typography>
              <br />
              <Typography>2. Go to "General" tab</Typography>
              <br />
              <Typography>
                3. Set Both "New windows open with" and "New tabs open with" as
                Homepage
              </Typography>
              <br />
              <Typography>
                4. On "Homepage" field, copy and paste the URL
                <br />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <textarea
                    ref={textAreaRef}
                    value="https://commandt.com"
                    className="hide"
                  />
                  https://commandt.com
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
                src={UnicornSafari}
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
                    value="https://commandt.com"
                    className="hide"
                  />
                  https://commandt.com
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
                    value="https://commandt.com"
                    className="hide"
                  />
                  https://commandt.com
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
}
