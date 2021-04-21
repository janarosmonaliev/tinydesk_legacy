import React from "react";
import { Container, Grid } from "@material-ui/core";
import FeatureImage from "../../images/feature-image.jpg";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    // To edit globals of Material Design
    MuiCard: {
      root: {
        borderRadius: "8px",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        "@media (min-width: 960px)": {
          border: "1px solid rgba(0, 0, 0, 0.12)",
        },
      },
    },
    MuiButton: {
      root: {
        marginTop: "16px",
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
      contained: {
        color: "white",
        backgroundColor: "#333333",
        ["&:hover"]: {
          backgroundColor: "#000000",
        },
      },
      outlined: {
        borderColor: "#333333",
        ["&:hover"]: {
          borderColor: "#000000",
        },
      },
    },
    MuiTextField: {
      root: {
        marginBottom: "16px",
      },
    },
  },
});

const Layout = ({ children }, props) => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
          style={{ height: "100vh" }}
        >
          {/* Pages will be inserted here */}
          {children}

          {/* This is the right image banner */}
          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            className={"landing-image-container"}
          >
            <div className="landing-image-wrapper">
              <img src={FeatureImage} className="landing-image"></img>
            </div>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
