import React from "react";
import Design from "./Design";
import "./WorkArea.css";
import DesignTools from "./DesignTools";

const WorkArea = () => {
  return (
    <div className="workContainer">
      <DesignTools />
      <div className="workArea" id="noElementGrey">
        <div className="designContainer" id="noElementShadow">
          <Design />
        </div>
      </div>
    </div>
  );
};

export default WorkArea;
