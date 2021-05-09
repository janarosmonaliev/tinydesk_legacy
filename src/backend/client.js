import axios from "axios";

const client = axios.create();

client.defaults.baseURL = "https://commadt.herokuapp.com/";

export default client;
