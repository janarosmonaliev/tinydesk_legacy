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
  // const [theEmail, setTheEmail] = useState(null);
  // const [theUserName, setTheUserName] = useState(null);
  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     withCredentials: true,
  //     url: "http://localhost:4000/home",
  //   }).then((res) => {
  //     console.log(res.data);
  //     setTheEmail(res.data.email);
  //     setTheUserName(res.data.username);
  //   });
  // }, []);

  const [userEmail, setUserEmail] = useState();
  const [username, setUsername] = useState();
  const [userFolders, setUserFolders] = useState();
  const [userTodolists, setUserTodolists] = useState();
  const [userNotes, setUserNotes] = useState();
  const [userBackground, setUserBackground] = useState();
  const [userUnicorn, setUserUnicorn] = useState();
  const [userId, setUserId] = useState();
  const [userLocation, setUserLocation] = useState();
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:4000/home",
    }).then((res) => {
      console.log(res.data);
      setUserEmail(res.data.email);
      setUsername(res.data.username);
      setUserFolders(res.data.folders);
      setUserTodolists(res.data.todolists);
      setUserNotes(res.data.notes);
      setUserBackground(res.data.backgroundImg);
      setUserUnicorn(res.data.keepUnicorn);
      setUserId(res.data._id);
      setUserLocation(res.data.location);
    });
  }, []);

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
  const [events, setEvents] = useState([]);
  // const [userId, setUserId] = useState();
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [selectedFolderIndex, setSelectedFolderIndex] = useState(0);

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
      setSelectedFolderId,
      setLoading,
      setTodolists,
      setNotes,
      setEvents,
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
    unicorn,
    setUnicorn,
    email,
    username,
    todolists,
    setTodolists,
    notes,
    setNotes,
    events,
    setEvents,
    selectedFolderIndex,
    setSelectedFolderIndex,
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
