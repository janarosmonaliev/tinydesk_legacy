import client from "./client";

export const apiChangeUserInfo = (data) => {
  client
    .put("/home/account", data)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};
