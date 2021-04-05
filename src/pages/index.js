import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Landing from "../components/landingpage/Landing"

const theme = createMuiTheme({
  overrides: {
    // To edit globals of Material Design
  },
});

const IndexPage = () => (
  <Landing></Landing>
);

export default IndexPage;
