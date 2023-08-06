import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  return (
    <>
      {!localStorage.getItem("token") &&
      parseInt(localStorage.getItem("isLogin")) !== 1 ? (
        <Outlet />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
export default PublicRoute;
