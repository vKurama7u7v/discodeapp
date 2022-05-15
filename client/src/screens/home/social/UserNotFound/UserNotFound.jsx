import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../../../components/Navbars/NavbarApp/NavbarApp.jsx";

import "../../zhome.styles.css";
import "./usernotfound.styles.css";

export default function UserNotFound() {
  return (
    <div className="cuerpo header__navbarapp-cuerpo">
      <Navbar />
      <main className="pd-1">
        <div className="notification__txt-center">
          <h2>Usuario no encotrado</h2>
          <p>
            Es posible que el enlace que has seguido sea incorrecto o que el
            usuario se haya eliminado
          </p>
          <Link to="/dashboard">Volver a Dashboard</Link>
        </div>
      </main>
    </div>
  );
}
