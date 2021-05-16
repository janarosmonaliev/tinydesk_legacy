import axios from "axios";

const client = axios.create({
  withCredentials: true,
});

client.defaults.baseURL = "https://test-project-416.herokuapp.com";

export default client;
