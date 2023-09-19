import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import axios from "axios";

function Signup() {
  const [values, setValues] = useState({
    name: "",
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
    if (
      validateLogin.name === "" &&
      validateLogin.email === "" &&
      validateLogin.password === ""
    ) {
      axios
        .post("http://localhost:8081/signup", values)
        .then((res) => navigate("/"))
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="login d-flex justify-content-center align-items-center vh-100">
      <div className="login-card bg-white p-4 rounded w-25 ">
        <h2 className="text-center mb-3">Sign-Up</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter your Name.."
              name="name"
              className="form-control rounded-0"
              onChange={handleInput}
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              placeholder="Enter your E-mail.."
              className="form-control rounded-0"
              onChange={handleInput}
              name="email"
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
              onChange={handleInput}
              name="password"
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100">
            Sign Up
          </button>
          <p className="my-3 text-muted">
            You agree on our terms and conditions
          </p>
          <p className="mb-0 text-muted text-start">Already have an account?</p>
          <Link to="/" className="btn btn-default border w-100 bg-light">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
