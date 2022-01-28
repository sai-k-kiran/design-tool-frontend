import React from "react";
import "./Editor.css";
import EditorNav from "./EditorNav";
import DesignDrawer from "./DesignDrawer";
import WorkArea from "./WorkArea";
import { CanvasContext } from "../../index";
import { useTranslation } from "react-i18next";

function MainEditor() {
  const canvas = React.useContext(CanvasContext);
  const { t } = useTranslation();

  // function zoomIn() {
  //   canvas.current.setZoom(1.25);
  // }

  // function zoomOut() {}

  return (
    <div className="editorContainer">
      <EditorNav />
      <div className="editorBottomContainer">
        <DesignDrawer />
        <WorkArea />
        <div className="zoomBar">
          {/* <button type="button" className="btn-icon" onClick={zoomIn}>
            {t("zoom-in")}
          </button>
          <button type="button" className="btn-icon" onClick={zoomOut}>
            {t("zoom-out")}
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default MainEditor;
