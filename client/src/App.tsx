import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./views/Main";
import Login from "./views/Login";
import Register from "./views/Register";
import User from "./views/User";
import Notify from "./components/Notify";
import AuthComponent from "./helpers/AuthComponent";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
    }
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
