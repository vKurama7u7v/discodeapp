import React from "react";
import { Link } from "react-router-dom";
import { size, map } from "lodash";

export default function Items(props) {
  const { data, loading, error } = props;
  if (loading) return null;
  else if (error) {
    console.log("Ups! Algo salio mal");
  }

  const { getCodeSandboxes } = data;
  return (
    <>
      {size(getCodeSandboxes) === 0 ? (
        <h3 className="sandbox-notFound">No tienes ninguna Sandbox Creada</h3>
      ) : (
        <div className="grid__sandbox">
          {map(getCodeSandboxes, (item) =>
            ItemComponent(
              item.id,
              item.name,
              item.icon,
              item.name_language,
              item.language,
              item.updatedAt
            )
          )}
        </div>
      )}
    </>
  );
}

function GetDateFormat(date) {
  const d = new Date(parseInt(date));
  const selectMonth = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const dateFormat =
    d.getDate() +
    " " +
    selectMonth[d.getMonth()] +
    ", " +
    d.getFullYear() +
    " - " +
    d.getHours() +
    ":" +
    d.getMinutes();

  return dateFormat;
}

function ItemComponent(id, name, icon, name_language, language, updatedAt) {
  const fecha_edicion = GetDateFormat(updatedAt);
  const link = `/codesandbox/sandbox/${language}/${id}`;
  return (
    <div className="item">
      <div className="item__info">
        <div className="thumbnail">
          <div className="thumbnail-fill">
            <Link to={link}>Ir a Sandbox</Link>
          </div>
          <img src={icon} alt={language} title={name_language} height="40px" />
        </div>
        <span className="language">{name_language}</span>
        <div className="descripcion">
          <Link to={link} className="titulo">
            <p>{name}</p>
          </Link>
          <div className="texto">
            <span className="fecha">
              <i className="uil uil-pen"></i>
              {fecha_edicion}
            </span>
            <div id="circulo"></div>
            <span className="lenguaje">{name_language}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
