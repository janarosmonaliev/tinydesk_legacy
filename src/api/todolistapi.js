import { ContactSupportOutlined } from "@material-ui/icons";
import { navigate } from "gatsby-link";

import client from "./client";

export const apiAddTodolist = (data) => {
  client
    .post("/home/todolist/", data)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const apiDeleteTodolist = (data) => {
  client
    .delete("/home/folder/", data)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};
