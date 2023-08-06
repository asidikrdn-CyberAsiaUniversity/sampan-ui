import React, { useState } from "react";
import { useMutation } from "react-query";
import { API, setAuthToken } from "../config/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = useMutation(async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/login", {
        username: username,
        password: password,
      });
      console.log("Login Response :", response);
      if (response.data.status === 200) {
        setAuthToken(response.data.data.token);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("isLogin", 1);
        localStorage.setItem("role", response.data.data.role.id);
        Swal.fire({
          title: "Login Success",
          icon: "success",
        });
        navigate("/");
      }
    } catch (e) {
      // console.log(e);
      Swal.fire({
        title: "Login Failed",
        text: e.response.data.message,
        icon: "error",
      });
    }
  });

  // styling
  const loginPageStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "92vh",
    width: "100vw",
  };

  const loginFormStyle = {
    backgroundColor: "#f0f0f0",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "300px",
  };

  const headingStyle = {
    textAlign: "center",
  };

  const formGroupStyle = {
    marginBottom: "10px",
  };

  const labelStyle = {
    display: "block",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <div style={loginPageStyle}>
      <div style={loginFormStyle}>
        <h2 style={headingStyle}>Login</h2>
        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="email">
            Email address
          </label>
          <input
            style={inputStyle}
            type="email"
            name="username"
            placeholder="Enter your email"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="password">
            Password
          </label>
          <input
            style={inputStyle}
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div style={formGroupStyle}>
          <button
            style={buttonStyle}
            type="submit"
            onClick={handleLogin.mutate}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
