import { ContactSupportOutlined } from "@material-ui/icons";
import { navigate } from "gatsby-link";

import client from "./client";

export const apiAddTodolist = (data) => {
  const promise = new Promise((resolve) => {
    client
      .post("/home/todolists/", data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return promise;
};

export const apiDeleteTodolist = (payload) => {
  client
    .delete("/home/todolists/", { data: payload })

    .catch((error) => {
      console.log(error);
    });
};

export const apiChangeTitle = (data) => {
  client
    .put("/home/todolists/", data)

    .catch((error) => {
      console.log(error);
    });
};

export const apiChangeTodolistPosition = (data) => {
  client
    .put("/home/todolists/order", data)

    .catch((error) => {
      console.log(error);
    });
};
