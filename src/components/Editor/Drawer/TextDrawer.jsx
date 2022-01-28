import React from "react";
import "./TextDrawer.css";
import "./ElementsDrawer.css";
import { CanvasContext } from "../../../index";
import { fabric } from "fabric";
import { useTranslation } from "react-i18next";

function TextDrawer() {
  const canvas = React.useContext(CanvasContext);
  const { t } = useTranslation();

  function addHeading() {
    const Heading = new fabric.IText(t("text1"), {
      width: 300,
      top: 0,
      left: 100,
      fontFamily: "arial black",
      fontSize: 50,
      editable: true,
    });
    canvas.current?.add(Heading);
  }
  function addSubtext() {
    const SubText = new fabric.IText(t("text2"), {
      top: 0,
      left: 100,
      fontSize: 30,
      editable: true,
    });
    canvas.current?.add(SubText);
  }
  function addLittleText() {
    const LittleText = new fabric.IText(t("text2"), {
      top: 0,
      left: 100,
      fontSize: 20,
      editable: true,
    });
    canvas.current?.add(LittleText);
  }
  return (
    <>
      <div className="customScroll">
        <div className="textDrawer">
          <h3>{t("click-add")}</h3>
          <div className="highlights">
            <div className="highlightItem heading" onClick={addHeading}>
              <p>{t("text1")}</p>
            </div>
            <div className="highlightItem subheading" onClick={addSubtext}>
              <p>{t("text2")}</p>
            </div>
            <div className="highlightItem body" onClick={addLittleText}>
              <p>{t("text3")}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TextDrawer;
