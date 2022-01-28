import React, { useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/User/UserActions";
import UserDropDown from "../Dropdowns/UserDropDown";
import { useNavigate } from "react-router";
import User from "../images/user.png";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toggleDrop, setToggleDrop] = useState(false);

  const Logout = () => {
    window.open("https://localhost:3001/auth/logout", "_self");
    localStorage.clear();
    navigate("/");
    dispatch(setCurrentUser(null));
  };
  return (
    <>
      <div className="user-icon">
        <button className="drop-btn" onClick={() => setToggleDrop(!toggleDrop)}>
          <img className="user-avatar" src={User} alt="profile img" />
        </button>
        {toggleDrop ? <UserDropDown Logout={Logout} /> : null}
      </div>
    </>
  );
}

export default Logout;
