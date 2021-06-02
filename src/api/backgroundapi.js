import client from "./client";

export const apiChangeBackground = (data) => {
  client
    .put("/home/background/", data)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};
