import { ContactSupportOutlined } from "@material-ui/icons";
import { navigate } from "gatsby-link";

import client from "./client";

export const apiAddNote = (data) => {
  const promise = new Promise((resolve) => {
    client
      .post("/home/notes/", data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return promise;
};
export const apiChangeNoteTitle = (data) => {
  client.put("/home/notes/title", data).catch((error) => {
    console.log(error);
  });
};

export const apiUpdateNote = (data) => {
  client.put("/home/notes/", data).catch((error) => {
    console.log(error);
  });
};

export const apiDeleteNote = (payload) => {
  client.delete("/home/notes/", { data: payload }).catch((error) => {
    console.log(error);
  });
};

export const apiChangeNotePosition = (data) => {
  client.put("/home/notes/order", data).catch((error) => {
    console.log(error);
  });
};
