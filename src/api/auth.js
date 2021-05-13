import { navigate } from "gatsby-link";
import client from "./client";

export const login = (data) =>
  client.post("/login", data).then((res) => {
    console.log(res);
    if (res.data == "Successfully Authenticated") {
      navigate("/home");
    } else {
      alert("Please check your email or password");
    }
  });

export const register = (data) => {
  client.post("/signup", data).then((res) => {
    console.log(res);
  });
};
