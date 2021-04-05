import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    // To edit globals of Material Design
  },
});

const IndexPage = () => (
  <ThemeProvider theme={theme}>
    <Layout>
      <SEO title="Log In or Sign Up" />
      <h1>Landing Page</h1>
      <p>Welcome to Jurassic Park.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}></div>
      <Link to="/home/">Home</Link> <br />
      <Link to="/design-system/">Typography</Link> <br />
    </Layout>
  </ThemeProvider>
);

export default IndexPage;
