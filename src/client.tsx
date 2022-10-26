import axios from "axios";

export const client = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}/${process.env.REACT_APP_BACKEND_VERSION_1}`,
});
