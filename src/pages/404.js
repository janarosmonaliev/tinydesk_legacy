import React from "react";
import { Grid } from "@material-ui/core";
import Layout from "../components/landing/layout";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <Layout>
      <Grid item xs={12} md={6} lg={6}>
        <h1>404: Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Grid>
    </Layout>
  </>
);

export default NotFoundPage;
