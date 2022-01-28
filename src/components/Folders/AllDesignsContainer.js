import React, { useState, useEffect } from "react";
import "./AllDesigns.css";
import { useNavigate } from "react-router";
import { CanvasContext } from "../../index";
import { fabric } from "fabric";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addJson } from "../redux/Design/DesignActions";
import Axios from "axios";
import _ from "lodash";

function AllDesignsContainer() {
  const [templates, setTemplates] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const canvas = React.useContext(CanvasContext);
  const navigate = useNavigate();

  function createNew() {
    navigate("/design");
    dispatch(addJson(""));
    setTimeout(addTemplate, 1000);
  }

  const design = _.groupBy(templates, "category");

  function addTemplate() {
    canvas.current?.add(
      new fabric.IText(user.name, {
        left: 100,
        top: 100,
        fill: "white",
      })
    );
    canvas.current?.add(
      new fabric.IText(user.phone || "", {
        left: 100,
        top: 200,
        fill: "white",
      })
    );
    canvas.current?.add(
      new fabric.IText(user.company || "", {
        left: 100,
        top: 300,
        fill: "white",
      })
    );
    canvas.current?.add(
      new fabric.IText(user.address || "", {
        left: 100,
        top: 400,
        fill: "white",
      })
    );
    fabric.Image.fromURL(
      `https://localhost:3001/Logos/${user.logo}`,
      function (oImg) {
        oImg.scale(0.2);
        canvas.current?.add(oImg);
        canvas.current.renderAll();
      },
      { crossOrigin: "anonymous" }
    );
    const image =
      "https://images.unsplash.com/photo-1538991383142-36c4edeaffde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZnJlZXxlbnwwfHwwfHw%3D&w=1000&q=80";
    canvas.current.setBackgroundImage(
      image,
      function () {
        let img = canvas.current.backgroundImage;
        img.originX = "left";
        img.originY = "top";
        img.scaleX = canvas.current.getWidth() / img.width;
        img.scaleY = canvas.current.getHeight() / img.height;
        canvas.current.renderAll();
      },
      { crossOrigin: "anonymous" }
    );
  }

  const draw = (template) => {
    const data = JSON.parse(template.data);
    data.objects[0].text = user.name;
    data.objects[1].text = user.phone || "";
    data.objects[2].text = user.company || "";
    data.objects[3].text = user.address || "";
    data.objects[4].src = "https://localhost:3001/Logos/" + user.logo || "";
    setTimeout(dispatch(addJson(data)), 1000);
  };

  async function Templates() {
    await Axios.post("https://localhost:3001/templates/all_templates", {
      withCredentials: true,
    })
      .then((response) => {
        if (response) {
          setTemplates(response.data.template);
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    Templates();
  }, []);

  return (
    <>
      <div className="template-container">
        <div className="designList">
          {Object.entries(design).map(([key, value]) => {
            return (
              <div key={value.toString()}>
                <div className="category-header">
                  <h2>{key}</h2>
                </div>
                <div className="templates">
                  {value.map((item) => {
                    return (
                      <div className="savedDesigns" key={item.id}>
                        <Link to="/design" style={{ color: "black" }}>
                          <img
                            src={`https://localhost:3001/Thumbnails/${item.name}`}
                            className="templateImage"
                            alt={item.name}
                            onClick={() => draw(item)}
                          />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="newBlock">
          <button className="newTemplate" onClick={createNew}>
            New
          </button>
        </div>
      </div>
    </>
  );
}

export default AllDesignsContainer;
