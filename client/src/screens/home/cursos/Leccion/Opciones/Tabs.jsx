import React from "react";
import { Link } from "react-router-dom";

export default function Tabs(props) {
  const { onShowLection, onShowCompilador, showLeccion, showCompilador, id } =
    props;
  return (
    <ul className="navbar-leccion">
      <li>
        <button
          className={showLeccion ? "tab reset active" : "tab reset"}
          onClick={onShowLection}
          data-id="leccion"
        >
          <span className="icon">
            <i class="fa-solid fa-book-open-reader"></i>
          </span>
          <span className="text">Lección</span>
        </button>
      </li>
      <li>
        <button
          className={showCompilador ? "tab reset active" : "tab reset"}
          onClick={onShowCompilador}
          data-id="compilador"
        >
          <span className="icon">
            <i class="fa-solid fa-code"></i>
          </span>
          <span className="text">Compilador</span>
        </button>
      </li>
      <Link className="close" to={`/dashboard/curso/${id}`}>
        <i class="fa-solid fa-xmark"></i>
      </Link>
    </ul>
  );
}
