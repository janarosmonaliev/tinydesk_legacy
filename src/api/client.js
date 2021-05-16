import axios from "axios";

const client = axios.create({
  withCredentials: true,
  baseURL: "https://test-project-416.herokuapp.com",
  headers: {
    "Access-Control-Allow-Origin": "https://commandt.herokuapp.com",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

// client.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
// client.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
// client.defaults.headers.post["Access-Control-Allow-Methods"]
export default client;
