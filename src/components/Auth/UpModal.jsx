import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Modal.css";
import { useTranslation } from "react-i18next";
import Axios from "axios";
import { openModal } from "../redux/User/UserActions";
import { CgCloseO } from "react-icons/cg";
import { CanvasContext } from "../../index";

function UpModal() {
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);
  const [logo, setLogo] = useState({ image: "", name: "" });
  const dispatch = useDispatch();
  const canvas = React.useContext(CanvasContext);
  const { t } = useTranslation();

  const handleFile = (e) => {
    setLogo({ image: e.target.files[0], name: e.target.files[0].name });
    if (e.target.files) {
      var fileName = document.getElementById("temp-button").value;
      var dot = fileName.lastIndexOf(".") + 1;
      var imgFile = fileName.substr(dot, fileName.length).toLowerCase();
      if (imgFile === "jpg" || imgFile === "jpeg" || imgFile === "png") {
        setLogo({ image: e.target.files[0], name: e.target.files[0].name });
      } else {
        setError("Only jpg/jpeg and png files are allowed");
      }
    }
  };

  const upload = (e) => {
    e.preventDefault();
    const main = canvas.current.toJSON();
    const obj = JSON.stringify(main);
    const data = new FormData();
    data.append("image", e.target.files[0]);
    data.append("data", obj);
    data.append("name", e.target.files[0].name);
    data.append("category", data.category);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    Axios.post(
      "https://localhost:3001/templates/upload_template",
      data,
      config,
      {
        withCredentials: true,
      }
    )
      .then((res) => {
        if (res) {
          alert("Template uploaded");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="modalBackground">
      <div className="popupContainer">
        <div className="topBlock">
          <button
            className="titleCloseBtn"
            onClick={() => dispatch(openModal("hide"))}
          >
            <CgCloseO />
          </button>
        </div>
        <div className="Modalbody">
          <form className="modalForm">
            <div className="input-form">
              <input
                name="company"
                type="text"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                placeholder={t("category")}
                required
              />
              <label htmlFor="temp-button" className="upload-Btn">
                <h3>{t("logo")}</h3>
                <input
                  id="temp-button"
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
          <button type="submit" onClick={upload}>
            {t("submit")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpModal;
