import axios from "axios";

const Axios_Node = axios.create({
  baseURL: import.meta.env.VITE_NODE_URL,
	withCredentials: true,
});

const Axios_Flask = axios.create({
  baseURL: import.meta.env.VITE_FLASK_URL
,
});

export { Axios_Node, Axios_Flask };
