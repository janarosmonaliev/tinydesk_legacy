import client from "./client";

export const apiChangeBackground = (data) => {
  client
    .put("/home/background/", data)

    .catch((error) => {
      console.log(error);
    });
};
