import { useState, useEffect, useCallback } from "react";

const initializeFb = () =>
  // eslint-disable-next-line no-unused-vars
  new Promise((resolve, _reject) => {
    if (typeof FB !== "undefined") {
      resolve();
    } else {
      // eslint-disable-next-line func-names
      window.fbAsyncInit = function () {
        // eslint-disable-next-line no-undef
        FB.init({
          appId: "708066193904781",
          cookie: true,
          xfbml: true,
          version: "v12.0",
        });
        // eslint-disable-next-line no-undef
        FB.AppEvents.logPageView();
        resolve();
      };

      // eslint-disable-next-line func-names
      (function (d, s, id) {
        let js;
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        // eslint-disable-next-line prefer-const
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    }
  });

const useFacebook = () => {
  const [fb, setFB] = useState([]);
  const [isReady, setReady] = useState(false);

  const initFacebook = useCallback(async () => {
    await initializeFb();
    // eslint-disable-next-line no-undef
    if (typeof FB !== "undefined") {
      // eslint-disable-next-line no-undef
      setFB(FB);
      setReady(true);
    }
  });

  useEffect(() => {
    initFacebook();
  }, [initFacebook]);

  return [fb, isReady];
};

export default useFacebook;
