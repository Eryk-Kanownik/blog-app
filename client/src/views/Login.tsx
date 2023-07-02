import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login login__background">
      <form className="login__form">
        <h1>Login</h1>
        <div className="flex column">
          <label htmlFor="email">Email</label>
          <input className="input" id="email" type="email" />
        </div>
        <div className="flex column">
          <label htmlFor="password">Password</label>
          <input className="input" id="password" type="password" />
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
