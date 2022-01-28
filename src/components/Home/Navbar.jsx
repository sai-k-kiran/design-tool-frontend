import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logout from "../Auth/logout";
import Logo from "../images/Capture.PNG";
import NewDesignDropDown from "../Dropdowns/NewDesignDrop";
import LanguageDropDown from "../Dropdowns/LanguageDropDown";
import { addJson } from "../redux/Design/DesignActions";
import { IoLanguage } from "react-icons/io5";
import { useTranslation } from "react-i18next";

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function setZero() {
    dispatch(addJson(""));
  }

  return (
    <div className="nav">
      <nav>
        <img className="logo" src={Logo} alt="logo" />
        <div>
          <ul className="navlinks">
            {user ? (
              <li className="login-user">
                <h3 style={{ color: "black" }}>
                  {t("welcome")} {user.name}
                </h3>
              </li>
            ) : null}
            {user ? (
              <li>
                <Link to="/design">
                  <button
                    className="create-design"
                    onClick={setZero}
                    // onClick={()=>setToggle(!toggle)}
                  >
                    {t("create-design")}
                  </button>
                  {/* {toggle ? <NewDesignDropDown /> : null} */}
                </Link>
              </li>
            ) : null}
            {user ? (
              <li className="logout-btn">
                <Logout />
              </li>
            ) : null}
            <li className="language" onClick={() => setToggle(!toggle)}>
              <IoLanguage />
              {toggle ? <LanguageDropDown /> : null}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
