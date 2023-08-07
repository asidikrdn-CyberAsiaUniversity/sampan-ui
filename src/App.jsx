import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminPrivateRoute from "./component/PrivateRoute/AdminPrivateRoute";
import PublicRoute from "./component/PrivateRoute/PublicRoute";
import { API, setAuthToken } from "./config/api";
import Dashboard from "./pages/Dashboard";
import Kategori from "./pages/Kategori";
import Login from "./pages/Login";
import Nasabah from "./pages/Nasabah";
import Staff from "./pages/Staff";
import Transaction from "./pages/Transaction";

function App() {
  const navigate = useNavigate();

  const checkAuth = async () => {
    console.log("menjalankan func check auth");
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    try {
      const response = await API.get("/check-auth");
      if (response.data.status === "200") {
        setAuthToken(response.data.data.token);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("isLogin", 1);
        localStorage.setItem("role", response.data.data.role.id);
      }
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("isLogin");
      localStorage.removeItem("role");
      navigate("/login");
    }
  };

  useEffect(() => {
    checkAuth();
    console.log("use effect di app js");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(API.defaults.headers.common["Authorization"]);

  return (
    <>
      <main>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<AdminPrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/trx" element={<Transaction />} />
            <Route path="/kat" element={<Kategori />} />
            <Route path="/nas" element={<Nasabah />} />
            <Route path="/stf" element={<Staff />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
