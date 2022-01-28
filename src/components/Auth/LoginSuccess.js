import React, { useEffect } from "react";

function LoginSuccess() {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  });
  return (
    <>
      <p>You will be redirected to homepage in a moment</p>
    </>
  );
}

export default LoginSuccess;
