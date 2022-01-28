import React from "react";
import "./ElementsDrawer.css";
import {
  Triangle,
  Heart,
  Hexagon,
  Rectangle,
  Right_triangle,
  Star,
  Rounded_square,
  Circle,
  Pentagon,
} from "../assets";
import { CanvasContext } from "../../../index";
import { fabric } from "fabric";

function ElementsDrawer() {
  const canvas = React.useContext(CanvasContext);

  function addCircle() {
    canvas.current?.add(
      new fabric.Circle({
        radius: 50,
        fill: "green",
        left: 200,
        top: 100,
      })
    );
  }
  function addRect() {
    canvas.current?.add(
      new fabric.Rect({
        fill: "powderblue",
        width: 100,
        height: 100,
        left: 200,
        top: 100,
      })
    );
  }
  function addTriangle() {
    canvas.current?.add(
      new fabric.Triangle({
        radius: 20,
        fill: "green",
        left: 200,
        top: 100,
      })
    );
  }
  function addRight() {
    var Right = new fabric.Path("M500 499.2H0V0L500 499.2z");
    Right.set({ fill: "blue", scaleX: 0.3, scaleY: 0.3 });
    canvas.current?.add(Right);
  }
  function addHexa() {
    var Hexa = new fabric.Path(
      "M366.3,0H122.1L0,211.5L122.1,423h244.2l122.1-211.5L366.3,0z"
    );
    Hexa.set({ fill: "green", scaleX: 0.3, scaleY: 0.3 });
    canvas.current?.add(Hexa);
  }
  function addHeart() {
    const Heart = new fabric.Path(
      "m0 129.4c0 139.3 250 309.2 250 309.2s248.9-171.1 250-309.2c0-71.3-58.1-129.4-129.4-129.4-54.8 0-102 35.1-120.6 83.3-18.6-48.2-65.8-83.3-120.6-83.3-71.3 0-129.4 58.1-129.4 129.4"
    );
    Heart.set({ scaleX: 0.3, scaleY: 0.3, fill: "#dc85ff" });
    canvas.current?.add(Heart);
  }
  function addPenta() {
    const Penta = new fabric.Path(
      "m95.5 475.5l-95.5-293.9 250-181.6 250 181.6-95.5 293.9h-309z"
    );
    Penta.set({ scaleX: 0.3, scaleY: 0.3, fill: "#dc85ff" });
    canvas.current?.add(Penta);
  }
  function addStar() {
    const Star = new fabric.Path(
      "M71.9 1.3l19.7 40c.3.7 1 1.2 1.8 1.3l44.1 6.4c1.9.3 2.7 2.7 1.3 4l-31.9 31.1c-.6.5-.8 1.3-.7 2.1l7.5 44c.3 1.9-1.7 3.4-3.4 2.5l-39.5-20.8c-.7-.4-1.5-.4-2.2 0l-39.5 20.8c-1.7.9-3.7-.6-3.4-2.5l7.5-44c.1-.8-.1-1.5-.7-2.1L.7 53C-.7 51.6.1 49.3 2 49l44.1-6.4c.8-.1 1.4-.6 1.8-1.3l19.7-40c.9-1.7 3.4-1.7 4.3 0z"
    );
    Star.set({ fill: '#dc85ff"' });
    canvas.current?.add(Star);
  }
  function addRounded() {
    const Rounded = new fabric.Path(
      "M140.9,150.7H9.8C4.4,150.7 0,146.29999999999998 0,140.89999999999998V9.8C0,4.4 4.4,0 9.8,0H140.9C146.3,0 150.70000000000002,4.4 150.70000000000002,9.8V140.9C150.70000000000002,146.3 146.3,150.70000000000002 140.9,150.70000000000002Z"
    );
    Rounded.set({ fill: '#dc85ff"' });
    canvas.current?.add(Rounded);
  }
  return (
    <>
      <div className="customScroll">
        <div className="elementsDrawer">
          <div className="itemListElem">
            <div className="itemElem" onClick={addCircle}>
              <img src={Circle} className="elemIcons" alt="circle" />
            </div>
            <div className="itemElem" onClick={addRect}>
              <img src={Rectangle} className="elemIcons" alt="rectangle" />
            </div>
            <div className="itemElem" onClick={addTriangle}>
              <img src={Triangle} className="elemIcons" alt="triangle" />
            </div>
            <div className="itemElem" onClick={addHexa}>
              <img src={Hexagon} className="elemIcons" alt="hexagon" />
            </div>
            <div className="itemElem" onClick={addHeart}>
              <img src={Heart} className="elemIcons" alt="heart" />
            </div>
            <div className="itemElem" onClick={addRight}>
              <img
                src={Right_triangle}
                className="elemIcons"
                alt="right_triangle"
              />
            </div>
            <div className="itemElem" onClick={addPenta}>
              <img src={Pentagon} className="elemIcons" alt="pentagon" />
            </div>
            <div className="itemElem" onClick={addRounded}>
              <img
                src={Rounded_square}
                className="elemIcons"
                alt="rounded_square"
              />
            </div>
            <div className="itemElem" onClick={addStar}>
              <img src={Star} className="elemIcons" alt="star" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ElementsDrawer;

// {mockupResponse.map((item) => (
//   <div
//     key={item.id}
//     className="itemElem"
//     // onClick={() => addElement(item.url)}
//     onClick={item.func}
//   >
//     <img src={item.url} className="elemIcons" />
//   </div>
// ))}
