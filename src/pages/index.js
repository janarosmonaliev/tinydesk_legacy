import React from "react";
import { Link } from "gatsby";
import { Router } from "@reach/router";
import SEO from "../components/seo";

import Layout from "../components/landing/layout";
import WelcomePage from "../components/landing/welcome-page";

const IndexPage = () => (
  <>
    <SEO />
    <Layout>
      <WelcomePage />
    </Layout>
  </>
);

export default IndexPage;
