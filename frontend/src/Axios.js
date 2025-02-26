import axios from "axios";

const Axios_Node = axios.create({
  baseURL: import.meta.env.VITE_NODE_URL,
  withCredentials: true,
});

const Axios_Flask = axios.create({
  baseURL: import.meta.env.VITE_FLASK_URL,
});

Axios_Node.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { Axios_Node, Axios_Flask };
