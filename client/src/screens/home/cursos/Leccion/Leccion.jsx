import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";

import { useQuery } from "@apollo/client";
import { GET_LECCION } from "../../../../gql/course";

import Tabs from "./Opciones/Tabs.jsx";
import TabContent from "./Opciones/TabContent.jsx";

import "../../zhome.styles.css";
import "./leccion.styles.css";

export default function Leccion() {
  const { id, tema: idTema, leccion: idLeccion } = useParams();
  const [showLeccion, setShowLeccion] = useState(true);
  const [showCompilador, setShowCompilador] = useState(false);

  const { data, loading, error } = useQuery(GET_LECCION, {
    variables: {
      status: true,
      getLeccionId: idLeccion,
    },
  });

  if (loading) return null;
  if (error) {
    toast.error("Ups! Algo salio mal");
    return <h1>Ups! Algo salio mal</h1>;
  }

  const { getLeccion } = data;

  const onShowLection = () => {
    setShowLeccion(true);
    setShowCompilador(false);
  };

  const onShowCompilador = () => {
    setShowLeccion(false);
    setShowCompilador(true);
  };

  return (
    <div className="cuerpo header__navbarapp-cuerpo">
      <main className="main__leccion">
        <div className="leccion__content">
          <div className="card">
            <div className="card-body">
              <Tabs
                onShowLection={onShowLection}
                onShowCompilador={onShowCompilador}
                showLeccion={showLeccion}
                showCompilador={showCompilador}
                setShowLeccion={setShowLeccion}
                setShowCompilador={setShowCompilador}
                id={id}
              />

              <TabContent
                showLeccion={showLeccion}
                showCompilador={showCompilador}
                data={getLeccion}
                idCurso={id}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
