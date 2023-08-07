import { Navigate, Outlet } from "react-router-dom";
import NavigationBar from "../NavigationBar";
import SideBar from "../SideBar";
import Footer from "../Footer";

const AdminPrivateRoute = () => {
  return (
    <>
      {!localStorage.getItem("token") &&
      parseInt(localStorage.getItem("isLogin")) !== 1 ? (
        <Navigate to="/login" />
      ) : (
        <>
          <NavigationBar />
          <div id="layoutSidenav" style={{ minHeight: "100vh" }}>
            <SideBar />
            <div
              id="layoutSidenav_content"
              style={{ overflow: "scroll", marginTop: "5vh" }}
            >
              <Outlet />
              <Footer />
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default AdminPrivateRoute;
