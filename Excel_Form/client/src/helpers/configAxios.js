import axios from "axios";

const BACKEND_URI = process.env.REACT_APP_BACKEND_URI
  ? process.env.REACT_APP_BACKEND_URI
  : "";

export const api = token => {
  return axios.create({
    // withCredentials: true,
    baseURL: `${BACKEND_URI}/`,
    headers: {
      Authorization: token,
    }
  });
};

