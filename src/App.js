import "./App.css";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import SignIn from "./components/Auth/Signin";
import Home from "./components/Home/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./components/redux/User/UserActions";
import { useDispatch, useSelector } from "react-redux";
import MainEditor from "./components/Editor/MainEditor";
import LoginSuccess from "./components/Auth/LoginSuccess";
import LoginFailed from "./components/Auth/LoginFailed";
import AllDesignsContainer from "./components/Folders/AllDesignsContainer";
import UploadsContainer from "./components/Folders/UploadsContainer";
import SavedDesigns from "./components/Folders/SavedDesigns";
import ProtectedRoute from "./components/Auth/ProtectedRouted";
import Axios from "axios";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchUser = () => {
      Axios.get("https://localhost:3001/auth/login/success", {
        withCredentials: true,
      })
        .then((response) => {
          if (response.status === 200) {
            dispatch(setCurrentUser(response.data.user));
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/home/allDesigns");
          }
        })
        .catch((err) => console.log(err));
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={user ? <Navigate from="/" to="/home/allDesigns" /> : <Login />}
      />
      <Route path="/register" element={<Register />} />
      <Route exact path="/login" element={<SignIn />} />
      <Route exact path="/login/success" element={<LoginSuccess />} />
      <Route exact path="/login/failed" element={<LoginFailed />} />
      <Route path="/home" element={<ProtectedRoute />}>
        <Route path="" element={<Home />}>
          <Route path="/home/allDesigns" element={<ProtectedRoute />}>
            <Route path="" element={<AllDesignsContainer />} />
          </Route>
          <Route path="/home/saved" element={<ProtectedRoute />}>
            <Route path="" element={<SavedDesigns />} />
          </Route>
          <Route path="/home/uploads" element={<ProtectedRoute />}>
            <Route path="" element={<UploadsContainer />} />
          </Route>
        </Route>
      </Route>
      <Route path="/design" element={<ProtectedRoute />}>
        <Route path="" element={<MainEditor />} />
      </Route>
    </Routes>
  );
}

export default App;
