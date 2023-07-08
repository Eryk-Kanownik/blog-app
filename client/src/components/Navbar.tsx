import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
          <Link to="/" className="navbar__list__item__link">
            User
          </Link>
        </li>
        <li className="navbar__list__item">
          <Link to="/" className="navbar__list__item__link">
            Chat
          </Link>
        </li>
        <li className="navbar__list__item">
          <Link to="/login" className="navbar__list__item__link">
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
