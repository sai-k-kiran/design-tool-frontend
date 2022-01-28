import React, { useState } from "react";
import { FiChevronLeft, FiSave, FiShare2, FiDownload } from "react-icons/fi";
import "./Editornav.css";
import { useNavigate } from "react-router";
import { CanvasContext } from "../../index";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import ShareDropDown from "../Dropdowns/ShareDropDown";
import UpModal from "../Auth/UpModal";
import { openModal } from "../redux/User/UserActions";

function EditorNav() {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);
  const pop_up = useSelector((state) => state.user.popup);
  const canvas = React.useContext(CanvasContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const download = () => {
    const url = canvas.current.toDataURL("image/jpeg", 1.0);
    const link = document.createElement("a");
    link.download = "image.jpeg";
    link.href = url;
    link.click();
  };

  const save = () => {
    const data = canvas.current.toJSON();
    const obj = JSON.stringify(data);
    Axios.post(
      "https://localhost:3001/saved/design_upload",
      { data: obj, userId: user.id },
      { withCredentials: true }
    )
      .then((res) => {
        if (res) {
          alert("Design saved");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="editorNav">
      {pop_up === "show" ? <UpModal /> : null}
      <nav className="leftNav">
        <div>
          <button
            type="button"
            className="btn-icon btn-editor"
            onClick={() => {
              navigate("/home/allDesigns");
            }}
          >
            <FiChevronLeft />
            {t("home")}
          </button>
        </div>
      </nav>
      <nav className="rightNav">
        <button
          type="button"
          className="btn-icon btn-editor"
          onClick={() => dispatch(openModal("show"))}
        >
          <FiSave />
          <span className="ml-4">Upload</span>
        </button>
        <button type="button" className="btn-icon btn-editor" onClick={save}>
          <FiSave />
          <span className="ml-4">{t("save")}</span>
        </button>
        <button
          type="button"
          className="btn-icon btn-editor"
          onClick={download}
          download="image.jpg"
        >
          <FiDownload />
          <span className="ml-4">{t("download")}</span>
        </button>
        <button
          type="button"
          className="btn-icon btn-editor"
          onClick={() => setToggle(!toggle)}
        >
          <FiShare2 />
          <span className="ml-4">Share</span>
        </button>
        {toggle ? <ShareDropDown /> : null}
      </nav>
    </div>
  );
}

export default EditorNav;
