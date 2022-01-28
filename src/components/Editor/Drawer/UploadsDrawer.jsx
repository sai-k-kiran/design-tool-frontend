import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./UnsplashDrawer.css";
import { useSelector } from "react-redux";
import { CanvasContext } from "../../../index";
import { fabric } from "fabric";

function UploadsDrawer() {
  const canvas = React.useContext(CanvasContext);
  const [images, setImages] = useState([]);
  const user = useSelector((state) => state.user.currentUser);

  const handleFile = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", e.target.files[0]);
    data.append("userId", user.id);
    data.append("name", e.target.files[0].name);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    Axios.post("https://localhost:3001/image/upload", data, config)
      .then((res) => {
        setImages([...images, res.data.image]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    Axios.post(
      "https://localhost:3001/image/uploads",
      {
        userId: user.id,
      },
      { withCredentials: true }
    ).then((res) => {
      setImages(...images, res.data.images);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePhotos(name) {
    fabric.Image.fromURL(
      `https://localhost:3001/Uploads/${name}`,
      function (oImg) {
        oImg.scale(0.1);
        canvas.current?.add(oImg);
        canvas.current.renderAll();
      },
      { crossOrigin: "anonymous" }
    );
  }

  return (
    <div className="uploadsContainer">
      <label htmlFor="upload-button" className="uploadBtn">
        <h2>Upload an Image</h2>
        <input
          id="upload-button"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleFile}
        />
      </label>
      {!images ? (
        <div className="header">
          <h2>No uploaded images</h2>
        </div>
      ) : (
        <div className="scrollDiv">
          {images.map((image) => {
            return (
              <div
                key={image.id}
                className="unsplash-image"
                onClick={() => handlePhotos(image.name)}
              >
                <img
                  src={"https://localhost:3001/Uploads/" + image.name}
                  alt="uploaded_img"
                  className="uploaded-image"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UploadsDrawer;
