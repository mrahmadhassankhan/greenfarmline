import { Navigate } from "react-router-dom";

const RoleRoute = ({ children, allowedRoles }) => {
  const userRole = JSON.parse(localStorage.getItem("user")).role; // Fetch user role from localStorage (or use Redux/Context API)
  
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />; // Redirect to home if role is not allowed
  }

  return children;
};

export default RoleRoute;
