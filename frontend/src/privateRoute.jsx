import { useContext, Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../authContext/auth";
import TriangleLoader from "./components/seller/TriangleLoader";

const ErrorPage = lazy(() =>
  import("../src/pages/sellerpages/pages/ErrorPage")
);

const PrivateRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  return user ? (
    <Outlet />
  ) : (
    <Suspense fallback={<TriangleLoader />}>
      <ErrorPage />
    </Suspense>
  );
};

export default PrivateRoute;
