import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import Home from "./Home";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validateLogin = Validation(values);
    setErrors(validateLogin);
    if (validateLogin.email === "" && validateLogin.password === "") {
      axios
        .post("http://localhost:8081/login", values)
        .then((res) => {
          if (res.data === "Success") {
            navigate("/home");
          } else {
            alert("Invalid Credentials");
          }
        })
        .catch((err) => {
          alert("Login failed");
        });
    }
  };

  return (
    <div className="login d-flex justify-content-center align-items-center vh-100">
      <div className="login-card bg-white p-4 rounded w-25 ">
        <h2 className="text-center mb-3">Sign-In</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              placeholder="Enter your E-mail.."
              className="form-control rounded-0"
              name="email"
              onChange={handleInput}
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your Password.."
              className="form-control rounded-0"
              name="password"
              onChange={handleInput}
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100">
            Log in
          </button>
          <p className="my-3 text-muted">
            You agree on our terms and conditions
          </p>
          <Link to="/signup" className="btn btn-default border w-100 bg-light">
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
