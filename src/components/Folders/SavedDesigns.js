import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addJson } from "../redux/Design/DesignActions";
import "./AllDesigns.css";
import { MdDeleteForever } from "react-icons/md";
import { useTranslation } from "react-i18next";

function SavedDesigns() {
  const user = useSelector((state) => state.user.currentUser);
  const [designs, setDesigns] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const draw = (design) => {
    const data = JSON.parse(design.data);
    setTimeout(dispatch(addJson(data)), 1000);
  };

  async function Designs() {
    const userId = user.id;
    await Axios.post(
      "https://localhost:3001/saved/design",
      { userId },
      { withCredentials: true }
    )
      .then((response) => {
        if (response) {
          setDesigns(response.data.design);
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    Designs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteSaved = (id) => {
    Axios.post(
      "https://localhost:3001/saved/delete_saved",
      { id: id },
      { withCredentials: true }
    )
      .then((response) => {
        setDesigns(designs.filter((item) => item.id !== id));
      })
      .catch((err) => console.log("error"));
  };

  return (
    <>
      {designs.length > 0 ? (
        <div className="savedDesigns">
          {designs.map((design) => (
            <div
              className="savedDesign"
              key={design.id}
              onClick={() => draw(design)}
            >
              <Link to="/design" style={{ color: "black" }}>
                <h3>
                  Design {design.id}: {design.createdAt.substr(0, 10)}
                </h3>
              </Link>
              <MdDeleteForever
                className="delete-button"
                onClick={() => deleteSaved(design.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="headers">
          <h1>{t("no-saved")}</h1>
        </div>
      )}
    </>
  );
}

export default SavedDesigns;
