import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="login register__background">
      <form className="login__form">
        <h1>Register</h1>
        <div className="flex column">
          <label htmlFor="email">Email</label>
          <input className="input" id="email" type="email" />
        </div>
        <div className="flex column">
          <label htmlFor="username">Username</label>
          <input className="input" id="username" type="text" />
        </div>
        <div className="flex column">
          <label htmlFor="password">Password</label>
          <input className="input" id="password" type="password" />
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
