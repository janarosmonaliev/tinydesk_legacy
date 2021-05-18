import { navigate } from "gatsby-link";

import client from "./client";

export const login = (data, setError, setFilter) => {
  setFilter(true);
  client
    .post("/login", data)
    .then((res) => {
      console.log(res);
      if (res.data.userId != null) {
        directHome(res.data.userId);
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

const directHome = (id) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  client.get("/home", id).then((res) => {
    console.log(res);
  });
};
