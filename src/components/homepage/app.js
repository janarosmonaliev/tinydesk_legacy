import React, { useState, useEffect, useMemo } from "react";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import NavigationBar from "./navbar";
import GridWrapper from "./grid-wrapper";
import FoldersWrapper from "./folders-wrapper";
import { UserContext } from "./context/UserContext";
import axios from "axios";

const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Inter"', "sans-serif"].join(","),
  },
  // To edit globals of Material Design
  overrides: {
    // Window
    MuiDialog: {
      paper: {
        borderRadius: "15px",
      },
      paperWidthMd: {
        maxWidth: "860px",
      },
    },
    // Window title
    MuiDialogTitle: {
      root: {
        paddingTop: "24px",
        paddingBottom: "4px",
      },
    },
    // Window content
    MuiDialogContent: {
      root: {
        paddingBottom: "24px",
      },
    },
    // Settings menu
    MuiMenu: {
      paper: {
        borderRadius: "10px",
        marginTop: "12px",
      },
    },
    MuiButton: {
      root: {
        textTransform: "none",
        paddingLeft: "24px",
        paddingRight: "24px",
      },
      containedPrimary: {
        backgroundColor: "#27AE60",
        ["&:hover"]: {
          backgroundColor: "#219653",
        },
      },
    },
    // List items
    MuiListItem: {
      root: {
        borderRadius: "8px",
        paddingTop: "4px",
        paddingBottom: "4px",
        "&$selected": {
          // backgroundColor: "rgba(85, 172, 104, 1);",
        },
      },
    },
    MuiDivider: {
      root: {
        marginTop: "4px",
        marginBottom: "4px",
      },
    },
    MuiDialogActions: {
      root: {
        justifyContent: "flex-start",
        padding: "16px 16px",
      },
    },
    MuiCheckbox: {
      root: {
        color: "rgba(85, 172, 104, 1)",
        "&$checked": {
          color: "rgba(85, 172, 104, 1);",
        },
      },
      colorPrimary: {
        color: "rgba(85, 172, 104, 1)",
        "&$checked": {
          color: "rgba(85, 172, 104, 1);",
        },
      },
    },
  },
});
const App = () => {
  //Static States
  const [jiggle, setJiggle] = useState(false);
  const [filter, setFilter] = useState(false);
  const [initialBackground, setInitialBackground] = useState();
  const [loading, setLoading] = useState(false);

  //Dynamic States
  const [background, setBackground] = useState("");
  const [unicorn, setUnicorn] = useState(false);
  const [location, setLocation] = useState({});
  const [folders, setFolders] = useState(null);
  // const [userId, setUserId] = useState();
  const [displayedBookmarks, setDisplayedBookmarks] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState("");

  useMemo(() => {
    setInitialBackground(background);
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      await axios({
        method: "GET",
        withCredentials: true,
        url: "https://commandt-backend.herokuapp.com/home",
      }).then((res) => {
        setFolders(res.data.folders);
        setBackground(res.data.backgroundImg);
        setUnicorn(res.data.keepUnicorn);
        // setUserId(res.data._id);
        setLocation(res.data.location);
        setDisplayedBookmarks(res.data.folders[0].bookmarks);
        setSelectedFolderId(res.data.folders[0]._id);
      });
      setLoading(false);
    };
    getUserData();
  }, []);

  // const [background, setBackground] = useState(
  //   "https://images.unsplash.com/photo-1481414981591-5732874c7193?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyMjAyNzR8MHwxfHNlYXJjaHw1fHxvcmFuZ2V8ZW58MHwwfHx8MTYxODU1NjAxNQ&ixlib=rb-1.2.1&q=85"
  // );

  const cancelSetBackground = () => {
    console.log("cancelling");
    setBackground(initialBackground);
  };

  const saveSetBackground = () => {
    setInitialBackground(background);
  };

  const unsplashImage = {
    backgroundImage: `url(${background.url})`,
  };

  useEffect(() => {
    if (!folders || selectedFolderId === "") {
      return;
    }
    setDisplayedBookmarks(
      folders.filter((folder) => folder._id === selectedFolderId)[0].bookmarks
    );
  }, [selectedFolderId, folders]);

  const handleStopJiggle = (e) => {
    const nodeName = e.target.nodeName;
    const targetType = e.target.type;
    if (jiggle) {
      if (
        nodeName === "svg" ||
        nodeName === "path" ||
        nodeName === "SPAN" ||
        targetType == "button"
      ) {
        return;
      }
      setJiggle(false);
      setFilter(false);
    }
  };

  if (loading) {
    return;
  }
  if (!folders) {
    return;
  }
  const userContext = {
    location,
    setLocation,
    jiggle,
    setJiggle,
    filter,
    setFilter,
    selectedFolderId,
    setSelectedFolderId,
    folders,
    setFolders,
    displayedBookmarks,
    setDisplayedBookmarks,
    unicorn,
    setUnicorn,
  };

  return (
    <UserContext.Provider value={userContext}>
      <ThemeProvider theme={theme}>
        <div
          className="app-window"
          style={unsplashImage}
          onClick={handleStopJiggle}
        >
          <div
            className={
              filter ? "app-window-filter active" : "app-window-filter"
            }
          >
            <Container maxWidth="lg">
              <NavigationBar
                handlePassBgUrl={(url) => setBackground(url)}
                saveChanges={saveSetBackground}
                xwe
                cancelChanges={cancelSetBackground}
              ></NavigationBar>
              <GridWrapper></GridWrapper>
              <FoldersWrapper></FoldersWrapper>
            </Container>
          </div>
        </div>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default React.memo(App);
