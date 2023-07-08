import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const onSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let res = await axios.post("/users/login", userData);
    console.log(res.data);
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
            defaultValue={userData.email}
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
