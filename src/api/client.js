import axios from "axios";

const client = axios.create({
  withCredentials: true,
});

client.defaults.baseURL = "https://test-project-416.herokuapp.com";
client.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
client.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
export default client;
