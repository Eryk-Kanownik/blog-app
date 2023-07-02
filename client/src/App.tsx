import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./views/Main";
import Login from "./views/Login";
import Register from "./views/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
