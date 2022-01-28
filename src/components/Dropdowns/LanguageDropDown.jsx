import React, { useState, useEffect } from "react";
import "./UserDropDown.css";
import Denmark from "../images/denmark.svg";
import UK from "../images/united.svg";
import i18next from "i18next";

const LanguageDropDown = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className={`langdownCard ${animate ? "animate" : ""}`}>
      <ul>
        <li className="langItem" onClick={() => i18next.changeLanguage("en")}>
          <img src={UK} alt="eng" /> English
        </li>
        <li className="langItem" onClick={() => i18next.changeLanguage("da")}>
          <img src={Denmark} alt="da" /> Danish
        </li>
      </ul>
    </div>
  );
};

export default LanguageDropDown;
