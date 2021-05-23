import { ContactSupportOutlined } from "@material-ui/icons";
import { navigate } from "gatsby-link";

import client from "./client";

export const apiAddFolder = (data) => {
  client
    .post("/home/folder/", data)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
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
