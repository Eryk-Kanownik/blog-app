import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let res = await axios.post(
      "http://localhost:5000/users/register",
      userData
    );
    console.log(res.data);
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
