import React from "react";
// import App from "../components/landingpage/SignUp";
import SEO from "../components/seo";
import SignupPage from "../components/landing/signup-page";
import Layout from "../components/landing/layout";

const SignUp = () => (
  <>
    <SEO
      title="Sign up for CommandT"
      description="New here? Sign in with your Google account or create a new account."
    />
    <Layout>
      <SignupPage></SignupPage>
    </Layout>
  </>
);

export default SignUp;
