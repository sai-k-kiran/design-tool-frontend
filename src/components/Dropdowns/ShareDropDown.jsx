import React, { useState, useEffect } from "react";
import "./UserDropDown.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { FacebookIcon, FacebookShareButton } from "react-share";
import { CanvasContext } from "../../index";
import Axios from "axios";
import useFacebook from "./useFacebook";
import FacebookLogin from "react-facebook-login";

const UserDropDown = () => {
  const [FBInstance, isReady] = useFacebook();
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [animate, setAnimate] = useState(false);

  const canvas = React.useContext(CanvasContext);

  useEffect(() => {
    setAnimate(true);
  }, []);

  function fbShare() {
    FBInstance.getLoginStatus((res) => {
      const data = canvas.current.toDataURL("image/jpeg", 1.0);
      var byteString = atob(data.split(",")[1]);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      var dat = new Blob([ab], { type: "image/jpeg" });
      console.log(res.authResponse.userID);
      console.log(res.authResponse.accessToken);
      console.log(data);

      var fd = new FormData();
      fd.append("access_token", res.authResponse.accessToken);
      fd.append("source", dat);
      Axios.post(
        `https://graph.facebook.com/${res.authResponse.userID}/photos?access_token=${res.authResponse.accessToken}`,
        fd
      )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
    });
  }
  function componentClicked() {
    console.log("CLicked");
  }
  function responseFacebook(response) {
    const data = canvas.current.toDataURL("image/jpeg", 1.0);
    var byteString = atob(data.split(",")[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var dat = new Blob([ab], { type: "image/jpeg" });
    console.log(dat);

    var fd = new FormData();
    fd.append("access_token", response.accessToken);
    fd.append("source", dat);

    // Axios.post(
    //   `https://graph.facebook.com/${response.userID}/photos?access_token=${response.accessToken}`,
    //   fd
    // )
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => console.log(err));
  }

  return (
    <div className={`shareDropDown ${animate ? "animate" : ""}`}>
      <ul>
        <li className="listItem" onClick={fbShare}>
          <FaFacebook style={{ color: "#00acee" }} /> Facebook
          {/* <FacebookLogin
            appId="1088597931155576"
            autoLoad={true}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook}
            cssClass="my-facebook-button"
          /> */}
        </li>
        <li className="listItem">
          <FaTwitter style={{ color: "#00acee" }} /> Twitter
        </li>
        <li className="listItem">
          <FaInstagram style={{ color: "#bc2a8d" }} /> Instagram
        </li>
      </ul>
    </div>
  );
};

export default UserDropDown;
