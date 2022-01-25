import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_MY_API,
  timeout: 15000,
});

export default instance;
