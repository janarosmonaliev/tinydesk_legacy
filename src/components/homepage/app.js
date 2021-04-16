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
    "https://raw.githubusercontent.com/janarosmonaliev/project-416/master/src/images/mac-os-bg.png?token=AHRF2MQPFXGXN6WAOXAINPDAOQZ2A"
  );
  const unsplashImage = {
    backgroundImage: `url(${background})`,
  };

  //Dummy data
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

  return (
    <ThemeProvider theme={theme}>
      <div className="app-window" style={unsplashImage}>
        <Container maxWidth="lg">
          <NavigationBar
            handlePassBgUrl={(url) => setBackground(url)}
            location={userLocation}
          ></NavigationBar>
          <GridWrapper></GridWrapper>
          <FoldersWrapper></FoldersWrapper>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;
