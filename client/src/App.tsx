import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./views/Main";
import Login from "./views/Login";
import Register from "./views/Register";
import User from "./views/User";
import Notify from "./components/Notify";
import AuthComponent from "./helpers/AuthComponent";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import axios from "axios";
import { loadUser } from "./features/login/loginSlice";
import CreatePost from "./views/CreatePost";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function getUser() {
      if (localStorage.getItem("token") && localStorage.getItem("userId")) {
        let res = await axios.get(
          `http://localhost:5000/users/${localStorage.getItem("userId")}`
        );
        dispatch(loadUser(res.data.body));
      }
    }
    getUser();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <AuthComponent>
              <Main />
            </AuthComponent>
          }
          path="/"
        />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route
          element={
            <AuthComponent>
              <CreatePost />
            </AuthComponent>
          }
          path="/create-post"
        />
        <Route
          element={
            <AuthComponent>
              <User />
            </AuthComponent>
          }
          path="/user/:userId"
        />
      </Routes>
      <Notify />
    </BrowserRouter>
  );
}
export default App;
