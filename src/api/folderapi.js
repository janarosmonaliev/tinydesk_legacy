import { ContactSupportOutlined } from "@material-ui/icons";
import { navigate } from "gatsby-link";

import client from "./client";

export const apiAddFolder = (data) => {
  const promise = new Promise((resolve) => {
    client
      .post("/home/folder/", data)
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

export const apiDeleteFolder = (payload) => {
  console.log("check right id ", payload.remove);
  client
    .delete("/home/folder/", { data: payload })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const apiChangeFolderPosition = (data) => {
  client
    .put("/home/folder/order", data)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const apiChangeFolderTitle = (data) => {
  client
    .put("/home/folder", data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
