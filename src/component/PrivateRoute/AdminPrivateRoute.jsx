import { Navigate, Outlet } from "react-router-dom";
import NavigationBar from "../NavigationBar";
import SideBar from "../SideBar";

const AdminPrivateRoute = () => {
  return (
    <>
      {!localStorage.getItem("token") &&
      parseInt(localStorage.getItem("isLogin")) !== 1 ? (
        <Navigate to="/login" />
      ) : (
        <>
          <NavigationBar />
          <div id="layoutSidenav">
            <SideBar />
            <div id="layoutSidenav_content">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default AdminPrivateRoute;
