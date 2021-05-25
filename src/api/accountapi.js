import client from "./client";
import * as auth from "./auth";

//save location & keepUnicorn changes
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

//delete current user's account
export const apiDeleteAccount = (setError) => {
  client
    .delete("/home/account/")
    .then((res) => {
      console.log(res);
      //after deleting account, the user is automatically logged out from Command T
      auth.logout({}, setError);
    })
    .catch((error) => {
      console.log(error);
    });
};
