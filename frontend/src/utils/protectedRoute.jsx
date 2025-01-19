import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = (localStorage.getItem("token") || "").trim();
  if (token === "") {
    return <Navigate to="/error" />;
  }
  return children;
};

export default ProtectedRoute;
