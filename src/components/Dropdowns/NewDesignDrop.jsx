import React, { useState, useEffect } from "react";
import {
  FiPlus,
  FiInstagram,
  FiFacebook,
  FiAirplay,
  FiCreditCard,
  FiImage,
  FiSmile,
} from "react-icons/fi";
import "./UserDropDown.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newDesign } from "../redux/Design/DesignActions";

const mockupResponse = [
  {
    id: 1,
    name: "Poster",
    description: "18 x 24 in",
    width: 1728,
    height: 2304,
    icon: <FiImage />,
  },
  {
    id: 2,
    name: "Facebook Post",
    description: "940 x 788 px",
    width: 940,
    height: 788,
    icon: <FiFacebook />,
  },
  {
    id: 3,
    name: "Facebook Cover",
    description: "820 x 312 px",
    width: 820,
    height: 312,
    icon: <FiFacebook />,
  },
  {
    id: 4,
    name: "Presentation",
    description: "1920 x 1080 px",
    width: 1920,
    height: 1080,
    icon: <FiAirplay />,
  },
  {
    id: 5,
    name: "Instagram Post",
    description: "1080 x 1080 px",
    width: 1080,
    height: 1080,
    icon: <FiInstagram />,
  },
  {
    id: 6,
    name: "Business Card",
    description: "3.5 x 2 in",
    width: 336,
    height: 192,
    icon: <FiCreditCard />,
  },
  {
    id: 7,
    name: "Logo",
    description: "500 x 500 px",
    width: 500,
    height: 500,
    icon: <FiSmile />,
  },
];

function NewDesignDrop() {
  const [animate, setAnimate] = useState(false);
  const [ratios, setRatios] = useState({ width: "", height: "" });
  const [toggle, setToggle] = useState(false);

  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  function createDesign(item) {
    const design = {
      userId: user.id,
      title: `Untitled Design - ${item.name}`,
      public: false,
      width: item.width,
      height: item.height,
    };
    dispatch(newDesign(design));
    navigate("/design");
  }

  const handleChange = (e) => {
    const input = e.target.name;
    const value = e.target.value;
    setRatios({ ...ratios, [input]: value });
  };

  const error =
    ratios.width < 40 ||
    ratios.width > 8000 ||
    ratios.height < 40 ||
    ratios.height > 8000;
  return (
    <div className={`dropdownCard ${animate ? "animate" : ""}`}>
      <ul className="createDropDown">
        <li className="listItem" onClick={() => setToggle(!toggle)}>
          <FiPlus className={toggle ? "rotate icon" : "icon"} />
          <span className="ml-8">Custom Dimensions</span>
        </li>
        {toggle ? (
          <div className="customForm">
            <li className="custom">
              <input
                type="number"
                style={
                  ratios.width !== "" &&
                  (ratios.width < 40 || ratios.width > 8000)
                    ? { border: "1px solid red" }
                    : {}
                }
                inputMode="numeric"
                pattern="\d*"
                name="width"
                placeholder="Width"
                onChange={handleChange}
              />
              <input
                type="number"
                style={
                  ratios.height !== "" &&
                  (ratios.height < 40 || ratios.height > 8000)
                    ? { border: "1px solid red" }
                    : {}
                }
                inputMode="numeric"
                pattern="\d*"
                name="height"
                placeholder="Height"
                onChange={handleChange}
              />
              <h6>px</h6>
            </li>
            {(ratios.width !== "" || ratios.height !== "") && error ? (
              <li className="error">
                Dimensions must be at least 40px and no more than 8000px.
              </li>
            ) : (
              ""
            )}
            <li className="submit">
              <button
                type="submit"
                className="btn-blue"
                onClick={() =>
                  createDesign({
                    name: "Custom image",
                    width: ratios.width,
                    height: ratios.height,
                  })
                }
                disabled={error}
              >
                Create Design
              </button>
            </li>
          </div>
        ) : (
          <>
            {mockupResponse.map((item) => (
              <li
                key={item.id}
                className="listItem"
                onClick={() => createDesign(item)}
              >
                {item.icon}
                <span className="ml-8">{item.name}</span>
                <small className="hidden">{item.description}</small>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
}

export default NewDesignDrop;
