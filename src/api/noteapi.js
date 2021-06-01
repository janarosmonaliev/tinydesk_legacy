import { ContactSupportOutlined } from "@material-ui/icons";
import { navigate } from "gatsby-link";

import client from "./client";

export const apiAddNote = (data) => {
  const promise = new Promise((resolve) => {
    client
      .post("/home/notes/", data)
      .then((res) => {
        console.log(res);
        resolve(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return promise;
};
