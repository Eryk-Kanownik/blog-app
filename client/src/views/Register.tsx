import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { serverMessage } from "../features/message/messageSlice";
import { IUserRegisterData } from "../interfaces/types";

const Register = () => {
  const dispatch = useAppDispatch();

  const [userData, setUserData] = useState<IUserRegisterData>({
    username: "",
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        "http://localhost:5000/users/register",
        userData
      );
      dispatch(serverMessage(res.data));
    } catch (e: any) {
      dispatch(serverMessage(e.response.data));
    }
  };

  return (
    <div className="login register__background">
      <form className="login__form" onSubmit={(e) => onSubmitRegister(e)}>
        <h1>Register</h1>
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
          <label htmlFor="username">Username</label>
          <input
            className="input"
            id="username"
            type="text"
            name="username"
            defaultValue={userData.username.toString()}
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
        <div>
          <Link className="link login__form__link" to="/login">
            If you have an account please login.
          </Link>
        </div>
        <button className="btn login__form__btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
