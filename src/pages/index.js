import React from "react";
import { Link } from "gatsby";
import { Router } from "@reach/router";
import SEO from "../components/seo";
import LandingPage from "../components/landing/layout";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import LoginPage from "../components/landing/login-page";

const theme = createMuiTheme({
  overrides: {
    // To edit globals of Material Design
  },
});

const IndexPage = () => (
  <LandingPage>
    {/* <Router basepath="/app">
      <LoginPage path="/loginpage"></LoginPage>
    </Router> */}
  </LandingPage>
);

export default IndexPage;
