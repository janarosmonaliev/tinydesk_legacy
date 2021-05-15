import React from "react";
// import App from "../components/homepage/app";
import SEO from "../components/seo";
import loadable from "@loadable/component";

const App = loadable(() => import("../components/homepage/app"));
const Home = () => (
  <>
    <SEO title="Home" />
    <App></App>
  </>
);

export default Home;
