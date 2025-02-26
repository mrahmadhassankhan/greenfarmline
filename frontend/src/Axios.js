import axios from "axios";

const Axios_Node = axios.create({
  baseURL: import.meta.env.VITE_NODE_URL,
  withCredentials: true, // Ensures cookies (like session cookies) are sent
});

const Axios_Flask = axios.create({
  baseURL: import.meta.env.VITE_FLASK_URL,
});

Axios_Node.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // List of routes where token should NOT be attached
    const excludedRoutes = ["/login", "/signup"];

    // Check if the request is NOT in excludedRoutes before attaching the token
    if (token && !excludedRoutes.some(route => config.url.includes(route))) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export { Axios_Node, Axios_Flask };
