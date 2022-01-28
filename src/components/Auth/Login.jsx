import React from "react";
import Navbar from "../Home/Navbar";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FiUserCheck } from "react-icons/fi";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Vector from "../images/loginpic.svg";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/User/UserActions";
import { FcGoogle } from "react-icons/fc";
import { useTranslation } from "react-i18next";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const demoLogin = (e) => {
    e.preventDefault();
    Axios.post(
      "https://localhost:3001/login",
      { email: "demo@demo.com", password: "12demo21omed87" },
      { withCredentials: true }
    ).then((response) => {
      dispatch(setCurrentUser(response.data));
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/home/allDesigns");
    });
  };

  const google = () => {
    window.open("https://localhost:3001/auth/google", "_self");
  };

  const facebook = () => {
    window.open("https://localhost:3001/auth/facebook", "_self");
  };

  const linkedIn = () => {
    window.open("https://localhost:3001/auth/linkedIn", "_self");
  };

  return (
    <div>
      <Navbar />
      <div className="login-box">
        <div className="login-info">
          <h1>
            {t("head1")}
            <br></br>
            {t("head2")}
          </h1>
          <p>{t("loginp")}</p>
          <button className="facebook-btn login-btn" onClick={google}>
            <FcGoogle />
            <span>{t("logingoogle")}</span>
          </button>
          <button className="facebook-btn login-btn" onClick={facebook}>
            <FaFacebook />
            <span>{t("loginfacebook")}</span>
          </button>
          <button className="linkedin-btn login-btn" onClick={linkedIn}>
            <FaLinkedin />
            <span>{t("loginLinkedIn")}</span>
          </button>
          <div className="striked-line">
            <hr></hr>
            <div className="OR">{t("OR")}</div>
            <hr></hr>
          </div>
          <button className="demo login-btn" onClick={demoLogin}>
            <FiUserCheck />
            <span>{t("logindemo")}</span>
          </button>
          <Link to="/login">
            <button className="google-btn login-btn">
              <span>{t("loginaccount")}</span>
            </button>
          </Link>
          <p className="login-foot">
            {t("newTographics")} <Link to="/register">{t("register")}</Link>
          </p>
        </div>
        <div className="login-pic">
          <img className="login-vector" src={Vector} alt="login-pic" />
        </div>
      </div>
    </div>
  );
}

export default Login;
