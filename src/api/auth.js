import { AlternateEmailRounded } from "@material-ui/icons";
import { navigate } from "gatsby-link";

import client from "./client";

export const login = (data, setError, setFilter) => {
  setFilter(true);
  client
    .post("/login", data)
    .then((res) => {
      console.log(res);
      if (res.data == "Successfully Authenticated") {
        navigate("/home");
      } else {
        setError(true);
        setFilter(false);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const register = (data, setError, setDisabled) => {
  client.post("/signup", data).then((res) => {
    console.log(res);
    if (res.data === "user Already Exists") {
      setError(true);
      setDisabled(false);
    } else if (res.data == "New user created") {
      alert("New account is successfully created!");
      navigate("/");
    }
  });
};
