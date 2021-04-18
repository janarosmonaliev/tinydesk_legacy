import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import NavigationBar from "./navbar";
import GridWrapper from "./grid-wrapper";
import FoldersWrapper from "./folders-wrapper";
import Image from "../../images/mac-os-bg.png";

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
  const unsplashImage = {
    backgroundImage: `url(${background})`,
  };

  //Dummy data
  //User Location
  const userLocation = {
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
  const todolist = {
    todolist: [
      {
        title: "Academic",
        index: 0,
        toggle: true,
        todos: [
          {
            title: "30s presentation for CSE416",
            isCompleted: false,
            toggle: true,
            index: 0,
          },
          {
            title: "POL101 read chapter 1",
            isCompleted: false,
            toggle: true,
            index: 1,
          },
          {
            title: "CSE416 Software Requirements",
            isCompleted: false,
            toggle: true,
            index: 2,
          },
        ],
      },
      {
        title: "Life Goals",
        index: 1,
        toggle: true,
        todos: [
          {
            title: "Study ReactJS",
            isCompleted: false,
            toggle: true,
            index: 0,
          },
          {
            title: "Study SwiftUI",
            isCompleted: false,
            toggle: true,
            index: 1,
          },
          {
            title: "Hello world,",
            isCompleted: false,
            toggle: true,
            index: 2,
          },
        ],
      },
      {
        title: "My daily todos",
        index: 2,
        toggle: true,
        todos: [
          {
            title: "Laundry",
            isCompleted: false,
            toggle: true,
            index: 0,
          },
          {
            title: "Run 3 miles",
            isCompleted: false,
            toggle: true,
            index: 1,
          },
          {
            title: "Dinner with Kwangmin",
            isCompleted: false,
            toggle: true,
            index: 2,
          },
        ],
      },
    ],
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="app-window" style={unsplashImage}>
        <Container maxWidth="lg">
          <NavigationBar
            handlePassBgUrl={(url) => setBackground(url)}
            location={userLocation}
          ></NavigationBar>
          <GridWrapper
            location={userLocation}
            todolist={todolist}
          ></GridWrapper>
          <FoldersWrapper></FoldersWrapper>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;
