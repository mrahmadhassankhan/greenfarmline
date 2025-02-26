import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../authContext/auth";
import ErrorPage from "./pages/sellerpages/pages/ErrorPage";

const PrivateRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  return user ? <Outlet /> : <ErrorPage />;
};

export default PrivateRoute;
