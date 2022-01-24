import axios from "axios";

const instance = axios.create({
  baseURL: "http://lsyengtsll.cdprojektred.com:3000/api",
  timeout: 15000,
});

export default instance;
