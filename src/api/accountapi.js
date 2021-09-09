import client from "./client";
import * as auth from "./auth";

//save location & keepUnicorn changes
export const apiChangeUserInfo = (data) => {
  client.put("/home/account", data).catch((error) => {
    console.log(error);
  });
};

//delete current user's account
export const apiDeleteAccount = (setError) => {
  client
    .delete("/home/account/")
    .then((res) => {
      auth.logout({}, setError);
    })
    .catch((error) => {
      console.log(error);
    });
};
