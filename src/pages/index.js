import React from "react";
import SEO from "../components/seo";

import Layout from "../components/landing/layout";
import WelcomePage from "../components/landing/welcome-page";

const IndexPage = () => (
  <>
    <SEO title="Command T" />
    <Layout>
      <WelcomePage />
    </Layout>
  </>
);

export default IndexPage;
