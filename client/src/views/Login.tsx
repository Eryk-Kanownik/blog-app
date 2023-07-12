import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../features/login/loginSlice";
import { serverMessage } from "../features/message/messageSlice";
import { useAppDispatch } from "../app/hooks";
import { IUserLoginData } from "../interfaces/types";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<IUserLoginData>({
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:5000/users/login", userData);
      dispatch(loginUser(res.data.body));
      dispatch(serverMessage(res.data));
      localStorage.setItem("token", res.data.body.token);
      localStorage.setItem("userId", res.data.body.userId);
      navigate("/");
    } catch (e: any) {
      dispatch(serverMessage(e.response.data));
    }
  };

  return (
    <div className="login login__background">
      <form className="login__form" onSubmit={(e) => onSubmitLogin(e)}>
        <h1>Login</h1>
        <div className="flex column">
          <label htmlFor="email">Email</label>
          <input
            className="input"
            id="email"
            type="email"
            name="email"
            defaultValue={userData.email.toString()}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="flex column">
          <label htmlFor="password">Password</label>
          <input
            className="input"
            id="password"
            type="password"
            name="password"
            defaultValue={userData.password.toString()}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="flex column">
          <Link className="link login__form__link" to="/register">
            If you don't have an account please register.
          </Link>

          <Link className="link login__form__link" to="/remember">
            If you don't remember password to your account please click here.
          </Link>
        </div>
        <button className="btn login__form__btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
