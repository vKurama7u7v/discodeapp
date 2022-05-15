import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./navbar.styles.css";

const Navbar = () => {
  /* ===== COMPONENTE ===== */
  return (
    <header className="header">
      <div className="header__logo">
        <h1>
          <Link to="/">DisCode</Link>
        </h1>
      </div>
      <nav className="nav" id="nav-menu">
        <div className="nav__content bd-grid">
          <div className="nav__menu">
            <ul className="nav__list">
              <li className="nav__item">
                <Link className="nav__link" to="/index">
                  Inicio
                </Link>
              </li>

              <li className="nav__item">
                <Link className="nav__link" to="/index">
                  Blog
                </Link>
              </li>

              <li className="nav__item">
                <Link className="nav__link" to="/index">
                  Contactanos
                </Link>
              </li>

              <li className="nav__item">
                <Link className="nav__link link__design" to="/login">
                  Iniciar Sesión
                </Link>
              </li>

              <li className="nav__item">
                <Link className="nav__link link__design" to="/register">
                  Regístrarse
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/*<!-- BTN RESPONSIVE -->*/}
      <div className="header__toggle">
        <i className="uil uil-bars" id="header-toggle"></i>
      </div>
    </header>
  );
};

export default Navbar;
