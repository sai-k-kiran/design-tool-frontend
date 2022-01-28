import React, { useEffect } from "react";
import "./DesignTools.css";
import { CanvasContext } from "../../index";
import { useTranslation } from "react-i18next";

function DesignTools() {
  const canvas = React.useContext(CanvasContext);
  const { t } = useTranslation();

  const Delete = () => {
    const selected = canvas.current.getActiveObject();
    canvas.current?.remove(selected);
  };

  // useEffect(() => {
  //   document.addEventListener("keydown", onDelete, false);
  // }, []);

  // const onDelete = (e) => {
  //   e.preventDefault();
  //   if (e.key === "Delete") {
  //     const selected = canvas.current.getActiveObject();
  //     canvas.current?.remove(selected);
  //   } else return;
  // };
  const changeColor = (e) => {
    if (canvas.current.getActiveObject()) {
      canvas.current?.getActiveObject().set("fill", e.target.value);
      canvas.current.renderAll();
    }
  };
  const front = () => {
    const active = canvas.current.getActiveObject();
    canvas.current.bringToFront(active);
  };
  const opacitySlider = (e) => {
    if (canvas.current.getActiveObject()) {
      canvas.current?.getActiveObject().set("opacity", e.target.value / 100);
      canvas.current.renderAll();
    }
  };
  const changeFont = (e) => {
    if (canvas.current.getActiveObject()) {
      if (canvas.current.getActiveObject().type === "i-text") {
        canvas.current?.getActiveObject().set("fontFamily", e.target.value);
        canvas.current.renderAll();
      }
    }
  };
  useEffect(() => {
    changeFont();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="designTools">
      <div className="colorNav"></div>
      <div className="deleteNav">
        <p style={{ fontSize: "16px", marginRight: "10px" }}>
          {t("transparency")}:{" "}
        </p>
        <input
          className="range"
          type="range"
          name="opacity"
          defaultValue="100"
          min="0"
          step="10"
          max="100"
          onClick={opacitySlider}
        />
        <button className="front-btn" onClick={front}>
          {t("front")}
        </button>
        <div className="font-family">
          <label htmlFor="font-family">{t("font")}:</label>
          <select id="font-family" onChange={changeFont}>
            <option value="Audiowide">Audiowide</option>
            <option value="Arial">Arial</option>
            <option value="Bangers">Bangers</option>
            <option value="georgia">Georgia</option>
            <option value="courier">Courier</option>
            <option value="comic sans ms">Comic Sans MS</option>
            <option value="impact">Impact</option>
            <option value="Lobster">Lobster</option>
            <option value="myriad pro">Myriad Pro</option>
            <option value="Monotype Corsiva">Monotype Corsiva</option>
            <option value="Oswald">Oswald</option>
            <option value="Pacifico">Pacifico</option>
            <option value="Poppins">Poppins</option>
            <option value="Sacramento">Sacramento</option>
            <option value="Satisfy">Satisfy</option>
            <option value="Times">Times New Roman</option>
            <option value="verdana">Verdana</option>
          </select>
        </div>
        <input
          type="color"
          className="color-btn"
          onChange={(e) => changeColor(e)}
        />
        <button className="delete-btn" onClick={Delete}>
          {t("delete")}
        </button>
      </div>
    </div>
  );
}

export default DesignTools;
