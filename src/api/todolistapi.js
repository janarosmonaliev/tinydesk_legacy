import { ContactSupportOutlined } from "@material-ui/icons";
import { navigate } from "gatsby-link";

import client from "./client";

export const apiAddTodolist = () => {
  client
    .post("/home/todolist/")
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const apiDeleteTodolist = (data) => {
  client
    .delete("/home/todolist/", { removeId: data })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const apiChangeTitle = (data) => {
  client
    .put("/home/todolist", { title: data })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};
