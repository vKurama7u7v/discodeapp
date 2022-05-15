import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useQuery } from "@apollo/client";
import { GET_CURSOS } from "../../../gql/course";

import SectionCursos from "./GridCursos/GridCursos.jsx";

import "../zhome.styles.css";
import "./dashboard.styles.css";
export default function Dashboard() {
  const { data, loading, error } = useQuery(GET_CURSOS, {
    variables: {
      status: true,
    },
  });

  if (loading) return null;
  if (error) {
    toast.error("Ups! Algo salio mal");
    return <h1>Ups! Algo Salio Mal</h1>;
  }

  const { getCursos } = data;

  return (
    <div className="cuerpo header__navbarapp-cuerpo">
      <main className="dashboard">
        <div className="opciones__header">
          <div className="filtro__secciones">
            <Link className="categoria">Nuevos</Link>
            <Link className="categoria">Populares</Link>
            <Link className="categoria">Programación</Link>
          </div>

          <div className="buscar__cursos">
            <input type="search" name="" id="" placeholder="Buscar Curso" />
            <button className="btn-search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>

        <SectionCursos data={getCursos} loading={loading} />
      </main>
    </div>
  );
}
