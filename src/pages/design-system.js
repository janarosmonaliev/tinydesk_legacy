import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
const DesignPage = () => (
  <>
    <Container>
      <Box marginTop={"32px"}></Box>
      <h1>
        {" "}
        H1 (Display XLarge, 36px/42px) - used for super large display headings
      </h1>
      <h2> H2 (Display Large, 28px) - used for large display headings</h2>
      <h3> H3 (Display Medium, 26px) - used for medium display headings</h3>
      <h4>
        H4 (Page Heading, 20px) - used for page headings, like page topics
      </h4>
      <h5> H5 (Heading, 18px) - Used for paragraph headings</h5>
      <h6> H6 (Subheading, 12px) - Used for subhedings, like tags</h6>
      <p> p (Body Text, 15px) - default body text</p>
      <small> small (Caption, 12.5px) - used for small helper texts</small>
    </Container>
  </>
);

export default DesignPage;
