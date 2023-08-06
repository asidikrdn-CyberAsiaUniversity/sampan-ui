import axios from "axios";

// create base URL api
export const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// membuat fungsi untuk men-set default token headers
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
