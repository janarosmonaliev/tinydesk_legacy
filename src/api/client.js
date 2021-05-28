import axios from "axios";

const client = axios.create({
    withCredentials: true,
});

client.defaults.baseURL = "https://commandt-backend.herokuapp.com/";
// client.defaults.baseURL = "http://localhost:4000";

export default client;