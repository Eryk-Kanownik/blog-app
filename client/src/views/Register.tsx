import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { serverMessage } from "../features/message/messageSlice";

const Register = () => {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(userData);
    e.preventDefault();
    try {
      let res = await axios.post(
        "http://localhost:5000/users/register",
        userData
      );
      console.log(res.data);
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
            defaultValue={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="flex column">
          <label htmlFor="username">Username</label>
          <input
            className="input"
            id="username"
            type="text"
            name="username"
            defaultValue={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="flex column">
          <label htmlFor="password">Password</label>
          <input
            className="input"
            id="password"
            type="password"
            name="password"
            defaultValue={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, [e.target.name]: e.target.value })
            }
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
