import React from "react";

import { toast } from "react-toastify";
import { size, map } from "lodash";

import { useQuery } from "@apollo/client";
import { GET_CURSO } from "../../../../gql/course";

import AccordionItem from "./Options/AccordionItem.jsx";

export default function Details(props) {
  const { getCursoId } = props;

  const { data, loading, error } = useQuery(GET_CURSO, {
    variables: {
      status: true,
      getCursoId: getCursoId,
    },
  });

  if (loading) return null;
  if (error) {
    toast.error("Ups! Algo salio mal");
    return <h1>Ups! Algo Salio Mal</h1>;
  }

  const { getCurso } = data;
  // Si getCurso == null (status = false)
  if (!getCurso) {
    return null;
  }

  const { temario } = getCurso;

  const ItemTema = (data, idCurso) => {
    return <AccordionItem data={data} id={idCurso} />;
  };

  return (
    <div className="cuerpo header__navbarapp-cuerpo">
      <main className="main__curso">
        <div className="curso__content">
          <div className="wrapper">
            <div className="left">
              <h2 className="titulo">{getCurso.name}</h2>
              <span className="categoria">{getCurso.category}</span>

              <p className="descripcion">{getCurso.description}</p>
            </div>
            <div className="right">
              <div className="thumbnail">
                <img src={getCurso.thumbnail} alt="" height="50px" />
              </div>
            </div>
          </div>

          <div className="temario__section">
            <div className="accordion">
              {size(temario) === 0 ? (
                <h1>No hay temas Disponibles</h1>
              ) : (
                map(temario, (item) => ItemTema(item, getCursoId))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
