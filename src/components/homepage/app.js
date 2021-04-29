import React, { useState, useEffect, useMemo } from "react";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import NavigationBar from "./navbar";
import GridWrapper from "./grid-wrapper";
import FoldersWrapper from "./folders-wrapper";
import Image from "../../images/mac-os-bg.png";
import { UserContext } from "./context/UserContext";
import nextId from "react-id-generator";

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
  const [background, setBackground] = useState(
    "https://images.unsplash.com/photo-1481414981591-5732874c7193?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyMjAyNzR8MHwxfHNlYXJjaHw1fHxvcmFuZ2V8ZW58MHwwfHx8MTYxODU1NjAxNQ&ixlib=rb-1.2.1&q=85"
  );

  const [initialBackground, setInitialBackground] = useState();

  useMemo(() => {
    setInitialBackground(background);
  }, []);

  const cancelSetBackground = () => {
    console.log("cancelling");
    setBackground(initialBackground);
  };

  const saveSetBackground = () => {
    setInitialBackground(background);
  };

  const unsplashImage = {
    backgroundImage: `url(${background})`,
  };

  //Dummy data
  //User Location
  const initialLocation = {
    id: 1843564,
    name: "Incheon",
    state: "",
    country: "KR",
    coord: {
      lon: 126.731667,
      lat: 37.453609,
    },
  };
  //Todo list
  const initialTodolists = {
    todolists: [
      {
        title: "Academic",
        id: nextId(),
        toggle: true,
        todos: [
          {
            title: "30s presentation for CSE416",
            isCompleted: false,
            toggle: true,
            id: nextId(),
          },
          {
            title: "POL101 read chapter 1",
            isCompleted: false,
            toggle: true,
            id: nextId(),
          },
          {
            title: "CSE416 Software Requirements",
            isCompleted: false,
            toggle: true,
            id: nextId(),
          },
        ],
      },
      {
        title: "Life Goals",
        id: nextId(),
        toggle: true,
        todos: [
          {
            title: "Study ReactJS",
            isCompleted: false,
            toggle: true,
            id: nextId(),
          },
          {
            title: "Study SwiftUI",
            isCompleted: false,
            toggle: true,
            id: nextId(),
          },
          {
            title: "Hello world,",
            isCompleted: false,
            toggle: true,
            id: nextId(),
          },
        ],
      },
      {
        title: "My daily todos",
        id: nextId(),
        toggle: true,
        todos: [
          {
            title: "Laundry",
            isCompleted: false,
            toggle: true,
            id: nextId(),
          },
          {
            title: "Run 3 miles",
            isCompleted: false,
            toggle: true,
            id: nextId(),
          },
          {
            title: "Dinner with Kwangmin",
            isCompleted: false,
            toggle: true,
            id: nextId(),
          },
        ],
      },
    ],
  };

  //Folder & Bookmarks
  //This one gotta be one that fetched from DB
  const initialFolders = {
    folders: [
      {
        title: "Academic",
        id: nextId(),
        bookmarks: [
          {
            title: "Google Business",
            url: "https://www.google.com/about",
            thumbnail:
              "https://www.google.com/images/branding/product/ico/google_my_business_alldp.ico",
            color: "yellow",
            id: nextId(),
          },
          {
            title: "Github",
            url: "https://github.com",
            thumbnail:
              "https://github.githubassets.com/apple-touch-icon-180x180.png",
            color: "green",
            id: nextId(),
          },
          {
            title: "CSE416 Project",
            url: "https://www.github.com/janarosmonaliev/project-416",
            thumbnail:
              "https://github.githubassets.com/apple-touch-icon-180x180.png",
            color: "orange",
            id: nextId(),
          },
          {
            title: "Medium",
            url: "https://www.medium.com",
            thumbnail:
              "https://miro.medium.com/fit/c/152/152/1*sHhtYhaCe2Uc3IU0IgKwIQ.png",
            color: "red",
            id: nextId(),
          },
          {
            title: "Google",
            url: "https://www.google.com/about",
            thumbnail:
              "https://www.google.com//images/branding/googleg/1x/googleg_standard_color_128dp.png",
            color: "blue",
            id: nextId(),
          },
        ],
      },
      {
        title: "Design",
        id: nextId(),
        bookmarks: [
          {
            title: "Medium",
            url: "https://www.medium.com",
            thumbnail:
              "https://miro.medium.com/fit/c/152/152/1*sHhtYhaCe2Uc3IU0IgKwIQ.png",
            color: "",
            id: nextId(),
          },
          {
            title: "Google",
            url: "https://www.google.com/about",
            thumbnail:
              "https://www.google.com//images/branding/googleg/1x/googleg_standard_color_128dp.png",
            color: "https://www.google.com",
            id: nextId(),
          },
        ],
      },
      {
        title: "Reading",
        id: nextId(),
        bookmarks: [
          {
            title: "Github",
            url: "https://github.com",
            thumbnail:
              "https://github.githubassets.com/apple-touch-icon-180x180.png",
            color: "",
            id: nextId(),
          },
          {
            title: "CSE416 Project",
            url: "https://www.github.com/janarosmonaliev/project-416",
            thumbnail:
              "https://github.githubassets.com/apple-touch-icon-180x180.png",
            color: "",
            id: nextId(),
          },
        ],
      },
    ],
  };
  const [location, setLocation] = useState(initialLocation);
  const [todolists, setTodolists] = useState(initialTodolists.todolists);
  const [jiggle, setJiggle] = useState(false);
  const [filter, setFilter] = useState(false);
  const [folders, setFolders] = useState(initialFolders.folders);
  const [selectedFolderId, setSelectedFolderId] = useState(folders[0].id);
  const [displayedBookmarks, setDisplayedBookmarks] = useState(
    folders[0].bookmarks
  );

  useEffect(() => {
    setDisplayedBookmarks(
      folders.filter((folder) => folder.id === selectedFolderId)[0].bookmarks
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
    todolists,
    setTodolists,
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

export default App;
