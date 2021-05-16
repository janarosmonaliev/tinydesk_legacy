import axios from "axios";

const client = axios.create({
  withCredentials: true,
});

client.defaults.baseURL = "https://commandt-backend.herokuapp.com";

export default client;
