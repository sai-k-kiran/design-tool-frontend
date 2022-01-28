import React from "react";
import { fabric } from "fabric";
import { CanvasContext } from "../../index";

const useFabric = () => {
  const canvas = React.useContext(CanvasContext);
  const fabricRef = React.useCallback((element) => {
    if (!element) return canvas.current?.dispose();

    fabric.Object.prototype.objectCaching = false;
    canvas.current = new fabric.Canvas(element, { backgroundColor: "#FFFFFF" });
    canvas.current.scaleX = canvas.current.getWidth() * 1.667;
    canvas.current.scaleY = canvas.current.getHeight() * 1.667;
    canvas.current.imageSmoothingEnabled = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return fabricRef;
};

export default useFabric;
