import React, { useState, useEffect, useMemo } from "react";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import NavigationBar from "./navbar";
import GridWrapper from "./grid-wrapper";
import FoldersWrapper from "./folders-wrapper";
import { UserContext } from "./context/UserContext";
import * as fetch from "../../api/fetch";
import * as apiBackground from "../../api/backgroundapi";
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
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [todolists, setTodolists] = useState([]);
  const [notes, setNotes] = useState([]);
  // const [userId, setUserId] = useState();
  const [displayedBookmarks, setDisplayedBookmarks] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState("");

  useMemo(() => {
    setInitialBackground(background);
  }, []);

  useEffect(() => {
    setLoading(true);
    const setter = {
      setFolders,
      setBackground,
      setUnicorn,
      setEmail,
      setUsername,
      setLocation,
      setDisplayedBookmarks,
      setSelectedFolderId,
      setLoading,
      setTodolists,
      setNotes,
    };
    fetch.getUserData(setter);
  }, []);

  const cancelSetBackground = () => {
    console.log("cancelling");
    setBackground(initialBackground);
  };

  const saveSetBackground = () => {
    setInitialBackground(background);
    apiChangeBackground(background);
  };

  const apiChangeBackground = (image) => {
    console.log("set background image with url ", image);
    const data = { url: image };
    apiBackground.apiChangeBackground(data);
  };

  const unsplashImage = {
    backgroundImage: `url(${background})`,
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
    email,
    username,
    todolists,
    setTodolists,
    notes,
    setNotes,
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
