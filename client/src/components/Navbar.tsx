import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/login/loginSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.login);
  const [visibility, setVisibility] = useState(false);

  return (
    <div className="navbar universal-padding">
      <ul className="navbar__list navbar__logo">
        <li className="navbar__list__logo">
          <Link to="/" className="navbar__list__item__link">
            <strong>BlogApp</strong>
          </Link>
        </li>
      </ul>
      <ul
        className={`navbar__list navbar__options ${
          visibility ? "navbar-appear" : ""
        }`}
      >
        <li className="navbar__list__item">
          <div className="navbar__list__item__image">
            <img src="https://picsum.photos/300/300" />
          </div>
          <Link
            to={`/user/${user.userId}`}
            className="navbar__list__item__link"
          >
            {user.username}
          </Link>
        </li>
        <li className="navbar__list__item">
          <Link to="/" className="navbar__list__item__link">
            Chat
          </Link>
        </li>
        <li className="navbar__list__item">
          <Link to="/create-post" className="navbar__list__item__link">
            Create Post
          </Link>
        </li>
        <li className="navbar__list__item">
          <Link
            to="/login"
            onClick={() => {
              dispatch(logoutUser);
              localStorage.removeItem("token");
              localStorage.removeItem("userId");
            }}
            className="navbar__list__item__link"
          >
            Logout
          </Link>
        </li>
      </ul>
      <div
        className="navbar__menu"
        onClick={() => setVisibility((prevState) => !prevState)}
      >
        Menu
      </div>
    </div>
  );
};

export default Navbar;
