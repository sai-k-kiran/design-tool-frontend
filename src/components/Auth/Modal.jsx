import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Modal.css";
import Axios from "axios";
import { setCurrentUser, setModal } from "../redux/User/UserActions";
import { CgCloseO } from "react-icons/cg";
import { useTranslation } from "react-i18next";

function Modal({ setOpenModal }) {
  const [data, setData] = useState({ address: "", phone: "", company: "" });
  const [logo, setLogo] = useState({ image: "", name: "" });
  const [error, setError] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleChange = (e) => {
    const input = e.target.name;
    const value = e.target.value;
    setData({ ...data, [input]: value });
  };

  const handleFile = (e) => {
    setLogo({ image: e.target.files[0], name: e.target.files[0].name });
    if (e.target.files) {
      var fileName = document.getElementById("upload-button").value;
      var dot = fileName.lastIndexOf(".") + 1;
      var imgFile = fileName.substr(dot, fileName.length).toLowerCase();
      if (imgFile === "jpg" || imgFile === "jpeg" || imgFile === "png") {
        setLogo({ image: e.target.files[0], name: e.target.files[0].name });
      } else {
        setError("Only jpg/jpeg and png files are allowed");
      }
    }
  };

  const update = (e) => {
    e.preventDefault();
    const values = new FormData();
    values.append("image", logo.image);
    values.append("logo", logo.name);
    values.append("company", data.company);
    values.append("address", data.address);
    values.append("phone", data.phone);
    values.append("email", user.email);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    Axios.post("https://localhost:3001/update", values, config, {
      withCredentials: true,
    })
      .then((response) => {
        dispatch(setCurrentUser(response.data.user));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        alert("Data updated");
        dispatch(setModal("hide"));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="topBlock">
          <button
            className="titleCloseBtn"
            onClick={() => dispatch(setModal("hide"))}
          >
            <CgCloseO />
          </button>
          <div className="title">{t("update-profile")}</div>
        </div>
        <div className="Modalbody">
          <form className="modalForm">
            <div className="input-form">
              <input
                name="address"
                type="text"
                onChange={handleChange}
                value={data.address}
                placeholder={t("address")}
                required
              />
              <input
                name="company"
                type="text"
                onChange={handleChange}
                value={data.company}
                placeholder={t("company")}
                required
              />
              <input
                name="phone"
                type="text"
                onChange={handleChange}
                value={data.phone}
                placeholder={t("phone")}
                required
              />
              <label htmlFor="upload-button" className="upload-Btn">
                <h3>{t("logo")}</h3>
                <input
                  id="upload-button"
                  name="image"
                  type="file"
                  accept="image/png, image/jpg, image/jpeg, image/PNG, image/JPG, image/JPEG"
                  onChange={handleFile}
                />
              </label>
              <p className={error ? "errorMessage true" : "errorMessage false"}>
                {error}
              </p>
            </div>
          </form>
        </div>
        <div className="footer">
          <button type="submit" onClick={update}>
            {t("submit")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
