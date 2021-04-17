import React from "react";
// import App from "../components/landingpage/Login";
import LoginPage from "../components/landing/login-page";
import Layout from "../components/landing/layout";
import SEO from "../components/seo";

const Login = () => (
  <>
    <SEO
      title="Log in to CommandT"
      description="Already have an account? Log in with your email and password."
    />
    <Layout>
      <LoginPage></LoginPage>
    </Layout>
  </>
);

export default Login;
