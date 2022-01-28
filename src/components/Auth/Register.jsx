import React, { useState } from "react";
import Navbar from "../Home/Navbar";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import Vector from "../images/loginpic.svg";
import { FaAngleDoubleLeft } from "react-icons/fa";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/User/UserActions";

function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const input = e.target.name;
    const value = e.target.value;
    setData({ ...data, [input]: value });
  };

  Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(
      "https://localhost:3001/register",
      { name: data.name, email: data.email, password: data.password },
      { withCredentials: true }
    ).then((response) => {
      dispatch(setCurrentUser(response.data.user));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/home");
    });
  };
  return (
    <div>
      <Navbar />
      <div className="login-box">
        <div className="register-info">
          <h1>
            <Link to="/">
              <FaAngleDoubleLeft />
            </Link>
            Create your account
          </h1>
          <p>We'll have you designing in no time.</p>
          <form onSubmit={handleSubmit}>
            <input
              className="reg-input"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              className="reg-input"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              className="reg-input"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <p className="login-foot">Use 6 or more characters</p>
            <button className="signup-btn login-btn">Sign Up with Email</button>
          </form>
          <p className="login-foot">
            By signing up, you agree to Gwaphics' Terms of Use and Privacy
            Policy.
          </p>
          <p className="login-foot">
            Already signed up? <Link to="/login">Log in</Link>
          </p>
        </div>
        <div className="login-pic">
          <img className="login-vector" src={Vector} alt="login-pic" />
        </div>
      </div>
    </div>
  );
}

export default Register;
