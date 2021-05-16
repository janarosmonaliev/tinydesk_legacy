import axios from "axios";

const client = axios.create({
  withCredentials: true,
});

client.defaults.baseURL = "https://test-project-416.herokuapp.com";
// client.defaults.baseURL = "http://localhost:4000";
// client.defaults.headers.post["Content-Type"] = "text/html; charset=utf-8";
// client.defaults.headers.common["Authorization"] = "Bearer a1b2c3d4";
// client.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
export default client;
