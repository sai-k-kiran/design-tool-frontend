import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import ToolsNav from "./ToolsNav";
import ElementsDrawer from "./Drawer/ElementsDrawer";
import TextDrawer from "./Drawer/TextDrawer";
import EmptyDrawer from "./Drawer/EmptyDrawer";
import UnsplashDrawer from "./Drawer/UnsplashDrawer";
import UploadsDrawer from "./Drawer/UploadsDrawer";
import "./DesignDrawer.css";

function DesignDrawer() {
  const drawers = [
    <UnsplashDrawer />,
    <ElementsDrawer />,
    <TextDrawer />,
    <UploadsDrawer />,
    // <EmptyDrawer />,
  ];

  const [drawer, setDrawer] = useState(1);
  const [closed, setClosed] = useState(false);
  const [animate, setAnimate] = useState(true);

  function changeDrawer(id) {
    if (closed) {
      setDrawer(id);
      setClosed(false);
      setAnimate(false);
    } else {
      setDrawer(id);
      setClosed(false);
      setAnimate(true);
    }
  }

  function closeDrawer() {
    setClosed(true);
  }

  return (
    <div className="designDrawer">
      <ToolsNav
        changeDrawer={changeDrawer}
        current={drawer}
        closed={closed}
        animate={animate}
      />
      <div className={`drawer ${closed ? "" : "showDrawer"}`}>
        {drawers[drawer]}
      </div>
      <div className="handle">
        <button
          type="button"
          className="container btn-none"
          onClick={closeDrawer}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
            viewBox="199 149 104 404"
            width="20"
            height="80"
          >
            <defs>
              <path
                d="M200 550C200.3 533.74 216.97 517.07 250 500C283.03 482.93 299.7 466.26 300 450L300 250C299.67 233.13 283 216.46 250 200C217 183.54 200.33 166.87 200 150L200 550Z"
                id="fEGO0r42v"
              />
            </defs>
            <g>
              <g>
                <use
                  xlinkHref="#fEGO0r42v"
                  opacity="1"
                  fill="#293039"
                  fillOpacity="1"
                />
                <g>
                  <use
                    xlinkHref="#fEGO0r42v"
                    opacity="1"
                    fillOpacity="0"
                    stroke="#000000"
                    strokeWidth="0"
                    strokeOpacity="1"
                  />
                </g>
              </g>
            </g>
          </svg>
          <div className="handleIcon">
            <FiChevronLeft />
          </div>
        </button>
      </div>
    </div>
  );
}

export default DesignDrawer;
