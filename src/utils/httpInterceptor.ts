import axios from "axios";

export const api = axios.create();

api.interceptors.request.use(
  (config) => {
    config.url = `https://date.nager.at${config.url}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
