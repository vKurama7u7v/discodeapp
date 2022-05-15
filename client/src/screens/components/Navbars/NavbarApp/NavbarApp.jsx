import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useQuery, useApolloClient } from "@apollo/client";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { toast } from "react-toastify";

import { useLocation } from "react-router-dom";
import {
  getUrlComponent,
  updatePathnames,
} from "../../../tools/navigation.tools";
import useAuth from "../../../../hooks/useAuth";
import { GET_USER } from "../../../../gql/user";

import avatar from "../../../../assets/png/avatar.png";
import SearchUsers from "./HeaderOptions/SearchUsers/SearchUsers.jsx";
import "./navbarapp.styles.css";
// import "./navbarapp.script.js";

export default function NavbarApp() {
  const url = useLocation();
  const setNavigation = updatePathnames(getUrlComponent(url.pathname));

  const history = useHistory();
  const client = useApolloClient();
  const { auth, logout } = useAuth();
  const { username } = auth;

  const onLogout = () => {
    Swal.fire({
      title: "¿Quieres Cerrar Sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f1646c",
      confirmButtonText: "Cerrar Sesión",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.info("Cerrando Sesión", {
          onOpen: () => {
            client.clearStore();
            logout();
            history.push("/login");
          },
        });
      }
    });
  };

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      username: username,
    },
  });
  if (loading) return null;
  if (error) {
    return null;
  }

  const { getUser } = data;
  return (
    <div className="cuerpo">
      {/*<!-- ===== HEADER ===== -->*/}
      <header className="header__navbarapp">
        <div className="header__container">
          <Link className="header__logo" to="/dashboard">
            DisCode
          </Link>

          <SearchUsers />

          <div className="dashboard-right">
            <ul>
              <li>
                <Link>
                  <p>
                    {getUser.username}
                    <br />
                    <span>{getUser.role}</span>
                  </p>

                  <div className="perfil__img">
                    <div className="perfil__img-cont">
                      <img
                        src={!getUser.avatar ? avatar : getUser.avatar}
                        alt="user profile"
                        width="40px"
                        className="header__img"
                      />
                    </div>
                    <i className="bx bx-caret-down profile__icon avatar-arrow-down"></i>
                  </div>
                </Link>

                <div className="perfil__dropdown">
                  <ul>
                    <li>
                      <Link to={`/profile/${getUser.username}`}>
                        <i class="uil uil-user-circle profile__icon"></i>
                        Mi Perfil
                      </Link>
                    </li>
                    <li>
                      <Link to={`/settings/account`}>
                        <i class="uil uil-setting profile__icon"></i>
                        Configuraciones
                      </Link>
                    </li>
                    <li>
                      <Link onClick={onLogout}>
                        <i class="uil uil-sign-out-alt profile__icon"></i>
                        Cerrar Sesión
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          <div className="header__toggle">
            <i className="fa-solid fa-bars-staggered" id="navbarapp-toggle"></i>
          </div>
        </div>
      </header>

      {/*<!-- ===== NAVBAR ===== -->*/}
      <div className="nav__navbarapp" id="navbarapp">
        <nav className="nav__container">
          <div>
            <Link className="nav__link nav__logo" to="/dashboard">
              <i className="fa-solid fa-meteor nav__icon"></i>
              <span className="nav__logo-name">DisCode</span>
            </Link>

            <div className="nav__list">
              <div className="nav__items">
                <h3 className="nav__subtitle">Menú</h3>

                <Link
                  className={`nav__link ${setNavigation[0].class}`}
                  to="/dashboard"
                >
                  <i className="fa-solid fa-graduation-cap nav__icon"></i>
                  <span className="nav__name">Aprendizaje</span>
                </Link>

                <Link
                  to="/comunidad/feed"
                  className={`nav__link ${setNavigation[1].class}`}
                >
                  <i className="fa-brands fa-rocketchat nav__icon"></i>
                  <span className="nav__name">Comunidad</span>
                </Link>

                <Link
                  to="/challenge"
                  className={`nav__link ${setNavigation[2].class}`}
                >
                  <i className="fa-solid fa-trophy nav__icon"></i>
                  <span className="nav__name">Retos</span>
                </Link>

                <Link
                  to="/codesandbox"
                  className={`nav__link ${setNavigation[3].class}`}
                >
                  <i className="fa-solid fa-laptop-code nav__icon"></i>
                  <span className="nav__name">CodeSandbox</span>
                </Link>
              </div>

              <div className="nav__items">
                <h3 className="nav__subtitle">Perfil</h3>

                <Link
                  className={`nav__link ${setNavigation[4].class}`}
                  to={`/profile/${getUser.username}`}
                >
                  <i className="fa-solid fa-user nav__icon"></i>
                  <span className="nav__name">Mi Perfil</span>
                </Link>

                <div className="nav__dropdown">
                  <Link className={`nav__link ${setNavigation[5].class}`}>
                    <i className="fa-solid fa-gear nav__icon"></i>
                    <span className="nav__name">Configuraciones</span>
                    <i className="bx bx-chevron-down nav__icon nav__dropdown-icon"></i>
                  </Link>

                  <div className="nav__dropdown-collapse">
                    <div className="nav__dropdown-content">
                      <Link
                        className="nav__dropdown-item"
                        to={`/settings/account`}
                      >
                        Editar Perfil
                      </Link>
                      <Link className="nav__dropdown-item">Mi Cuenta</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== CERRAR SESIÓN =====*/}
          <Link className="nav__link nav__logout" onClick={onLogout}>
            <i className="fa-solid fa-right-from-bracket nav__icon"></i>
            <span className="nav__name">Cerrar Sesión</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
