import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./views/Main";
import Login from "./views/Login";
import Register from "./views/Register";
import User from "./views/User";
import Notify from "./components/Notify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<User />} path="/user/:userId" />
      </Routes>
      <Notify />
    </BrowserRouter>
  );
}
export default App;
