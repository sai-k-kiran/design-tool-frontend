import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import "./AllDesigns.css";
import { useTranslation } from "react-i18next";
import { MdDeleteForever } from "react-icons/md";

function UploadsContainer() {
  const [images, setImages] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const { t } = useTranslation();

  function fetchUploads() {
    Axios.post(
      "https://localhost:3001/image/uploads",
      {
        userId: user.id,
      },
      { withCredentials: true }
    ).then((res) => {
      setImages(res.data.images);
    });
  }

  useEffect(() => {
    fetchUploads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteUploaded = (id) => {
    Axios.post(
      "https://localhost:3001/iamge/delete_uploaded",
      { id: id },
      { withCredentials: true }
    )
      .then((response) => {
        setImages(images.filter((item) => item.id !== id));
      })
      .catch((err) => console.log("error"));
  };
  return (
    <>
      {images.length > 0 ? (
        <div className="uploaded">
          {images.map((image) => {
            return (
              <div className="uploads-div">
                <img
                  key={image.id}
                  src={"https://localhost:3001/Uploads/" + image.name}
                  alt="uploaded_img"
                  className="uploads-image"
                />
                <MdDeleteForever
                  className="delete-button"
                  onClick={() => deleteUploaded(image.id)}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div className="headers">
            <h1>{t("no-images")}</h1>
          </div>
        </>
      )}
    </>
  );
}

export default UploadsContainer;
